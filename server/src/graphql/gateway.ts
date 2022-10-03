import { RESTDataSource } from "apollo-datasource-rest";
import { InputArgs } from "./types";

interface Locations extends RESTDataSource {
  getLocation: ({ country, postCode }: InputArgs) => Promise<any>;
}

export class LocationsAPI extends RESTDataSource implements Locations {
  constructor() {
    super();
    this.baseURL = "http://api.zippopotam.us/";
  }

  async getLocation({ country, postCode }: InputArgs) {
    return this.get(`${country}/${postCode}`, { country, postCode });
  }
}
