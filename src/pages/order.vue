<template>
    <div class="order">
        <h1 class="page-header">支付宝订单管理</h1>
        <div class="row">
            <div class="col-md-12">
                <div class="table-responsive">
                    <table id="order_table" class="table table-striped table-bordered table-hover table-full-width">
                        <thead>
                            <tr>
                                <th>订单号</th>
                                <th>设备号</th>
                                <th>交易金额</th>
                                <th>金币</th>
                                <th>三方交易号</th>
                                <th>状态</th>
                                <th>类型</th>
                                <th>支付时间</th>
                                <th>创建时间</th>
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
        name: 'Order',
        data: function () {
            return {
                table: null
            }
        },
        created: function () {

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
        columnDefs: [{orderable: false, aTargets:[2]}],
        ajax:{
            url: urls.getOrderList,
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
                return data
            }
        },
        columns: [
            {"data":"order_no"},
            {"data":"dev_id"},
            {"data":"money"},
            {
                "data":"product_id",
                "render":function (data, type, full) {
                    let elem = "";
                    elem = data.split(".");
                    let res;
                    if (elem[1] === "M") {
                        res = "金币*"+elem[2]
                    }else if (elem[1] === "D") {
                        res = "钻石*"+elem[2]
                    }
                    return res
                }
            },
            {"data":"trade_no"},
            {
                "data":"status",
                "render":function (data, type, full) {
                    let elem = "";
                    data = data|0;
                    switch (data){
                        case 0:
                            elem = "未支付";
                            break;
                        case 1:
                            elem = "已支付";
                            break;
                        default:
                            elem = "错误状态"
                    }
                    return elem;
                }
            },
            {
                "data":"type",
                "render":function (data, type, full) {
                    let elem = "";
                    data = data|0;
                    switch (data){
                        case 0:
                            elem = "充值金币";
                            break;
                        case 1:
                            elem = "充值钻石";
                            break;
                        default:
                            elem = "错误类型"
                    }
                    return elem;
                }
            },
            {
                "data":"pay_time",
                "render":function (data, type, full) {
                    let elem = "";
                    if(data){
                        elem = moment.unix(data).format("YYYY-MM-DD HH:mm:ss");
                    }
                    return elem;
                }
            },
            {
                "data":"create_time",
                "render":function (data, type, full) {
                    let elem = "";
                    elem = moment.unix(data).format("YYYY-MM-DD HH:mm:ss");
                    return elem;
                }
            },
        ]
    }
</script>

<style scoped>

</style>