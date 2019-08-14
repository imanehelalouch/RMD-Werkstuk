import { Pilot } from './pilot';

export class Starship {
  name: String;
  model: string;
  manufacturer: string;
  consumables: string;
  passengers: string;
  pilots?: Pilot[] = [];

  constructor(values: Object = {}) {
    this.pilots = [];
    Object.assign(this, values);
  }
}
