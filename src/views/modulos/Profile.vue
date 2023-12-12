<template>
    <NavBar titleModule="Perfil de usuario" />
    <div class="p-10 mx-auto items-center w-3/4">


        <form class="mt-2 ">
            <div class="divider">Informacion del empleado</div>
            <div class="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-1 md:grid-cols-2">
                <div>
                    <label class="font-bold pr-4">
                        Nombre completo
                    </label>
                    <input v-bind="fullname" type="text" class="input input-sm uppercase border border-gray-300"
                        :disabled="habilitado" :style="{ 'background-color': 'inherit', color: 'inherit' }">
                    <label class="label h-6 static">
                        <span class="label-text-alt text-rose-600 absolute">{{ errors.fullname }}</span>
                    </label>
                </div>

                <div>
                    <label class="font-bold pr-4">
                        Email*
                    </label>
                    <input type="email" class="input input-sm border border-gray-300" v-bind="email" :disabled="habilitado"
                        :style="{ 'background-color': 'inherit', color: 'inherit' }">
                    <label class="label h-6 static">
                        <span class="label-text-alt text-rose-600 absolute">{{ errors.email }}</span>
                    </label>
                </div>
                <div>
                    <label class="font-bold pr-4">
                        Telefono
                    </label>
                    <input type="text" class="input input-sm border border-gray-300" v-bind="phone" :disabled="habilitado"
                        :style="{ 'background-color': 'inherit', color: 'inherit' }">
                    <label class="label h-6 static">
                        <span class="label-text-alt text-rose-600 absolute">{{ errors.phone }}</span>
                    </label>
                </div>
                <div>
                    <label class="font-bold pr-4">
                        CURP*
                    </label>
                    <input type="text" class="input input-sm  uppercase border border-gray-300" v-bind="curp"
                        :disabled="habilitado" :style="{ 'background-color': 'inherit', color: 'inherit' }">
                    <label class="label h-6 static">
                        <span class="label-text-alt text-rose-600 absolute">{{ errors.curp }}</span>
                    </label>
                </div>
                <div>
                    <label class="font-bold pr-4">
                        RFC
                    </label>
                    <input type="text" class="input input-sm  uppercase border border-gray-300" v-bind="rfc"
                        :disabled="habilitado" :style="{ 'background-color': 'inherit', color: 'inherit' }">
                    <label class="label h-6 static">
                        <span class="label-text-alt text-rose-600 absolute">{{ errors.rfc }}</span>
                    </label>
                </div>
                <div>
                    <label class="font-bold pr-4">
                        Salario
                    </label>
                    <input type="number" class="input input-sm border border-gray-300" v-bind="salary"
                        :disabled="habilitado" :style="{ 'background-color': 'inherit', color: 'inherit' }">
                    <label class="label h-6 static">
                        <span class="label-text-alt text-rose-600 absolute">{{ errors.salary }}</span>
                    </label>
                </div>
                <div>
                    <label class="font-bold pr-4">
                        Rol
                    </label>
                    <input v-bind="rol" type="text" class="input input-sm uppercase border border-gray-300"
                        disabled :style="{ 'background-color': 'inherit', color: 'inherit' }">
                </div>
            </div>
        </form>




        <div class="flex flex-row items-center justify-center h-full  my-8">
            <label v-if="true" @click="onSubmit()" class="btn btn-primary mr-2">{{ opcion }}</label>
            <label v-if="opcion.includes('Guardar')" @click="cancel()" class="btn btn-primary">{{ opcion }}</label>
        </div>
    </div>
</template>


<script setup>
import NavBar from '../../components/navbars/NavBar.vue';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { useEmployeeStore } from '../../stores/employee'
import { useUserStore } from '../../stores/userStore'

const store = useEmployeeStore()
const user = store.getEmployee;
const stor = useUserStore()
const profile = stor.getState;

var habilitado = true;
var opcion = "Modificar"


const { errors, defineInputBinds, isSubmitting, handleSubmit } = useForm({
    validationSchema: yup.object({
        fullname: yup.string().min(3).required(),
        email: yup.string().email().required(),
        phone: yup.number(),
        salary: yup.number().default(0),
        rfc: yup.string(),
        curp: yup.string().required(),
    }), initialValues: {
        fullname: user.fullname,
        email: user.email,
        phone: user.phone,
        salary: user.salary,
        rfc: user.rfc,
        curp: user.curp,
        rol: profile.role

    }
})

const fullname = defineInputBinds("fullname")
const email = defineInputBinds("email")
const phone = defineInputBinds("phone")
const salary = defineInputBinds("salary")
const rfc = defineInputBinds("rfc")
const curp = defineInputBinds("curp")
const rol = defineInputBinds("rol")



const onSubmit = handleSubmit(async (values) => {

    if (opcion.includes('Guardar')) {
        const changes = {
            employee: {

                fullname: values.fullname.toUpperCase(),
                curp: values.curp.toUpperCase(),
                rfc: values.rfc.toUpperCase(),
                phone: values.phone,
                email: values.email,
                salary: values.salary,
            }
        };
        await store.editarEmpleado(user.id, changes)

        opcion="Modificar"
        habilitado=true
    } else{
        opcion="Guardar"
        habilitado=false
    }
})
</script>
