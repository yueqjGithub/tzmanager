
const modules = [
    {
        name: '用户管理',
        link: {name: 'user'},
        enable: true,
        child:false
    },
    {
        name: '订单管理',
        //有子栏目的，父栏目无专属组件，需要跳转到子路由对应组件的，将link设置为要跳转到的子路由的link属性
        link: {name: 'order'},
        enable: true,
        child: [
            {
                name:'支付宝订单',
                link:{name:'order'},
                enable:true
            },
            {
                name:'IOS订单',
                link:{name:'iosOrder'},
                enable:true
            }
        ]
    },
    {
        name: '发送邮件',
        link: {name: 'gift'},
        enable: true,
        child: false
    }
];

export default modules