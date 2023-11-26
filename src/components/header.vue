<template>
    <div class="container">
        <header
            class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-between py-3 mb-4 border-bottom">
            <a href="#" @click.prevent="$router.push('/')"
                class="h3 d-flex align-items-center col-lg-3 mb-2 mb-md-0 text-dark text-decoration-none">
                GET PET BACK
            </a>

            <ul class="nav col-12 col-lg-auto mb-2 justify-content-center mb-md-0">
                <li><router-link to="/" class="nav-link px-2 link-dark">Главная</router-link></li>
                <li><router-link to="/search" class="nav-link px-2 link-dark">Поиск</router-link></li>
                <li><router-link to="/profile" v-if="isAuth" class="nav-link px-2 link-dark">Профиль</router-link></li>
                <li><router-link to="/create" class="nav-link px-2 link-dark">Разместить объявление</router-link></li>
            </ul>

            <div class="col-lg-3 text-end" v-if="!isAuth">
                <router-link to="/register" type="button"
                    class="btn btn-outline-primary me-2">Регистрация</router-link>
                <router-link to="/login" type="button" class="btn btn-primary">Войти</router-link>
            </div>
            <div class="col-lg-3 text-end" v-else>
                <router-link to="/" @click="logout" type="button" class="btn btn-primary">Выйти</router-link>
            </div>
        </header>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isAuth: localStorage.getItem('token') ? true : false,
        }
    },
    methods: {
        logout() {
            localStorage.removeItem('token');
            this.isAuth = false;
        }
    },
    watch: {
        $route(to, from) {
            if (to.name == 'index' && from.name == 'login') {
                this.isAuth = true;
            }
        },
    } 
}
</script>

<style scoped></style>