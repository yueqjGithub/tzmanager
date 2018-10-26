<template>
    <ul class="nav nav-sidebar">
        <li v-for="m in modules" v-if="m.enable">
            <router-link :to="m.link" v-if="!m.child">{{m.name}}</router-link>
            <ul v-if="m.child" class="nav fnav">
                <li @click="jump(m.link)" class="navtit">{{m.name}}</li>
                <li v-for="k in m.child" v-if="k.enable">
                    <router-link :to="k.link.name">{{k.name}}</router-link>
                </li>
            </ul>
        </li>
    </ul>
</template>

<script>
    import modules from '@/config/modules'

    export default {
        name: 'AdminNav',
        data: function () {
            return {
                modules: modules
            }
        },
        methods: {
            jump: function (url) {
                this.$router.push({path:'/'+url.name})
            }
        }
    }
</script>

<style scoped>
    .fnav li{
        padding-left: 20px;
    }
    .fnav li:first-child{
        color: #337ab7;
        text-decoration: none;
        cursor:pointer
    }
    .navtit{
        padding:10px 0px;
    }
    .navtit:hover{
        background-color: #eee;
    }
</style>