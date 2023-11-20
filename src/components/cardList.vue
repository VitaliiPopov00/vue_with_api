<template>
    <div class="row g-3">
        <card-pet 
            v-for="pet in pets"
            :pet="pet"
        />
    </div>
</template>

<script>
    export default {
        name: "cardList",
        props: {
            pets: {
                type: Array,
                required: true,
            }
        }
    }
</script>

<style scoped>

</style>