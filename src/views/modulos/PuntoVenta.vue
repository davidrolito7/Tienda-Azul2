<template>
    <NavBar titleModule="Punto de venta" />
    <div class="flex justify-center content-between h-screen ">
        <!-- <button class="btn btn-primary" :disabled="ventaStore.venta" @click="generarVenta()">Generar Venta</button> -->

        <div class="static w-screen h-screen">
            <div class="card w-5/12 h-32 bg-base-100 shadow-xl absolute left-28 top-40">
                <div class="card-body bg-base-200 flex items-center  shadow-xl">
                    <!-- <form> -->
                    <div class="flex">
                        <div class="relative">
                            <input class="input join-item" v-model="productName" placeholder="Nombre del producto" />
                        </div>

                        <button class="btn join-item rounded-r-full bg-base-300 " @click="limpiarBusqueda()">
                            <!-- <span class="loading loading-dots loading-md"></span> -->
                            <div class="tooltip" data-tip="Limpiar busqueda">
                                <span class="text-lg">
                                    <font-awesome-icon :icon="['fas', 'eraser']" />
                                </span>
                            </div>

                        </button>
                    </div>

                    <ul v-if="productos.length > 0" class="mt-2 w-full">
                        <li v-for="item in productos" :key="item.id" class="py-2 pl-2  ">
                            <button :disabled="item.stock == 1" @click="agregarCarrito(item)"
                                class="btn btn-outline  w-full flex justify-between  cursor-pointer">
                                <span class=" truncate ">
                                    {{ item.name }}
                                </span>
                                <span class="">
                                    <span class="badge mr-1">${{ item.salePrice }}</span>
                                    <div class="badge badge-secondary w-12" :class="{ 'badge-error': item.stock <= 1 }">
                                        {{ item.stock }}
                                    </div>
                                </span>
                            </button>

                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div v-if="ventaStore.venta" class="static w-screen h-screen">
            <div class="card w-5/12 bg-base-100 shadow-xl absolute right-12 top-40">
                <div class="card-body bg-base-200">
                    <h2 class="text-center text-2xl font-bold">Productos</h2>

                    <div v-if="carrito.length <= 0">
                        Sin articulos en la venta
                    </div>
                    <div v-else class="w-full">
                        <ul v-for="(articulo, index) in carrito" :key="index">
                            <li class="flex items-center justify-between my-2 w-full">
                                <span class="font-medium w-3/5">
                                    {{ articulo.name }}
                                </span>

                                <select class="select select-bordered  w-1/5" v-model="articulo.selectedQuantity"
                                    @change="actualizarCantidad(articulo)">
                                    <option class="text-sm" v-for="cant in articulo.stock" :key="cant" :value="cant">
                                        {{ cant }}
                                    </option>
                                </select>
                                <button class="" @click="eliminarDelCarrito(articulo)">
                                    <font-awesome-icon :icon="['fas', 'trash']" class="text-xl hover:cursor-pointer" />
                                </button>
                            </li>
                        </ul>

                    </div>
                    <div class="stats shadow flex items-center justify-between">
                        <div class="stat">
                            <div class="stat-title">Total a pagar</div>
                            <div class="stat-value">$ {{ total }}</div>
                        </div>
                        <button class="btn btn-primary mr-6" :disabled="carrito.length == 0" @click="confirmarVenta()">
                            <div v-if="realizandoVenta">
                                <span class="loading loading-dots loading-lg"></span>
                            </div>
                            <div v-else>Confirmar</div>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="static w-screen h-screen">
            <div class="absolute bottom-20 left-28 flex items-center content-center ">
                <SalesTable />
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, onBeforeMount, onUnmounted, ref, watch } from 'vue';
import NavBar from '../../components/navbars/NavBar.vue';
import SalesTable from '../../components/tables/SalesTable.vue'
import { useForm } from 'vee-validate';
import { useToast } from 'vue-toastification'
import * as yup from 'yup';
import { useVentaStore } from '../../stores/venta'
import axios from 'axios';

const toast = useToast()

const ventaStore = useVentaStore()
const { carrito, busqueda, buscarByName, venta, createVenta } = ventaStore

const token = $cookies.get('user')?.token
const productName = ref("")
const productos = ref([])
const realizandoVenta = ref(false)

watch(productName, async (newNameProduct) => {
    try {
        if (newNameProduct.trim() === "") {
            productos.value = []
        } else {
            // console.log(newNameProduct);
            const response = await axios.request({
                headers: {
                    Authorization: `Bearer ${token}`
                },
                method: "POST",
                url: "/api/products/search",
                data: {
                    name: newNameProduct,
                }
            })
            // console.log(response.data);
            productos.value = response.data
        }

    } catch (error) {
        console.log(error.response);
    }
})

// watch(carrito, (newCarrito) => {
//     console.log(total.value);
// }, { deep: true })

const confirmarVenta = async () => {
    try {
        realizandoVenta.value = true
        if (carrito.length >= 1) {
            await createVenta()
            await Promise.all(carrito.map(async p => {
                await axios.post('/api/sales/add-item', {
                    saleId: ventaStore.venta.id,
                    productId: p.id,
                    amount: p.amount,
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            }))
        }

        toast.success("realizando venta");
        realizandoVenta.value = false
        await ventaStore.fetchVentas()
        ventaStore.limpiarVenta()
        ventaStore.limpiarBusqueda()
    } catch (error) {
        realizandoVenta.value = false
        console.log(error);
        toast.error("Error al realizar la venta")
    } finally {
        ventaStore.vaciarCarrito()
        await ventaStore.fetchVentas()
        ventaStore.limpiarVenta()
    }
}

const total = computed(() => {
    if (carrito.length > 0) {
        const calculatedTotal = carrito.reduce((total, prod) => {
            return total + (prod.salePrice * prod.amount)
        }, 0)
        return calculatedTotal.toFixed(2)
    }
    return 0
})
const agregarCarrito = (product) => {
    let selectedQuantity = 1
    let existingProduct = carrito.find(p => p.id === product.id)
    if (existingProduct && existingProduct.amount + selectedQuantity > existingProduct.stock) {

        toast.warning("Stock insuficiente")
    } else if (!existingProduct && selectedQuantity > product.stock) {
        // existingProduct.amount += selectedQuantity
        toast.warning("Stock insuficiente")
    } else {
        if (existingProduct) {
            existingProduct.amount += selectedQuantity
        }
        else {
            carrito.push({
                name: product.name,
                id: product.id,
                amount: selectedQuantity,
                stock: product.stock,
                salePrice: product.salePrice
            })
        }



    }

}


const generarVenta = async () => {
    await ventaStore.createVenta()
}

const actualizarCantidad = (producto) => {
    if (producto.selectedQuantity <= producto.stock) {
        producto.amount = producto.selectedQuantity
    } else {
        toast.warning("Stock insuficiente!!")
    }
}
const eliminarDelCarrito = (producto) => {
    const index = carrito.indexOf(producto)
    if (index !== -1) {
        carrito.splice(index, 1)
    }
}

const limpiarBusqueda = () => {
    productName.value = ""
    productos.value = []
}

onBeforeMount(() => {
    ventaStore.fetchVentas()
})

onUnmounted(() => {
    ventaStore.limpiarBusqueda()
})



</script>
