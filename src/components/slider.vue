<template>
    <div class="container" v-if="!showSpinner">
        <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
                <button 
                    type="button" 
                    data-bs-target="#carouselExampleCaptions" 
                    v-for="petNumber in lastFindPets.length"
                    :aria-label="'Slide' + petNumber" 
                    :data-bs-slide-to="petNumber - 1"
                    :key="petNumber"
                    :class="{ active: petNumber === 1 }"
                    />
            </div>
            <div class="carousel-inner">
                <div class="carousel-item" 
                    v-for="pet, index in lastFindPets" 
                    :key="index" 
                    :class="{ active: index === 0 }"
                >
                    <img src="/images/plug.png" class="d-block w-100" alt="...">
                    <div class="carousel-caption d-none d-md-block">
                        <h5>{{ ucFirst(pet.kind) }}</h5>
                        <p>{{ pet.description }}</p>
                    </div>
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions"
                data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Предыдущий</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions"
                data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Следующий</span>
            </button>
        </div>
    </div>
    <my-spinner v-else/>
</template>

<script>
export default {
    data() {
        return {
            lastFindPets: [],
            showSpinner: true,
        }
    },
    methods: {
        async getLastFindPets() {
            try {
                let response = await fetch(localStorage.getItem('homeUrl') + 'api/pets/slider');
                let data = await response.json();
                this.lastFindPets = data.data.pets;
            } catch {

            }
        },
        closeSpinner() {
            setTimeout(() => this.showSpinner = false, 3000);
        },
        ucFirst(str) {
            if (!str) return str;

            return str[0].toUpperCase() + str.slice(1);
        },
    },
    mounted() {
        this.getLastFindPets();
        this.closeSpinner();
    }
}
</script>

<style scoped></style>