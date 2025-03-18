const BASE_URL = "http://127.0.0.1:1555/api"

export function request(config={}){
	let {url,data,header} = config
	
	return new Promise((resolve,reject)=>{
		uni.request({
			url:BASE_URL+url,
			data:data,
			header: {
			    'Content-Type': 'application/json', // 设置请求头
			},
			success:res=>{
				if(res.statusCode===200){
					resolve(res)
				}else{
					uni.showModal({
						title:"错误提示",
						content:res.errMsg,
						showCancel:false
					})
					reject(res.data)
				}
			},
			fail:res=>{
				reject(res.data)
			}
		})
	})
	
}