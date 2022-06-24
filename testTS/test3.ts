type coord = { latitude: number; longtitude: number };

interface ICoord {
  latitude: number;
  longtitude: number;
}

type ID = number | string;

function compute(coord: coord) {}

interface Animal {
  name: string;
}

interface Dog extends Animal {
  tail: boolean;
}

const dog: Dog = {
  name: 'Jo',
  tail: true,
};
