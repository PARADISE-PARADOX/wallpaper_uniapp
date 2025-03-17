<template>
	<view class="part-title">
		<view class="title">
			<slot name="name"></slot>
		</view>
		<view class="custom">
			<slot name="custom"></slot>
		</view>
	</view>
</template>

<script setup>
	
</script>

<style lang="scss" scoped>
.part-title{
	display:flex;
	justify-content: space-between;
	align-items: center;
	padding:0 25rpx;
	.name{
		font-size: 40rpx;
	}
}
</style>