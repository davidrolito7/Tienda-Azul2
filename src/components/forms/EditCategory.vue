<template>
    <form class="space-y-6" action="#">
        <div>
            <label class="block mb-2 font-medium ">Nombre:</label>
            <input v-bind="name" type="text" class="input input-bordered w-full    p-2.5" placeholder="Nombre">
            <label class="label h-6 ">
                <span class="label-text-alt text-rose-600">{{ errors.name }}</span>
            </label>
        </div>
        <div>
            <label class="block mb-2 font-medium ">Descripción:</label>
            <textarea v-bind="description" placeholder="Descripción"
                class="textarea textarea-bordered w-full p-2.5"></textarea>
        </div>
        <div class="flex justify-end gap-3">
            <button class="btn btn-primary" @click="onSubmit()" :disabled="isSubmitting">
                {{ isSubmitting ? 'Creando...' : 'Crear' }}
            </button>
            <button class="btn" @click.prevent="clear">Limpiar</button>

        </div>


    </form>
</template>

<script setup>
import { ref } from 'vue'
import { useCategoriesStore } from '../../stores/categories'
import { useUserStore } from '../../stores/userStore'
import { useForm } from "vee-validate";
import * as yup from "yup";
import axios from 'axios';
import { useToast } from 'vue-toastification'

const emits = defineEmits(['closeModal'])
const props = defineProps(['categoria'])
const userStore = useUserStore()

const catStore = useCategoriesStore()

const { errors, handleSubmit, defineInputBinds, isSubmitting, resetForm } = useForm({
    validationSchema: yup.object({
        name: yup.string().required("El nombre de la categoria es requerido"),
        description: yup.string()
    }),
    initialValues: {
        name: props.categoria.name,
        description: props.categoria.description
    }
})

const onSubmit = handleSubmit((values) => {
    const token = userStore.state.token
    const changes = {
            name: values.name,
            description: values.description
        
    };
    catStore.editarCategoria( props.categoria.id , values,token)
    console.log("categoria creada");
    emits('closeModal')
    clear()
})

const name = defineInputBinds('name')
const description = defineInputBinds('description')

const clear = () => {
    resetForm({
        touched: {
            title: false,
            description: false
        },
        errors: {
            title: 'Title is required',
            description: "Task description is required"
        },
        values: {
            title: '',
            description: '',
        },
    })
}

</script>
