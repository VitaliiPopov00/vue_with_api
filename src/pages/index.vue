<template>
    <my-slider />
    <search/>
    <card-list :pets="lastFindPets" />
    <subscription/>
</template>

<script>
import mySlider from '@/components/slider.vue';
import subscription from '@/components/subscription.vue';
import search from '@/components/search.vue';

export default {
    data() {
        return {
            lastFindPets: [],
        }
    },
    components: {
        mySlider,
        subscription,
        search,
    },
    methods: {
        async getLastFindPets() {
            try {
                let response = await fetch(localStorage.getItem('homeUrl') + 'api/pets');
                let data = await response.json()
                this.lastFindPets = data.data.orders;
            } catch(e) {
                console.log(e.message);
            }
        },
    },
    mounted() {
        this.getLastFindPets();
    }
}
</script>

<style scoped></style>