import { RESTDataSource } from "apollo-datasource-rest";

export class LocationsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://api.zippopotam.us/";
  }

  async getLocation({ country, postCode }) {
    return this.get(`${country}/${postCode}`, { country, postCode });
  }
}
