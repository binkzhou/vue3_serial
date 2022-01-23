<template>
	<div class="desktop-app-title-bar">
		<div class="desktop-app-title-bar-left">
			<i class="iconfont icon-github"></i>
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
	background: #24292e;
	height: 28px;
	-webkit-app-region: drag;
}

.icon-github {
	background: #d1d5da;
	border-radius: 50%;
	margin: 0 10px;
}

.desktop-app-title-bar-right button {
	width: 45px;
	height: 28px;
	background: #24292e;
	border: 0;
	outline: none;
}

.desktop-app-title-bar-right button .iconfont {
	font-size: 10px;
	color: #a0a0a0;
}
#close:hover {
	background: #e90f25;
}
.desktop-app-title-bar-right button:hover .iconfont {
	color: #fff;
}

#maximize:hover,
#minimize:hover {
	background: #878787;
}
</style>
