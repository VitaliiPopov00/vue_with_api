<template>
    <div class="container">
        <h2 class="mb-2">Редактирование объявления</h2>
        <form class="row" v-if="isDataLoad">
            <div class="mb-3 col-lg-6">
                <label class="form-label">Клеймо</label>
                <input v-model="data.mark" type="text" class="form-control" :class="{ 'is-invalid': errors.mark_error }" placeholder="Клеймо">
                <div class="invalid-feedback">
                    {{ errors.mark_error }}
                </div>
            </div>
            <div class="mb-3 col-lg-6">
                <label for="formFile1" class="form-label">Загрузите фотографию</label>
                <input class="form-control" type="file" ref="photo1" id="formFile1" :class="{ 'is-invalid': errors.photo1_error }" @change="uploadFile('1')">
                <div class="invalid-feedback">
                    {{ errors.photo1_error }}
                </div>
            </div>
            <div class="mb-3 col-lg-6">
                <label for="formFile2" class="form-label">Загрузите фотографию</label>
                <input class="form-control" type="file" ref="photo2" id="formFile2" :class="{ 'is-invalid': errors.photo2_error }" @change="uploadFile('2')">
                <div class="invalid-feedback">
                    {{ errors.photo2_error }}
                </div>
            </div>
            <div class="mb-3 col-lg-6">
                <label for="formFile3" class="form-label">Загрузите фотографию</label>
                <input class="form-control" type="file" ref="photo3" id="formFile3" :class="{ 'is-invalid': errors.photo3_error }" @change="uploadFile('3')">
                <div class="invalid-feedback">
                    {{ errors.photo3_error }}
                </div>
            </div>
            <label class="form-label">Описание животного и(или) места</label>
            <div class="mb-3 col-lg-12">
                <textarea @input="errors.description_error = false" v-model="data.description" :class="{ 'is-invalid': errors.description_error }" class="form-control"></textarea>
                <div class="invalid-feedback">
                    {{ errors.description_error }}
                </div>
            </div>
            <div class="mb-3 col-lg-2">
                <button @click.prevent="fetchUpdate" class="btn btn-primary">Разместить</button>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isDataLoad: false,
                data: {
                    mark: '',
                    description: '',
                    photo1: '',
                    photo2: '',
                    photo3: '',
                },
                errors: {
                    mark_error: false,
                    description_error: false,
                    photo1_error: false,
                    photo2_error: false,
                    photo3_error: false,
                }
            }
        },
        methods: {
            async fetchFindOrder() {
                try {
                    let response = await fetch(localStorage.getItem('homeUrl') + 'api/pets/' + this.$route.params.id);

                    if (response.ok) {
                        let data = await response.json();

                        this.data.mark = data.data.pet.mark;
                        this.data.description = data.data.pet.description;
                        this.isDataLoad = true;
                    }
                } catch(e) {
                    console.log(e.message);
                }
            },
            async fetchUpdate() {
                try {
                    let data = new FormData();

                    for (let itemName in this.data) {
                        data.append(itemName, this.data[itemName]);
                    }

                    let response = await fetch(localStorage.getItem('homeUrl') + 'api/pets/' + this.$route.params.id, {
                        method: "PATCH",
                        headers: {
                            "Authorization": "Bearer " + localStorage.getItem('token'),
                        },
                        body: data,
                    });

                    let dataResult = await response.json();

                    if (!response.ok) {
                        if (response.status == 403) {
                            this.$router.push('/');
                        } else {
                            throw Error(JSON.stringify(dataResult))
                        }

                    }
                } catch(e) {
                    let data = JSON.parse(e.message);

                    for (let error in data.data.error.errors) {
                        this.errors[`${error}_error`] = data.data.error.errors[error].join('<br>');
                    }
                }
            },
            uploadFile(id) {
                this.errors[`photo${id}_error`] = false;
                this.data[`photo${id}`] = this.$refs[`photo${id}`].files[0];
            }
        },
        mounted() {
            this.fetchFindOrder();
        }
    }
</script>

<style scoped>

</style>