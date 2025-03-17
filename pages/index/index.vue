<template>
	<view class="homeLayout pageBg">
		<custom-nav-bar title="推荐"></custom-nav-bar>
		<view class="banner">
			<swiper indicator-dots indicator-color="rgba(255,255,255,.3)" indicator-active-color="#fff" autoplay circular>
				<swiper-item v-for="(item,index) in bannerList" :key='index'>
					<image :src="item" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
		</view>
		
		<view class='notice'>
			<view class="left">
				<uni-icons type="sound-filled" size="20"></uni-icons>
				<text>公告</text>
			</view>
			<view class="mid">
				<swiper vertical autoplay interval="1500" duration="300" circular>
					<swiper-item v-for="item in 4">contentcontentcontentcontentcontentcontentcontent</swiper-item>
				</swiper>
			</view>
			<view class="right">
				<uni-icons type="right" size="20"></uni-icons>
			</view>
		</view>
		
		<view class='select'>
			<part-title>
				<template #name>每日推荐</template>
				<template #custom>
					<view class='date'>
						<uni-icons type="calendar-filled" size="18"></uni-icons>
						<uni-dateformat :date="Date.now()" format="dd日"></uni-dateformat>
					</view>
				</template>
			</part-title>
			<view class='content'>
				<scroll-view scroll-x>
					<view class='box' v-for="item in 5" @click="goPrev">
						<image src="/common/image/schoolgirl.png" mode='aspectFill'></image>
					</view>
				</scroll-view>
			</view>
		</view>
		
		<view class="theme">
			<part-title>
				<template #name>专题推荐</template>
				<template #custom>
					<navigator url=" " class='more'>More+</navigator>
				</template>
			</part-title>
			
			<view class='content'>
				<theme-item v-for="item in 8" >
					
				</theme-item>
				<theme-item :isMore="true">
					
				</theme-item>
			</view>
		</view>
	</view>
</template>

<script setup>
	
const bannerList = [
	"/static/image/banner1.png",
	"/static/image/banner2.png",
	"/static/image/banner3.png",
	// 添加更多图片地址
];	

const goPrev = () => {
	uni.navigateTo({
		url:"/pages/prev/prev"
	})
}
	
	
</script>

<style lang="scss" scoped>
	
.homeLayout{
	.banner{
		width:750rpx;
		padding:30rpx 0;
		swiper{
			width:750rpx;
			height: 340rpx;
			&-item{
				padding:0 25rpx;
				width: 100%;
				height: 100%;
				image{
					width: 100%;
					height: 100%;
					border-radius: 20rpx;
				}
			}
		}
	}
	.notice{
		width: 700rpx;
		height: 80rpx;
		line-height: 80rpx;
		background-color: #f9f9f9;
		margin: 0 auto;
		border-radius: 40rpx;
		display:flex;
		.left{
			width:140rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			:deep(){
				.uni-icons{
					color: $brand-theme-color !important;
				}
			}
			
			text{
				color:$brand-theme-color;
				font-size:28rpx;
				font-weight: bold;
			}
		}
		.mid{
			flex:1;
			swiper{
				height: 100%;
				&-item{
					height: 100%;
					font-size: 30rpx;
					color:gray;
					overflow: hidden;//隐藏超出容器范围的内容。
					white-space: nowrap; //强制文本在一行中显示，不换行。
					text-overflow: ellipsis;//用省略号表示被截断的文本。
				}
			}
		}
		.right{
			width: 70rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
	
	.select{
		padding-top:50rpx;
		.date{
			color: $brand-theme-color;
			:deep(){
				.uni-icons{
					color: $brand-theme-color !important;
				}
			}
		}
		.content{
			width:725rpx;
			margin-left:25rpx;
			margin-top:25rpx;
			color: $brand-theme-color;
			scroll-view{
				white-space: nowrap;
				.box{
					width: 200rpx;
					height: 440rpx;
					display: inline-block;
					margin-right:15rpx;
					image{
						width: 100%;
						height: 100%;
						border-radius: 10rpx;
					}
				}
				.box:last-child{margin-right: 25rpx;}
			}
		}
	}
	
	.theme{
		padding:50rpx 0;
		.more{
			font-size:32rpx;
			color:#888;
		}
		.content{
			margin-top: 30rpx;
			padding:0 30rpx;
			display: grid;
			gap:15rpx;
			grid-template-columns: repeat(3,1fr);
		}
	}
}
	
</style>
