import sessionstorage from 'sessionstorage'
import Admin from '@/model/admin'
import api_admin from '@/api/admin'
import serialize from '@/lib/serialize'

const state = {
    user: Admin.New(),
    guest: true
};

const actions = {
    login: function (context,params) {
        return new Promise(function (resolve, reject) {
            api_admin.login(params).then(function (res) {
                let data = res.data;
                if(!data.status){
                    return reject(new Error(data.msg));
                }
                let user = Admin.New(data.data);
                context.commit('setUser',user);
                resolve(user);
            }).catch(function (err) {
                reject(err);
            })
        });

    },
    logout: function (context,callback) {
        return new Promise(function (resolve, reject) {
            api_admin.logout().then(function (res) {
                let data = res.data;
                if(!data.status){
                    return reject(new Error(data.msg));
                }
                context.commit("setUser",null);
                return resolve();
            }).catch(function (err) {
                reject(err)
            })
        });

    },
    getAdminInfo: function (context) {
        return new Promise(function (resolve, reject) {
            api_admin.getAdminInfo().then(function (res) {
                let data = res.data;
                if(!data.status){
                    return reject(new Error(data.msg));
                }
                let user = Admin.New(data.data);
                context.commit("setUser",user);
                resolve(user);
            }).catch(function (err) {
                reject(err);
            })
        })
    }
};

const mutations = {
    setUser: function (state, user) {
        state.user = user;
        if(user){
            state.guest = false;
        }else {
            state.guest = true;
        }
        sessionstorage.setItem("admin/user",serialize.serialize(state.user));
        sessionstorage.setItem("admin/guest",serialize.serialize(state.guest));
    }
};

const getters = {
    user: function (state,getters) {
        let user = sessionstorage.getItem("admin/user");
        if(user){
            state.user = Admin.New(serialize.deserialize(user));
        }

        return state.user;
    },
    guest:function (state) {
        let guest = sessionstorage.getItem("admin/guest");
        // console.log(guest)
        if(guest!==null){
            state.guest = serialize.deserialize(guest);
        }
        return state.guest;
    }
};


export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}