<template>
  <view class="classlist">
	<view class='content'>
		<navigator url="/pages/prev/prev" class='item' v-for="item in 10">
			<image src="@/common/image/category.png" mode="aspectFill"></image>
		</navigator>
	</view>
  </view>
</template>

<script setup>

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
</style>
