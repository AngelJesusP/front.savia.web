import { useState } from "react";
import { convertListVarToSelect } from "../../../utils/constants/convertToList";
import { getListVariables } from "../services/Validations.service";

const useFormValidations = () => {
  const [listVariables, setListVariables] = useState<any[]>([]);

  const getListValidacionesConsulta = async (id: number) => {
    await getListVariables(id).then(({ data }) => {
      const { status } = data;
      if (status && status == 200) {
        let { convert } = convertListVarToSelect(data.data);
        setListVariables(convert);
      }
    });    
  };
  return { getListValidacionesConsulta, listVariables };
};
export default useFormValidations;
