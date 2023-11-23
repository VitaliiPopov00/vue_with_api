<template>
    <div class="container">
        <form class="row">
            <label class="form-label h3">Подпишитесь, чтобы получать наши новости первыми!</label>
            <div class="mb-3 col-md-10 input-group">
                <input 
                    v-model.trim="data.email" 
                    @input="error = false; success = false" 
                    type="email" 
                    class="form-control"
                    :class="{ 'is-invalid': error }"
                    placeholder="Ваша почта">
                <button @click.prevent="setSubscription" type="submit" class="btn btn-primary">Подписаться</button>
            </div>
        </form>
        <div v-if="success" class="alert-success col-12 p-3">Вы успешно подписались на наши уведомления!</div>
        <div v-if="error" class="alert-danger col-12 p-3">{{ error }}</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            data: {
                email: '',
            },
            error: false,
            success: false,
        }
    },
    methods: {
        async setSubscription() {
            this.error = false;
            this.success = false;

            try {
                let response = await fetch(localStorage.getItem('homeUrl') + 'api/subscription', {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(this.data),
                    });
                    
                if (response.status > 400) {
                    let data = await response.json();
                    throw new Error(JSON.stringify(data));
                } else {
                    this.success = true;
                }
            } catch (e) {
                let error = JSON.parse(e.message);
                this.error = error.data.error.message
            }
        },
    },
}
</script>

<style scoped></style>