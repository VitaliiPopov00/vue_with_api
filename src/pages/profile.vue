<template>
    <div class="container">
        <h2>Профиль</h2>
        <div class="card-body">
            <p class="h5">Имя пользователя</p>
            <p class="h5">E-mail пользователя <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#telModal">Изменить</button></p>
            <p class="h5">Телефон пользователя <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#emailModal">Изменить</button></p>
            <p class="h5">Дата регистрации пользователя</p>
            <p class="h5">Количество дней с момента регистрации на сайте</p>
            <p class="h5">Количество животных пользователя, у которых нашлись хозяева</p>
        </div>
    </div>
    
    <div class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Изменить номер телефона</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <input type="tel" class="form-control" placeholder="Ваш новый телефон">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                    <button type="button" class="btn btn-primary">Сохранить изменения</button>
                </div>
            </div>
        </div>
    </div>
    
    <div class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Изменить e-mail</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <input type="email" class="form-control" placeholder="Ваш новый e-mail">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                    <button type="button" class="btn btn-primary">Сохранить изменения</button>
                </div>
            </div>
        </div>
    </div>
    
    <div class="container">
        <h2>Ваши объявления</h2>
        <div class="row g-3">
            <div class="col-md-6">
                <div class="card mx-2">
    
                    <img src="images/plug.png" class="card-img-top" alt="...">
    
                    <div class="card-body">
                        <h5 class="card-title">Вид животного</h5>
                        <p class="card-text">Описание</p>
                    </div>
    
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Район</li>
                        <li class="list-group-item">Клеймо</li>
                        <li class="list-group-item">Дата публикации</li>
                    </ul>
    
                    <div class="card-body">
                        <a href="pet.html" class="card-link">Перейти к публикации</a>
                    </div>
    
                    <button class="btn btn-danger">Удалить</button>
    
                </div>
            </div>
    
    
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>

</style>