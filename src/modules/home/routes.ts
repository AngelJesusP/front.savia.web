import { IRoute } from '../../utils/router/customTypes';
import { HomeMain } from './views/home';

const getRoutersHomeMain= (): IRoute[] => {
    return [
        {
            exact: true,
            isPrivate: false,
            format: true,
            canAccess: true,
            path: '/savia/home/',
            template_props: {
                breadcrumbs: [{ name: 'Menu principal' }
                ]
            },
            component: HomeMain,
        }
    ];
};

export default getRoutersHomeMain;
