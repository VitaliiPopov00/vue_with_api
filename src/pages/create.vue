<template>
    <div class="container">
        <h2 class="mb-2">Поиск</h2>
        <form class="row">
            <div class="mb-3 col-lg-4">
                <label class="form-label">Имя</label>
                <input v-model="data.name" type="text" class="form-control" :class="{ 'is-invalid': errors.name_error }" placeholder="Ваше имя">
                <div class="invalid-feedback">
                    {{ errors.name_error }}
                </div>
            </div>
            <div class="mb-3 col-lg-4">
                <label class="form-label">Телефон</label>
                <input v-model="data.phone" type="text" class="form-control" :class="{ 'is-invalid': errors.phone_error }" placeholder="Ваш телефон">
                <div class="invalid-feedback">
                    {{ errors.phone_error }}
                </div>
            </div>
            <div class="mb-3 col-lg-4">
                <label for="e-mail" class="form-label">E-mail</label>
                <input v-model="data.email" type="text" class="form-control" :class="{ 'is-invalid': errors.email_error }" id="e-mail" placeholder="Ваш e-mail">
                <div class="invalid-feedback">
                    {{ errors.email_error }}
                </div>
            </div>
            <div class="mb-3 col-lg-6">
                <label class="form-label">Район</label>
                <select v-model="data.district" class="form-select" :class="{ 'is-invalid': errors.district_error }" placeholder="">
                    <option selected disabled value="">
                        Район, в котором вы нашли животное
                    </option>
                    <option v-for="district in districts" :key="district.id" :value="district.district">
                        {{ district.district }}
                    </option>
                </select>
                <div class="invalid-feedback">
                    {{ errors.district_error }}
                </div>
            </div>
            <div class="mb-3 col-lg-6">
                <label class="form-label">Вид</label>
                <select v-model="data.kind" class="form-select" :class="{ 'is-invalid': errors.kind_error }" placeholder="Вид животного">
                    <option selected disabled value="">
                        Вид животного
                    </option>
                    <option v-for="kind in kinds" :key="kind.id" :value="kind.kind">
                        {{ kind.kind }}
                    </option>
                </select>
                <div class="invalid-feedback">
                    {{ errors.kind_error }}
                </div>
            </div>
            <div class="mb-3 col-lg-6">
                <label class="form-label">Клеймо</label>
                <input v-model="data.mark" type="text" class="form-control" :class="{ 'is-invalid': errors.mark_error }" placeholder="Вид животного">
                <div class="invalid-feedback">
                    {{ errors.mark_error }}
                </div>
            </div>
            <div class="mb-3 col-lg-6">
                <label for="formFile1" class="form-label">Загрузите фотографию</label>
                <input class="form-control" ref="photo1" :class="{ 'is-invalid': errors.photo1_error }" @change="uploadFile(1)" type="file" id="formFile1">
                <div class="invalid-feedback">
                    {{ errors.photo1_error }}
                </div>
            </div>
            <div class="mb-3 col-lg-6">
                <label for="formFile2" class="form-label">Загрузите фотографию</label>
                <input class="form-control" ref="photo2" :class="{ 'is-invalid': errors.photo2_error }" @change="uploadFile(2)" type="file" id="formFile2">
                <div class="invalid-feedback">
                    {{ errors.photo2_error }}
                </div>
            </div>
            <div class="mb-3 col-lg-6">
                <label for="formFile3" class="form-label">Загрузите фотографию</label>
                <input class="form-control" ref="photo3" :class="{ 'is-invalid': errors.photo3_error }" @change="uploadFile(3)" type="file" id="formFile3">
                <div class="invalid-feedback">
                    {{ errors.photo3_error }}
                </div>
            </div>
            <label class="form-label">Описание животного и(или) места</label>
            <div class="mb-3 col-lg-12">
                <textarea v-model="data.description" class="form-control" :class="{ 'is-invalid': errors.description_error }"></textarea>
                <div class="invalid-feedback">
                    {{ errors.description_error }}
                </div>
            </div>
            <div class="mb-3 col-lg-12">
                <input v-model="data.confirm" :class="{ 'is-invalid': errors.confirm_error }" type="checkbox" class="form-check-label" placeholder="Вид животного">
                <label class="form-label">Согласие на обработку персональных данных</label>
            </div>
            <div class="mb-3 col-lg-12" v-if="!isAuthUser">
                <input v-model="registerToogle" type="checkbox" class="form-check-label" placeholder="Вид животного">
                <label class="form-label">Зарегестрироваться</label>
            </div>
            <div class="mb-3 col-lg-6" v-if="registerToogle">
                <label>Пароль</label>
                <input type="password" class="form-control">
            </div>
            <div class="mb-3 col-lg-6" v-if="registerToogle">
                <label>Повторите пароль</label>
                <input type="password" class="form-control">
            </div>
            <div class="mb-3 col-lg-2">
                <button @click.prevent="fetchCreare" class="btn btn-primary">Разместить</button>
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
                    district: '',
                    kind: '',
                    confirm: false,
                    mark: '',
                    description: '',
                    photo1: '',
                    photo2: '',
                    photo3: '',
                },
                errors: {
                    name_error: false,
                    phone_error: false,
                    email_error: false,
                    district_error: false,
                    kind_error: false,
                    confirm_error: false,
                    mark_error: false,
                    description_error: false,
                    photo1_error: false,
                    photo2_error: false,
                    photo3_error: false,
                },
                districts: [],
                kinds: [],
                registerToogle: false,
                isAuthUser: Boolean(localStorage.getItem('token')),
            }
        },
        methods: {
            async fetchCreare() {
                try {
                    let data = new FormData();

                    for (let itemName in this.data) {
                        data.append(itemName, this.data[itemName]);
                    }

                    let response = await fetch(localStorage.getItem('homeUrl') + 'api/pets/new', {
                        method: "POST",
                        body: data,
                    });

                    let dataResult = await response.json();

                    if (response.ok) {
                    } else {
                        throw Error(JSON.stringify(dataResult));
                    }
                } catch(e) {
                    let data = JSON.parse(e.message);

                    for (let error in data.data.error.errors) {
                        this.errors[`${error}_error`] = data.data.error.errors[error].join('<br>');
                    }
                }
            },
            async fetchUser() {
                try {
                    let response = await fetch(localStorage.getItem('homeUrl') + 'api/users', {
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('token'),
                        },
                    });

                    if (response.ok) {
                        let data = await response.json();
                        this.data.name = data.data.user.name;
                        this.data.phone = data.data.user.phone;
                        this.data.email = data.data.user.email;
                    }
                } catch(e) {
                    console.log(e.message);
                }
            },
            async fetchDistricts() {
                try {
                    let response = await fetch(localStorage.getItem('homeUrl') + 'api/districts');
                    let data = await response.json();

                    this.districts = data.data.districts;
                } catch(e) {
                    console.log(e.message);
                }
            },
            async fetchKinds() {
                try {
                    let response = await fetch(localStorage.getItem('homeUrl') + 'api/kinds');
                    let data = await response.json();

                    this.kinds = data.data.kinds;
                } catch(e) {
                    console.log(e.message);
                }
            },
            uploadFile(id) {
                this.errors[`photo${id}_error`] = false;
                this.data[`photo${id}`] = this.$refs[`photo${id}`].files[0];
            },
        },
        mounted() {
            this.fetchUser();
            this.fetchDistricts();
            this.fetchKinds();
        }
    }
</script>

<style scoped>

</style>