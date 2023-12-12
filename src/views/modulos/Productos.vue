
<template>
    <NavBar titleModule="Productos" />
    <Modal :show="showCreateModal" @close="toggleCreateModal()" size="lg">
        <template #title>
            <h3 class="text-xl font-bold text-center ">Crear producto</h3>
        </template>
        <template #closeModal>
            <div class="relative">

                <button class="btn btn-sm text-xl hover:text-2xl btn-circle btn-ghost absolute right-1 top-0"
                    @click="toggleCreateModal()">
                    <font-awesome-icon :icon="['fas', 'xmark']" />
                </button>
            </div>
        </template>
        <template #body>
            <!-- <CreateEmployeesForm @closeModal="toggleCreateModal()" /> -->
            <CreateProductForm @closeModal="toggleCreateModal()" />
        </template>
    </Modal>
    <div class="flex justify-center w-3/4 mx-auto mt-4">
        <label @click="toggleCreateModal()" class="btn btn-primary flex items-center">Crear producto</label>
    </div>
    <div>
        <ProductsTable :products="store.productos" />
    </div>
</template>


<script setup>
import NavBar from '../../components/navbars/NavBar.vue';
import { useToggle } from '@vueuse/core'
import { onBeforeMount, onMounted } from 'vue'
import { useProductsStore } from '../../stores/products'
import { useCategoriasStore } from '../../stores/categorias'
import { useProveedoresStore } from '../../stores/proveedores'
import Modal from '../../components/Modal.vue';
import ProductsTable from '../../components/tables/ProductsTable.vue';
import CreateProductForm from '../../components/forms/CreateProductForm.vue';

const store = useProductsStore()
const catStore = useCategoriasStore()
const provStore = useProveedoresStore()
// const pr
const [showCreateModal, toggleCreateModal] = useToggle()

onBeforeMount(() => {
    store.fetchProductos()
    catStore.fetchCategorias()
    provStore.fetchProveedores()
})


</script>
