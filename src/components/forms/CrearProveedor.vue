<template>
    <form class="mt-3 w-full">
        <div class="divider">Informacion del Proveedor</div>
        <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
                <label class="font-bold pr-4">
                    Nombre(s)*
                </label>
                <input v-bind="name" type="text" class="input input-sm uppercase w-full">
                <label class="label h-6 static">
                    <span class="label-text-alt text-rose-600 absolute">{{ errors.name }}</span>
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
            <div class="flex justify-end">
                <button class="btn btn-md btn-primary" @click="onSubmit()" :disabled="isSubmitting">
                    {{ isSubmitting ? "Creando..." : "Crear" }}
                </button>
            </div>
        </div>

    </form>
</template>

<script setup>
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { useProveedoresStore } from '../../stores/proveedores';

const store = useProveedoresStore()

const emits = defineEmits(['closeModal'])


const { errors, defineInputBinds, isSubmitting, handleSubmit } = useForm({
    validationSchema: yup.object({
        name: yup.string().min(3).required("Este campo es obligatorio"),
        email: yup.string().email("Debe ser un email valido").required("Este campo es obligatorio"),
        phone: yup.number("Debe ser un numero de telefono"),
        }),
    initialValues: {
        name: "",
        email: "",
        phone: "",
    }

})

const name = defineInputBinds("name")
const email = defineInputBinds("email")
const phone = defineInputBinds("phone")

const onSubmit = handleSubmit(async (values) => {
    const body = {
        name: values.name.toUpperCase(),
        phone: values.phone,
        email: values.email
    };

    // console.log(body);
    emits('closeModal')
    await store.crearProveedor(body)

})

</script>
