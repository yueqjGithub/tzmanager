<template>
    <div class="user">
        <h1 class="page-header">用户管理</h1>
        <div class="row">
            <div class="col-md-12">
                <div class="table-responsive">
                    <table id="order_table" class="table table-striped table-bordered table-hover table-full-width">
                        <thead>
                        <tr>
                            <th class="">设备号</th>
                            <th>Account</th>
                            <th>Name</th>
                            <th>注册时间</th>
                            <th>登录时间</th>
                            <th>等级</th>
                            <th>金币</th>
                            <th>钻石</th>
                            <th>邮件数量</th>
                            <th>礼物数量</th>
                        </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import urls from '@/config/api'
    import moment from 'moment'

    export default {
        name: 'User',
        data: function () {
            return {
                table: null
            }
        },
        mounted:function () {
            this.table = $("#order_table").DataTable(tableOption);
        }
    }

    let tableOption = {
        autoWidth:false,
        processing: true,
        serverSide: true,
        searching: false,
        ordering: true,
        order: [[0,"desc"]],
        bStateSave: true,
        columnDefs: [{orderable: false, aTargets:[0,1]}],
        ajax:{
            url: urls.getUserList,
            type: "post",
            data: function (d) {
                let data = {};
                let column = d["order"][0]["column"];
                data = {
                    draw: d["draw"],
                    offset: d["start"],
                    limit: d["length"],
                    order: d["order"][0]["dir"],
                    sort: d["columns"][column]["data"]
                };
                console.log(d)
                return data
            }
        },
        columns: [
//            {"Id":"5b56e293b5cd4d2dc0d318cb","Account":"","Name":"特种部队","CreateTime":1532420755,"LoginTime":1532420755,"Level":1,"Money":1000,"Diamond":0,"Mails_Data":[],"Gifts_Data":[]}
            {"data":"DevID"},
            {"data":"Account"},
            {"data":"Name"},
            {
                "data":"CreateTime",
                "render":function (data, type, full) {
                    let elem = "";
                    if(data){
                        elem = moment.unix(data).format("YYYY-MM-DD HH:mm:ss");
                    }
                    return elem;
                }
            },
            {
                "data":"LoginTime",
                "render":function (data, type, full) {
                    let elem = "";
                    if(data){
                        elem = moment.unix(data).format("YYYY-MM-DD HH:mm:ss");
                    }
                    return elem;
                }
            },
            {"data":"Level"},
            {"data":"Money"},
            {"data":"Diamond"},
            {
                "data":"Mails_Data",
                "render":function (data,type,full){
                    let elem = "";
                    elem = data.length;
                    return elem
                }
            },
            {
                "data":"Gifts_Data",
                "render":function (data,type,full){
                    let elem = "";
                    elem = data.length;
                    return elem
                }
            },
        ]
    }
</script>