<template>
    <form class="mt-3 w-full">
        <div class="divider"></div>
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
                <label class="font-bold pr-4">
                    Cantidad en Stock*
                </label>
                <input type="number" class="input input-sm w-full" v-bind="stock">
                <label class="label h-6 static">
                    <span class="label-text-alt text-rose-600 absolute">{{ errors.stock }}</span>
                </label>
            </div>
            <div class="col-span-2">
                <label class="font-bold pr-4 col-span-2">
                    Descripcion*
                </label>
                <input type="text" class="input input-sm w-full" v-bind="description">
                <label class="label h-6 static">
                    <span class="label-text-alt text-rose-600 absolute">{{ errors.description }}</span>
                </label>
            </div>
            <div>
                <label class="font-bold pr-4">
                    Precio de venta*
                </label>
                <input type="number" class="input input-sm w-full" v-bind="salePrice">
                <label class="label h-6 static">
                    <span class="label-text-alt text-rose-600 absolute">{{ errors.salePrice }}</span>
                </label>
            </div>
            <div>
                <label class="font-bold pr-4">
                    Precio de compra*
                </label>
                <input type="number" class="input input-sm w-full" v-bind="purchasePrice">
                <label class="label h-6 static">
                    <span class="label-text-alt text-rose-600 absolute">{{ errors.purchasePrice }}</span>
                </label>
            </div>
            <div>
                <label class="font-bold pr-4">
                    Codigo de barras
                </label>
                <input type="text" class="input input-sm w-full uppercase" v-bind="barCode">
                <label class="label h-6 static">
                    <span class="label-text-alt text-rose-600 absolute">{{ errors.barCode }}</span>
                </label>
            </div>

            <div>
                <label class="font-bold pr-4">
                    Marca*
                </label>
                <input type="text" class="input input-sm w-full" v-bind="brand">
                <label class="label h-6 static">
                    <span class="label-text-alt text-rose-600 absolute">{{ errors.brand }}</span>
                </label>
            </div>
            <div>
                <label class="font-bold pr-4">
                    Unidad de medida*
                </label>
                <input type="text" class="input input-sm w-full" v-bind="measureUnit">
                <label class="label h-6 static">
                    <span class="label-text-alt text-rose-600 absolute">{{ errors.measureUnit }}</span>
                </label>
            </div>



            <div>
                <label class="font-bold pr-4">
                    Categoria*
                </label>
                <select class="select select-md select-bordered w-full" v-model="categoryId">
                    <option disabled selected value="">Selecciona una categoria</option>
                    <option v-for="item in categorias" :key="item.id" :value="item.id">{{ item.name }}</option>

                </select>
            </div>
            <div>
                <label class="font-bold pr-4">
                    Proveedor*
                </label>
                <select class="select select-md select-bordered w-full" v-model="providerId">
                    <option disabled selected value="">Selecciona un proveedor</option>
                    <option v-for="item in proveedores" :key="item.id" :value="item.id">{{ item.name }}</option>

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
import { useCategoriasStore } from '../../stores/categorias'
import { useProveedoresStore } from '../../stores/proveedores'
import { useProductsStore } from '../../stores/products'

const storeCat = useCategoriasStore()
const storeProd = useProductsStore()
const storeProv = useProveedoresStore()

const emits = defineEmits(['closeModal'])

const categoryId = ref(0)
const providerId = ref(0)

const { categorias } = storeCat.categorias
const { proveedores } = storeProv

const { errors, defineInputBinds, isSubmitting, handleSubmit } = useForm({
    validationSchema: yup.object({
        name: yup.string().min(3).required(),
        description: yup.string(),
        salePrice: yup.number().required(),
        purchasePrice: yup.number().required(),
        barCode: yup.number(),
        stock: yup.number().required(),
        brand: yup.string(),
        measureUnit: yup.string(),
    }),
    initialValues: {
        name: "",
        description: "",
        salePrice: 0.0,
        purchasePrice: 0.0,
        barCode: "",
        stock: 0,
        brand: "",
        measureUnit: "",
    }
})

const name = defineInputBinds("name")
const description = defineInputBinds("description")
const salePrice = defineInputBinds("salePrice")
const purchasePrice = defineInputBinds("purchasePrice")
const barCode = defineInputBinds("barCode")
const stock = defineInputBinds("stock")
const brand = defineInputBinds("brand")
const measureUnit = defineInputBinds("measureUnit")

const onSubmit = handleSubmit(async (values) => {
    const body = {
        ...values,
        categoryId: categoryId.value,
        providerId: providerId.value
    }
    // console.log(body);
    await storeProd.crear(body)
    emits('closeModal')
})


</script>
