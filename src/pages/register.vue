<template>
    <div class="container d-flex justify-content-center">
        <form action="profile.html" class="sign-height">
            <h2 class="mb-3">Регистрация пользователя</h2>
            <div class="form-floating mb-3">
                <input v-model="data.name" type="text" class="form-control" placeholder=".">
                <label>Имя</label>
            </div>
            <div class="form-floating mb-3">
                <input v-model="data.phone" type="tel" class="form-control" placeholder=".">
                <label>Телефон</label>
            </div>
            <div class="form-floating mb-3">
                <input v-model="data.email" type="email" class="form-control" placeholder=".">
                <label>E-mail</label>
            </div>
            <div class="form-floating mb-3">
                <input v-model="data.password" type="password" class="form-control" placeholder=".">
                <label>Пароль</label>
            </div>
            <div class="form-floating mb-3">
                <input v-model="data.password_repeat" type="password" class="form-control" placeholder=".">
                <label>Повторите пароль</label>
            </div>
            <div class="mb-3 form-check d-flex justify-content-center">
                <div class="mx-1">
                    <input v-model="data.confirm" id="checkbox_confirm" type="checkbox" class="form-check-input">
                </div>
                <label class="form-check-label" for="checkbox_confirm">Согласие на обработку персональных данных</label>
            </div>
            <div class="d-flex justify-content-center">
                <button @click.prevent="register" class="btn btn-primary">Зарегистрироваться</button>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                data: {
                    name: '',
                    phone: '',
                    email: '',
                    password: '',
                    password_repeat: '',
                    confirm: false
                },
                homeUrl: 'http://animal/'
            }
        },
        methods: {
            async register() {
                try {
                    let response = await fetch(this.homeUrl + 'api/register', {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(this.data),
                    });
                    let data = await response.json();
                    console.log(data);
                } catch (e) {
                    console.log(e)
                }
            }
        }
    }
</script>

<style scoped>

</style>