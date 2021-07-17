const PENDING='pending'
const FULLFILLED='fullfilled';
const REJECTED='rejected'
class myPromise{
    constructor(executor){
        try{
            executor(this.resolve,this.reject)
        }catch(e){
            this.reject(e)
        }
      
    }
    status=PENDING;
    value=undefined;
    reason=undefined;
    successCallback=[]
    failCallback=[]
    resolve=(value)=>{
        if(this.status!==PENDING)return
        this.status=FULLFILLED
        this.value=value
        while(this.successCallback.length){
            this.successCallback.shift()()
        }
    }
    reject=(reason)=>{
        if(this.status!==PENDING)return
        this.status=REJECTED
        this.reason=reason
        while(this.failCallback.length){
            this.failCallback.shift()()
        }
    }
    then(successCallback,failCallback){
        successCallback=successCallback?successCallback:value=>value
        failCallback=failCallback?failCallback:reason=>{throw reason}
        let promise2=new myPromise((resolve,reject)=>{
            if(this.status===FULLFILLED){
              setTimeout(()=>{
                try{
                    let x=successCallback(this.value)
                resolvePromise(promise2,x,resolve,reject)
                }catch(e){
                    reject(e)
                }
              })
            }else if(this.status===REJECTED){
               setTimeout(()=>{
                try{
                    let x= failCallback(this.reason)
                resolvePromise(promise2,x,resolve,reject)
                }catch(e){
                    reject(e)
                }
               })
            }else{
                this.successCallback.push(()=>{
                    setTimeout(()=>{
                        try{
                            let x=successCallback(this.value)
                        resolvePromise(promise2,x,resolve,reject)
                        }catch(e){
                            reject(e)
                        }
                    })
                })
                this.failCallback.push(()=>{
                   setTimeout(()=>{
                    try{
                        let x= failCallback(this.reason)
                    resolvePromise(promise2,x,resolve,reject)
                    }catch(e){
                        reject(e)
                    }
                   })
                })
            }
           
        })
        return promise2
    }
    finally(callback){
        return this.then((value)=>{
            return myPromise.resolve(callback()).then(()=>value)
            // callback()
            // return value
        },(reason)=>{
            return myPromise.resolve(callback()).then(()=>{throw reason})
            // callback()
            // throw reason
        })
    }
    catch(failCallback){
        return this.then(undefined,failCallback)
    }
    static all(array){
        let result=[];
        let index=0;
        return new myPromise((resolve,reject)=>{
            function addData(key,value){
                result[key]=value
                index++;
                if(index===array.length){
                    resolve(result)
                }
            }
            for(let i=0;i<array.length;i++){
                let current=array[i];
                if(current instanceof myPromise){
                    current.then(value=>{
                        addData(i,value)
                    },reason=>{
                        reject(reason)
                    })
                }else{
                    addData(i,array[i])
                }
            }
        })
      
    }
    static resolve(value){
        if(value instanceof myPromise){
            return value
        }else{
            return new myPromise(reslove=>reslove(value))
        }
    }

}
function resolvePromise(promise2,x,resolve,reject){
    if(promise2===x){
        throw reject(new TypeError('错误了'))
    }
    if(x instanceof myPromise){
        return x.then(resolve,reject)
    }else{
        return resolve(x)
    }
}
module.exports=myPromise


// 手写promise
// 1，首先能写出来非常简单的promise，就是简单的只能执行resolve，reject
// 2，为了解决异步问题，所以需要把then里面的回调函数保存起来，当执行完resolve时，如果有成功的回调函数，就去执行
// 3，又为了解决promise.then方法的多次调用，注意不是链式调用，此时需要把回调函数放到一个数组中，然后当数组长度存在的一次执行回调函数，
// 4，下面又为了then方法的链式调用，then方法返回是一个全新的promise，但是then方法中return值时，可以return一个promsie，也可以直接return值，若是直接返回值，则可以直接调用resolve方法，若是返回的是promise，则调用then方法，传入resolve，reject
// 直接return值
// promise.then((data)=>{
//     console.log(data);
//     return 100
// },(reason)=>{
//     console.log(reason)
// })
// return一个promsie
// function p1(){
//     return new MyPromise((resolve,reject)=>{
//         resolve('p2')
//     })
// }
// promise.then((data)=>{
//     console.log(data);
//     return p1()
// },(reason)=>{
//     console.log(reason)
// }).then(value=>{
//     console.log(value)
// })
// 5，then方法已经可以进行链式调用，但是现在必须要处理一种情况，就是不能返回自己，因此需要判断，但是此时又有一个问题，拿不到then返回的promise，所以此时需要变成异步代码
// 6，下面需要实现then方法的可选参数，就是可以传也可以不传，判断回调函数是否存在
// successCallback=successCallback?successCallback:value=>value
//  failCallback=failCallback?failCallback:reason=>{throw reason}
// 7.Promise.all方法，按照传递的参数的顺序，如果每一个都执行了resolve方法，则最后返回一个成功的数组，只要有一个失败，就为失败，传递的参数，需要判断，如果是普通值，直接添加到数组，如果是promsie对象，需要等待其结果，最后执行resolve方法，返回结果
// 8.Promise.resolve方法，首先判断传递的参数是否是promise，如果是的话，直接return，如果是普通值，就去返回一个promise，并且执行它的resolve方法
// 9.finally方法是一定会执行，所以返回一个新的promise执行resolve方法