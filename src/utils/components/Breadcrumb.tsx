import home from '../../utils/assets/icon/inicio.svg'

const styleMiga = {
    font: 'normal normal 300 11px/16px Montserrat',
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 10
}

const BreadcrumbComponent: React.FC = () => (
        <ol className="breadcrumb m-0" style={{ background: '#94beb4' }}>
        <li className="breadcrumb-item" >
            <div style={{ marginLeft: 20 }}>
                <img src={home} style={{position: 'relative', bottom: 1}} alt="icon home bread" />
                <span style={styleMiga}>Inicio</span>
            </div>
        </li>
    </ol>
);

export default BreadcrumbComponent;