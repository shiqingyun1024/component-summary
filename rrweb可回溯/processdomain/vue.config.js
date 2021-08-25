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