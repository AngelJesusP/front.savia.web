export interface Ienfermedades {
  id: number;
  tabla: string;
  nombre: string;
  creacion: Date;
  estado: boolean;
}

export interface IConsulta {
  documento?: string;
  idEnfermedad?: number;
  idIps: number | string;
  limit: number;
  page: number;
  tipoDocumento?: string;
  bandera?: boolean;
  claveArchivo?: string,
  novedades?: any;
  encabezado?: boolean;
}

export interface IResponseConsulta {
  message: string;
  type: string | any;
  hidden: boolean;
  status: number
}
