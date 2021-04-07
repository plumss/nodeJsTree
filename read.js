const path = require('path');
const fs = require('fs');
const isNoRead = ['.git','node_modules','view','src']; //需要过滤的文件夹，文件格式
getAll()
function getAll(){
    const result = readDirAll('/Users/mac/Desktop/code/tc',0)
    writeMdJson(result)
    writeFileTree(result)
}
function readDirAll(url,index){
    let result = convertObj({path:url,title:path.basename(url),type:'directory',deep:index,extname:''})
    result.child = result.child || []
    const res = fs.readdirSync(url);
    res.map(item=>{
        const subPath = path.join(url,item);//文件相对路径
        const isDirectory = fs.statSync(subPath).isDirectory(); //是否是文件夹
        const extname = path.extname(item); //文件后缀
        const isContain = (data) => isNoRead.includes(data)
        if(isDirectory && !isContain(item)){ //递归继续读 过滤文件夹
            result.child.push(readDirAll(subPath,index+1))
        }
        if(!isDirectory && !isContain(item) && !isContain(extname)){ //过滤文件后缀，文件名
            result.child.push({path:subPath,title:path.basename(subPath),type:'file',deep:index+1,extname})
        }
    })
    return result
}
function convertObj(obj){
 const {path,title,type,extname,deep} = obj
 return {path,title,extname,deep,type}
}
function writeMdJson(data){ //输出最终结构
    fs.writeFile('md.json',JSON.stringify(data),(res)=>{console.log(res)})
}
function writeFileTree(data){ //输出目录树结构
    if(!data) return
    const result = perorChild(data,0)
    fs.writeFile('md.txt',result,(res)=>{console.log(res)})
}
function perorChild(data,index){
    let result =''
    result+=`${getSpace(data.deep)}${data.title}\n`
    data.child.map(item=>{
        const newChild = item.child || []
        if(newChild.length>0){
            result+=perorChild(item,item.deep)
        }else{
            result+=`${getSpace(item.deep)}${item.title}\n`
        }
    })
    return result
}
function getSpace(index){
    let str = ''
    for(let i=1;i<=index;i++){
        str += '    '
    }
    str+='├──'
    return str
}