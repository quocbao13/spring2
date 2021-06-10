import { Province } from "./Province";

export class District{
    id: number;
    name: string;
    prefix: string;
    province: Province;

  constructor(id: number, name: string, prefix: string, province: Province) {
    this.id = id;
    this.name = name;
    this.prefix = prefix;
    this.province = province;
  }
}
