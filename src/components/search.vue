<template>
    <div class="container">
        <form class="my-3 row" action="search.html">
            <label class="form-label h3">Поиск</label>
            <div class="mb-3 col-sm-10 input-group">
                <input v-model.trim="search" @input="debounce" type="search" class="form-control"
                    placeholder="Введите значение">
                <button type="submit" class="btn btn-primary">Найти</button>
                <div v-if="notResult" class="alert-warning mt-2 col-12 p-3">Животных не найдено</div>
            </div>
            <div class="d-flex flex-column mb-5">
                <a v-if="!activeRequest" href="#" class="search_result" v-for="result, index in searchResult" :key="index" @click="$router.push('/pet/' + result.id)">
                    {{ result.description }}
                </a>
                <my-spinner v-else />
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            search: '',
            searchResult: [],
            activeRequest: false,
            notResult: false,
        }
    },
    methods: {
        debounce() {
            this.notResult = false;
            this.searchResult = [];

            setTimeout(() => {
                if (this.search.length > 3 && !this.activeRequest) {
                    this.activeRequest = true;
    
                    this.searchRequest();
                }
            }, 500);
        },
        async searchRequest() {
            try {
                let response = await fetch(localStorage.getItem('homeUrl') + 'api/search?query=' + this.search);

                switch (response.status) {
                    case 200:
                        let data = await response.json();
                        this.searchResult = data.data.orders;
                        this.activeRequest = false;
                        break;
                    case 204:
                        this.notResult = true;
                        this.activeRequest = false;
                        break;
                }
            } catch (e) {
                let error = JSON.parse(e.message);
                this.error = error.data.error.message;
                this.activeRequest = false;
            }
        }
    }
}
</script>

<style scoped>
.search_result {
    width: 100%;
    font-size: 14px;
    background-color: white;
    border: 1px solid #ccc;
    text-decoration: none;
    color: black;
    padding: 10px 20px;
    margin-top: 10px;
}

.search_result:hover {
    background-color: #ccc;
}

.search_result:first-child {
    margin-top: 0;
}
</style>