export class People {
  id: number;
  name: string;
  gender: string;

    constructor(values: Object = {}) {
      Object.assign(this, values);
  }
}
