<template>
    <div class="gift">
        <h1 class="page-header">发送邮件</h1>
        <div class="input-group col-md-4 col-lg-4 col-sm-12 col-xs-12">
            <label>发送类型</label>
            <select name="sendType" class="sendType" v-model="sendType">
                <option value="one" selected="selected">发送给指定玩家</option>
                <option value="all">全服发送</option>
            </select>
        </div>
        <div class="input-group col-md-4 col-lg-4 col-sm-12 col-xs-12" v-if="sendType == 'one'">
            <label for="basic-url1">用户ID</label>
            <input type="text" class="form-control" id="basic-url1" placeholder="请输入用户ID" v-model.lazy.trim="account"required>
        </div>
        <div class = "input-group col-md-4 col-lg-4 col-sm-12 col-xs-12">
            <label for="mailtit">信件标题</label>
            <input type="text" v-model = 'mailTitle' id="mailtit" class="form-control">
        </div>
        <div class = "input-group col-md-4 col-lg-4 col-sm-12 col-xs-12">
            <label>发送者</label>
            <input type="text" v-model = 'senderName' class="form-control">
        </div>
        <div class="input-group col-md-4 col-lg-4 col-sm-12 col-xs-12">
            <label>内容</label>
            <textarea name="cont" id="textCount" cols="30" rows="10" v-model="text" class="form-control"></textarea>
        </div>
        <div class="input-group col-md-8 col-lg-4 col-sm-12 col-xs-12">
            <label>物品类型及数量</label>
            <gift-list v-for="k in listCount" @morelist="morelist"></gift-list>
        </div>
        <div class="input-group col-md-4 col-lg-3 col-sm-12 col-xs-12">
            <input class="btn btn-default" type="button" value="提交" @click="subMsg">
        </div>
    </div>
</template>

<script>
    import api_admin from '@/api/admin'
    import giftList from '@/pages/giftSelect.vue'
    export default {
        name: 'gift',
        data() {
            return {
                account: '',
                listCount: 1,
                //发送类型
                sendType: 'one',
                // 标题
                mailTitle: '',
                //发送者
                senderName: '系统',
                //内容
                text: ''
            }
        },
        components:{
          giftList: giftList
        },
        methods: {
            sChange: function () {
                let vm = this
                console.log(vm.sendType)
            },
            subMsg: function () {
                //xiugai
                let itemList = ''
                let len = $('.box').length
                for (let i=0;i<len;i++){
                    let name=$('.box').eq(i).find('.giftName').val()
                    let count=$('.box').eq(i).find('.giftCount').val()
                    count = parseInt(count)
//                    let obj = {
//                        name: name,
//                        count: count
//                    }
//                    gift.push(obj)
                    if (count != 0) {
                        let str =  ''+name+'='+count+','
                        itemList += str
                    }
                }
//                gift = JSON.stringify(gift)
                //xiugai
                let vm = this
                let params = {
                    account: vm.account,
                    mailTitle: vm.mailTitle,
                    senderName: vm.senderName,
                    text:vm.text,
                    itemlist:itemList
                }
                let params_all = {
                    mailTitle: vm.mailTitle,
                    senderName: vm.senderName,
                    text:vm.text,
                    itemlist:itemList
                }
                if(vm.sendType == 'one'){ // 给指定玩家发送
                    if (this.account !== ''&& this.mailTitle !== '' && this.senderName !== '') {
                        api_admin.sendGift(params).then((res)=>{
                            console.log(res)
                            layer.msg(res.data.data)
                        },(err)=>{
                            console.log(err)
                            layer.msg(err)
                        })
                    } else {
                        layer.msg("信息未填写完整")
                    }
                } else if (vm.sendType == 'all') { //全体发送
                    if (this.mailTitle !== '' && this.senderName !== '') {
                        api_admin.sendAllGift(params_all).then((res)=>{
                            console.log(res)
                            layer.msg(res.data.data)
                        },(err)=>{
                            console.log(err)
                            layer.msg(err)
                        })
                    } else {
                        layer.msg("信息未填写完整")
                    }
                }
            },
            morelist: function () {
                this.listCount +=1
            }
        }
    }
</script>

<style scoped>
.gift .input-group {
    margin-bottom: 20px;
}
label{
    font-size: 18px;
    font-weight: 700;
}
    #textCount{
        resize: none;
    }
.sendType {
    display: block;
    width: 41%;
    height: 34px;
    padding: 6px 7px;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 4px;
}
</style>