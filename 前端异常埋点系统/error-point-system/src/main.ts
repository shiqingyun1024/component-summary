import Raven from "raven-js";
import TraceKit from 'tracekit'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import uploadErr from '../plugins/uploadErr'
let app = createApp(App);

// 我们先注册一个订阅者
TraceKit.report.subscribe((errorReport) => {
    // 在这里可以通过ajax进行数据上报
    console.log('转哈');
    console.log(errorReport)
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
    // throw err;
    // console.log(err);
    console.log('1'+err.lineno);
    console.log('2'+err.colno);
    console.log('3'+err.message);
    console.log('4'+err.filename);
    console.log('5'+err.stack);
    console.log('6'+err.stack.lineno);
    console.log('7'+err.stack.colno);
    console.log('8'+err.stack.message);
    console.log('9'+err.stack.stack);
    console.log('10'+err.stack.filename);
    // console.log('对象'+{...err});
    // console.log(err.stack.toString());
    // console.log(typeof err);
    // console.log(JSON.stringify(err));
    // console.log(vm);
    // console.log(info);
    //TODO:上报逻辑
    uploadErr({...err.stack})
    // console.log(err, vm, info);
};

app.use(store).use(router).mount('#app')
