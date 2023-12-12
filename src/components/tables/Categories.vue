<template>
    <div class="flex flex-col text-center w-full mt-5">
        <div>

            <div class="join mt-10">
                <button class="join-item btn" @click="setPage(false, $cookies.get('auth'))" v-if="!isFirstPage">«</button>
                <button class="join-item btn">{{ page }}</button>
                <button class="join-item btn" @click="setPage(true, $cookies.get('auth'))" v-if="!isLastPage">»</button>
            </div>

        </div>
    </div>

    <div class="flex items-start justify-center content-center overflow-x-auto h-80">

        <div v-if="!loaded" class="h-full flex justify-center content-center items-center overflow-hidden">
            <CubeLoader />
        </div>
        <table v-else class="w-2/4 mt-5">
            <thead>
                <tr class="text-base-content text-base">
                    <th>Nombre</th>
                    <th>Descripcion</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr class="hover" v-for="categoria in results" :key="categoria.id">
                    <td>{{ categoria.name }}</td>
                    <td>{{ categoria.description }}</td>
                    <td class="flex w-full content-evenly justify-evenly items-center">
                        <div class="tooltip" data-tip="Editar">
                            <button class="btn btn-info btn-xs " @click="editarCategoria(categoria.id)">
                                <font-awesome-icon icon="fa-solid fa-pen" />
                            </button>
                        </div>
                        <div class="tooltip" data-tip="Eliminar">
                            <button class="btn btn-error text-base-content btn-xs " @click="preguntarEliminar(categoria.id)"
                                type="button">
                                <font-awesome-icon icon="fa-solid fa-trash" />
                            </button>

                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>




    <Modal :show="showEditModal" @close="toggleEditModal()" size="lg">
        <template #title>
            <h3 class="text-xl font-bold text-center ">Editar categoria</h3>
        </template>
        <template #closeModal>
            <div class="relative">

                <button class="btn btn-sm text-xl hover:text-2xl btn-circle btn-ghost absolute right-1 top-0"
                    @click="toggleEditModal()">
                    <font-awesome-icon :icon="['fas', 'xmark']" />
                </button>
            </div>
        </template>
        <template #body>
            <EditCategory :categoria="categoria" @closeModal="toggleEditModal()" />
        </template>
    </Modal>
    <Modal :show="showDeleteModal" @close="toggleModal()">
        <template v-slot:title>
            <h3 class="text-lg font-bold text-center mt-5">¿Estas seguro de eliminar esta categoria?</h3>
        </template>

        <template #closeModal>
            <div class="flex justify-end">

                <button class="btn btn-sm text-xl hover:text-2xl btn-circle btn-ghost " @click="toggleModal()">
                    <font-awesome-icon :icon="['fas', 'xmark']" />
                </button>
            </div>
        </template>

        <template #body>
            <div class="flex justify-end gap-3 mt-5">
                <button class="btn btn-md btn-error " @click="eliminarCat(idCat)">Eliminar</button>
                <button class="btn btn-md" @click="toggleModal()">Cancelar</button>
            </div>
        </template>
    </Modal>
</template>

<script setup>
import Modal from '../Modal.vue';
import CubeLoader from '../loaders/CubeLoader.vue'
import { useToggle } from '@vueuse/core'
import { ref, onMounted } from 'vue'
import { useCategoriesStore } from '../../stores/categories'
import usePagination from '../../composables/usePagination'
import EditCategory from '../forms/EditCategory.vue';
import { useCategoriasStore } from '../../stores/categorias';


const catStore = useCategoriesStore()

const [showDeleteModal, toggleModal] = useToggle()
const [showEditModal, toggleEditModal] = useToggle()

const idCat = ref(0)
const store = useCategoriasStore()
const categoria = ref({})

const { categories } = defineProps(['categories'])
const { results, setPage, paginate, page, isFirstPage, isLastPage, loaded } = usePagination()

const editarCategoria = async (id) => {
    categoria.value = await store.getCategori(id)
    toggleEditModal()
    //console.log(id);
}
const preguntarEliminar = (id) => {
    idCat.value = id
    toggleModal()
}

const eliminarCat = (id) => {
    toggleModal()
    console.log(`Eliminando cat ${id}`);
    const token = $cookies.get('auth')
    catStore.deleteCategory(id, token)
    catStore.fetchCategories(token)
}

onMounted(() => {
    const token = $cookies.get('auth')
    paginate(token)
})

</script>

<style scoped>
.loading {
    opacity: 0.3;
}

.loaded {
    opacity: 1;
}
</style>
