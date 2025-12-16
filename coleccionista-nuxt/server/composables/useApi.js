import axios from "axios";

export const useApi = () => {
  const config = useRuntimeConfig();
  const baseURL = config.public?.apiBase || "https://api.jikan.moe/v4";

  const apiClient = axios.create({
    baseURL,
    headers: { "Content-Type": "application/json" },
  });

  const get = (url, config = {}) => apiClient.get(url, config);
  const post = (url, body) => apiClient.post(url, body);
  return { get, post };
};
