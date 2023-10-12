import { env } from "~/env.mjs";

export const fetchAPI = async (url: string, options?: RequestInit) => {
  console.log(env.NEXT_PUBLIC_API_URL + url);
  return fetch(env.NEXT_PUBLIC_API_URL + url, options);
};
