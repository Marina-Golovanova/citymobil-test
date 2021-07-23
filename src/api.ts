import camelcase from "camelcase-keys";
import { Data } from "./type";
import { SERVER_URL } from "./constants";

export const api = {
  getCars: async (): Promise<Data> => {
    const res = await fetch(`${SERVER_URL}/api/cars`);

    if (res.ok) {
      const data = await res.json();

      return camelcase(data, { deep: true });
    }

    throw new Error("Something went wrong");
  },
};
