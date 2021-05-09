import axios from 'axios'
export function request(config){
    return new Promise((resolve,reject)=>{
        const instance=axios.create({
            baseURL:'http://localhost:8888',
            timeout:5000
        
        })
        instance(config).then(res=>{
          resolve(res)
        })
    })
   
    
}