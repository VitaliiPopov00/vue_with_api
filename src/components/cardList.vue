<template>
    <div class="container">
        <div class="row g-3">
            <card-pet 
                v-for="pet, index in pets"
                :pet="pet"
                :key="index"
            />
        </div>
    </div>
</template>

<script>
    export default {
        name: "cardList",
        props: {
            pets: {
                type: Array,
                required: true,
            },
        }
    }
</script>

<style scoped>

</style>