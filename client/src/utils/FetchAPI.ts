import { env } from "~/env.mjs";

export const fetchAPI = async (url: string, options?: RequestInit) => {
  return fetch(env.NEXT_PUBLIC_API_URL + url, options);
};
