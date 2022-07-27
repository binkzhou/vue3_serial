<template>
	<div class="setting_container">
		<div>
			<div class="title">主题色</div>
			<div class="color_list">
				<div v-for="color in colors" :key="color" :style="{ background: color }" class="color_item" @click="switchThem(color)">
					<i v-show="color === defaultColor" class="iconfont icon-duihao"></i>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup>
import { ref } from 'vue';
const colors = ['#1890ff', '#9373EE', '#5F80E9', '#9A7D56', '#00C3EE', '#FA8C16', '#E86CA4'];
const defaultColor = ref('#1890ff');

/**
 * 修改主题颜色
 */
const switchThem = color => {
	window.less.modifyVars({
		'primary-color': color
	});
	defaultColor.value = color;
	window.localStorage.setItem('primary-color', color);
};

const color = window.localStorage.getItem('primary-color');

if (color) {
	defaultColor.value = color;
}
</script>
<style lang="less" scoped>
.setting_container {
	padding: 20px;
	user-select: none;
}
.title {
	margin-top: 20px;
	font-size: 20px;
}
.color_list {
	display: flex;
	margin-top: 10px;
}
.color_item {
	display: flex;
	justify-content: center;
	align-items: center;
	margin-right: 10px;
	width: 40px;
	height: 40px;
	/* border-radius: 50%; */
	color: white;
	cursor: pointer;
}

.bg_list {
	margin-top: 10px;
	svg {
		margin-right: 10px;
	}
}
</style>
