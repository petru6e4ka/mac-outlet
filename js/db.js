class Service {
  async getProducts(cb) {
    try {
      const response = await fetch("http://localhost:3000");
      const data = await response.json();

      if (response.ok) {
        cb(data);
        return;
      }
      console.warn(response.status);
    } catch (err) {
      console.warn(err);
    }
  }
}

const service = new Service();

export default service;
