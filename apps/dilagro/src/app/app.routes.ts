import { Route } from '@angular/router';
import { Login } from './pages/login/login';
import { Admin } from './pages/admin/admin';




export const appRoutes: Route[] = [
    {
        path: '',
        component: Login,
    }, {
        path: 'admin',
        loadComponent: () =>
            import('./pages/admin/admin').then((c) => c.Admin),
    },
];
