<template>
    <Modal :show="showEditModal" @close="toggleEditModal()" size="lg">
        <template #title>
            <h3 class="text-xl font-bold text-center ">Editar empleado</h3>
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
            <EditEmployeeModal :empleado="empleado" @closeModal="toggleEditModal()" />
        </template>
    </Modal>
    <Modal :show="showDeleteModal" @close="toggleDeleteModal()" size="md">
        <template #title>
            <h3 class="text-xl font-bold text-center ">Eliminar empleado</h3>
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
            <DeleteEmployeeModal :empleado="empleado" @closeModal="toggleDeleteModal()" />
        </template>
    </Modal>
    <div class="overflow-x-auto">
        <table class="table">
            <!-- head -->
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Contacto</th>
                    <th>Salario</th>
                    <th>Informacion</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <!-- row 1 -->
                <tr v-for="employee in employees" :key="employee.id">

                    <td>
                        <div class="flex items-center gap-3">

                            <div>
                                <div class="font-bold">{{ employee.fullname }}</div>
                                <div class="text-sm opacity-50">{{ employee.user.username }}</div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div>
                            <div class="font-bold">{{ employee.email }}</div>
                            <div class="text-sm opacity-50">{{ employee.phone }}</div>
                        </div>
                    </td>
                    <td class="font-bold">${{ employee.salary }}</td>
                    <td>
                        <div>
                            <div class="font-bold uppercase">{{ employee.curp }}</div>
                            <div class="text-sm opacity-50 uppercase">{{ employee?.rfc }}</div>
                        </div>
                    </td>
                    <th>
                        <button class="btn btn-xs bg-rose-500 text-white"
                            @click="seleccionarEliminar(employee.id)">Eliminar</button>
                        <button class="btn btn-xs bg-sky-500 text-white"
                            @click="seleccionarEdit(employee.id)">Editar</button>
                    </th>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import Modal from '../Modal.vue';
import { useToggle } from '@vueuse/core'
import EditEmployeeModal from '../forms/EditEmployeeModal.vue';
import { ref } from 'vue';
import { useEmpleadosStore } from '../../stores/empleados';
import DeleteEmployeeModal from '../forms/DeleteEmployeeModal.vue';

const [showEditModal, toggleEditModal] = useToggle()
const [showDeleteModal, toggleDeleteModal] = useToggle()
const empleado = ref({})
const store = useEmpleadosStore()

const props = defineProps(['employees'])

const seleccionarEdit = async (id) => {
    empleado.value = await store.getEmpleado(id)
    toggleEditModal()
    // console.log(empleado.value);
}

const seleccionarEliminar = async (id) => {
    empleado.value = await store.getEmpleado(id)
    toggleDeleteModal()
    // console.log(empleado.value);
}
</script>
