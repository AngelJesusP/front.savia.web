import React from 'react'
import '../../../utils/Css/index.css'
import iconExcel from '../../../utils/assets/icon/cargaarchivos.svg'
import history from '../../../utils/assets/icon/consultaCard.svg'
import fecha from '../../../utils/assets/icon/flecha-hacia-abajo.svg'
import ModalUploadComponent from '../../upload/components/ModalUpload'
import { styleCard, styleCardHeader, styleLink, styleSubTitle, styleTitle, styleLabelCardAction, styleLabelCardText } from '../styles/stylesDashboard'
import { MyProps, MyState } from '../types/Dashboard.type'

export class DashboardComponent extends React.Component<MyProps, MyState> {

   state: MyState = {
      modalUpload: false
   };

   onClickModalUpload = (bandera: boolean): any => this.setState({ modalUpload: bandera });

   render() {
      const { modalUpload } = this.state
      return (
         <div style={{ height: 190 }} className="bg-white">

            {modalUpload ? <ModalUploadComponent
               openModal={modalUpload}
               closeModal={this.onClickModalUpload} /> : null}

            <h5 style={styleTitle}>Bienvenido(a) al sistema de carga de savia Salud EPS</h5>
            <p style={styleSubTitle}>Desde aqui podra elegir los módulos para gestionar el contenido 
            del portal de savia salud EPS</p>

            <div style={{ position: 'relative', top: 68 }}>
               <div className="row justify-content-center">
                  <div className="col-sm-3 m-2">
                     <div className="card card-menu-home border-0" style={styleCard}>
                        <div className="card-header bg-white" style={styleCardHeader}>
                           <img src={iconExcel} style={{ height: 30 }} alt="" />
                           <span className="card-text" style={styleLink}>
                              Carga de .Cvs</span>
                        </div>
                        <div className="card-body">
                           <p className="card-text" style={styleLabelCardText}>
                              Permite cargar grandes cantidades de información de la aplicación y datos en
                              tablas sin acceso SQL.</p>
                           <img src={fecha} style={{ height: 7 }} alt="" />
                           <span className='text-card-home'
                              onClick={() => this.onClickModalUpload(true)}
                              style={styleLabelCardAction}>Realizar carga</span>
                        </div>
                     </div>
                  </div>

                  <div className="col-sm-3 m-2">
                     <div className="card card-menu-home border-0" style={styleCard}>
                        <div className="card-header bg-white" style={styleCardHeader}>
                           <img src={history} style={{ height: 30 }} alt="" />
                           <span className="card-text" style={styleLink}>
                              Consultar datos cargados</span>
                        </div>
                        <div className="card-body">
                           <p className="card-text" style={styleLabelCardText}>
                              Esta función permite consultar y ver el número de registros procesados por
                              evisnfermedad, Ips y fecha de carga.</p>
                           <img src={fecha} style={{ height: 7 }} alt="" />
                           <span
                              onClick={() => {}}
                              className='text-card-home'
                              style={styleLabelCardAction}>Realizar consulta</span>
                        </div>
                     </div>
                  </div>

                  <div className="col-sm-3 m-2">
                     <div className="card card-menu-home border-0" style={styleCard}>
                        <div className="card-header bg-white" style={styleCardHeader}>
                           <img src={iconExcel} style={{ height: 30 }} alt="" />
                           <span className="card-text" style={styleLink}>
                              Ver log de cargas</span>
                        </div>
                        <div className="card-body">
                           <p className="card-text" style={styleLabelCardText}>
                              Permite cargar grandes cantidades de información de la aplicación y datos
                              en tablas sin acceso SQL.</p>
                           <img src={fecha} style={{ height: 7 }} alt="" />
                           <span className='text-card-home' style={styleLabelCardAction}>Realizar consulta</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div >
      )
   }
}