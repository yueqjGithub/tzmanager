import Vue from 'vue'
import App from '@/components/app.vue'
import router from '@/router'
import store from '@/store'
import '@/events'
import Promise from 'promise'
import '@/lib/plugs'
import $ from 'jquery'
import axios from 'axios'
Vue.prototype.$axios= axios

window.Promise = Promise;

const app = new Vue({
    el:'#app',
    components:{App},
    template:'<App/>',
    router,
    store,
    data:function () {
        return {
            message:'Hello world'
        }
    }
});

router.beforeEach(function (to, from, next) {
    let url  =to.fullPath;
    return next();
});





