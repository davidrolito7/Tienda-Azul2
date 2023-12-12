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

    <div class="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        <div class="card  w-72 h-52 bg-base-200 shadow-xl" v-for="provider in providers" :key="provider.id">
            <div class="card-body">
                <h2 class="card-title">
                    {{ provider.name }}
                </h2>
                <p>
                    {{ provider.email }}
                </p>
                <p>
                    {{ provider.phone }}
                </p>
                <div class="card-actions justify-end">
                    <button class="btn btn-info btn-sm" @click="seleccionarEdit(provider.id)">Editar</button>
                    <button class="btn btn-error btn-sm" @click="seleccionarEliminar(provider.id)">Eliminar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Modal from '../Modal.vue';
import { useToggle } from '@vueuse/core'
import EditProveedor from '../forms/EditProveedor.vue';
import { ref } from 'vue';
import { useProveedoresStore } from '../../stores/proveedores';
import DeleteProveedor from '../forms/DeleteProveedor.vue';

const store = useProveedoresStore()

const [showEditModal, toggleEditModal] = useToggle()
const [showDeleteModal, toggleDeleteModal] = useToggle()

const { providers } = defineProps(['providers'])
const proveedor = ref({})

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
