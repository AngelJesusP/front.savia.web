
import { ReactNode } from 'react';
import { PathRouteProps } from 'react-router-dom';

export type CanAccess = ((props: any) => boolean) | boolean;
export type Breadcrumb = { to?: any; name: string; icon?: any };
export interface IRoute extends PathRouteProps {

    exact: boolean | undefined;
    component: React.ComponentType<any> | undefined;

    isPrivate: boolean;
    canAccess?: CanAccess;
    defaultRedirect?: string;
    privateRedirect?: string;
    format?: boolean;

    // Preloader for lazy loading
    fallback?: NonNullable<ReactNode> | null;
    // Sub routes
    routes?: IRoute[];
    // Redirect path
    redirect?: any;
    // If router is private, this is going to be true
    lazy?: boolean;
    location?: any;
    template_props?: {
        breadcrumbs?: Breadcrumb[];
        show_breadcrumbs?: boolean;
    };
}

export interface IAppRouter {
    routes: IRoute[];
    defaultRedirect?: string;
    privateRedirect?: string;
    lazy?: boolean;
    template?: any;
    user: any; //TODO: agregar cuando este login
    test?: boolean;
    show?: boolean;
}
