export const CONTAINER_HEIGHT_BACKGROUND = { height: '100vh', background: '#F5F9FD' }
export const CONTAINER_BOXSHADOW = { boxShadow: '0px 3px 10px #00000029' }
export const Font_Montserrat  = (bandera: boolean, px1:number, px2:number) => { 
    return {font: `normal normal ${bandera ? '600' : 'normal'} ${px1}px/${px2}px Montserrat`} 
}