import { Ienfermedades } from "../../modules/upload/interfaces/enfermedades.interfaces";

export const convertListToSelect = (list: Ienfermedades[]) => {
  let convert: any[] = [];
  if (list) {
    list.forEach((item: Ienfermedades) => {
      convert.push({
        value: item.id,
        label: item.nombre,
      });
    });
  }
  return { convert };
};

export const convertListVarToSelect = (list: any) => {
  let convert: any[] = [];
  let contador = 1;
  console.log("list: ", list);

  if (list) {
    list.forEach((item: any) => {
      convert.push({
        value: contador,
        label: item,
      });
      contador = contador + 1;
    });
  }
  return { convert };
};
