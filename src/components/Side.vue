<template>
	<div class="left_container">
		<div class="logo">
			<i class="iconfont icon-github"></i>
		</div>
		<button id="minimize" @click="router.push('/')" :class="{ nav_active: onRoutes === '/' }">
			<i class="iconfont icon-jiekou"></i>
			<span>串口</span>
		</button>
		<button id="minimize" @click="router.push('/net')" :class="{ nav_active: onRoutes === '/net' }">
			<i class="iconfont icon-wangluo"></i>
			<span>网络</span>
		</button>
		<button id="minimize" @click="router.push('/setting')" :class="{ nav_active: onRoutes === '/setting' }">
			<i class="iconfont icon-shezhi"></i>
			<span>设置</span>
		</button>
	</div>
</template>
<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();
const onRoutes = computed(() => {
	return route.path;
});
</script>

<style lang="less" scoped>
.left_container {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 30px;
	width: 82px;
	height: 100vh;
	background: #f3f5f6;
	user-select: none;
	.logo {
		padding-bottom: 25px;
		color: #ff936b;
		i {
			font-size: 32px;
		}
	}
	button {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-bottom: 10px;
		width: 72px;
		height: 72px;
		background: transparent;
		border: 0;
		border-radius: 7px;
		outline: none;
		font-size: 14px;
		cursor: pointer;
		i {
			font-size: 18px;
		}
		&:hover {
			background: #fafafa !important;
		}
	}
}
</style>
