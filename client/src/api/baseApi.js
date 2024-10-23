import router from "@/router";
import { useAuthStore } from "@/stores/authStore";
import { push } from "notivue";

const BASE_URL = "http://localhost:3000/api";

const buildQueryString = (params) => {
  return new URLSearchParams(params).toString();
};

const request = async (url, options = {}, params = {}) => {
  const authStore = useAuthStore();
  const token =  localStorage.getItem('access_token');

  if (Object.keys(params).length) {
    url += `?${buildQueryString(params)}`;
  }

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
      authStore.logout();
      router.push({ name: "login" });
      push.warning("Phiên đăng nhập đã hết hạn");
      return false;
    }
    if (Array.isArray(error.message)) {
      push.error(error.message[0]);
    } else {
      push.error(error.message);
    }
    return false;
    // throw new Error(error || "Đã xảy ra lỗi");
  }

  return response.json();
};

export const get = async (url, params = {}) => {
  return request(url, { method: "GET" }, params);
};

export const post = async (url, data, params = {}) => {
  return request(
    url,
    {
      method: "POST",
      body: JSON.stringify(data),
    },
    params
  );
};

export const put = async (url, data, params = {}) => {
  return request(
    url,
    {
      method: "PUT",
      body: JSON.stringify(data),
    },
    params
  );
};

export const del = async (url, params = {}) => {
  return request(url, { method: "DELETE" }, params);
};
