<template>
	<div style="display:flex;">
		<Side />
		<div style="flex:1">
			<Header />
			<router-view />
		</div>
	</div>
</template>

<script setup>
import Header from '@/components/Header';
import Side from '@/components/Side';
</script>
