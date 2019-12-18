import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';

// @ is an alias to /src
import '@/styles/normalize.css';
import '@/styles/index.scss';

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
