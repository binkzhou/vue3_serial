<template>
	<div class="desktop-app-title-bar">
		<div class="desktop-app-title-bar-left">
			<!-- <i class="iconfont icon-github"></i> -->
		</div>
		<div class="desktop-app-title-bar-right">
			<button id="minimize" @click="onMinimize">
				<i class="iconfont icon-zuixiaohua"></i>
			</button>
			<button id="maximize" @click="onMaximize">
				<i class="iconfont icon-window-maximize"></i>
			</button>
			<button id="close" @click="onClose">
				<i class="iconfont icon-Close"></i>
			</button>
		</div>
	</div>
</template>
<script setup>
import { ipcRenderer } from 'electron';

// 关闭
const onClose = () => {
	ipcRenderer.send('window-close');
};

// 最小化
const onMinimize = () => {
	ipcRenderer.send('window-min');
};

// 最大化
const onMaximize = () => {
	ipcRenderer.send('window-max');
};
</script>
<style>
body {
	margin: 0;
	padding: 0;
}

button,
a,
input,
textarea,
span,
i {
	-webkit-app-region: no-drag;
}
.desktop-app-title-bar {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	padding-right: 5px;
	background: #FAFAFA;
	height: 38px;
	-webkit-app-region: drag;
	border-bottom: 1px solid #E8EBF0;
}

.icon-github {
	background: #FAFAFA;
	border-radius: 50%;
	margin: 0 10px;
}

.desktop-app-title-bar-right button {
	display: inline-flex;
	justify-content: center;
	align-items: center;
	width: 26px;
	height: 26px;
	background: #FAFAFA;
	border-radius: 4px;
	border: 0;
	outline: none;
}

.desktop-app-title-bar-right button .iconfont {
	font-size: 10px;
	color: #5C5C5D;
}
#close:hover {
	background: #E81123;
}
#close:hover i{
color: white;
}

#maximize:hover,
#minimize:hover {
	background: #E6E7E7;
	color: black;
}
</style>
