import { token } from "../repository/storage.js";

class AuthService {
  async signin(cb, data) {
    const response = await fetch("http://localhost:3000/api/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const auth = await response.json();

      token.set(auth.token);
      window.location.reload();
    }
  }

  async signup(cb, data) {
    const response = await fetch("http://localhost:3000/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const auth = await response.json();

      token.set(auth.token);
      window.location.reload();
    }
  }
}

export default new AuthService();
