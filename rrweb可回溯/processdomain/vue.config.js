const webpack = require('webpack');
console.log(process.env.NODE_ENV);
const domain = {
    dev: {
      'oss': '//oss.anyitech.ltd'
    },
    prod: {
      'oss': '//oss.airiskeys.com'
    }
}
/**
 * 冲刺：字节，拼多多，虾皮，美团
 * 一目标：平安租赁，得物，平安金服，叮咚买菜，众安保险，携程，soul，B站，货拉拉，东方财富，泛微，红星云，哈罗，虾皮，饿了吗，喜马拉雅
 * 二目标：微盟，拉卡拉，晨光文具，信也科技
 * **/
/**
 * 面试法则：STAR法则，按照这个法则会有一个清晰的主线。

STAR法则,即为Situation Task Action Result的缩写。即Situation(背景）、Task(任务）、Action(行动）、和Result(结果）四个方面。

”S“ ：Situation(背景），你所参与项目的背景是什么样的，基于什么需求。

”T“：Task(任务），你在这个工作中所承担的任务或者职责。

”A“：Action(行动），你在这个项目中基于任务而采取什么样的技术或方案。

”R“：Result(结果），最后你在整个工作中得到什么样的结果，最好有个量化的结果，比如最后用户量提升了100万等
首要任务是先更新出一个拿的出手的jianli，然后列出计划，按计划执行。
可回溯：
S: 背景：医保局的监管要求，用户购买保险的流程必须可以回溯。
T：任务或者职责：我负责设计开发公司的可回溯系统。
A：行动：经过调研和讨论，决定把用户投保的具体操作过程录制成视频，采用rrweb这个开源软件，使用DOM 快照，定时快照，增量快照，序列化保存到服务端，回放时，从服务端取出，交给浏览器渲染，回放整个投保流程。
R：最后准时上线投入使用，可回溯录制准确率达到99%。
埋点监控系统：
背景：收集用户行为，用于统计分析。
任务或者职责：我负责设计开发公司的可回溯系统。
行动：接入神策数据平台。通用事件和自定义事件，

贡惠保产品系列。

UI组件库

平安租赁作为最后兜底的项目，
 * **/
module.exports = {
    devServer:{
      open:true
    },
    configureWebpack:{
        plugins:[
            new webpack.DefinePlugin({
               "process.env.oss" : JSON.stringify(domain[nodeEnv]['oss'])
            })
        ]
    }
}