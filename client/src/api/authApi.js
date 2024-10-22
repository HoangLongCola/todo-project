import { post } from "./baseApi";

const authApi = {
  register: async (data) => {
    return await post("/auth/register", data);
  },
  login: async (data) => {
    return await post("/auth/login", data);
  },
};
export default authApi;
