import logoHeader from '../../../utils/assets/img/conexionSavia.png'
import camanaNotificaciones from '../../../utils/assets/icon/campanaNotificaciones.svg'
import { Button, Popover,Avatar, Badge, Space  } from 'antd';
import { styleMenuHamburguesa, styleNotificacion, styleUserName, styleimgHeader } from '../styles/styleHeader'
import { nametoken } from '../../../utils/constants/token/nameToken';
import { BellTwoTone } from '@ant-design/icons';


const cerrarSesion = () => {
    let { localStorage } = window
    if (localStorage.getItem(nametoken)) {
        localStorage.removeItem(nametoken)
    }
    window.location.href = "/savia/login"
}

const content = (
    <div className='w-100 p-0'>
        <hr />
        <span className='text-primary'
            onClick={() => cerrarSesion()}
            style={{ cursor: 'pointer' }}>Cerrar sesión</span>
    </div>
);

export const HeaderComponent = () => {

    return (
        <nav className="bg-white w-100" style={{ padding: 6, height: 45 }}>
            <img src={logoHeader} className="img-fluid" style={styleimgHeader} alt="" />

            <Popover placement="bottomRight" title="Mary luz jane suarez" content={content} trigger="click">
                <Button className='p-0' type="primary" style={styleMenuHamburguesa} shape="circle">M</Button>
            </Popover>

            {/* <img src={camanaNotificaciones} className="img-fluid" style={styleNotificacion} alt="" /> */}
            <Space style={styleNotificacion}>
                <Badge status='success' dot color='#87d068' count>
                    {/* <Avatar shape="square" size="small" /> */}
                    <BellTwoTone  style={{ fontSize: 20 }} />
                </Badge>
            </Space>
            <span style={styleUserName}>Bienvenido/a, <span style={{ fontWeight: 'bold' }}>Mary luz jane suarez</span>  </span>
        </nav>
    );
}