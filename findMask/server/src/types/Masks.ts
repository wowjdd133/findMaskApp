export interface Mask {
  count: number,
  stores: Store[]
}

export interface MaskData {
  data:Mask
}

export interface Store {
  addr: string,
  code: string,
  created_at: string,
  lat: number,
  lng: number,
  name: string,
  remain_stat: string,
  stock_at: string,
  type: string,
}
