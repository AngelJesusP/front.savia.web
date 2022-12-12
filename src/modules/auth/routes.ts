import { IRoute } from '../../utils/router/customTypes';
import { Login } from './views/login';

const getRoutersAuth = (): IRoute[] => {
    return [
        {
            exact: true,
            isPrivate: false,
            format: true,
            canAccess: true,
            path: '/savia/login/',
            template_props: {
                breadcrumbs: [{ name: 'Formulario de registro' }
                ]
            },
            component: Login,
        }
    ];
};

export default getRoutersAuth;
