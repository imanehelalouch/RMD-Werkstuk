import {Starship} from './starship';
import {Planet} from './planet';

export class Fleet {
  id: number;
  starships: Starship[];
  name: string;
  planets: Planet[];

  constructor(values: Object = {}) {
    Object.assign(this, values);
    this.starships = [];
    this.planets = [];
  }

}
