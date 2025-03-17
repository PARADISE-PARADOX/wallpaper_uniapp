<template>
  <view class="userLayout pageBg">
	  <view class="userInfo">
		  	<view class='avatar'>
				<image src="/static/logo.png" mode="aspectFill"></image>
			</view>
			<view class="ip">100.100.100.100</view>
			<view class="address">来自于：西安</view>

	  </view>
		<view class="section">
			<view class="list">
				<view @click="showDownload" class="row">
					<view class="left">
						<uni-icons type="download-filled" size="20"></uni-icons>
						<view class="text1"> 我的下载 </view>
					</view>
					<view class="right">
						<view class="text2"> 33 </view>
						<uni-icons type="right" size="20" ></uni-icons>
					</view>
				</view>
				<view class="row" @click="showList">
					<view class="left">
						<uni-icons type="star-filled" size="20" ></uni-icons>
						<view class="text1"> 我的收藏 </view>
					</view>
					<view class="right">
						<view class="text2"> 33 </view>
						<uni-icons type="right" size="20"></uni-icons>
					</view>
				</view>
				<!-- #ifdef APP -->
					<view class="row" @click="onPhone">
						<view class="left">
							<uni-icons type="staff-filled" size="20"> </uni-icons>
							<view class="text1"> 联系客服 </view>
						</view>
						<view class="right">
							<uni-icons type="right" size="20"></uni-icons>
						</view>
					</view>
				<!-- #endif -->
				<!-- #ifdef MP -->
					<view class="row" @click="onWechat">
						<view class="left">
							<uni-icons type="staff-filled" size="20"></uni-icons>
							<view class="text1"> 联系客服 </view>
						</view>
						<view class="right">
							<uni-icons type="right" size="20" ></uni-icons>
						</view>
					</view>
				<!-- #endif -->
			</view>
		</view>
			
		<view class="section">
			<view class="list">
				<view class="row">
					<view class="left">
						<uni-icons type="notification-filled" size="20"></uni-icons>
						<view class="text1"> 订阅更新 </view>
					</view>
					<view class="right">
						<uni-icons type="right" size="20" ></uni-icons>
					</view>
				</view>
				<view class="row">
					<view class="left">
						<uni-icons type="info-filled" size="20"></uni-icons>
						<view class="text1"> 常见问题 </view>
					</view>
					<view class="right">
						<uni-icons type="right" size="20"></uni-icons>
					</view>
				</view>
			</view>
		</view>
		

</view>


</template>

<script setup>
	
const onPhone = ()=>{
	uni.makePhoneCall({
		phoneNumber: '114514' 
	});

}

const onWechat = ()=>{
	
}

const showList = ()=>{
	uni.navigateTo({
	    url: "/pages/classlist/classlist",
	  });
}

const showDownload = ()=>{
	uni.navigateTo({
	    url: "/pages/classlist/classlist",
	  });
}

</script>

<style lang="scss" scoped>
.userLayout{
	.userInfo{
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		padding:50rpx 0;
		.avatar{
			width: 160rpx;
			height: 160rpx;
			border-radius: 50%;
			overflow: hidden;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.ip{
			font-size: 42rpx;
			color: #333;
			padding: 30rpx 0 20rpx;
		}
		.address{
			font-size: 30rpx;
			color:#a1a1a1;
		}
	}
	.section{
		width: 700rpx;
		margin: 50rpx auto;
		border:1px solid #eee;
		border-radius:10rpx;
		box-shadow: 0 0 30rpx rgba(0,0,0,.05);
		.list{
			background-color: white;
			.row{
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 35rpx;
				height: 100rpx;
				border-bottom: 1px solid #eee;
				&:last-child{
					border-bottom:0;
				}
				.left, .right{
					display: flex;
					align-items: center;
					:deep(){
						.uni-icons{
							color: $brand-theme-color !important;
						}
					}
				}
				.text1{
					padding-left: 20rpx;
					color:#666;
				}
				.text2{
					padding-right: 20rpx;
					color:#aaa;
				}
			}
		}
	}
}
</style>
