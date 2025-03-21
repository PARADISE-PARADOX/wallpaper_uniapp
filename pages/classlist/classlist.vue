<template>
  <view class="classlist">
	<view v-if="!classList.length && !noData" v-for="item in 4">
	  	<uv-skeletons class="gujia" :loading="loading" :skeleton="skeleton"></uv-skeletons>
		
	</view>
	<view class='content'>
		<navigator :url="'/pages/prev/prev?id='+item._id" class='item' v-for="item in classList" :key="item._id">
			<image :src="item.smallPicurl" mode="aspectFill"></image>
		</navigator>
	</view>
	<view class="loadingLayout">
		<uni-load-more :status="noData?'noMore':'loading'"></uni-load-more>
	</view>
	<view class="safe-area-inset-bottom"></view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue';
import { apiGetClassList } from '@/api/apis.js';
import { onLoad,onReachBottom,onShareAppMessage,onShareTimeline,onUnload } from "@dcloudio/uni-app"
import { goIndex } from '@/utils/common.js';

const classList = ref([])
const noData = ref(false)
const queryParams = {
	pageNum:1, //当前请求的是第几页的数据
	pageSize:12 //每页返回的数据条数
}
let pageName;

onLoad((e)=>{
	let {id=null,name=null} = e
	console.log(id,name);
	if(!id) goIndex()
	queryParams.classid=name;
	queryParams.id=id;
	pageName = name
	//修改分类的导航栏
	uni.setNavigationBarTitle({
		title:name
	})
	
	getClassList()
})

//获取分类的api数据
const getClassList = async ()=>{
	let res = await apiGetClassList(queryParams);
	classList.value = [...classList.value,...res.data.data];
	
	//storage在预览页面缓存
	uni.setStorageSync("storageClassList",classList.value)
	
	//判断，如果获取的数据小于pagesize中的值，表示接下来的内容就是最后一批内容，所以停止调用
	if(queryParams.pageSize > res.data.data.length){
		noData.value = true
	}
	
	
}

onReachBottom(()=>{
	if(noData.value) return;
	queryParams.pageNum++
	console.log(queryParams.pageNum)
	getClassList()
})

// 定义状态
const loading = ref(true); // 加载状态

const itemWidth = computed(() => `${730 / 3}rpx`);
const skeleton = ref([
  {
    type: 'flex',
    num: 1,
    children: [{
    	type: 'custom',
    	style: `width: ${itemWidth.value}; height: 500rpx; margin-left: 5rpx; margin-right: 5rpx;`
    }, 
	{
    	type: 'custom',
    	style: `width: ${itemWidth.value}; height: 500rpx; margin-right: 5rpx;`
    }, 

	{
    	type: 'custom',
    	style: `width: ${itemWidth.value}; height: 500rpx; padding-right: 5rpx;`
    }]
  },
  
]);


//分享页面
onShareAppMessage((e)=>{
	console.log(e)
	return {
		title:"wallpaper"+pageName,
		path:'/pages/classlist/classlist?id='+queryParams.id +'&name=' + queryParams.classid
	}
})

//分享朋友圈

onShareTimeline(()=>{
	return {
		title:"wallpaper"+pageName,
		
		query:"id="+queryParams.id +"&name=" + queryParams.classid,
	}
})
	
//清除缓存
onUnload(()=>{
	uni.removeStorageSync("storageClassList")
})

</script>

<style lang="scss" scoped>
.classlist{
	.content{
		display: grid;
		grid-template-columns: repeat(3,1fr);
		gap:5rpx;
		padding:5rpx;
		.item{
			height: 500rpx;
			image{
				width: 100%;
				height: 100%;
				display: block;
			}
		}
	}
	
}
.gujia{
	margin-bottom:5rpx;
}
</style>
