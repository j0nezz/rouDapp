export enum COLOR {
  RED = "#ff0000",
  BLACK = "#000000",
  NONE = "transparent",
}
export type RouletteNumber = {
  value: number;
  color: COLOR;
};

export const RouletteNumbers: RouletteNumber[] = [
  { value: 0, color: COLOR.NONE },
  { value: 1, color: COLOR.RED },
  { value: 2, color: COLOR.BLACK },
  { value: 3, color: COLOR.RED },
  { value: 4, color: COLOR.BLACK },
  { value: 5, color: COLOR.RED },
  { value: 6, color: COLOR.BLACK },
  { value: 7, color: COLOR.RED },
  { value: 8, color: COLOR.BLACK },
  { value: 9, color: COLOR.RED },
  { value: 10, color: COLOR.BLACK },
  { value: 11, color: COLOR.BLACK },
  { value: 12, color: COLOR.RED },
  { value: 13, color: COLOR.BLACK },
  { value: 14, color: COLOR.RED },
  { value: 15, color: COLOR.BLACK },
  { value: 16, color: COLOR.RED },
  { value: 17, color: COLOR.BLACK },
  { value: 18, color: COLOR.RED },
  { value: 19, color: COLOR.RED },
  { value: 20, color: COLOR.BLACK },
  { value: 21, color: COLOR.RED },
  { value: 22, color: COLOR.BLACK },
  { value: 23, color: COLOR.RED },
  { value: 24, color: COLOR.BLACK },
  { value: 25, color: COLOR.RED },
  { value: 26, color: COLOR.BLACK },
  { value: 27, color: COLOR.RED },
  { value: 28, color: COLOR.BLACK },
  { value: 29, color: COLOR.BLACK },
  { value: 30, color: COLOR.RED },
  { value: 31, color: COLOR.BLACK },
  { value: 32, color: COLOR.RED },
  { value: 33, color: COLOR.BLACK },
  { value: 34, color: COLOR.RED },
  { value: 35, color: COLOR.BLACK },
  { value: 36, color: COLOR.RED },
];
