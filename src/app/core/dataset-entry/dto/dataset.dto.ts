export interface Area {
  id: number;
  code: number;
  name: string;
  code_name: string;
}

export interface Flag {
  id: number;
  name: string;
  code_name: string;
}

export interface Unit {
  id: number;
  name: string;
  code_name: string;
}

export interface Year {
  id: number;
  name: string;
}

export interface Dataset {
  time: Date;
  value: number;
  area: Area;
  unit: Unit;
  flag: Flag;
  year: Year;
}
