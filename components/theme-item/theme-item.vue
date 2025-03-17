<template>
	<view class="theme-item">
		<navigator url="/pages/classlist/classlist" class='box' v-if="!isMore">
			<image class="pic" src='/common/image/category.png' mode='aspectFill'></image>
			<view class="mask">种类</view>
			<view class='tab'>n天前更新</view>
		</navigator>
		
		<navigator url="/pages/classify/classify" open-type="reLaunch" class='box more' v-if="isMore">
			<image class="pic" src='/common/image/category.png' mode='aspectFill'></image>
			<view class="mask">
				<uni-icons type="more-filled" size="30" color="#fff"></uni-icons>
				<view class='text'>更多</view>
			</view>
		</navigator>
		
		
	</view>
</template>

<script setup>

defineProps({
	isMore:{
		type:Boolean,
		default:false
	}
})
	
</script>

<style lang="scss" scoped>
.theme-item{
	.box{
		height: 340rpx;
		border-radius: 20rpx;
		overflow: hidden;
		position:relative;
		.pic{
			width:100%;
			height:100%;
			
		}
		.mask{
			width: 100%;
			height: 70rpx;
			position: absolute;
			bottom:0;
			left:0;
			background: rgba(0,0,0,.2);
			color:#fff;
			display: flex;
			justify-content: center;
			align-items: center;
			backdrop-filter: blur(15rpx); //磨砂半透明
			font-weight: 600;
		}
		.tab{
			position: absolute;
			left:0;
			top:0;
			background: rgba(36,42,55);
			backdrop-filter: blur(15rpx);
			color:#fff;
			font-size:22rpx;
			padding:6rpx 14rpx;
			border-radius: 0 0 20rpx 0;
		}
	}
	.box.more{
		.mask{
			width: 100%;
			height: 100%;
			flex-direction: column;
		}
	}
	
}
</style>