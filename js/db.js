class Service {
  async getProducts(cb) {
    const response = await fetch("http://localhost:3000");
    const data = await response.json();

    cb(data);
  }
}

const service = new Service();

export default service;
