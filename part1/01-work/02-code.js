/*
  将下面异步代码使用 Promise 的方法改进
  尽量用看上去像同步代码的方式
  setTimeout(function () {
    var a = 'hello'
    setTimeout(function () {
      var b = 'lagou'
      setTimeout(function () {
        var c = 'I ♥ U'
        console.log(a + b +c)
      }, 10)
    }, 10)
  }, 10)
*/


var promise=new Promise((reslove,reject)=>{
    setTimeout(()=>{
        reslove('hello lagou I ♥ U')
    },10)
})
.then(value=>
  {
      console.log(value);
      return value
  }
)

let p=(val)=>{
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      resolve(val)
    },10)
  })
}
p('hello').then(val=>p(val+'lagou'))
.then(val=>p(val+'I ♥ U')).then(val=>console.log(val))