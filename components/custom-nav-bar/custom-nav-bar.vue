<template>
  <view class="layout">
	<view class="navbar">
		<view class="statusBar" :style="{height:getStatusBarHeight()+'px'}"></view>
		<view class="titleBar" :style="{height:getTitleBarHeight()+'px'}">
			<view class="title">
				{{title}}
			</view>
			<view class="search">
				<uni-icons type="search" size="18" color="#848381"></uni-icons>
				<text class="text">搜索</text>
			</view>
		</view>
	</view>
	<view class="fill" :style="{height:getNavBarHeight() +'px'}">
		
	</view>
  </view>
</template>

<script setup>
	
import {getStatusBarHeight,getTitleBarHeight,getNavBarHeight} from '@/utils/system.js'

defineProps({
	title:{
		type:String,
		default:"壁纸"
	}
})

</script>

<style lang="scss" scoped>
.layout{
	.navbar{
		position: fixed;
		top:0;
		left: 0%;
		width: 100%;
		z-index:999;
		background:
			linear-gradient(to bottom,transparent,#fff 400rpx),
			linear-gradient(to right,#2af598 0%, #009efd 100%);
		
		.titleBar{
			display: flex;
			align-items: center;
			.title{
				font-size: 45rpx;
				font-weight: bold;
				color:#000;
				padding-left:20rpx;
			}
				
			.search{
				width: 220rpx;
				height: 55rpx;
				display: flex;
				align-items: center;
				font-size: 25rpx;
				color:$text-font-color-3;
				border:1px solid gray;
				border-radius: 50rpx;
				margin-left: 30rpx;
				background-color: rgba(255,255,255,.4);
				.text{
					padding-left:10rpx;
				}
			}
		}
	}
	.fill{
		
	}
}
</style>