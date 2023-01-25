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

export interface IDetailPatient {
    id: number;
    regimen_afiliacion: string;
    municipio_residencia: string;
    telefono: number;
    codigo_eapb: number;
    fecha_afilicion_eapb: string;
    fecha_muerte: string;
    causa_muerte: string;
    fecha_corte: string;
    codigo_serial: number;
}
