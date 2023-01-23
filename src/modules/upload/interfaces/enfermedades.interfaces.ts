export interface Ienfermedades {
    id: number;
    tabla: string;
    nombre: string
    creacion: Date;
    estado: boolean;
}

export interface IConsulta {
    idEnfermedad : number;
    idIps: number;
    tipoDocumento: string | any;
    numeroDocumento: string | any;
    desde: string | any;
    hasta: string | any;
    page: number;
    limit: number;
}

export interface IResponseConsulta {
    message : string;
    type: string | any;
    hidden: boolean
}