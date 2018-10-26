<template>
    <nav class="navbar navbar-inverse navbar-fixed-top">
        <div class="container-fluid">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <router-link to="/" tag="a" class="navbar-brand">{{project_name}}</router-link>
            </div>
            <div id="navbar" class="navbar-collapse collapse">
                <ul class="nav navbar-nav navbar-right">
                    <li><a href="#">{{admin.nickname}}</a></li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
    import {mapState} from 'vuex'
    import config from '@/config'

    export default {
        name: "AdminHeader",
        props:['m'],
        data: function () {
            return {
                project_name:config.name
            }
        },
        computed: {
            ...mapState('admin',{
                admin: state => state.user
            })
        }
    }

</script>

<style scoped>

</style>