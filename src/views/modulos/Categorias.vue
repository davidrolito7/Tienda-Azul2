<template>
    <NavBar titleModule="Categorias" />
    <div class="w-4/6 mx-auto items-center">
        <div class="flex flex-col items-center justify-center h-full w-full my-12">
            <label @click="toggleModal()" class="btn btn-primary">Nueva categoría</label>


            <Modal :show="showCreateModal" @close="toggleModal()">
                <template v-slot:title>
                    <h3 class="text-xl font-bold text-center ">Nueva categoría</h3>
                </template>

                <template #closeModal>
                    <div class="relative">

                        <button class="btn btn-sm text-xl hover:text-2xl btn-circle btn-ghost absolute right-1 top-0"
                            @click="toggleModal()">
                            <font-awesome-icon :icon="['fas', 'xmark']" />
                        </button>
                    </div>
                </template>

                <template #body>
                    <CreateCategory @closeModal="toggleModal()" />
                </template>

            </Modal>
        </div>

        <div class="flex flex-col justify-center h-full w-full overflow-x-auto  my-12">
            <TableCategories :categories="categories" />


        </div>
    </div>
</template>

<script setup>
import NavBar from '@/components/navbars/NavBar.vue';
import TableCategories from '../../components/tables/Categories.vue'
import CreateCategory from '../../components/forms/CreateCategory.vue';
import Modal from '@/components/Modal.vue'
import { useUserStore } from '../../stores/userStore'
import { useCategoriesStore } from '../../stores/categories'
import { useToggle } from '@vueuse/core'
import { onMounted, ref, computed } from 'vue';


const userStore = useUserStore()
const catStore = useCategoriesStore()

const currentPage = ref(0)

const nextPage = () => {
    if (currentPage.value * 10 < categories.value.length) {
        currentPage.value += 1;
        catStore.fetchCategories(userStore.state.token, currentPage.value * 5);
    }
}

const prevPage = () => {
    if (currentPage.value >= 1) {
        currentPage.value -= 1;
        catStore.fetchCategories(userStore.state.token, currentPage.value * 5);
    }
}
// const showCreateModal = ref(false)
const [showCreateModal, toggleModal] = useToggle()

const getCategories = computed(() => {
    return catStore.getCategories
})

const categories = computed(() => {
    return catStore.categories
})

onMounted(async () => {
    await catStore.fetchCategories(userStore.state.token, currentPage.value)
})

</script>
