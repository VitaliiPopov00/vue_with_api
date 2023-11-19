<template>
    <div class="container">
        <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-between py-3 mb-4 border-bottom">
            <a @click="$router.push('/')" class="h3 d-flex align-items-center col-lg-3 mb-2 mb-md-0 text-dark text-decoration-none">
                GET PET BACK
            </a>
    
            <ul class="nav col-12 col-lg-auto mb-2 justify-content-center mb-md-0">
                <li><a @click="$router.push('/')" class="nav-link px-2 link-dark">Главная</a></li>
                <li><a @click="$router.push('/search')" class="nav-link px-2 link-dark">Поиск</a></li>
                <li><a @click="$router.push('/profile')" class="nav-link px-2 link-dark">Профиль</a></li>
                <li><a @click="$router.push('/create')" class="nav-link px-2 link-dark">Разместить объявление</a></li>
            </ul>
    
            <div class="col-lg-3 text-end">
                <a @click="$router.push('/register')" type="button" class="btn btn-outline-primary me-2">Регистрация</a>
                <a @click="$router.push('/login')" type="button" class="btn btn-primary">Войти</a>
            </div>
        </header>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>

</style>