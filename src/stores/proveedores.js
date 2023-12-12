import axios from 'axios'
import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'
import { useToast } from 'vue-toastification'

export const useProveedoresStore = defineStore('proveedores', () => {
    let proveedores = ref([])
    const token = $cookies.get('user')?.token
    const toast = useToast()

    const fetchProveedores = () => {
        axios.request({
            headers: {
                Authorization: `Bearer ${token}`
            },
            method: "GET",
            url: `/api/providers`
        }).then(res => {
            proveedores.value = res.data
        }).catch(err => {
            toast.error("Error al cargar los proveedores"+err)
            console.log(err);
        })
    }

    const crear = async (body) => {
        try {
            const response = await axios.request({
                headers: {
                    Authorization: `Bearer ${token}`
                },
                method: "POST",
                url: "/api/providers",
                data: body
            })
            const nuevoProveedor = response.data
            proveedores.value.push(nuevoProveedor)
            toast.success("Proveedor creado correctamente")
        } catch (error) {
            console.log(error.response);
            toast.error("Error al crear un producto")
        }
    }

   

        async function crearProveedor(body) {
            try {
                const response = await axios.request({
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    method: "POST",
                    url: "/api/providers",
                    data: body
                })
    
                const nuevoProveedor = response.data
                proveedores.value.push(nuevoProveedor)
                
                //fetchProductos()
                toast.success("Proveedor creado correctamente")
            } catch (error) {
                console.log(error);
                toast.error("Error al crear el Proveedor"+error)
            }
        }
    
        async function eliminarProveedor(id) {
            try {
                const Proveedor = await getProveedor(id)
                const response = await axios.request({
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    method: "DELETE",
                    url: `/api/providers/${Proveedor.id}`,
                })

                const nuevosProveedors = proveedores.value.filter(user => user.id !== id)
                proveedores.value = nuevosProveedors
                // else toast.error("Error al eliminar el Proveedor")
                ///fetchProductos() //?
                toast.success("Proveedor elimininado correctamente")
            } catch (err) {
                console.log(err);
                toast.error("Error al borrar el Proveedor")
            }
        }
    
        async function editarProveedor(id, changes) {
            try {
                //const Proveedor = await getProveedor(id)
                const response = await axios.request({
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    method: "PATCH",
                    url: `/api/providers/${id}`,
                    data: changes
                })
/*
                const ProveedorActualizado = await getProveedor(id)
                const index = proveedores.value.findIndex((e) => e.id === Proveedor.id);
                if (index !== -1) {
                    // Reemplazar el objeto antiguo con el nuevo
                    proveedores.value.splice(index, 1, ProveedorActualizado);
                    toast.success("Proveedor actualizado correctamente");
                } else {
                    toast.error("Error al actualizar el Proveedor en el Store");
                }*/
                //() ///?
                fetchProveedores()
                toast.success("Proveedor actualizado correctamente")

            } catch (error) {
                console.log(error);
                toast.error("Error al actualizar el Proveedor")
            }
        }
    
        async function getProveedor(id) {
            try {
                const response = await axios.request({
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    method: "GET",
                    url: `/api/providers/${id}`
                })
                return response.data
            } catch (error) {
                console.log(error);
                toast.error("Error al obtener el Proveedor")
                return
            }
        }

    return {//regresr todos los metodos
        proveedores,
        fetchProveedores,
        crearProveedor,
        editarProveedor,
        eliminarProveedor,
        getProveedor
        , crear
    }
})
/*
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useProveedoresStore, import.meta.hot))
}
*/