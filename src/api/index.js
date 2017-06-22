import axios from "axios";
export function getSliders() {
  return axios.get("/api/slider"); // 执行返回一个promise，可以调用then方法，里面的第一个参数res就是成功后返回的参数；
}
export function getHot() {
  return axios.get("/api/hot");
}
export function getBooks() {
  return axios.get("/api/book");
}
//添加图书需要传递data数据；
export function addBook(data) {
  return axios.post("/api/book",data);
}
export function removeBook(id) {
  return axios.delete("/api/book?id="+id);
}
export function getBook(id) {
  return axios.get("/api/book?id="+id);
}
export function updateBook(id,data) {
  return axios.put("/api/book?id="+id,data);
}
export function collectBook(id) {
  return axios.get("/api/collect?id="+id);
}
export function cancelCollect(id) {
  return axios.get("/api/cancel?id="+id);
}
