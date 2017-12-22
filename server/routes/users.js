var express = require('express');
var router = express.Router();
var user = require('../models/user');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login',function(req,res,next){
  let param = {
      userName:req.body.userName,
      userPwd:req.body.userPwd
  }

  console.log(param)
  user.findOne(param,function(err,doc){
    if(err){
      res.json({"status":"1",msg:err.message})
    }else{
      if(!doc){
        res.json({"status":'1',msg:'',result:'用户名和密码错误'})
      }
      res.cookie('userId',doc.userId,{
        path:'/',
        maxAge:1000 * 60 * 60 * 24
      })
      res.cookie('userName',doc.userName,{
        path:'/',
        maxAge:1000 * 60 * 60 * 24
      })

      if(doc){
        res.json({
          status:0,
          msg:'',
          result:{
            userName:doc.userName
          }
        })
      }
    }
  })
})

router.post('/checkLogin',function(req,res,next){
  if(req.cookies.userId){
    res.json({
      status:'0',
      result:req.cookies.userName
    })
  }else{
    res.json({
      status:1,
      msg:'未登录',
      result:''
    })
  }
})


router.post('/cartList',function(req,res,next){
  let userId = req.cookies.userId;
  user.findOne({userId:userId},function(err,doc){
    res.json({
      status:0,
      msg:'',
      result:doc.cartList
    })
  })
})

router.post('/cartEdit',function(req,res,next){
  let userId = req.cookies.userId,
  productId = req.body.productId,
  productNum = req.body.productNum,
  checked = req.body.checked;
  console.log(checked)
  user.update({'userId':userId,"cartList.productId":productId},{
    "cartList.$.productNum":productNum,
    "cartList.$.checked":checked,
  },function(){
    res.json({
      status:0,
      msg:'',
      result:'修改购物车成功'
    })
  })
})

router.post('/editCheckAll',function(req,res,next){
  let userId = req.cookies.userId,
    checkAll = req.body.checkAll;

  user.findOne({'userId':userId},function(err,user){
      user.cartList.forEach(item=>{
        item.checked = checkAll;
      })

      user.save(function(err,doc){
        res.json({status:0,msg:'',result:'操作成功'})
      })
  })
})
module.exports = router;
