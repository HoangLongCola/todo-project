import router from "@/router";
import { push } from "notivue";

const BASE_URL = "http://localhost:3000/api";

const getToken = () => localStorage.getItem("access_token");

const request = async (url, options = {}) => {
  const token = getToken();

  const response = await fetch(`${BASE_URL}${url}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json();
    if (response.status === 401 && token) {
      localStorage.removeItem("access_token");
      router.push({ name: "login" });
      push.warning("Phiên đăng nhập đã hết hạn");
      return false;
    }
    if (Array.isArray(error.message)) {
      push.error(error.message[0]);
    } else {
      push.error(error.message);
    }
    console.log(error);

    return false;
    // throw new Error(error || "Đã xảy ra lỗi");
  }

  return response.json();
};

export const get = async (url) => {
  return request(url, { method: "GET" });
};

export const post = async (url, data) => {
  return request(url, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const put = async (url, data) => {
  return request(url, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const del = async (url) => {
  return request(url, { method: "DELETE" });
};
