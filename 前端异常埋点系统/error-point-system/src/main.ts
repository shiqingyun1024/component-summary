import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import uploadErr from '../plugins/uploadErr'
let app = createApp(App);

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
    //TODO:上报逻辑
    uploadErr(err)
    console.log(err, vm, info);
};

app.use(store).use(router).mount('#app')
