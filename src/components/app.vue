<template>
    <div v-if="$route.meta.layout">
        <admin-header></admin-header>
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-3 col-md-2 sidebar">
                    <admin-nav></admin-nav>
                </div>
                <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
                    <keep-alive>
                        <router-view v-if="$route.meta.keepAlive"></router-view>
                    </keep-alive>
                    <router-view v-if="!$route.meta.keepAlive"></router-view>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
</template>

<script>
    import Vue from 'vue'
    import AdminNav from "@/components/nav.vue"
    import AdminHeader from "@/components/header.vue"

    import "@/assets/css/main.css"

    export default {
        name:"App",
        data:function () {
            return {
                "title":"冒险后台管理系统",
            }
        },
        methods:{
            changeTitle:function (val) {
                document.title = val;
            }
        },
        components:{
            AdminNav,
            AdminHeader
        }
    }
</script>