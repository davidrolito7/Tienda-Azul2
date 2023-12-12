<template>
    <form class="mt-3 w-full">
        <div class="divider">Informacion del empleado</div>
        <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
                <label class="font-bold pr-4">
                    Nombre(s)*
                </label>
                <input v-bind="names" type="text" class="input input-sm uppercase w-full">
                <label class="label h-6 static">
                    <span class="label-text-alt text-rose-600 absolute">{{ errors.names }}</span>
                </label>
            </div>
            <div>
                <label class="font-bold pr-4">
                    Apellidos*
                </label>
                <input type="text" class="input uppercase input-sm w-full" v-bind="lastnames">
                <label class="label h-6 static">
                    <span class="label-text-alt text-rose-600 absolute">{{ errors.lastnames }}</span>
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
                {{ isSubmitting ? "Creando..." : "Crear" }}
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

const emits = defineEmits(['closeModal'])

const { crearEmpleado } = empStore
const rol = ref("")

const { errors, defineInputBinds, isSubmitting, handleSubmit } = useForm({
    validationSchema: yup.object({
        names: yup.string().min(3).required("Este campo es obligatorio"),
        lastnames: yup.string().min(3).required("Este campo es obligatorio"),
        email: yup.string().email("Debe ser un email valido").required("Este campo es obligatorio"),
        phone: yup.number("Debe ser un numero de telefono"),
        salary: yup.number("Este campo debe ser una cantidad").default(0),
        rfc: yup.string().min(13).max(13),
        curp: yup.string().required("Este campo es obligatorio").min(18).max(18),
        username: yup.string().required("Este campo es obligatorio"),
        password: yup.string().min(8).required("Este campo es obligatorio")
    }),
    initialValues: {
        names: "",
        lastnames: "",
        email: "",
        phone: "",
        salary: 0.0,
        rfc: "",
        curp: "",
        username: "",
        password: ""
    }

})

const names = defineInputBinds("names")
const lastnames = defineInputBinds("lastnames")
const email = defineInputBinds("email")
const phone = defineInputBinds("phone")
const salary = defineInputBinds("salary")
const rfc = defineInputBinds("rfc")
const curp = defineInputBinds("curp")
const username = defineInputBinds("username")
const password = defineInputBinds("password")

const onSubmit = handleSubmit(async (values) => {
    const body = {
        fullname: values.names.toUpperCase() + " " + values.lastnames.toUpperCase(),
        curp: values.curp.toLowerCase(),
        rfc: values.rfc.toUpperCase(),
        phone: values.phone,
        email: values.email,
        salary: values.salary,
        user: {
            username: values.username,
            password: values.password,
            role: rol.value
        }
    };

    // console.log(body);
    emits('closeModal')
    await crearEmpleado(body)

})

</script>
