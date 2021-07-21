export type Tariff = Record<string, { year: number }>;

export type Car = { mark: string; model: string; tariffs: Tariff };

export type Data = { cars: Car[]; tariffsList: string[] };
