const { reject, compact } = require('lodash')
const myPromise=require('./05-code')
const promise=new myPromise((resolve,reject)=>{
    resolve('ok')
    // reject('nook')
    // setTimeout(()=>{
    //     reject('nook')
    // })
})
function p1(){
    return new myPromise((resolve,reject)=>{
        setTimeout(()=>{
            resolve('p1')
        },2000)
    })
}
function p2(){
    return new myPromise((resolve,reject)=>{
        resolve('p2')
    })
}
promise.then((value)=>{
    console.log(value)
    return p1()
},(reason)=>{
    console.log(reason)
})
.then(value=>{
    console.log(value)
},(reason)=>{
    console.log(reason)
})
myPromise.all(['a','b',p1(),p2(),'c']).then(result=>{
    console.log(result)
})
// promise.then((value)=>{
//     console.log(value)
// },(reason)=>{
//     console.log(reason)
// })