最近看到vscode tree生成目录树结构插件挺好玩的，自己琢磨实现了一个简单版本
最终效果图：
主要思路：读取文件目录，遇到文件夹递归继续读，不是文件夹直接返回定义的数据结构，数据结构定义如下：
{
    "path": "/Users/mac/Desktop/code/tc/crm/node_modules/webpack-dev-server/node_modules/string-width/package.json", //绝对路径
    "title": "package.json", //文件名称
    "type": "file", //文件类型
    "deep": 6, //文件深度(在读取文件根目录第几层)
    "extname": ".json" // 文件后缀
},
代码截图：
  
代码传送地址：