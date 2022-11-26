import httpService from "./http.service";

export const getUsers = () => {
  return httpService.get("/users");
};

export const getUser = (id: any) => {
  return httpService.get(`/users/${id}`);
};
