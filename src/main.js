import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import components from './components';

if (!localStorage.getItem('homeUrl')) {
    localStorage.setItem('homeUrl', 'http://animal/');
}

const app = createApp(App);

components.forEach(component => {
    app.component(component.name, component);
})

app.use(router).mount('#app');
