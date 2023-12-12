<template>
    <form class="mt-3 w-full">
        <div class="divider">Informacion del empleado</div>
        <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
                <label class="font-bold pr-4">
                    Nombre completo*
                </label>
                <input v-bind="fullname" type="text" class="input input-sm uppercase w-full">
                <label class="label h-6 static">
                    <span class="label-text-alt text-rose-600 absolute">{{ errors.fullname }}</span>
                </label>
            </div>

            <div>
                <label class="font-bold pr-4">
                    Email*
                </label>
                <input type="email" class="input input-sm w-full" v-bind="email">
                <label class="label h-6 static">
                    <span class="label-text-alt text-rose-600 absolute">{{ errors.email }}</span>
                </label>
            </div>
            <div>
                <label class="font-bold pr-4">
                    Telefono
                </label>
                <input type="text" class="input input-sm w-full" v-bind="phone">
                <label class="label h-6 static">
                    <span class="label-text-alt text-rose-600 absolute">{{ errors.phone }}</span>
                </label>
            </div>
            <div>
                <label class="font-bold pr-4">
                    CURP*
                </label>
                <input type="text" class="input input-sm w-full uppercase" v-bind="curp" maxlength="18">
                <label class="label h-6 static">
                    <span class="label-text-alt text-rose-600 absolute">{{ errors.curp }}</span>
                </label>
            </div>
            <div>
                <label class="font-bold pr-4">
                    RFC
                </label>
                <input type="text" class="input input-sm w-full uppercase" v-bind="rfc" maxlength="13">
                <label class="label h-6 static">
                    <span class="label-text-alt text-rose-600 absolute">{{ errors.rfc }}</span>
                </label>
            </div>
            <div>
                <label class="font-bold pr-4">
                    Salario
                </label>
                <input type="number" class="input input-sm w-full" v-bind="salary">
                <label class="label h-6 static">
                    <span class="label-text-alt text-rose-600 absolute">{{ errors.salary }}</span>
                </label>
            </div>
        </div>

        <div class="divider">Informacion del usuario</div>

        <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
                <label class="font-bold pr-4">
                    Nombre de usuario*
                </label>
                <input type="text" class="input input-sm w-full" v-bind="username">
                <label class="label h-6 static">
                    <span class="label-text-alt text-rose-600 absolute">{{ errors.username }}</span>
                </label>
            </div>

            <div>
                <label class="font-bold pr-4">
                    Contraseña*
                </label>
                <input type="password" class="input input-sm w-full" v-bind="password">
                <label class="label h-6 static">
                    <span class="label-text-alt text-rose-600 absolute">{{ errors.password }}</span>
                </label>
            </div>

            <div>
                <label class="font-bold pr-4">
                    Rol*
                </label>
                <select class="select select-md select-bordered w-full" v-model="rol">
                    <option disabled selected value="">Selecciona un rol</option>
                    <option value="admin">Administrador</option>
                    <option value="employee">Vendedor</option>
                </select>
            </div>
        </div>
        <div class="flex justify-end">
            <button class="btn btn-md btn-primary" @click="onSubmit()" :disabled="isSubmitting">
                {{ isSubmitting ? "Editando..." : "Editar" }}
            </button>
        </div>
    </form>
</template>

<script setup>
import { useForm } from 'vee-validate';
import { ref } from 'vue';
import * as yup from 'yup';
import { useEmpleadosStore } from '../../stores/empleados'

const empStore = useEmpleadosStore()

const props = defineProps(['empleado'])
const emits = defineEmits(['closeModal'])

const rol = ref(props.empleado.user.role)

const { errors, defineInputBinds, isSubmitting, handleSubmit } = useForm({
    validationSchema: yup.object({
        fullname: yup.string().min(3).required(),
        email: yup.string().email().required(),
        phone: yup.number(),
        salary: yup.number().default(0),
        rfc: yup.string(),
        curp: yup.string().required(),
        username: yup.string().required(),
        password: yup.string().min(8).required()
    }),
    initialValues: {
        fullname: props.empleado.fullname,
        email: props.empleado.email,
        phone: props.empleado.phone,
        salary: props.empleado.salary,
        rfc: props.empleado.rfc,
        curp: props.empleado.curp,
        username: props.empleado.user.username,
        password: ""
    }
})

const fullname = defineInputBinds("fullname")
const email = defineInputBinds("email")
const phone = defineInputBinds("phone")
const salary = defineInputBinds("salary")
const rfc = defineInputBinds("rfc")
const curp = defineInputBinds("curp")
const username = defineInputBinds("username")
const password = defineInputBinds("password")

const onSubmit = handleSubmit(async (values) => {
    const changes = {
        employee: {

            fullname: values.fullname.toUpperCase(),
            curp: values.curp.toUpperCase(),
            rfc: values.rfc.toUpperCase(),
            phone: values.phone,
            email: values.email,
            salary: values.salary,
        },

        user: {
            username: values.username,
            password: values.password,
            role: rol.value
        }
    };

    // console.log(changes);
    emits('closeModal')
    await empStore.editarEmpleado(props.empleado.id, changes)

})
</script>
