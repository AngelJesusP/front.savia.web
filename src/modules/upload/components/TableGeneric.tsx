import { Card, Popover, Tag, Skeleton } from "antd";
import axios from "axios";
import { useEffect, FC, useState } from "react";
import Table from "../../../utils/components/Table";
import { IConsulta } from "../interfaces/enfermedades.interfaces";
import { getLogErrors } from "../service/enfermedades.services";
import FormFilters from "./FormFilters";
import ProgressFile from "./ProgressFile";

const originUrl = import.meta.env.VITE_URL;
const path = "/api/v1/consulta/errores/detallado";

const TableGeneric: FC<any> = ({ idEnfermedad, claveArchivo }) => {
   const constantAlertJson = {
      message: "",
      type: "error",
      hidden: true,
   };

   const [colums, setColumns] = useState();
   const [total, setTotal] = useState<number | null>(null);
   const [loading, setLoading] = useState<boolean>(false);
   const [data, setData] = useState([]);
   const [jsonAlert, setJsonAlert] = useState(constantAlertJson);
   const [filters, setFilters] = useState<IConsulta>({
      idEnfermedad: -1,
      idIps: 0,
      tipoDocumento: "",
      documento: "",
      desde: "",
      hasta: "",
      page: 1,
      limit: 10,
   });



   useEffect(() => {
      getData({
         ...filters,
      });
   }, []);

   const generateExcelColumns = (numColumns: number): any => {
      try {
         let columns: any = [];
         for (let i = 0; i < numColumns; i++) {
            var code = 65 + i % 26;
            var column = String.fromCharCode(code);
            if (i >= 26) {
               let prefix = String.fromCharCode(65 + (i / 26) - 1);
               column = prefix + column;
            }
            columns.push(column);
         }
         return columns;
      } catch (error) {

      }
   }

   const getDescriptionError = async (dataTable: any, key: string, contadorFila: number) => {

      const json = {
         idEnfermedad,
         claveArchivo: dataTable['clave_archivo'],
         idPaciente: parseInt(dataTable['id'])
      };
      const { data } = await axios.get(`${originUrl}${path}`, {
         params: {
            ...json,
         },
      });
      const resultadoDetalle = data.data[0]
      if (resultadoDetalle.length != 0) {
         let elemento: any = document.getElementById(`${dataTable['id']}`);

         if (elemento != null) {
            const valor: string = elemento.getAttribute("data-valor");
            const lista = valor.split(";");

            let texto: string = "<b>DETALLE DE LOS ERRORES</b><br/>";
            texto += `======================</br>`;
            resultadoDetalle.forEach((dta: any, index: number) => {
               texto += `<b>ITERADOR :</b> <i>${index + 1}<i> <br/>`;
               texto += `<b>CODIGO ERROR: </b> <i>${lista[index]}<i><br/>`;
               texto += `<b>FILA ➡: </b> <i>${dta.posicionFila}<i> <br/>`;
               texto += `<b>COLUMNA ⬇:</b> <i>${dta.posicionColumna}</i> <br/>`;
               texto += `<b>VARIABLE</b>: ${dta.variable}<br/>`;
               texto += `<b>======================</b> <br/><br/>`;
            });

            if (elemento != null) {
               elemento.innerHTML = texto;
            }

         } else console.log("Valor null : " + elemento);
      }
   };


   useEffect(() => {
      if (data.length > 0) {

         delete data[0]['campo_leido']
         const nuevoJsonHeader = Object.assign({ "FILA": 1 }, data[0])
         const columnasLetrasExcel: any = ['X'].concat(generateExcelColumns(500))
         let contadorFila = 0;
         let contadorColumnas  = 0;

         const columsForJson: any = Object.keys(nuevoJsonHeader).map((key, i: any) => {
            if (key != "id" && key != "campo_leido" && key != "clave_archivo") {
               return {
                  title: (key !== 'error_validacion' && key !== 'clave_archivo' && key !== 'FILA') ? `${columnasLetrasExcel[i]}` : '',
                  align: "center",
                  rowScope: 'row',
                  dataIndex: `${key}`,
                  key: `${key}`,
                  fixed: key === "error_validacion" ? "right" : (key === 'FILA') ? "left" : null,
                  children: [{
                     title: (key !== 'error_validacion' && key !== 'clave_archivo' && key !== 'FILA') ? `V${contadorColumnas += 1}.${key.toUpperCase().charAt(0).toUpperCase() + key.slice(1)}`.replace(/_/g, ' ') : '',
                     fixed: key === "error_validacion" ? "right" : (key === 'FILA') ? "left" : null,

                     render: (data: any, index: number, i: number) => {
                        if (key === 'FILA') {
                           contadorFila = (i - i + i) + ((filters.page - 1) * filters.limit)
                        }

                        if (key === 'error_validacion') {
                           return (
                              <>
                                 <Popover
                                    overlayStyle={{ width: "20vw" }}
                                    content={
                                       <>
                                          <p
                                             data-valor={data[key]}
                                             id={`${data['id']}`}
                                             style={{
                                                borderRadius: 10,
                                                width: "100%",
                                                height: "25vh",
                                                color: "black",
                                                cursor: "pointer",
                                                overflowX: "scroll",
                                                fontFamily: "monospace",
                                             }}>Espere miestras se consulta la informacion...</p>
                                       </>
                                    }
                                    trigger="click">
                                    <Tag key={i}
                                       onClick={() => getDescriptionError(index, key, contadorFila)}
                                       color="red"
                                       style={{
                                          width: "100%",
                                          cursor: "pointer",
                                          textAlign: "center",
                                       }}>
                                       Ver errores
                                    </Tag>
                                 </Popover>
                              </>
                           );
                        } else {
                           return (key !== 'FILA')
                              ? <span>{data[key]}</span>
                              : <div style={{ backgroundColor: '#e4e4e4', border: 'none' }}
                                 className="w-100 p-0 m-0 text-center">{contadorFila += 1}</div>
                        }
                     }
                  }]

               };
            } else return {};
         });
         if (columsForJson.length - 1) setColumns(columsForJson);
      } else {
         setColumns(undefined);
      }
   }, [data]);

   const change_page = async (page: number, pageSize?: number) => {
      await getData({
         ...filters,
         page,
         limit: pageSize,
      });
   };

   const getData = async (values: any) => {
      setJsonAlert(constantAlertJson);
      setLoading(true);
      const dataFinal: IConsulta = {
         claveArchivo: claveArchivo,
         idEnfermedad: idEnfermedad || -1,
         idIps: values?.idIps || 0,
         tipoDocumento: values?.document?.type || "",
         documento: values?.document?.number || "",
         desde: values?.desde || "",
         hasta: values?.hasta || "",
         page: values.page || 1,
         limit: values.limit || 10,
      };
      let valuesResponse;

      const { data } = await getLogErrors(dataFinal);
      valuesResponse = data;
      setData(valuesResponse?.data || []);
      setFilters(dataFinal);
      setJsonAlert({ ...jsonAlert, message: valuesResponse?.message || "" });
      setTotal(Number(valuesResponse?.items?.replace(/[\[\]]/g, "")) || null);
      setLoading(false);
   };

   const onClear = () => {
      setLoading(true);
      setFilters({
         idEnfermedad: -1,
         idIps: 0,
         tipoDocumento: "",
         documento: "",
         desde: "",
         hasta: "",
         page: 1,
         limit: 10,
      });
      setTotal(null);
      setTimeout(() => {
         setLoading(false);
      }, 1000);
      setData([]);
   };

   return (
      <div className="container-fluid">
         <FormFilters
            onClear={onClear}
            jsonAlert={jsonAlert}
            loading={loading}
            onSubmit={getData}
            type="error"
         />
         <Card className="mt-3">
            <Table
               items={data}
               columns={colums}
               with_pagination
               paginationTop
               count={total ? total : 0}
               loading={loading}
               change_page={change_page}
            />
            <div className="d-flex justify-content-end ">
               <ProgressFile filters={{ ...filters, bandera: false }} />
            </div>
         </Card>
      </div>
   );
};

export default TableGeneric;
