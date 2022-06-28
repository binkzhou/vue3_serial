<template>
	<ul class="ipAdress" :class="{ ipAdress_disable: disabled, ipAdress_focus: focus }">
		<li v-for="(item, index) in ipAddress" :key="index">
			<input
				ref="ipInput"
				:disabled="disabled"
				:class="{ ipInputClass_disable: disabled }"
				v-model="item.value"
				type="text"
				class="ipInputClass"
				@input="checkIpVal(item)"
				@keyup="turnIpPosition(item, index, $event)"
				@focus="handleFocus"
				@blur="handleFocus"
			/>
			<div></div>
		</li>
	</ul>
</template>

<script setup>
import { reactive, ref, watch, defineEmits, defineProps, onMounted, toRefs } from 'vue';

const ipAddress = reactive([{ value: '' }, { value: '' }, { value: '' }, { value: '' }]);

// ip 输入框ref
const ipInput = ref(null);
// 定义emit
const emit = defineEmits(['myChange']);
// 是否获得了焦点
const focus = ref(false);

const props = defineProps({
	text: String,
	disabled: Boolean
});

const { disabled } = toRefs(props);
console.log('props', props);
console.log(emit);

onMounted(() => {
	if (props.text === '') {
		return;
	}
	console.log('props.text', props.text);
	let ipList = props.text.split('.');
	ipAddress[0].value = ipList[0] || '';
	ipAddress[1].value = ipList[1] || '';
	ipAddress[2].value = ipList[2] || '';
	ipAddress[3].value = ipList[3] || '';
	console.log('ipAddress', ipAddress);
});

// 格式化补零方法
const formatter = val => {
	let value = val.toString();
	if (value.length === 2) {
		value = '0' + value;
	} else if (value.length === 1) {
		value = '00' + value;
	} else if (value.length === 0) {
		value = '000';
	}
	return value;
};
watch(
	ipAddress,
	() => {
		let str = '';
		console.log('ipAddress.value', ipAddress);
		for (const i in ipAddress) {
			console.log(ipAddress[i].value);
			str += formatter(ipAddress[i].value);
		}
		if (str === '000000000000') {
			str = '';
		}
		console.log('str', str);
		// console.log('emit', emit);
		emit('myChange', ipAddress.map(item => item.value + '').join('.'));
	},
	{ immediate: false, deep: true }
);

// 检查ip输入为0-255
const checkIpVal = item => {
	//确保每个值都处于0-255
	let val = item.value;
	// 处理非数字
	val = val.toString().replace(/[^0-9]/g, '');
	val = parseInt(val, 10);
	if (isNaN(val)) {
		val = '';
	} else {
		val = val < 0 ? 0 : val;
		val = val > 255 ? 255 : val;
	}
	item.value = val;
};

// 光标位置判断
const turnIpPosition = (item, index, event) => {
	let e = event || window.event;
	if (e.keyCode === 37) {
		// 左箭头向左跳转，左一不做任何措施
		if (index !== 0 && e.currentTarget.selectionStart === 0) {
			ipInput.value[index - 1].focus();
		}
	} else if (e.keyCode == 39) {
		// 右箭头向右跳转，右一不做任何措施
		if (index !== 3 && e.currentTarget.selectionStart === item.value.toString().length) {
			ipInput.value[index + 1].focus();
		}
	} else if (e.keyCode === 8) {
		// 删除键把当前数据删除完毕后会跳转到前一个input，左一不做任何处理
		if (index !== 0 && item.value === '') {
			ipInput.value[index - 1].focus();
		}
	} else if (e.keyCode === 13 || e.keyCode === 32 || e.keyCode === 190) {
		// 回车键、空格键、冒号均向右跳转，右一不做任何措施
		if (index !== 3) {
			ipInput.value[index + 1].focus();
		}
	} else if (item.value.toString().length === 3) {
		// 满3位，光标自动向下一个文本框
		if (index !== 3) {
			ipInput.value[index + 1].focus();
		}
	}
};

const handleFocus = () => {
	let isFocus = false;
	ipInput.value.map(item => {
		if (item === document.activeElement) {
			isFocus = true;
		}
	});
	focus.value = isFocus;
};
</script>
<style lang="css" scoped>
.ipAdress {
	display: inline-flex;
	align-items: center;
	padding-inline-start: 0;
	margin-bottom: 0;
	height: 32px;
	border: 1px solid #dcdfe6;
	transition: all 0.3s;
	border-radius: 2px;
}
.ipAdress_disable {
	background-color: #f5f5f5;
	border-color: #d9d9d9 !important;
	cursor: not-allowed;
}
.ipAdress:hover {
	border-color: #40a9ff;
}
.ipAdress:focus {
	box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
}
.ipAdress li {
	position: relative;
	height: 32px;
	margin: 0;
	list-style-type: none;
}
.ipInputClass {
	border: none;
	width: 37px;
	height: 32px;
	text-align: center;
	background: transparent;
}
.ipInputClass_disable {
	cursor: not-allowed;
	user-select: none;
	color: rgba(0, 0, 0, 0.25);
}
.ipAdress_focus {
	border-color: #40a9ff;
	box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
}
.ipAdress li div {
	position: absolute;
	bottom: 8px;
	right: 0;
	border-radius: 50%;
	background: #505050;
	width: 2px;
	height: 2px;
}
.ipAdress li:last-child div {
	display: none;
}
.ipAdress input:focus {
	outline: none;
}
</style>
