import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
	@IsEmail({}, { message: 'Wrong email' })
	email: string;

	@IsString({ message: 'Password is missing' })
	name: string;

	@IsString({ message: 'Name is missing' })
	password: string;
}
