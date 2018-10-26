const axios = require('axios');
const qs = require('qs');
const urls = require('../config/api');

const request = axios.create({
    // headers:{"access-token":""}
    timeout:5000,
    transformResponse: [function (data) {
        // 这里提前处理返回的数据
        if(typeof data == 'string')
        {
            return JSON.parse(data);
        }
        return data;
    }],
});


/**
 * 管理员登录
 * @param {Object} params
 * @returns {*|PromiseLike<vuejs.HttpResponse>|AxiosPromise<any>}
 */
exports.login = function (params) {
    return request.post(urls.login,qs.stringify(params));
};

/**
 * 管理员退出登录
 * @returns {*|PromiseLike<vuejs.HttpResponse>|AxiosPromise<any>}
 */
exports.logout = function () {
    return request.post(urls.logout);
};

/**
 * 获取管理员信息
 * @returns {*|PromiseLike<vuejs.HttpResponse>|AxiosPromise<any>}
 */
exports.getAdminInfo= function () {
    return request.post(urls.getAdminInfo);
};

/**
 * 发送单人礼物
 * @returns {*|PromiseLike<vuejs.HttpResponse>|AxiosPromise<any>}
 */
exports.sendGift= function (params) {
    return request.post(urls.sendMail,qs.stringify(params));
};

/**
 * 发送全体礼物
 * @returns {*|PromiseLike<vuejs.HttpResponse>|AxiosPromise<any>}
 */
exports.sendAllGift= function (params) {
    return request.post(urls.sendAllMail,qs.stringify(params));
};

/**
 * 获取礼物列表
 * @returns {*|PromiseLike<vuejs.HttpResponse>|AxiosPromise<any>}
 */
exports.getGiftList= function () {
    return request.get(urls.getGiftList);
};



