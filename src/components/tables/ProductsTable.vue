<template>
    <Modal :show="showDeleteModal" @close="toggleDeleteModal()" size="md">
        <template #title>
            <h3 class="text-xl font-bold text-center ">Eliminar producto</h3>
        </template>
        <template #closeModal>
            <div class="relative">

                <button class="btn btn-sm text-xl hover:text-2xl btn-circle btn-ghost absolute right-1 top-0"
                    @click="toggleDeleteModal()">
                    <font-awesome-icon :icon="['fas', 'xmark']" />
                </button>
            </div>
        </template>
        <template #body>
            <DeleteProduct :producto="producto" @closeModal="toggleDeleteModal()" />
        </template>
    </Modal>

    <Modal :show="showEditModal" @close="toggleEditModal()" size="lg">
        <template #title>
            <h3 class="text-xl font-bold text-center ">Editar producto</h3>
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
            <EditProduct :producto="producto" @closeModal="toggleEditModal()" />
        </template>
    </Modal>
    <div class="overflow-x-auto mt-8">
        <table class="table table-xs">
            <thead>
                <tr>
                    <th></th>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Precio de venta</th>
                    <th>Precio de compra</th>
                    <th>Stock</th>
                    <th>Marca</th>
                    <th>Proveedor</th>
                    <th>Categoria</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in products" :key="product.id" class="font-semibold ">
                    <th>
                        <div class="tooltip tooltip-error text-xs tooltip-right " data-tip="Poco stock">
                            <span v-if="product.stock <= 1" class="badge badge-error gap-2">

                                <font-awesome-icon :icon="['fas', 'triangle-exclamation']" />
                            </span>
                        </div>

                    </th>
                    <th>{{ product.id }}</th>
                    <td>{{ product.name }}

                    </td>
                    <td>${{ product.salePrice }}</td>
                    <td>${{ product.purchasePrice }}</td>
                    <td>{{ product.stock }}</td>
                    <td>{{ product.brand }}</td>
                    <td>{{ product.provider.name }}</td>
                    <td>{{ product.category.name }}</td>
                    <th>
                        <button class="btn btn-xs bg-rose-500 text-white" @click="seleccionarEliminar(product.id)">
                            Eliminar
                        </button>
                        <button @click="seleccionarEdit(product.id)" class="btn btn-xs bg-sky-500 text-white">
                            Editar
                        </button>
                    </th>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <th></th>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Precio de venta</th>
                    <th>Precio de compra</th>
                    <th>Stock</th>
                    <th>Marca</th>
                    <th>Proveedor</th>
                    <th>Categoria</th>
                    <th>Acciones</th>
                </tr>
            </tfoot>
        </table>
    </div>
</template>

<script setup>
import Modal from '../Modal.vue';
import { useToggle } from '@vueuse/core'
import { ref } from 'vue';
import DeleteProduct from '../forms/DeleteProduct.vue'
import EditProduct from '../forms/EditProduct.vue'
import { useProductsStore } from '../../stores/products'

const [showDeleteModal, toggleDeleteModal] = useToggle()
const [showEditModal, toggleEditModal] = useToggle()

const producto = ref({})
const store = useProductsStore()

const props = defineProps(['products'])

const seleccionarEdit = async (id) => {
    producto.value = await store.getProductoById(id)
    // console.log(producto.value);
    toggleEditModal()
}

const seleccionarEliminar = async (id) => {
    producto.value = await store.getProductoById(id)
    toggleDeleteModal()
}
</script>
