<template>
    <div class=" bg-base-300 flex justify-center items-center content-center h-screen  ">
        <div
            class=" flex flex-col md:flex-row items-center justify-center content-center px-5 text-gray-700 mx-auto w-9/12">
            <div class="max-w-md w-1/3">
                <div class="text-8xl font-dark font-bold">401</div>
                <p class="text-2xl md:text-3xl font-light leading-normal">Lo sentimos, no tienes autorizacion en estos
                    modulos</p>
                <p class="mb-8">Regresar al modulo de venta</p>

                <router-link to="/punto-venta"
                    class="px-4 inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-blue-600 active:bg-blue-600 hover:bg-blue-700">Punto
                    de venta</router-link>
            </div>
            <div class="w-2/3">

                <img src="../assets/gato.svg" alt="Gato tirando un florero" />
            </div>

        </div>
    </div>
</template>
