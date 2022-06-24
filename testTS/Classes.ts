class Coord {
  lat: number;
  long: number;

  constructor(lat: number, long: number) {
    this.lat = lat;
    this.long = long;
  }

  computeDistance(newLat: number, newLong: number): number {
    return 0;
  }

  protected test() {
    if (this.lat > 0) {
    }
  }
}

const point = new Coord(1, 2);

class MapLocation extends Coord {
  private _name: string;

  constructor(lat: number, long: number, name: string) {
    super(lat, long);

    this._name = name;
  }

  override computeDistance(newLat: number, newLong: number): number {
    console.log(this._name);
    return 1;
  }

  get name() {
    return this._name;
  }

  set name(s: string) {
    this._name = s + '_cool!';
  }
}

interface LoggerService {
  log: (s: string) => void;
}

class Logger implements LoggerService {
  public log(s: string) {
    console.log(s);
  }

  private error() {}

  private a = '';
}

const l = new Logger();
l.log('d');

class MyClass<T> {
  a: T;
}

const s = new MyClass<string>();

abstract class Base {
  print(s: string) {
    console.log(s);
  }

  abstract error(s: string): void;
}

class BaseExtended extends Base {
  error(s: string) {}
}

new BaseExtended().print('s');

class Animal {
  name: string;
}

class Dog {
  name: string;
  tail: boolean;
}

const puppy: Animal = new Dog();
