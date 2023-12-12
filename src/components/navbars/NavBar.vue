<template>
    <div class="navbar bg-base-300 ">
        <a class="font-semibold normal-case text-xl ml-6">{{ titleModule }}</a>
    </div>
</template>

<script setup>
const { titleModule } = defineProps(['titleModule'])
</script>
