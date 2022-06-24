const z = 'waggwa';

type direction = 'left' | 'right';

function moveDog(direction: direction): -1 | 0 | 1 {
  switch (direction) {
    case 'left':
      return -1;
    case 'right':
      return 1;
    default:
      return 0;
  }
}

moveDog('left');

interface IConnection {
  host: string;
  port: number;
}

function connect(connection: IConnection | 'default') {}

connect('default');

const req = {
  host: 'localhost',
  protocol: 'https' as 'https',
};

function request(host: string, protocol: 'http' | 'https') {}

request(req.host, req.protocol);
