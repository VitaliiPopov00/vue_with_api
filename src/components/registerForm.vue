<template>
    <form action="profile.html" class="sign-height">
        <h2 class="mb-3">Регистрация пользователя</h2>
        <div class="form-floating mb-3">
            <input @input="clearError('name')" v-model="data.name" type="text" name="name" class="form-control" :class="{ 'is-invalid': errors.name_error }" placeholder=".">
            <label>Имя</label>
            <div class="invalid-feedback">
                {{ errors.name_error }}
            </div>
        </div>
        <div class="form-floating mb-3">
            <input @input="clearError('phone')" v-model="data.phone" type="tel" name="phone" class="form-control" :class="{ 'is-invalid': errors.phone_error }" placeholder=".">
            <label>Телефон</label>
            <div class="invalid-feedback">
                {{ errors.phone_error }}
            </div>
        </div>
        <div class="form-floating mb-3">
            <input @input="clearError('email')" v-model="data.email" type="email" name="email" class="form-control" :class="{ 'is-invalid': errors.email_error }" placeholder=".">
            <label>E-mail</label>
            <div class="invalid-feedback">
                {{ errors.email_error }}
            </div>
        </div>
        <div class="form-floating mb-3">
            <input @input="clearError('password')" v-model="data.password" type="password" name="password" class="form-control" :class="{ 'is-invalid': errors.password_error }" placeholder=".">
            <label>Пароль</label>
            <div class="invalid-feedback">
                {{ errors.password_error }}
            </div>
        </div>
        <div class="form-floating mb-3">
            <input @input="clearError('password_repeat')" v-model="data.password_repeat" type="password" name="password_repeat" class="form-control" :class="{ 'is-invalid': errors.password_repeat_error }" placeholder=".">
            <label>Повторите пароль</label>
            <div class="invalid-feedback">
                {{ errors.password_repeat_error }}
            </div>
        </div>
        <div class="mb-3 form-check d-flex justify-content-center">
            <div class="mx-1">
                <input @change="clearError('confirm')" v-model="data.confirm" id="checkbox_confirm" type="checkbox" name="confirm" class="form-check-input" :class="{ 'is-invalid': errors.confirm_error }">
            </div>
            <label class="form-check-label" for="checkbox_confirm">Согласие на обработку персональных данных</label>
        </div>
        <div class="d-flex justify-content-center">
            <button @click.prevent="register" class="btn btn-primary">Зарегистрироваться</button>
        </div>
    </form>
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
                errors: {
                    name_error: '',
                    phone_error: '',
                    email_error: '',
                    password_error: '',
                    password_repeat_error: '',
                    confirm_error: '',
                }
            }
        },
        methods: {
            async register() {
                try {
                    let response = await fetch(localStorage.getItem('homeUrl') + 'api/register', {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(this.data),
                    });

                    if (response.status > 400) {
                        throw new Error(JSON.stringify(await response.json()));
                    } else {
                        this.$router.push('/')
                    }
                } catch (e) {
                    let data = JSON.parse(e.message);

                    for (let error in data.data.error.errors) {
                        this.errors[`${error}_error`] = data.data.error.errors[error].join('<br>');
                    }
                    
                    this.data.password = '';
                    this.data.password_repeat = '';
                    this.data.confirm = false;
                }
            },
            clearError(name) {
                this.errors[`${name}_error`] = '';
            }
        }
    }
</script>

<style scoped>

</style>