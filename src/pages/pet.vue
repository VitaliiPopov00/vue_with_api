<template>
    <div class="container"  v-if="pet">
        <div class="card border-0">
            <div class="d-flex justify-content-center flex-wrap flex-md-nowrap">
                <img src="/images/plug.png" class="m-2 max-w-33 img-thumbnail" alt="...">
                <img src="/images/plug.png" class="m-2 max-w-33 img-thumbnail" alt="...">
                <img src="/images/plug.png" class="m-2 max-w-33 img-thumbnail" alt="...">
            </div>
            <!-- <div class="d-flex justify-content-center ">
                <div class="row g-5">
                    <div class="col-md-4">
                        <img src="/images/plug.png" class="img-thumbnail" alt="...">
                    </div>
                    <div class="col-md-4">
                        <img src="/images/plug.png" class="img-thumbnail" alt="...">
                    </div>
                </div>
            </div> -->
            <div class="card-body">
                <div class="card-body">
                    <h5 class="card-title">{{ ucFirst(pet.kind) }}</h5>
                    <p class="card-text">{{ pet.description }}</p>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">{{ pet.district }}</li>
                    <li class="list-group-item">{{ pet.mark }}</li>
                    <li class="list-group-item">{{ pet.phone }}</li>
                    <li class="list-group-item">{{ pet.name }}</li>
                    <li class="list-group-item">{{ pet.email }}</li>
                    <li class="list-group-item">{{ pet.date }}</li>
                </ul>
            </div>
        </div>
    </div>
    <my-spinner v-else/>
</template>

<script>
    export default {
        data() {
            return {
                petID: this.$route.params.id,
                pet: false,
            }
        },
        methods: {
            async getPetByID() {
                try {
                    let response = await fetch(localStorage.getItem('homeUrl') + `api/pets/${this.petID}`);
                    let data = await response.json();
                    this.pet = data.data.pet;
                } catch(e) {
                    console.log(e.message);
                }
            },
            ucFirst(str) {
                if (!str) return str;

                return str[0].toUpperCase() + str.slice(1);
            }
        },
        mounted() {
            this.getPetByID();
        }
    }
</script>

<style scoped>

</style>