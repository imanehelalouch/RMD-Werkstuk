export class Pilot {
  id: number;
  name: string;
  gender: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
