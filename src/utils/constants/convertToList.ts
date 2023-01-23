import { Ienfermedades } from "../../modules/upload/interfaces/enfermedades.interfaces"

export const convertListToSelect = (list: Ienfermedades[]) => {
    let convert: any[] = []
    if (list) {
        list.map((item: Ienfermedades) => {
            convert.push({
                value: item.id,
                label: item.nombre
            })
        })
    }
    return { convert }
}