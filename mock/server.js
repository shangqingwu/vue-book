// 后台只提供接口，前端只调用接口；
let http = require("http");
let fs = require("fs");
let url = require("url");
let sliders = require("./slider");
function read(callback) {
  fs.readFile("./book.json",function (err,data) {
    data=data.length==0?[]:JSON.parse(data);
    callback(data);
  })
}
function write(data,callback) {
  fs.writeFile("./book.json",JSON.stringify(data),callback);//当数据写进去之后，调用成功的回调；
}
http.createServer(function (req,res) {
  let {pathname,query} = url.parse(req.url,true);
  if (pathname == "/api/slider"){
    return res.end(JSON.stringify(sliders));
  }
  if (pathname == "/api/hot"){
    read(function (data) {//data表示读到的结果，是一个数组对象；
      let books = data.reverse().slice(0,6); // 返回最后6本；先把数组反过来，再截取；
      res.end(JSON.stringify(books));
    });
    return;
  }
  //图书的增删改查
  if (pathname=="/api/book"){
    let id = query.id;
    switch (req.method){
      case "GET":
        if (id){
          read(function (books) {
            let book = books.find(book=>book.id==id);
            res.end(JSON.stringify(book));
          })
        }else {
          read(function (data) { //data代表所有数据；
            res.end(JSON.stringify(data));
          });
        }
        break;
      case "POST":
        // 发送过来的请求体，默认就是对象格式，直接接收就可以；
        let str = "";
        req.on("data",function (data) {  //流中拿到的都是buffer，data为buffer，与字符串拼接之后是字符串；
          str += data;
        });
        req.on("end",function () {
          let book = JSON.parse(str);
          read(function (books) { //所有的书；
            book.id = books.length>0?books[books.length-1].id+1:1;
            books.unshift(book);
            write(books,function () {
              res.end(JSON.stringify(book));
            })
          })
        });
        break;
      case "DELETE":
        read(function (books) {
          books = books.filter(book=> book.id !=id);//必须是!= ，因为id返回的是字符串，book.id返回的是数字，!== 这两个不相等；
          write(books,function () {
            res.end(JSON.stringify({}));
          })
        });
        break;
      case "PUT":
        let strBook = "";
        req.on("data",function (data) {
          strBook += data;
        });
        req.on("end",function () {
          // console.log(id);
          let book = JSON.parse(strBook);
          // book.id = id;
          // console.log(book);
          read(function (books) {
            books = books.map(item=>{
              if (item.id == id){
                return book;
              }
              return item;
            });
            write(books,function () {
              res.end(JSON.stringify(book));
            })
          })
        });
        break;
    }
  }
  if (pathname == "/api/collect"){
    let id = query.id;
    read(function (books) {
      let book = books.find(item => item.id == id);
      book?book.collected = true:null;
      write(books,function () {
        res.end(JSON.stringify(book));
      })
    })
  }
  if (pathname == "/api/cancel"){
    let id = query.id;
    read(function (books) {
      let book = books.find(item => item.id == id);
      book?book.collected = false:null;
      write(books,function () {
        res.end(JSON.stringify(book));
      })
    })
  }
}).listen(3000);
