
<template>
    <div class="w-screen">
        <SideBar class="" />

        <div class="h-screen bg-base-100 w-5/6 fixed right-0">
            <router-view></router-view>
        </div>
    </div>
</template>
<script setup>
import { onMounted } from 'vue';
import SideBar from '../components/SideBar.vue';

import { useRouter } from 'vue-router'

const router = useRouter();

onMounted(() => {
    router.push('/punto-venta')
})

</script>
