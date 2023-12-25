export type OrderType = {
  id: number;
  name: string;
  chickens: number;
  potatoBuckets: number;
  delivered: boolean;
};

export type ConfigType = {
  chickenQuantity: number;
  chickenPrice: number;
  halfChickenPrice: number;
  potatoBucketPrice: number;
};
