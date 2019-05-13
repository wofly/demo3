const express = require("express");
const app= express();
const db = require("./module/db2")
const serve = require("./serve.json")
// const mongodb = require("mongodb");
app.get("/eee",function(req,res){
    res.setHeader("Access-Control-Allow-Origin","*")
    console.log(111)
    res.json({
        aa: 1111,
        serve
    })
})

app.get("/www",function(req,res){
     var zhang = req.query.zhang
     var mi = req.query.mi
     console.log(zhang,mi)
     db.findOneByuserName("hao",zhang,function(err,radvListes){
        console.log(radvListes)
        if(radvListes){
            res.json({
                a : -1,
                zhi : "您注册的账号已存在"
            })
        }else{
            db.insertOne("hao",{
                userName : zhang,
                passWord : mi,
                time : Date.now()
            },function(err,radvListes){
                if(err){
                    res.json({
                        a : -1,
                        zhi : "连接失败"
                    })
                }else{
                    console.log(111)
                    res.json({
                        a : 1,
                        zhi : "注册成功"
                    })
                }
            })        
        }
     })
})
app.get("/deng",function(req,res){
    userName = req.query.deng;
    passWord = req.query.mi
    console.log(userName,passWord,111)
    db.findOneByuserName("hao",userName,function(err,listers){
        console.log(err,listers)
        if(listers){
            if(listers.passWord==passWord){
                res.json({
                    a : 1,
                    zhi : "登录成功"
                })
            }else{
                res.json({
                    a : -1,
                    zhi : "您输入的密码不正确"
                })
            }
        }else{
            res.json({
                a : -1,
                zhi : "您输入的账号不正确"
            })
        }
    })
})
app.listen(80,function(){
    console.log("success")
})