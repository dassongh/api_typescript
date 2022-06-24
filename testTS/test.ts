let a: number = 5;
let b: string = '4';

let c: number = a + Number(b);

let d = true;

let names: string[] = ['af', 'agsg'];
let ages: number[] = [2, 1];

let tup: [number, string] = [2, 'sgagsg'];

let e: any = 3;
e = 'fasf';
e = true;

let anyArr: any[] = ['wagfw', 2, false];

function greet(name: string): string {
  return name + 'Hi';
}

names.map((x: string) => x);

function coord(coord: { latitude: number; longtitude: number }) {}
