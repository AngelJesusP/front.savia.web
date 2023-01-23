export  const fontLabel = { font: 'normal normal normal 14px/13px Montserrat' }
export const fontLabelComponent  = (bandera:boolean) => { 
    return { 
        font: `normal normal ${bandera ? 'normal' : 'bold'} 14px/13px Montserrat`,
        outline: 'none'
    };
}