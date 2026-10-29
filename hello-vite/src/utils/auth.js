export const authorize = (email, password) => {
  return new Promise((resolve) => {
    resolve({ token: "fake-jwt-token" });
  });
};

export const register = (email, password, username) => {
  return new Promise((resolve) => {
    resolve({ message: "User registered successfully!" });
  });
};

export const checkToken = (token) => {
  return new Promise((resolve) => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      resolve({ data: JSON.parse(userData) });
    } else {
      resolve({ data: { name: "Fake User", email: "fake@example.com" } });
    }
  });
};
