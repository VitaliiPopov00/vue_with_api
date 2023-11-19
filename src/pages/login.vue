<template>
    <div class="container d-flex justify-content-center">
        <form action="profile.html" class="sign-height">
            <h2 class="mb-3">Войти в свой аккаунт</h2>
            <div class="form-floating mb-3">
                <input v-model="data.email" type="email" class="form-control" placeholder=".">
                <label>E-mail</label>
            </div>
            <div class="form-floating mb-3">
                <input v-model="data.password" type="password" class="form-control" placeholder=".">
                <label>Пароль</label>
            </div>
            <div class="d-flex justify-content-center">
                <button @click.prevent="auth" class="btn btn-primary">Войти</button>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                data: {
                    email: '',
                    password: '',
                },
                homeUrl: 'http://animal/',
            }
        },
        methods: {
            async auth() {
                try {
                    let response = await fetch(this.homeUrl + 'api/login', {
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