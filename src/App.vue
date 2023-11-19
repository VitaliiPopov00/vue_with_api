<template>
    <my-header/>
    <router-view></router-view>
</template>

<script>
import myHeader from '@/components/header.vue';
export default {
    components: {
        myHeader,
    }
}
</script>

<style scoped>

</style>