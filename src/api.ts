import camelcase from "camelcase-keys";
import { Data } from "./type";

const baseUrl = "https://city-mobil.ru/api/cars";

export const api = {
  getCars: async (): Promise<Data> => {
    const res = await fetch(baseUrl);

    if (res.ok) {
      const data = await res.json();

      return camelcase(data, { deep: true });
    }

    throw new Error("Something went wrong");
  },
};
