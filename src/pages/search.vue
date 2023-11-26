<template>
    <div class="container">
        <h2 class="mb-2">Поиск</h2>
        <form class="row">
            <div class="mb-3 col-md-6">
                <label class="form-label">Район</label>
                <select v-model="data.district" class="form-select" placeholder="">
                    <option selected disabled value="">
                        Район нахождения
                    </option>
                    <option v-for="district in districts" :key="district.id" :value="district.district">
                        {{ district.district }}
                    </option>
                </select>
            </div>
            <div class="mb-3 col-md-6">
                <label class="form-label" for="kind">Вид животного</label>
                <input v-model="data.kind" class="form-control" id="kind" placeholder="Вид животного">
            </div>
            <button @click.prevent="fetchSearch" class="btn btn-primary col-md-3 mx-auto">Найти</button>
        </form>
    </div>
    
    <div class="container">
        <h2 class="mb-2">Результаты поиска</h2>
        <card-list :pets="pets"/>
        <div class="d-flex justify-content-center my-4">
            <nav aria-label="Page navigation example">
                <ul class="pagination">
                    <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                    <li class="page-item active"><a class="page-link" href="#">2</a></li>
                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                    <li class="page-item"><a class="page-link" href="#">Next</a></li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script>
    import cardList from '@/components/cardList.vue';
    export default {
        data() {
            return {
                data: {
                    kind: '',
                    district: '',
                },
                districts: [],
                pets: [],
            }
        },
        components: {
            cardList,
        },
        methods: {
            async fetchDistricts() {
                try {
                    let response = await fetch(localStorage.getItem('homeUrl') + 'api/districts');
                    let data = await response.json();
                    this.districts = data.data.districts;
                } catch(e) {
                    console.log(e.message);
                }
            },
            async fetchSearch() {
                try {
                    let response = await fetch(localStorage.getItem('homeUrl') + 'api/search?' + this.objectToGetString(this.data));
                    
                    if (response.status == 200) {
                        let data = await response.json();
                        this.pets = data.data.orders;
                    }
                } catch(e) {
                    console.log(e.message);
                }
            },
            objectToGetString(obj) {
                return Object.keys(obj).map(key => key + '=' + obj[key]).join('&');
            }
        },
        mounted() {
            this.fetchDistricts();
        }

    }
</script>

<style scoped>

</style>