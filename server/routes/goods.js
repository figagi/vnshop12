var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var goods = require('../models/goods');
var user = require('../models/user');

// mongoose.connect('mongodb://localhost/shop');
mongoose.connect('mongodb://47.93.231.75/shop');

mongoose.connection.on('connected',function(){
  console.log("mongodb connected sucssess");
})

mongoose.connection.on('error',function(){
  console.log("mongodb connected error");
})

mongoose.connection.on('disconnected',function(){
  console.log("mongodb connected disconnected");
})


router.get('/list',function(req,res,next){
  // 接收 page 第几页
  // 接收 pagesize 每页显示几条
  let priceLevel = req.param('priceLevel');
  let sort = req.param('sort') ? req.param('sort') : 'all';
  let currentPage = parseInt(req.param('page')) > 0 ? parseInt(req.param('page'))
  : 1;
  let pagesize = parseInt(req.param('pagesize')) > 0 ? parseInt(req.param('pagesize')) : 4;

  // 当第一页的时候 显示 pagesize 数据 
  // page : 1 ,pagesize :4 , 会显示前面四条数据

  // 当第二页的时候，从第几条数据开始显示
  // 第五条到第八条，前面跳过了4条 

  // 当第三页的时候，从第几条到第几条
  // 第9条开始，到12条结束  一共跳过8条 pagesize * (page-1) 
  
  let skip = (currentPage - 1) * pagesize;

  let param = {};
  let priceGt = '',
      priceLte = '';
  if(priceLevel != 'all'){

      // if (priceLevel == 1) {
      //   priceGt = 100;
      //   priceLte = 500;
      // }else if( priceLevel == 2){
      //   priceGt = 500;
      //   priceLte = 1000;
      // }

      switch (priceLevel) {
        case '0':
          priceGt = 0;
          priceLte = 100;
          break;
      
        case '1':
          priceGt = 100;
          priceLte = 500;
          break;
        case '2':
          priceGt = 500;
          priceLte = 1000;
          break;
        case '3':
          priceGt = 1000;
          priceLte = 2000;
          break;
      }
      param = { salePrice: { $gt: priceGt, $lte: priceLte } }

      // 表驱动法
      // let priceItem = [
      //   [0,100],
      //   [100,500],
      //   [500,1000],
      //   [1000,2000]
      // ];

      // param = {
      //   salePrice:{
      //     $gt:priceItem[priceLevel][0],
      //     $lte:priceItem[priceLevel][1]
      //   }
      // }

    

  }

  let goodsModel = goods.find(param);
  // if (想要排序) {
    goodsModel.sort({ 'salePrice': sort });
  // }
  goodsModel.skip(skip).limit(pagesize);
  
  goodsModel.exec({}, function (err, doc) {
    res.json({ status: "1", msg: '', result: doc })
  })
})
router.post('/addCart',function(req,res,next){

  var productId = req.body.productId;
  var userId = 100000077;

  user.findOne({userId:userId},function(err,userDoc){

    let goodsItem = '';
    // 当我们添加商品的时候，判断购物车里面有没有这个商品
    userDoc.cartList.forEach(function(item){
      if(item.productId == productId){
          goodsItem = item;
          item.productNum++;
      }
    })

    if (goodsItem){
      userDoc.save(function (err2, doc2) {
        res.json({
          status: '0',
          msg: '',
          result: '商品数量添加成功'
        })
      })
    }else{
      goods.findOne({ 'productId': productId }, function (err, goodsDoc) {
        goodsDoc.productNum = 1;
        goodsDoc.checked = 1;
        userDoc.cartList.push(goodsDoc);
        userDoc.save(function (err2, doc2) {
          res.json({
            status: '0',
            msg: '',
            result: '加入购物车成功'
          })
        })
      })
    }











  })

})
module.exports = router;