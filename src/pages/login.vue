<template>
    <div class="container">
        <form class="form-signin" v-on:submit.prevent="login">
            <h2 class="form-signin-heading">{{title}}</h2>
            <label for="account" class="sr-only">账号</label>
            <input type="text" v-model.lazy.trim="account" id="account" class="form-control password" placeholder="账号" required="" autofocus="">
            <label for="password" class="sr-only">密码</label>
            <input type="password" v-model.lazy.trim="password" id="password" class="form-control" placeholder="密码" required="">
            <div class="checkbox">
                <label>
                    <input type="checkbox" name="remember_me" value="1"> Remember me
                </label>
            </div>
            <button class="btn btn-lg btn-primary btn-block" type="submit" >登录</button>
        </form>
    </div>
</template>

<script>
    import config from '@/config'

    export default {
        name: 'Login',
        data: function () {
            return {
                title: config.name,
                account: '',
                password: ''
            }
        },
        computed: {

        },
        filters: {

        },
        methods: {
            login: function () {
                let self = this;
                let params = {
                    account: this.account,
                    password: this.password
                };
                let loading = layer.load(2);
                this.$store.dispatch('admin/login',params).then(function (user) {
                    layer.msg("登录成功",{icon:1,time:1500});
                    setTimeout(function () {
                        self.$router.push({'path':'/'});
                    },1500);
                }).catch(function (err) {
                    console.log(err)
                    layer.msg(err.message,{icon:5,time:3000});
                }).finally(function () {
                    layer.close(loading);
                });
            }
        },
        created: function () {

        },
        updated: function () {

        }
    }
</script>

<style>
    body {
        padding-top: 40px;
        padding-bottom: 40px;
        background-color: #eee;
    }
</style>

<style scoped>
    .password {
        margin-bottom: 5px;
    }
    .form-signin {
        max-width: 330px;
        padding: 15px;
        margin: 0 auto;
    }
    .form-signin .form-signin-heading,
    .form-signin .checkbox {
        margin-bottom: 10px;
    }
    .form-signin .checkbox {
        font-weight: normal;
    }
    .form-signin .form-control {
        position: relative;
        height: auto;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 10px;
        font-size: 16px;
    }
    .form-signin .form-control:focus {
        z-index: 2;
    }
    .form-signin input[type="email"] {
        margin-bottom: -1px;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
    }
    .form-signin input[type="password"] {
        margin-bottom: 10px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }

</style>