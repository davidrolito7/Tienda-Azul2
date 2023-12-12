<template>
    <Modal :show="showDeleteModal" @close="toggleDeleteModal()" size="md">
        <template #title>
            <h3 class="text-xl font-bold text-center ">Eliminar proveedor</h3>
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
            <DeleteProveedor :proveedor="proveedor" @closeModal="toggleDeleteModal()" />
        </template>
    </Modal>

    <Modal :show="showEditModal" @close="toggleEditModal()" size="lg">
        <template #title>
            <h3 class="text-xl font-bold text-center ">Editar Proveedor</h3>
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
            <EditProveedor :proveedor="proveedor" @closeModal="toggleEditModal()" />
        </template>
    </Modal>

    <div class="overflow-x-auto">
        <table class="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Telefono</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="proveedor in proveedors" :key="proveedor.id" class="font-semibold">
                    <td>{{ proveedor.id }}</td>
                    <td>{{ proveedor.name }}</td>
                    <td>{{ proveedor.email }}</td>
                    <td>{{ proveedor.phone }}</td>
                    <td>
                        <button class="btn btn-xs bg-rose-500 text-white" @click="seleccionarEliminar(proveedor.id)">
                            Eliminar
                        </button>
                        <button @click="seleccionarEdit(proveedor.id)" class="btn btn-xs bg-sky-500 text-white">
                            Editar
                        </button>
                    </td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Email|</th>
                    <th>Telefono</th>
                    <th>Acciones</th>
                </tr>
            </tfoot>
        </table>
    </div>
</template>

<script setup>
import Modal from '../Modal.vue';
import { useToggle } from '@vueuse/core'
import EditProveedor from '../forms/EditProveedor.vue';
import { ref } from 'vue';
import { useProveedoresStore } from '../../stores/proveedores';
import DeleteProveedor from '../forms/DeleteProveedor.vue';

const [showEditModal, toggleEditModal] = useToggle()
const [showDeleteModal, toggleDeleteModal] = useToggle()
const proveedor = ref({})
const store = useProveedoresStore()

const props = defineProps(['proveedors'])

const seleccionarEdit = async (id) => {
    proveedor.value = await store.getProveedor(id)
    toggleEditModal()
    // console.log(proveedor.value);
}

const seleccionarEliminar = async (id) => {
    proveedor.value = await store.getProveedor(id)
    toggleDeleteModal()
    // console.log(proveedor.value);
}
</script>