import { People } from './people';

export class Starship {
  name: String;
  model: string;
  manufacturer: string;
  consumables: string;
  passengers: string;
  pilots?: People[] = [];

  constructor(values: Object = {}) {
    this.pilots = [];
    Object.assign(this, values);
  }
}
