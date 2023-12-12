import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import axios from 'axios'

export const useProductsStore = defineStore('products', () => {
    const toast = useToast()
    let productos = ref([])
    const token = $cookies.get('user')?.token

    const fetchProductos = () => {
        axios.request({
            headers: {
                Authorization: `Bearer ${token}`
            },
            method: "GET",
            url: `/api/products`,

        }).then(res => {
            productos.value = res.data
        }).catch(err => {
            toast.error("Error al cargar los productos")
            console.log(err);
        })
    }

    async function crear(body) {
        try {
            const response = await axios.request({
                headers: {
                    Authorization: `Bearer ${token}`
                },
                method: "POST",
                url: "/api/products",
                data: body
            })
            // const nuevoProducto = response.data
            // const prod = await searchByID(nuevoProducto?.id)
            // productos.value.push(prod)
            fetchProductos()
            toast.success("Producto creado correctamente")
        } catch (error) {
            console.log(error);
            toast.error("Error al crear un producto")
        }
    }

    const searchByID = async (id) => {
        try {
            const response = await axios.request({
                headers: {
                    Authorization: `Bearer ${token}`
                },
                method: "GET",
                url: "/api/products/search",
                data: {
                    "id": id
                }
            })
            console.log(response.data);
            return response.data
        } catch (error) {
            toast.error("Error al encontrar el producto")
            console.log(error.response);
        }
    }

    const deleteProduct = async (id) => {
        try {
            const response = await axios.request({
                headers: {
                    Authorization: `Bearer ${token}`
                },
                method: "DELETE",
                url: `/api/products/${id}`,
            })
            fetchProductos()
            toast.success("Producto eliminado correctamente")
        } catch (error) {
            console.log(error);
            toast.error("Error al eliminar un producto")
        }
    }

    const getProductoById = async (id) => {
        try {
            const response = await axios.request({
                headers: {
                    Authorization: `Bearer ${token}`
                },
                method: "GET",
                url: `/api/products/${id}`
            })
            console.log(response.data);
            return response.data
        } catch (error) {
            toast.error("Error al encontrar el producto")
            console.log(error);
        }
    }

    const updateProducto = async (id, changes) => {
        try {
            const response = await axios.request({
                headers: {
                    Authorization: `Bearer ${token}`
                },
                method: "PATCH",
                url: `/api/products/${id}`,
                data: changes
            });
            fetchProductos();
            toast.success("Producto actualizado correctamente")
        } catch (error) {
            toast.error("Error al actualizar el producto")
            console.log(error);
        }
    }


    return {
        productos,
        fetchProductos,
        crear,
        searchByID,
        deleteProduct,
        getProductoById, updateProducto
    }
})
