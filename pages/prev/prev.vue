<template>
  <view class="prev">
	<swiper circular :current="curIndex" @change="swiperChange">
		<swiper-item v-for="(item,index) in classList" :key="item._id">
			<image v-if="readImgs.includes((index))" @click="maskChange" :src='item.picurl' mode="aspectFill"></image>
		</swiper-item>
	</swiper>
	{{readImgs}}
	<view class="mask" v-if="maskState">
		<view class="goBack" :style="{top:getStatusBarHeight()+'px'}" @click="goBack">
			<uni-icons type="back" color="#fff" size="30"></uni-icons>
		</view>
		<view class="count">{{curIndex+1}} /{{classList.length}}</view>
		<view class="time">
			<uni-dateformat :date="Date.now()" format="hh:mm"></uni-dateformat>
		</view>
		<view class="date">
			<uni-dateformat :date="Date.now()" format="MM月dd日"></uni-dateformat>
		</view>
		<view class='footer'>
			<view class="box" @click="showInfo">
				<uni-icons type="info" size="30"></uni-icons>
				<view class='text'>信息</view>
			</view>
			<view class="box" @click="clickScore">
				<uni-icons type="star" size="30"></uni-icons>
				<view class='text'>{{curInfo.score}}分</view>
			</view>
			<view class="box" @click="clickDownload">
				<uni-icons type="download" size="30"></uni-icons>
				<view class='text'>下载</view>
			</view>
		</view>
	</view>
	<uni-popup ref="popupState" type="bottom">
		<view class="popupInfo">
			<view class="popupHeader">
				<view></view>
				<view class="popupTitle">壁纸信息</view>
				<view class="popupClose">
					<uni-icons type="closeempty" size="18" color="#999" @click="closeInfo"></uni-icons>
				</view>
			</view>
			<scroll-view scroll-y>
				<view class='popupContent'>
					<view class="popupRow">
						<view class="label">壁纸ID：</view>
						<text selectable class="value">{{curInfo._id}}</text>
					</view>
					<view class="popupRow">
						<view class="label">分类：</view>
						<text selectable class="value classify">{{curInfo.classid}}</text>
					</view>
					<view class="popupRow">
						<view class="label">评分：</view>
						<view class="value roteBox">
							<uni-rate readonly touchable="false" :value="curInfo.score"/>
							<text class='score'>{{curInfo.score}}分</text>
						</view>
					</view>
					<view class="popupRow">
						<view class="label">描述：</view>
						<text selectable class="value">{{curInfo.description}}</text>
					</view>
					<view class="popupRow">
						<view class="label">标签：</view>
						<view class="value tags">
							<view class="tag" v-for="item in curInfo.tabs">{{item}}</view>
						</view>
					</view>
					<view class="copyRight">
						本图片来源于网络，非商业使用。本图片来源于网络，非商业使用。本图片来源于网络，非商业使用。本图片来源于网络，非商业使用。本图片来源于网络，非商业使用。本图片来源于网络，非商业使用。本图片来源于网络，非商业使用。本图片来源于网络，非商业使用。本图片来源于网络，非商业使用。
					</view>
					<view class="safe-area-inset-bottom"></view>
				</view>
			</scroll-view>
		</view>
	</uni-popup>
	
	<uni-popup ref="scorePopup" border-radius="10px 10px 0 0" :isMaskClick="false">
		<view class="scorePopup">
			<view class="popupHeader">
				<view></view>
				<view class="popupTitle">壁纸评分</view>
				<view class="popupClose">
					<uni-icons type="closeempty" size="18" color="#999" @click="closeRote"></uni-icons>
				</view>
			</view>
			<view class='roteContent'>
				<uni-rate v-model="userScore" allowHalf/>
				<text class="text">{{userScore}}分</text>
			</view>
			
			<view class="footer">
				<button :disabled="!userScore" type="default" size="mini" plain @click="giveScore">确认评分</button>
			</view>
		</view>
	</uni-popup>
  </view>
</template>

<script setup>
import {ref} from "vue"
import {getStatusBarHeight} from "@/utils/system.js"
import {onLoad,onShareAppMessage,onShareTimeline} from "@dcloudio/uni-app"
import {apiGetScore} from "@/api/apis.js"

// 点击隐藏遮罩层
const maskState = ref(true);
const maskChange = ()=>{
	maskState.value = !maskState.value
}

//显示详细信息（弹窗）
const popupState = ref(null)
const showInfo = ()=>{
	popupState.value.open();
}

//关闭详细信息
const closeInfo = () => {
	popupState.value.close();
}

//评分弹窗
const scorePopup = ref(null)
const clickScore = () => {
	scorePopup.value.open();
}

//关闭评分弹窗
const closeRote = () => {
	scorePopup.value.close();
	userScore.value = 0
}

const userScore = ref(0)
// 给出评分
const giveScore = async () => {
	let {classid,_id:wallId} = curInfo.value
	
	let res = await apiGetScore({
		classid,
		wallId,
		userScore:userScore.value
	})
	
	
	
	if(res.errCode === 0){
		uni.showToast({
			title:"评分成功",
			icon:'none'
		})
		closeRote()
	}
	
	
}

//返回上一页
const goBack = () => {
	uni.navigateBack({
		success:()=>{},
		fail:(err)=>{
			uni.reLaunch({
				url:"/pages/index/index"
			})
		}
	})
}

// 获取缓存
const classList = ref([])
const storageClassList = uni.getStorageSync("storageClassList") || []

classList.value = storageClassList.map(item=>{
	return {
		...item,
		picurl:item.smallPicurl
	}
})
console.log(classList.value)

// 通过当前图片的id和索引实时查看大图
const curId = ref(null)
const curIndex = ref(0)
onLoad((e)=>{
	curId.value = e.id
	let index = classList.value.findIndex(item=>item._id === curId.value)
	curIndex.value = index
	
	// 获取当前图片的索引值
	readImgsHandler()
	
	//获取当前预览图像的具体信息
	curInfo.value = classList.value[curIndex.value]
})

//swiper滑动事件
const swiperChange = (e)=>{
	console.log(e)
	curIndex.value = e.detail.current;
	// 获取当前图片的索引值
	readImgsHandler()
	
	//获取当前预览图像的具体信息
	curInfo.value = classList.value[curIndex.value]
}

//获取当前图片与前后两张图片索引的函数（利于浏览）
const readImgsHandler = () => {
	readImgs.value.push(
	curIndex.value<=0?curIndex.value.length-1:curIndex.value-1,
	curIndex.value,
	curIndex.value>=curIndex.value.length-1?0:curIndex.value+1
	)
	
	//Set 是 ES6 引入的一种数据结构，它只存储唯一值。将数组转换为 Set，再转换回数组，即可实现去重。
	readImgs.value = [...new Set(readImgs.value)]
}

//设置已看过的图片来节省资源
const readImgs = ref([])

//获取当前预览图像的具体信息
const curInfo = ref(null)

// 点击下载
const clickDownload = ()=>{
	// #ifdef H5
	uni.showModal({
		content:"请长按保存",
		showCancel:false
	})
	// #endif
	
	// #ifndef H5
	uni.getImageInfo({
			src:curInfo.value.picurl,
			success:res=>{
				uni.saveImageToPhotosAlbum({
					filePath:res.path,
					success:result=>{
						console.log(result)
					}
				})
			}
		})
	// #endif
}

//分享页面
onShareAppMessage((e)=>{
	console.log(e)
	return {
		title:"wallpaper",
		path:'/pages/prev/prev?id='+curId.value
	}
})

//分享朋友圈

onShareTimeline(()=>{
	return {
		title:"wallpaper",
		
		query:"id="+curId.value
	}
})
	


</script>

<style lang="scss" scoped>
.prev{
	width: 100%;
	height: 100vh;
	position: relative;
	swiper{
		width: 100%;
		height: 100%;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.mask{
		&>view{
			position: absolute;
			right:0;
			left:0;
			color: #fff;
			width:fit-content;
			margin: auto;
		}
		.goBack{
			width:70rpx;
			height: 70rpx;
			background-color: rgba(0,0,0,.6);
			left:30rpx;
			top:0;
			margin-left: 0;
			border:1rpx solid rgba(255,255,255,.3);
			border-radius: 100rpx;
			backdrop-filter: blur(10rpx);
			/* 新增样式：Flex 布局实现居中 */
			display: flex;
			align-items: center; /* 垂直居中 */
			justify-content: center; /* 水平居中 */
		}
		.count{
			top:10vh;
			background-color: rgba(0,0,0,0.3);
			font-size: 30rpx;
			border-radius: 40rpx;
			padding: 10rpx 28rpx;
		}
		.time{
			top:calc(10vh + 80rpx);
			font-size: 140rpx;
			font-weight: bold;
			line-height: 1em;
			text-shadow:0 4rpx rgba(0, 0, 0, 0.5);
		}
		.date{
			font-size: 32rpx;
			top:calc(10vh + 240rpx);
			text-shadow:0 2rpx rgba(0, 0, 0, 0.5);
		}
		.footer{
			background-color: #eee1d9;
			bottom: 10vh;
			width: 490rpx;
			height: 120rpx;
			border-radius: 60rpx;
			color:#000;
			display: flex;
			justify-content: space-around;
			align-items: center;
			box-shadow: 0 2rpx 0 rgba(0,0,0,0.1);
			backdrop-filter: blur(20rpx);
			.box{
				display: flex;
				flex-direction: column; // 子元素垂直排列（从上到下）。
				align-items: center;
				justify-content: center;
				padding:2rpx 10rpx;
				.text{
					font-size: 26rpx;
					color:$text-font-color-3;
				}
			}
		}
	}
	.popupHeader{
		display: flex;
		justify-content: space-between;
		align-items: center;
		.popupTitle{
			color: $text-font-color-2;
			font-size: 26rpx;
		}
		.popupClose{
			padding:6rpx;
			
		}
	}
	.popupInfo{
		background: #fff;
		padding:30rpx;
		border-radius: 30rpx 30rpx 0 0;
		overflow: hidden;
	
		scroll-view{
			max-height: 50vh;
			.popupContent{
				.popupRow{
					display: flex;
					padding:16rpx 0;
					font-size: 32rpx;
					line-height: 1.7em;
					.label{
						color:$text-font-color-4;
						width: 140rpx;
						font-size: 30rpx;
						text-align: right;
					}
					.value{
						flex:1;
						width:0; //减少溢出问题
					}
					.roteBox{
						display: flex;
						align-items: center;
						.score{
							font-size: 26rpx;
							color:$text-font-color-2;
							padding-left: 10rpx;
						}
					}
					.tags{
						display: flex;
						flex-wrap: wrap;
						.tag{
							border:1px solid $brand-theme-color;
							border-radius: 40rpx;
							padding: 10rpx 30rpx;
							color:$brand-theme-color;
							font-size: 22rpx;
							line-height: 1em;
							margin-right: 10rpx;
						}
					}
					.classify{
						color:$brand-theme-color;
					}
				}
				.copyRight{
					background-color: #f6f6f6;
					font-size: 28rpx;
					padding:30rpx;
					color:$text-font-color-3;
					margin: 20rpx 10rpx;
					border-radius: 10rpx;
					line-height: 1.4em;
				}
			}
		}
	}
	.scorePopup{
		background-color: #fff;
		padding:30rpx;
		width:70vw;
		border-radius: 30rpx;
		.roteContent{
			padding: 30rpx 0;
			display: flex;
			justify-content: center;
			align-items: center;
			.text{
				margin-left: 20rpx;
				width:80rpx;
			}
		}
		.footer{
			padding:10rpx 0;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
}

</style>
