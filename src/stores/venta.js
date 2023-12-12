import axios from 'axios'
import { defineStore, acceptHMRUpdate } from 'pinia'
import { computed, ref } from 'vue'
import { useToast } from 'vue-toastification'
import { useEmployeeStore } from './employee'

export const useVentaStore = defineStore('venta', () => {
    const storeEmployee = useEmployeeStore()
    let venta = ref({})
    let carrito = ref([])
    let busqueda = ref([])
    let ventas = ref([])
    const token = $cookies.get('user')?.token
    const idEmployee = storeEmployee.state.id
    const toast = useToast()

    const createVenta = async () => {
        try {
            const response = await axios.request({
                headers: {
                    Authorization: `Bearer ${token}`
                },
                method: "POST",
                url: "/api/sales",
                data: {
                    employeeId: idEmployee,
                }
            })
            venta.value = response.data

            // toast.success("Venta generada")
        } catch (error) {
            console.log(error);
            toast.error("Error al generar la venta")
        }
    }

    const agregarProducto = (producto) => {
        carrito.value.push(producto)
        toast.info('Producto agregado')
    }

    const buscarByName = async (nombre) => {
        try {
            const response = await axios.request({
                headers: {
                    Authorization: `Bearer ${token}`
                },
                method: "POST",
                url: "/api/products/search",
                data: {
                    name: nombre,
                }
            })

            // console.log(response.data)
            busqueda.value = response.data
        } catch (error) {
            console.log(error.response);
            toast.error("Hubo un problema al buscar el producto")
        }
    }

    const limpiarBusqueda = () => {
        busqueda.value = []
    }
    const limpiarVenta = () => {
        venta.value = {}
    }
    const vaciarCarrito = () => {
        carrito.value = []
    }

    const fetchVentas = async () => {
        try {
            const response = await axios.get("/api/sales", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // console.log(response.data);
            ventas.value = response.data
        } catch (error) {
            console.log(error);
        }
    }



    return {
        fetchVentas,
        createVenta,
        venta,
        ventas,
        carrito,
        busqueda,
        agregarProducto,
        buscarByName,
        limpiarBusqueda,
        limpiarVenta,
        vaciarCarrito
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useVentaStore, import.meta.hot))
}
