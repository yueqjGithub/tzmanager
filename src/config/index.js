const api = require('./api');
const host = window.location.origin+window.location.pathname;
module.exports = {
    name: '特种部队后台管理系统',
    api: api,
    host:host
};