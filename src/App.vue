<template>
	<div class="app_container">
		<Side />
		<div class="app_center">
			<Header />
			<router-view />
		</div>
	</div>
</template>

<script setup>
import Header from '@/components/Header';
import Side from '@/components/Side';
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
