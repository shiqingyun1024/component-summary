function abc(t, e) { 
    "object" == typeof exports && "object" == typeof module ?  // commonjs规范
    module.exports = e() : 
    "function" == typeof define && define.amd ?  // AMD 规范
    define([], e) : 
    "object" == typeof exports ?  // commonjs规范
    exports.anyizbrecord = e() :  // 
    t.anyizbrecord = e() 
}(window,(function(){})())

// 条件1 ? 表达式1 : 条件2 ? 表达式2 : 条件3 ? 表达式3 : 表达式4

// 当条件1为true执行表达式1，返回false，执行条件2，条件2返回false，执行条件3，条件3如果返回true，则执行表达式3，否则执行表达式4，以此类推

// 对于js的三元运算及多条件运算有了更清晰的认识。
// 同时深挖一下关于打包的时候如何做到兼容性各个引入方式的问题。