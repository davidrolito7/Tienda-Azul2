<template>
    <!-- component -->
    <aside class="fixed top-0 left-0 z-40 w-1/6 h-screen -translate-x-full sm:translate-x-0 ">

        <div class="min-h-screen flex flex-row ">
            <div class="flex flex-col w-full bg-base-100 rounded-r-3xl overflow-hidden">
                <div class="flex items-center justify-center shadow-md py-4">
                    <!-- <h1 class="text-3xl uppercase text-primary">Logo</h1> -->
                    <img class="h-36" src="../../public/logo2.png" alt="Logo.png">
                </div>
                <ul class="flex flex-col py-4 text-xl ">
                    <li>
                        <RouterLink to="/punto-venta"
                            class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                            <span class="inline-flex items-center justify-center w-12 ">
                                <font-awesome-icon icon="fa-solid fa-egg" />
                            </span>
                            <span class="font-medium">Punto de venta</span>
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/empleados"
                            class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                            <span class="inline-flex items-center justify-center h-12 w-12 ">
                                <font-awesome-icon :icon="['fas', 'people-group']" />
                            </span>
                            <span class=" font-medium">Empleados</span>
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/productos"
                            class="flex flex-row items-center transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                            <span class="inline-flex items-center justify-center h-12 w-12">
                                <font-awesome-icon :icon="['fas', 'bag-shopping']" />
                            </span>
                            <span class=" font-medium">Productos</span>
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/proveedores"
                            class="flex flex-row items-center transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                            <span class="inline-flex items-center justify-center h-12 w-12">
                                <font-awesome-icon icon="fa-solid fa-truck-ramp-box" />
                            </span>
                            <span class=" font-medium">Proveedores</span>
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/categorias"
                            class="flex flex-row items-center transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                            <span class="inline-flex items-center justify-center h-12 w-12">
                                <font-awesome-icon icon="fa-solid fa-box-archive" />
                            </span>
                            <span class=" font-medium">Categorias</span>
                        </RouterLink>
                    </li>
                    <!-- <li>
                        <div class="collapse">
                            <input type="checkbox">
                            <div class="collapse-title text-xl font-medium">
                                Productos
                            </div>
                            <div class="collapse-content">



                            </div>
                        </div>

                    </li> -->

                    <li>
                        <RouterLink to="/perfil"
                            class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                            <span class="inline-flex items-center justify-center h-12 w-12 ">
                                <font-awesome-icon icon="fa-solid fa-user" />
                            </span>
                            <span class=" font-medium">Perfil</span>
                        </RouterLink>
                    </li>

                    <li>
                        <button @click="logout"
                            class="flex flex-row items-center h-12 transform hover:translate-x-2  transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                            <span class="inline-flex items-center justify-center h-12 w-12 ">
                                <font-awesome-icon icon="fa-solid fa-right-from-bracket" />
                            </span>
                            <span class=" font-medium">Cerrar Sesion</span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </aside>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/userStore'
import { useEmployeeStore } from '../stores/employee'
import { useCategoriesStore } from '../stores/categories'

const userStore = useUserStore()
const employeeStore = useEmployeeStore()
const catStore = useCategoriesStore()

const router = useRouter()

const logout = () => {
    // console.log('logout');
    // userStore.$reset();
    // employeeStore.$reset()
    // catStore.$reset()
    $cookies.remove('auth')
    $cookies.remove('role')
    $cookies.remove('user')
    router.push('/login')
}

</script>

<style scoped>
.router-link-active {
    background-color: hsl(var(--b3));


}

.logo {
    filter: invert(0.4) sepia(1) hue-rotate(20deg);
}
</style>
