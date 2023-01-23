import FormLogin from '../components/FormLogin'
import logoHeaderLogin from '../../../utils/assets/img/logoHomeSavia.jpg'
import { fontLabel } from '../styles/stylesAuth'

export const Login = () => {

    return (
        <div className='container w-100'>
            <div className="row justify-content-center align-items-center">
                <div className="card p-4" style={{width: 400, marginTop: 50, boxShadow: '0px 3px 10px #00000029', border: 'none'}}>
                    <div className="container-center">
                        <img src={logoHeaderLogin} className='img-fluid w-100' style={{height: 200}} alt="" />
                    </div>
                    <div className="form-login">
                        <FormLogin />
                        <div className="row" style={{ paddingTop: '15px', borderTop: '0.5px solid #D1D0D0', }}>
                            <div className="col text-center">
                                <span style={fontLabel}>¿Olvidó su contraseña? </span>
                                <span style={{ color: '#04a48c', fontWeight: 'bold', cursor: 'pointer', ...fontLabel }}> Recupérala AQUÍ</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}