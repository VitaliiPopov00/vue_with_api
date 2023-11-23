<template>
    <form action="profile.html" class="sign-height">
        <h2 class="mb-3">Войти в свой аккаунт</h2>
        <div class="form-floating mb-3">
            <input @input="clearError('email')" v-model="data.email" :class="{ 'is-invalid': errors.email_error }" type="email" class="form-control" placeholder=".">
            <label>E-mail</label>
            <div class="invalid-feedback">
                {{ errors.email_error }}
            </div>
        </div>
        <div class="form-floating mb-3">
            <input @input="clearError('password')" v-model="data.password" :class="{ 'is-invalid': errors.password_error }" type="password" class="form-control" placeholder=".">
            <label>Пароль</label>
            <div class="invalid-feedback">
                {{ errors.password_error }}
            </div>
        </div>
        <div class="d-flex justify-content-center">
            <button @click.prevent="auth" class="btn btn-primary">Войти</button>
        </div>
    </form>
</template>

<script>
    export default {
        data() {
            return {
                data: {
                    email: '',
                    password: '',
                },
                errors: {
                    email_error: '',
                    password_error: '',
                },
            }
        },
        methods: {
            async auth() {
                try {
                    let response = await fetch(localStorage.getItem('homeUrl') + 'api/login', {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(this.data),
                    });

                    let data = await response.json()

                    switch (response.status) {
                        case 422:
                            throw new Error(JSON.stringify(data));
                            break;
                        case 401:
                            this.errors.email_error = "Пользователь не найден или пароль введен неверно";
                            break;
                        default:
                            localStorage.setItem('token', data.data.token);
                            this.$router.push('/');
                            break;
                    }
                } catch (e) {
                    let data = JSON.parse(e.message);

                    for (let error in data.data.error.errors) {
                        this.errors[`${error}_error`] = data.data.error.errors[error].join('<br>');
                    }
                    
                    this.data.password = '';
                }
            },
            clearError(name) {
                this.errors[`${name}_error`] = '';
            },
        }
    }
</script>

<style scoped>

</style>