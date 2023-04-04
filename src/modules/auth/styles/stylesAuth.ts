/* Exportación de una constante denominada fontLabel que es un objeto con una propiedad denominada font
que es una cadena. */
export const fontLabel = { font: "normal normal normal 14px/13px Montserrat" };
/**
 * Devuelve un objeto con dos propiedades, fuente y contorno, donde la propiedad de fuente es una
 * cadena que es un literal de plantilla que es una concatenación de tres cadenas y un número, y la
 * propiedad de contorno es una cadena
 * @param {boolean} bandera - booleano
 * @returns Un objeto con dos propiedades.
 */
export const fontLabelComponent = (bandera: boolean) => {
  return {
    font: `normal normal ${bandera ? "normal" : "bold"} 14px/13px Montserrat`,
    outline: "none",
  };
};
