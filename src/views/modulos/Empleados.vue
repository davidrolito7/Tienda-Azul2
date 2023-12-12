
<template>
    <NavBar titleModule="Usuarios" />

    <Modal :show="showCreateModal" @close="toggleCreateModal()" size="lg">
        <template #title>
            <h3 class="text-xl font-bold text-center ">Crear empleado</h3>
        </template>
        <template #closeModal>
            <div class="flex flex-col items-center justify-center h-full w-full my-12 relative">

                <button class="btn btn-sm text-xl hover:text-2xl btn-circle btn-ghost absolute right-1 top-1 flex-auto"
                    @click="toggleCreateModal()">
                    <font-awesome-icon :icon="['fas', 'xmark']" />
                </button>
            </div>
        </template>
        <template #body>
            <CreateEmployeesForm @closeModal="toggleCreateModal()" />
        </template>
    </Modal>
    <div class="flex justify-center w-3/4 mx-auto mt-4">
        <label @click="toggleCreateModal()" class="btn btn-primary">Crear empleado</label>
    </div>
    <div class="flex justify-center content-center h-screen mt-5">
        <EmployeesTable :employees="store.empleadosLista" />
    </div>
</template>

<script setup>
import Modal from '../../components/Modal.vue';
import NavBar from '../../components/navbars/NavBar.vue';
import EmployeesTable from '../../components/tables/EmployeesTable.vue';
import CreateEmployeesForm from '../../components/forms/CreateEmployees.vue'
import { useToggle } from '@vueuse/core'
import { useEmpleadosStore } from '../../stores/empleados'
import { onBeforeMount } from 'vue'

const store = useEmpleadosStore()
const [showCreateModal, toggleCreateModal] = useToggle()

onBeforeMount(() => {
    store.fetchEmpleados()
})
</script>
