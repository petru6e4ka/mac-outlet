import { token } from "../repository/storage.js";

class AuthService {
  async signin(onSuccess, onError, data) {
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
      onSuccess(auth.token);
      return;
    }

    const error = await response.json();

    onError(error);
  }

  async signup(onSuccess, onError, data) {
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
      onSuccess(auth.token);
      return;
    }

    const error = await response.json();

    onError(error);
  }
}

export default new AuthService();
