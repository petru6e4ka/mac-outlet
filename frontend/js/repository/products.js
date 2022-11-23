import { token } from "../repository/storage.js";

class ProductsRepository {
  async getProducts(cb) {
    try {
      const response = await fetch("http://localhost:3000/api/devices", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.get()}`,
        },
      });

      if (response.ok) {
        const data = await response.json();

        cb(data);
      }

      if (response.status === 403) {
        token.remove();
        window.location.reload();
      }
    } catch (err) {
      console.warn(err);
    }
  }
}

const repository = {
  products: new ProductsRepository(),
};

export default repository;
