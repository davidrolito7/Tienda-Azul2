import { get } from '@vueuse/core'
import axios from 'axios'
import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'
import { useToast } from 'vue-toastification'

export const useCategoriasStore = defineStore('categorias', () => {

    const toast = useToast()
    const token = $cookies.get('user')?.token
    let categorias = ref([])

    const fetchCategorias = () => {
        axios.request({
            headers: {
                Authorization: `Bearer ${token}`
            },
            method: "GET",
            url: `/api/categories`,

        }).then(res => {
            // console.log(res.data.categorias);
            categorias.value = res.data//?.categorias
        }).catch(err => {
            console.log(err);
            toast.error("Error al cargar las categorias")
        })
    }
/*
    async function crearCategoria(body) {
        try {
            /*const response = await axios.request({
                headers: {
                    Authorization: `Bearer ${token}`
                },
                method: "POST",
                url: "/api/categories",
                data: body
            })

            const nuvCat = response.data
            categorias.value.push(nuvCat)
            ///
            axios.post('/api/categories', body, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res => {
                // console.log(res);
                fetchCategorias
                toast.success("Categoria creada correctamente")
            }).catch(error => {
                console.log(error);
                toast.error("Error al crear una categoria"+error)
               
            })
        } catch (error) {
            console.log(error);
            toast.error("Error al crear la categoria"+error)
        }
    }
    async function eliminarCategoria(id) {
        try {
            const categoria = await getCategori(id)
            const response = await axios.request({
                headers: {
                    Authorization: `Bearer ${token}`
                },
                method: "DELETE",
                url: `/api/categories/${categoria.id}`,
            })

            const nuvCat = categorias.value.filter(user => user.id !== id)
            categorias.value = nuvCat
            // else toast.error("Error al eliminar el empleado")
            toast.success("Categoria elimininado correctamente")
        } catch (err) {
            console.log(err);
            toast.error("Error al borrar la categoria"+err)
        }
    }
*/
    async function getCategori(id){
        try {
            const response = await axios.request({
                headers: {
                    Authorization: `Bearer ${token}`
                },
                method: "GET",
                url: `/api/categories/${id}`
            })
            return response.data
        } catch (error) {
            console.log(error);
            toast.error("Error al obtener la categoria")
            return
        }
    }

    async function editarCategoria(id, changes) {
        try {
            const index = categorias.value.findIndex((e) => e.id === id);
            const categoria = await getCategori(id)
            const response = await axios.request({
                headers: {
                    Authorization: `Bearer ${token}`
                },
                method: "PATCH",
                url: `/api/categories/${categoria.id}`,
                data: changes
            })
            const catActualizado = await getCategori(id)
            if (index !== -1) {
                // Reemplazar el objeto antiguo con el nuevo
                categorias.value.splice(index, 1, catActualizado);
                toast.success("Categoria actualizada correctamente");
            } else {
                toast.error("Error al actualizar la categoria en el Store"+index);
            }
        } catch (error) {
            console.log(err);
            toast.error("Error al actualizar la categoria" )
        }
    }


    return {
        categorias,
        fetchCategorias,
        getCategori,
        editarCategoria,
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCategoriasStore, import.meta.hot))
}
