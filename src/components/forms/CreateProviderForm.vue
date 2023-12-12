<template>
    <form>
        <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">

            <div>
                <label class="font-bold pr-4">
                    Nombre*
                </label>
                <input v-bind="name" type="text" class="input input-sm w-full">
                <label class="label h-6 static">
                    <span class="label-text-alt text-rose-600 absolute">{{ errors.name }}</span>
                </label>
            </div>
            <div>
                <label class="font-bold pr-4 ">
                    Correo Electronico
                </label>
                <input type="email" class="input input-sm w-full" v-bind="email">
                <label class="label h-6 static">
                    <span class="label-text-alt text-rose-600 absolute">{{ errors.email }}</span>
                </label>
            </div>
            <div>
                <label class="font-bold pr-4">
                    Numero de Telefono
                </label>
                <input type="text" class="input input-sm w-full" v-bind="phone">
                <label class="label h-6 static">
                    <span class="label-text-alt text-rose-600 absolute">{{ errors.phone }}</span>
                </label>
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
import { useProveedoresStore } from '../../stores/proveedores'

const store = useProveedoresStore()
const emits = defineEmits(['closeModal'])

const { errors, defineInputBinds, isSubmitting, handleSubmit } = useForm({
    validationSchema: yup.object({
        name: yup.string().min(3, "El nombre del proveedor debe tener al menos 3 caracteres").required("Este campo es requerido"),
        phone: yup.string("Debe ser un numero de telefono"),
        email: yup.string().email("Debe ser un correo valido")
    })
})

const name = defineInputBinds("name")
const phone = defineInputBinds("phone")
const email = defineInputBinds("email")

const onSubmit = handleSubmit(async (values) => {
    await store.crear(values)
    emits("closeModal")
})
</script>
