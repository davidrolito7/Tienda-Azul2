import Home from '../views/HomeView.vue'
import Login from '../views/LoginView.vue'
import EmpleadosView from '../views/modulos/Empleados.vue'
import ProductosView from '../views/modulos/Productos.vue'
import { useUserStore } from '../stores/userStore'

import { createWebHistory, createRouter } from "vue-router";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            requireAuth: true
        },
        children: [
            {
                path: 'empleados',
                name: "Empleados",
                component: EmpleadosView,
                meta: {
                    roles: ['admin']
                }
            }, {
                path: 'productos',
                name: "Productos",
                component: ProductosView,
                meta: {
                    roles: ['admin']
                }
            }, {
                path: 'punto-venta',
                name: "PuntoDeVenta",
                component: () => import('../views/modulos/PuntoVenta.vue'),
                meta: {
                    roles: ['admin', 'employee']
                }
            }, {
                path: 'perfil',
                name: "PerfilUsuario",
                component: () => import('../views/modulos/Profile.vue'),
                meta: {
                    roles: ['admin', 'employee']
                }
            },
            {
                path: 'categorias',
                name: "Categorias",
                component: () => import('../views/modulos/Categorias.vue'),
                meta: {
                    roles: ['admin']
                }
            },
            {
                path: 'proveedores',
                name: "Proveedores",
                component: () => import('../views/modulos/Proveedores.vue'),
                meta: {
                    roles: ['admin']
                }
            },
            {
                path: 'unauthorized',
                name: "Unauthorized",
                component: () => import('../views/Unauthorized.vue'),
            }
        ]
    }, {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            requireAuth: false
        }
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const store = useUserStore()
    const auth = store.state.token !== null
    const needAuth = to.meta.requireAuth
    if (needAuth && !auth) {
        next('login')
    } else {
        if (to.meta.roles) {
            if (!to.meta.roles.includes(store.state.role)) {
                next('Unauthorized')
            } else next()
        }
        else next()
    }
})
export { router };
