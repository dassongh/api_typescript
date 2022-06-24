function log<T>(obj: T): T {
  console.log(obj);
  return obj;
}

log<string>('asd');
log<number>(3);

interface HasLength {
  length: number;
}

function log2<T extends HasLength, K>(obj: T, arr: K[]): K[] {
  obj.length;
  return arr;
}

interface IUser {
  name: string;
  age?: number;
  bid: <T>(sum: T) => boolean;
}

function bid<T>(sum: T): boolean {
  return true;
}
