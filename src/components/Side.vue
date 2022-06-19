<template>
	<div class="left_container">
		<div class="logo">
			<i class="iconfont icon-github"></i>
		</div>
		<button id="minimize" @click="router.push('/')" :class="{active:onRoutes==='/'}">
			<i class="iconfont icon-jiekou"></i>
			<span>串口</span>
		</button>
		<button id="minimize" @click="router.push('/net')" :class="{active:onRoutes==='/net'}">
			<i class="iconfont icon-wangluo"></i>
			<span>网络</span>
		</button>
	</div>
</template>
<script setup>
import { computed } from 'vue';
import { useRoute,useRouter  } from 'vue-router';
const route = useRoute();
const router = useRouter()
const onRoutes = computed(() => {
	return route.path;
});
</script>

<style  scoped>
.left_container{
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 30px;
	width: 82px;
	height:100vh;
	background: #F3F5F6;
	user-select: none;
}
.left_container .logo{
	padding-bottom: 25px;
	color: #FF936B;
}
.left_container .logo i{
	font-size: 32px;
}
.left_container button {
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
}
.left_container button i{
	font-size: 18px;
}
.left_container button:hover{
	background: #FAFAFA !important;
}
.active{
	color: #8C78E6 !important;
}
</style>

