<template>
	<div class="app_container">
		<Side />
		<div class="app_center ant_center">
			<Header />
			<router-view />
		</div>
	</div>
</template>

<script setup>
import Header from '@/components/Header';
import Side from '@/components/Side';
const color = window.localStorage.getItem('primary-color');

if (color) {
	window.less.modifyVars({
		'primary-color': color
	});
}
</script>

<style lang="css" scoped>
.app_container {
	display: flex;
	overflow: hidden;
}
.app_center {
	flex: 1;
	display: flex;
	flex-direction: column;
}
</style>
