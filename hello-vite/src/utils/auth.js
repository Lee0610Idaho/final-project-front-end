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

// export const checkToken = (token) => {
//   return new Promise((resolve) => {
//     const userData = localStorage.getItem("userData");
//     if (userData) {
//       resolve({ data: JSON.parse(userData) });
//     } else {
//       resolve({ data: { name: "Fake User", email: "fake@example.com" } });
//     }
//   });
// };

export const checkToken = (token) => {
  // Pretend we did a fetch request that gave us back a user
  return new Promise((resolve) => {
    resolve({
      data: { name: "fake user", email: "fake@example,com", _id: "fake-id" },
    });
  });
};
