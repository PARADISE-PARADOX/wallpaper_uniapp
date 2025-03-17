<template>
  <view class="noticeLayout">
	<view class="noticeTitle">
		<uni-tag text="置顶" :inverted="true"  type="warning" size='default'></uni-tag>
		<view class="title">欢迎关注，获取最新的壁纸。欢迎关注，获取最新的壁纸。</view>
	</view>
	<view class="subTitle">
		<text class="subText">Paradise</text>
		<uni-dateformat :date="Date.now()" format="yyyy-MM-dd hh:mm"></uni-dateformat>
	</view>
	<view class='noticeContent'>
		
		<view class='QRCard'>
			<image src='/static/logo.png' mode="aspectFill" class="img"></image>
		</view>
		
		<view class='content'>
			扫码关注“paradise”微信，获取详细信息和内容。扫码关注“paradise”微信，获取详细信息和内容。
		</view>
	</view>
	<view class='noticeFooter'>
		<view class="footer">阅读：1111</view>
	</view>
  </view>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.noticeLayout{
	padding: 0 20rpx;
	.noticeTitle{
		display: flex;
		align-items:flex-start;
		margin-bottom: 20rpx;
		.uni-tag{
		    flex-shrink: 0; /* 防止标签宽度变化 */
		    white-space: nowrap; /* 防止标签内容换行 */
		}
		.title{
			margin-left: 10rpx;
			font-size: 35rpx;
			font-weight: 400;
		}
	}
	.subTitle{
		color:$text-font-color-3;
		font-size: 25rpx;
		margin-bottom: 40rpx;
		.subText{
			padding-right: 15rpx;
		}
	}
	.noticeContent{
		.QRCard{
			width: 300rpx;
			height: 300rpx;
			margin-left: 30rpx;
			.img{
				width:100%;
				height:100%;
				overflow: hidden;
			}
		}
		.content{
			margin: 20rpx 0;
			
		}
	}
	.noticeFooter{
		color:$text-font-color-3;
		font-size: 25rpx;
		margin-bottom: 40rpx;
	}
}
</style>
