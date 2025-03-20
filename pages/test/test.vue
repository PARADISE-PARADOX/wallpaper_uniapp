<template>
	<view>
		<uv-skeletons class="gujia" :loading="loading" :skeleton="skeleton"></uv-skeletons>
		<uv-skeletons class="gujia" :loading="loading" :skeleton="skeleton"></uv-skeletons>
		<uv-skeletons class="gujia" :loading="loading" :skeleton="skeleton"></uv-skeletons>
		<uv-skeletons class="gujia" :loading="loading" :skeleton="skeleton"></uv-skeletons>
		<uv-skeletons class="gujia" :loading="loading" :skeleton="skeleton"></uv-skeletons>
		
	</view>
</template>
<script setup>
import { ref, computed } from 'vue';

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

</script>

<style lang="scss" scoped>
.gujia{
	margin-bottom:5rpx;
}
</style>
