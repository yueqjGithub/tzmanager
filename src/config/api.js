const host = "http://192.168.0.36:8808";
const host2 = "http://192.168.0.88:8801";//内网环境

module.exports= {
    login:host+"/admin/login",
    logout:host+"/admin/logout",
    getAdminInfo:host+"/admin/getAdminInfo",
    getOrderList:host+"/admin/getOrderList",
    getUserList:host+"/admin/getUserList",
    sendGift: host+"/admin/sendGift",
    getIosOrderList:host+"/admin/iosOrder",
    getGiftList:host+"/admin/giftList",
    sendMail: host+"/addMail",
    sendAllMail: host+"/allAddMail"
};