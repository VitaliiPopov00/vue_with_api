<template>
    <div v-if="user">
        <div class="container">
            <h2>Профиль</h2>
            <div class="card-body">
                <p class="h5">Имя пользователя: {{ user.name }}</p>
                <p class="h5">Почта: {{ user.email }} <button @click="clearMessage" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#emailModal">Изменить</button></p>
                <p class="h5">Номер телефона: {{ user.phone }} <button @click="clearMessage" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#telModal">Изменить</button></p>
                <p class="h5">Дата регистрации: {{ user.registrationDate }}</p>
                <p class="h5">Количество дней с момента регистрации на сайте: {{ getDate }}</p>
                <p class="h5">Количество животных пользователя, у которых нашлись хозяева: {{ user.petsCount }}</p>
            </div>
        </div>
        
        <div class="modal fade" id="telModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Изменить номер телефона</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <input type="tel" v-model="phone" class="form-control" :class="{ 'is-invalid': errors.phone_error, 'is-valid': successChange}" @input="clearMessage" placeholder="Ваш новый телефон">
                        <div class="invalid-feedback">
                            {{ errors.phone_error }}
                        </div>
                        <div class="valid-feedback">
                            Новый номер телефона применен!
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                        <button type="button" @click="clearMessage(), fetchPhone()" class="btn btn-primary">Сохранить изменения</button>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="modal fade" id="emailModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Изменить e-mail</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <input type="email" class="form-control" v-model="email" :class="{ 'is-invalid': errors.email_error, 'is-valid': successChange }" @input="clearMessage" placeholder="Ваш новый e-mail">
                        <div class="invalid-feedback">
                            {{ errors.email_error }}
                        </div>
                        <div class="valid-feedback">
                            Новая почта применена!
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                        <button @click="clearMessage(), fetchEmail()" type="button" class="btn btn-primary">Сохранить изменения</button>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="container">
            <h2>Ваши объявления</h2>
        </div>

        <div class="container" v-if="activeOrders.length">
            <h5>Активные</h5>
            <div class="row g-3">
                <div class="col-md-4" v-for="order, index in activeOrders" :key="index">
                    <div class="card mx-2">
                        <img src="images/plug.png" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">{{ order.kind }}</h5>
                            <p class="card-text">{{ order.description }}</p>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">{{ order.district }}</li>
                            <li class="list-group-item">{{ order.mark }}</li>
                            <li class="list-group-item">{{ order.date }}</li>
                        </ul>
                        <div class="card-body">
                            <router-link :to="{ name: 'pet', params: { id: order.id } }" class="card-link">Перейти к публикации</router-link>
                        </div>
                        <button @click="deleteOrderID = order.id" type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Удалить
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="container" v-if="wasFoundOrders.length">
            <h5>Были найдены</h5>
            <div class="row g-3">
                <div class="col-md-4" v-for="order, index in wasFoundOrders" :key="index">
                    <div class="card mx-2">
                        <img src="images/plug.png" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">{{ order.kind }}</h5>
                            <p class="card-text">{{ order.description }}</p>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">{{ order.district }}</li>
                            <li class="list-group-item">{{ order.mark }}</li>
                            <li class="list-group-item">{{ order.date }}</li>
                        </ul>
                        <div class="card-body">
                            <router-link :to="{ name: 'pet', params: { id: order.id } }" class="card-link">Перейти к публикации</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container" v-if="onModerationOrders.length">
            <h5>На модерации</h5>
            <div class="row g-3">
                <div class="col-md-4" v-for="order, index in onModerationOrders" :key="index">
                    <div class="card mx-2">
                        <img src="images/plug.png" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">{{ order.kind }}</h5>
                            <p class="card-text">{{ order.description }}</p>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">{{ order.district }}</li>
                            <li class="list-group-item">{{ order.mark }}</li>
                            <li class="list-group-item">{{ order.date }}</li>
                        </ul>
                        <div class="card-body">
                            <router-link :to="{ name: 'pet', params: { id: order.id } }" class="card-link">Перейти к публикации</router-link>
                        </div>
                        <button @click="deleteOrderID = order.id" type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Удалить
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="container" v-if="archiveOrders.length">
            <h5>В архиве</h5>
            <div class="row g-3">
                <div class="col-md-4" v-for="order, index in archiveOrders" :key="index">
                    <div class="card mx-2">
                        <img src="images/plug.png" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">{{ order.kind }}</h5>
                            <p class="card-text">{{ order.description }}</p>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">{{ order.district }}</li>
                            <li class="list-group-item">{{ order.mark }}</li>
                            <li class="list-group-item">{{ order.date }}</li>
                        </ul>
                        <div class="card-body">
                            <router-link :to="{ name: 'pet', params: { id: order.id } }" class="card-link">Перейти к публикации</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Подтвердите свои действия</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Вы действительно хотите удалить объявление?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                    <button @click="fetchDeleteOrder" type="button" class="btn btn-danger" data-bs-dismiss="modal">Удалить</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import cardList from '@/components/cardList.vue';

    export default {
        data() {
            return {
                user: false,
                phone: '',
                email: '',
                errors: {
                    phone_error: false,
                    email_error: false,
                },
                successChange: false,
                activeOrders: [],
                wasFoundOrders: [],
                onModerationOrders: [],
                archiveOrders: [],
                deleteOrderID: false,
            }
        },
        components: {
            cardList,
        },
        methods: {
            async fetchUser() {
                try {
                    let response = await fetch(localStorage.getItem('homeUrl') + 'api/users', {
                        method: 'GET',
                        headers: {
                            "Authorization": "Bearer " + localStorage.getItem('token'),
                        },
                    });

                    let data = await response.json();

                    if (response.ok) {
                        this.user = data.data.user;
                    } else {
                        throw Error(JSON.stringify(data));
                    }
                } catch(e) {
                    console.log('Error');
                }
            },
            async fetchPhone() {
                try {
                    let response = await fetch(localStorage.getItem('homeUrl') + 'api/users/phone', {
                        method: 'PATCH',
                        headers: {
                            "Authorization": "Bearer " + localStorage.getItem('token'),
                            "Content-Type": "application/json;charset=utf-8",
                        },
                        body: JSON.stringify({phone: this.phone}),
                    });

                    let data = await response.json();

                    if (response.ok) {
                        this.successChange = true;
                        this.fetchUser();
                    } else {
                        throw Error(JSON.stringify(data));
                    }
                } catch(e) {
                    let data = JSON.parse(e.message);

                    for (let error in data.data.error.errors) {
                        this.errors[`${error}_error`] = data.data.error.errors[error].join('<br>');
                    }
                }
            },
            async fetchEmail() {
                try {
                    let response = await fetch(localStorage.getItem('homeUrl') + 'api/users/email', {
                        method: 'PATCH',
                        headers: {
                            "Authorization": "Bearer " + localStorage.getItem('token'),
                            "Content-Type": "application/json;charset=utf-8",
                        },
                        body: JSON.stringify({email: this.email}),
                    });

                    let data = await response.json();

                    if (response.ok) {
                        this.successChange = true;
                        this.fetchUser();
                    } else {
                        throw Error(JSON.stringify(data));
                    }
                } catch(e) {
                    let data = JSON.parse(e.message);

                    for (let error in data.data.error.errors) {
                        this.errors[`${error}_error`] = data.data.error.errors[error].join('<br>');
                    }
                }
            },
            async fetchUserOrders() {
                try {
                    let response = await fetch(localStorage.getItem('homeUrl') + 'api/users/orders', {
                        method: 'GET',
                        headers: {
                            "Authorization": "Bearer " + localStorage.getItem('token')
                        },
                    });

                    if (response.status == 200) {
                        let data = await response.json();
                        console.log(data);
                        
                        for (let orderStatus in data.data.orders) {
                            this[`${orderStatus}Orders`] = data.data.orders[orderStatus];
                        }
                    }
                } catch(e) {
                    console.log(e.message);
                }
            },
            async fetchDeleteOrder() {
                try {
                    let response = await fetch(localStorage.getItem('homeUrl') + 'api/users/orders/' + this.deleteOrderID, {
                        method: 'DELETE',
                        headers: {
                            "Authorization": "Bearer " + localStorage.getItem('token'),
                        },
                    });

                    if (response.ok) {
                        this.fetchUserOrders();
                    }
                } catch(e) {
                    console.log(e.message);
                }
            },
            clearMessage() {
                this.errors.phone_error = false;
                this.errors.email_error = false;
                this.successChange = false;
            }
        },
        computed: {
            getDate() {
                let apiDate = new Date(this.user.registrationDate);
                let currentDate = new Date();
                let timeDiff = currentDate.getTime() - apiDate.getTime();

                return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            },
        },
        mounted() {
            this.fetchUser();
            this.fetchUserOrders();
        }
    }
</script>

<style scoped>

</style>