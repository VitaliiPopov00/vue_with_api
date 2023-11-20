<template>
    <div class="container my-3 text-center">
        <div class="spinner-border text-info" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
    
    <div class="container d-none">
        <div class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active"
                        aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"
                        aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"
                        aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="images/plug.png" class="d-block w-100" alt="...">
                    <div class="carousel-caption d-none d-md-block">
                        <h5>First slide label</h5>
                        <p>Some representative placeholder content for the first slide.</p>
                    </div>
                </div>
                <div class="carousel-item">
                    <img src="images/plug.png" class="d-block w-100" alt="...">
                    <div class="carousel-caption d-none d-md-block">
                        <h5>Second slide label</h5>
                        <p>Some representative placeholder content for the second slide.</p>
                    </div>
                </div>
                <div class="carousel-item">
                    <img src="images/plug.png" class="d-block w-100" alt="...">
                    <div class="carousel-caption d-none d-md-block">
                        <h5>Third slide label</h5>
                        <p>Some representative placeholder content for the third slide.</p>
                    </div>
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions"
                    data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions"
                    data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    </div>
    
    <div class="container">
        <form class="my-3 row" action="search.html">
            <label class="form-label h3">Поиск</label>
            <div class="mb-3 col-sm-10 input-group">
                <input type="search" class="form-control" placeholder="Введите значение">
                <datalist>
                </datalist>
                <button type="submit" class="btn btn-primary">Найти</button>
            </div>
        </form>
    </div>
    
    <div class="container">
        <card-list :pets="lastFindPets"/>
        <div class="alert-warning col-12 p-3">Животных не найдено</div>
    </div>
    
    <div class="container">
        <form class="m-3 row">
            <label class="form-label h3">Подпишитесь, чтобы получать наши новости первыми!</label>
            <div class="mb-3 col-md-10 input-group">
                <input type="email" class="form-control" placeholder="Ваша почта">
                <button type="submit" class="btn btn-primary">Подписаться</button>
            </div>
        </form>
        <div class="alert-success col-12 p-3">Вы успешно подписались на наши уведомления!</div>
        <div class="alert-danger col-12 p-3">ошибки</div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                lastFindPets: [],
            }
        },
        methods: {
            async getLastFindPets() {
                console.log('test');
                try {
                    let response = await fetch(localStorage.getItem('homeUrl') + 'api/pets');
                    let data = await response.json()
                    this.lastFindPets = data.data.order;
                } catch {

                }
            }
        },
        mounted() {
            this.getLastFindPets();
        }
    }
</script>

<style scoped>

</style>