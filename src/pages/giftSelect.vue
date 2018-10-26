<template>
    <div class="box" v-if="needShow">
        <select name="giftName" class="giftName">
            <option v-for="k in giftList" :key="k.index" :value="k.ItemID">{{k.ItemName}}</option>
        </select>
        <input type="number" v-model="count" min="0" class="giftCount">
        <div class="inc_button" @click = "inclist">
            <img src="../assets/img/inc.png" alt="">
        </div>
        <div  class="inc_button" @click="removeSelf">
            <img src="../assets/img/uninc.png" alt="">
        </div>
    </div>
</template>

<script>
    import api_admin from '@/api/admin'
    export default {
        name: '',
        data() {
            return {
                giftList: [],
                count: 0,
                needShow: true
            }
        },
        created:function () {
            let vm = this
            api_admin.getGiftList().then(function (res) {
                vm.giftList = res.data.data
            },function (err) {
                console.log(err)
            })
        },
        methods: {
            inclist: function () {
                this.$emit('morelist')
            },
            removeSelf: function (){
                this.needShow = false
            }
        }
    }
</script>

<style scoped>
.flow-ul {
    max-height: 270px;
    overflow-y: scroll;
}
    .box {
        padding: 0;
        display: flex;
        justify-content: space-between;
        margin:7px auto;
    }
    .giftName {
        display: block;
        width: 41%;
        height: 34px;
        padding: 6px 12px;
        font-size: 14px;
        line-height: 1.42857143;
        color: #555;
        background-color: #fff;
        background-image: none;
        border: 1px solid #ccc;
        border-radius: 4px;
    }
    .giftCount {
        display: block;
        width: 41%;
        height: 34px;
        padding: 6px 12px;
        font-size: 14px;
        line-height: 1.42857143;
        color: #555;
        background-color: #fff;
        background-image: none;
        border: 1px solid #ccc;
        border-radius: 4px;
    }
    .inc_button {
        width: 6%;
    }
    .inc_button img {
        max-width: 100%;
    }
</style>