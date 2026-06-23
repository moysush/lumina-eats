import api from "./api";

export const getFood = async () => {
  const res = await api.get("/food");
  return res.data;
};

export const createFood = async (foodData) => {
  const res = await api.post("/food", foodData);
  return res.data;
};

export const deleteFood = async (id) => {
  const res = await api.delete(`/food/${id}`);
  return res.data;
};
