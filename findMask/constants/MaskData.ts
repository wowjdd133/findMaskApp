export const LATITUDE_DELTA = 0.01501;

export interface ConstObject {
  [key: string]: string
}

export const MARKER_COLOR:ConstObject = {
  plenty: "#40E0D0",
  few: "#7CFC00",
  some: "#FFA500",
  empty: "#ff0000",
  break: "#808080",
};

export const REMAIN_STAT:ConstObject = {
  plenty: "100개 이상",
  few: "30개이상 100개 미만",
  some: "2개 이상 29개 미만",
  empty: "1개 이하",
  break: "판매 중지",
};