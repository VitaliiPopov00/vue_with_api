<template>
    <div class="container">
        <h2 class="mb-2">Поиск</h2>
        <form class="row">
            <div class="mb-3 col-lg-4">
                <label class="form-label">Имя</label>
                <input type="text" class="form-control" placeholder="Ваше имя">
            </div>
            <div class="mb-3 col-lg-4">
                <label class="form-label">Телефон</label>
                <input type="text" class="form-control" placeholder="Ваш телефон">
            </div>
            <div class="mb-3 col-lg-4">
                <label for="e-mail" class="form-label">E-mail</label>
                <input type="text" class="form-control" id="e-mail" placeholder="Ваш e-mail">
            </div>
            <div class="mb-3 col-lg-6">
                <label class="form-label">Район</label>
                <select  class="form-select" placeholder="">
                    <option selected disabled>
                        Район, в котором вы нашли животное
                    </option>
                    <option value="Район 1">
                        Район 1
                    </option>
                </select>
            </div>
            <div class="mb-3 col-lg-6">
                <label class="form-label">Вид</label>
                <select  class="form-select" placeholder="Вид животного">
                    <option selected disabled>
                        Вид животного
                    </option>
                    <option value="Вид 1">
                        Вид 1
                    </option>
                </select>
            </div>
            <div class="mb-3 col-lg-6">
                <label class="form-label">Клеймо</label>
                <input type="text" class="form-control" placeholder="Вид животного">
            </div>
            <div class="mb-3 col-lg-6">
                <label for="formFile1" class="form-label">Загрузите фотографию</label>
                <input class="form-control" type="file" id="formFile1">
            </div>
            <div class="mb-3 col-lg-6">
                <label for="formFile2" class="form-label">Загрузите фотографию</label>
                <input class="form-control" type="file" id="formFile2">
            </div>
            <div class="mb-3 col-lg-6">
                <label for="formFile3" class="form-label">Загрузите фотографию</label>
                <input class="form-control" type="file" id="formFile3">
            </div>
            <label class="form-label">Описание животного и(или) места</label>
            <div class="mb-3 col-lg-12">
                <textarea class="form-control"></textarea>
            </div>
            <div class="mb-3 col-lg-12">
                <input type="checkbox" class="form-check-label" placeholder="Вид животного">
                <label class="form-label">Согласие на обработку персональных данных</label>
            </div>
            <div class="mb-3 col-lg-12">
                <input type="checkbox" class="form-check-label" placeholder="Вид животного">
                <label class="form-label">Зарегестрироваться</label>
            </div>
            <div class="mb-3 col-lg-6">
                <label>Пароль</label>
                <input type="password" class="form-control">
            </div>
            <div class="mb-3 col-lg-6">
                <label>Повторите пароль</label>
                <input type="password" class="form-control">
            </div>
            <div class="mb-3 col-lg-2">
                <button class="btn btn-primary">Разместить</button>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>

</style>