export type MyProps = {
    openModal: boolean,
    closeModal: (bandera:boolean) => {}
};
export type MyState = {
    listEnfermedades: any[],
    message: string,
    typeres: any,
    openResponse: boolean,
    idEnfermedad: number,
    fileEnviar: any,
    nameFile: string,
    openTag: boolean
};
