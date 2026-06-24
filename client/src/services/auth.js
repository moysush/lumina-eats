import api from "./api";

export const login = async (credentials) => {
  const res = await api.post("/auth/login", credentials);
  if (res.data.token) {
    localStorage.setItem("token", res.data.token);
    console.log(res.data);
  }

  return res.data;
};

export const register = async (userData) => {
  const res = await api.post("/auth/register", userData);
  if (res.data.token) {
    localStorage.setItem("token", res.data.token);
  }
  return res.data;
};

export const logout = async () => {
  await localStorage.removeItem("token");
};
