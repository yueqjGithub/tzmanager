import store from '@/store'

export function auth(to,from,next) {
    let guest = store.getters['admin/guest'];

    if(guest){
        store.dispatch("admin/getAdminInfo").then(function () {
            return next();
        }).catch(function () {
            return next({'name':'login'});
        });
    }else {
        return next();
    }
}
