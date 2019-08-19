import {People} from './people';


export class Planet {
  name: String;
  climate: String;
  terrain: String;
  population: String;
  residents: People[] = [];

  constructor(values: Object = {}) {
    this.residents = [];
    Object.assign(this, values);
  }
}
