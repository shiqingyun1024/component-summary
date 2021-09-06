import Raven from "raven-js";
import TraceKit from 'tracekit'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {uploadErr,uploadErr2} from '../plugins/uploadErr'
let app = createApp(App);

// 我们先注册一个订阅者
TraceKit.report.subscribe((errorReport) => {
    // 在这里可以通过ajax进行数据上报
    console.log('转哈');
    console.log(errorReport)
    uploadErr2(errorReport.stack)
})

window.addEventListener("error", (e) => {
    console.log(e);
    //TODO:上报逻辑
    uploadErr(e)
    return true;
}, true)

// 处理未捕获的异常，主要是promise内部异常，统一抛给 onerror
window.addEventListener("unhandledrejection", (e) => {
    throw e.reason;
});
// 框架异常统一捕获
app.config.errorHandler = function (err:any, vm, info) {
    // 发布错误信息
    TraceKit.report(err)
};

app.use(store).use(router).mount('#app')
