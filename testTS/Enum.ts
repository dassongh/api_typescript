type direct = 'left' | 'right';

enum Direction {
  Left = 'left',
  Right = 'rigth',
}

Direction.Left;

function move(direction: Direction) {
  switch (direction) {
    case Direction.Left:
      return -1;
    case Direction.Right:
      return 1;
  }
}

const enum Direction2 {
  Up,
  Down,
}

let myDirection = Direction2.Up;
