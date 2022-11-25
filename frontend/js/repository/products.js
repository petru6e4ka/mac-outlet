import EventEmitter from "../modules/events/EventEmitter.js";
import { AUTH } from "../modules/events/eventNames.js";
import { token } from "../repository/storage.js";

class ProductsRepository {
  constructor() {
    this.events = new EventEmitter();
  }

  async getProducts(cb) {
    try {
      const response = await fetch(
        "https://mac-outlet-shop-app.herokuapp.com/api/devices",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.get()}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();

        cb(data);
        return;
      }

      this.events.emit(AUTH.LOGOUT);
    } catch (err) {
      console.warn(err);
    }
  }
}

const repository = {
  products: new ProductsRepository(),
};

export default repository;
