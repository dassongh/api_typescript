import { NextFunction, Request, Response } from 'express';
import { injectable } from 'inversify';
import { inject } from 'inversify/lib/annotation/inject';
import { BaseController } from '../common/base.controller';
import { HTTPError } from '../errors/http-error.class';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import 'reflect-metadata';
import { IUserController } from './users.controller.interface';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { ValidateMiddleware } from '../common/validate.middleware';
import { sign } from 'jsonwebtoken';
import { IConfigService } from '../config/config.service.interface';
import { IUserService } from './users.service.interface';
import { AuthGuard } from '../common/auth.guard';

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.UserService) private userService: IUserService,
		@inject(TYPES.ConfigService) private configService: IConfigService,
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/register',
				method: 'post',
				func: this.register,
				middlewares: [new ValidateMiddleware(UserRegisterDto)],
			},
			{
				path: '/login',
				method: 'post',
				func: this.login,
				middlewares: [new ValidateMiddleware(UserLoginDto)],
			},
			{
				path: '/info',
				method: 'get',
				func: this.info,
				middlewares: [new AuthGuard()],
			},
			{
				path: '/users',
				method: 'get',
				func: this.users,
			},
		]);
	}

	async login({ body }: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction): Promise<void> {
		const result = await this.userService.validateUser(body);
		if (!result) return next(new HTTPError(401, 'Authorisation error', 'login'));

		const jwt = await this.signJWT(body.email, this.configService.get('SECRET'));

		this.ok(res, { jwtToken: jwt });
	}

	async register({ body }: Request<{}, {}, UserRegisterDto>, res: Response, next: NextFunction): Promise<void> {
		const result = await this.userService.createUser(body);
		if (!result) return next(new HTTPError(422, 'User already exists', 'register'));

		this.ok(res, { email: result.email, name: result.name, id: result.id });
	}

	async info({ user }: Request, res: Response, next: NextFunction): Promise<void> {
		const userInfo = await this.userService.getUserInfo(user.email);
		this.ok(res, { name: userInfo?.name, email: userInfo?.email, id: userInfo?.id });
	}

	async users(req: Request, res: Response, next: NextFunction): Promise<void> {
		const users = await this.userService.getAllUsers();
		const result = users.map(({ id, name, email }) => ({ id, name, email }));

		this.ok(res, result);
	}

	private signJWT(email: string, secret: string): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			sign(
				{
					email,
					iat: Math.floor(Date.now() / 1000),
				},
				secret,
				{
					algorithm: 'HS256',
				},
				(err, token) => {
					if (err) reject(err);
					resolve(token as string);
				},
			);
		});
	}
}
