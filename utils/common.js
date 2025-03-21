export function goIndex(){
	uni.showModal({
		title:"提示",
		content:'页面有误，请返回主页',
		showCancel:false,
		success:res=>{
			if(res.confirm){
				uni.reLaunch({
					url:"/pages/index/index"
				})
			}
		}
	})
}
