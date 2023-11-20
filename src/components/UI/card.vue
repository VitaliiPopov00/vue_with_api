<template>
    <div class="col-md-4">
        <div class="card mx-2">
            <img src="images/plug.png" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">{{ pet.kind }}</h5>
                <p class="card-text">{{ pet.description }}</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">{{ pet.district }}</li>
                <li class="list-group-item">{{ pet.mark }}</li>
                <li class="list-group-item">{{ pet.phone }}</li>
                <li class="list-group-item">{{ pet.name }}</li>
                <li class="list-group-item">{{ pet.date }}</li>
            </ul>
            <div class="card-body" :class="{ 'alert-success': pet.registred, 'alert-danger': !pet.registred }">
                {{ pet.registred ? 'Зарегистрированный пользователь' : 'Незарегистрированный пользователь' }}
            </div>
            <div class="card-body">
                <a href="#" @click.prevent="$router.push('/pet/' + pet.id)" class="card-link">Перейти к публикации</a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "cardPet",
        props: {
            pet: {
                type: Object,
                required: true,
            },
        },
    }
</script>

<style scoped>

</style>