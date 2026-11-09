export const authorize = () => {
  return new Promise((resolve) => {
    resolve({ token: "fake-jwt-token" });
  });
};

export const checkToken = () => {
  // Pretend we did a fetch request that gave us back a user
  return new Promise((resolve) => {
    resolve({
      data: { name: "fake user", email: "fake@example,com", _id: "fake-id" },
    });
  });
};
