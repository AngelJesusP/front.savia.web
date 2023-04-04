export interface Ienfermedades {
  id: number;
  tabla: string;
  nombre: string;
  creacion: Date;
  estado: boolean;
}

export interface IConsulta {
  desde?: string;
  documento?: string;
  hasta?: string;
  idEnfermedad?: number;
  idIps: number | number;
  limit: number;
  page: number;
  tipoDocumento?: string;
  bandera?: boolean;
  claveArchivo?: string,
  novedades?: any;
}

export interface IResponseConsulta {
  message: string;
  type: string | any;
  hidden: boolean;
  status: number
}
