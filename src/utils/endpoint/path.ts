export class pathApi {
    public PATH_UPLOAD_DIRECT: string;
    public PATH_UPLOAD_URL: string;
    public PATH_LOAD_ENFERMEDADES: string;
    public PATH_LOAD_IPS: string;
    public PATH_PACIENTE: string;
    public PATH_DETALLE: string;
    
    constructor() {
        this.PATH_UPLOAD_DIRECT = "/api/v1/documento/carga"
        this.PATH_UPLOAD_URL = "/api/v1/documento/carga/bd"
        this.PATH_LOAD_ENFERMEDADES = "/api/v1/enfermedades"
        this.PATH_LOAD_IPS = ""
        this.PATH_PACIENTE = "/api/v1/paciente"
        this.PATH_DETALLE = "/api/v1/detalles"
    }
}