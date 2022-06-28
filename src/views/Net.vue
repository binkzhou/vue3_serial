<template>
	<div class="net_container">
		<div class="net_left">
			<div class="net_top">
				<div>
					<span>协议</span>
					<a-select class="net_input" style="width: 120px" @change="handleChangeProtocol" :disabled="open" :value="protocol">
						<a-select-option v-for="(item, index) in protocolTypes" :key="index" :value="item.id">{{ item.content }}</a-select-option>
					</a-select>
				</div>
				<div>
					<span>IP地址</span>
					<IPAddress @myChange="changeValue" :text="ip" :disabled="open" />
					<!-- <a-input-number id="inputNumber" :min="1" :max="255" /> -->
				</div>
				<div>
					<span>端口号</span>
					<a-input-number v-model:value="port" :disabled="open" :min="0" :max="99999" />
				</div>
				<div>
					<span>开/关</span>
					<a-switch v-model:checked="open" @change="handleSwitch" />
				</div>
				<div>
					<a-divider>接收区设置</a-divider>
					<div class="net_check">
						<a-checkbox>十六进制显示</a-checkbox>
					</div>
				</div>
			</div>
			<div class="net_sendConfig">
				<div class="net_check">
					<a-checkbox>十六进制发送</a-checkbox>
				</div>
				<div class="net_check">
					<a-checkbox>定时发送</a-checkbox>
					<a-input-number :min="1" :max="99999" />
				</div>
			</div>
		</div>
		<div class="net_b">
			<div class="net_text" ref="scrollRef" :style="`height: calc(100vh - ${open && protocol !== 'TCP_CLIENT' ? 187 : 144}px);`">
				<div v-for="(item, index) in msg" :key="index" :class="item.chat === 'roboto' ? 'left_msg' : 'left_msg'">
					<div class="msgContent">{{ item.chat === 'roboto' ? '收' : '发' }}→{{ item.content }}</div>
				</div>
			</div>
			<div class="net_send">
				<div class="net_connectTag" v-if="open && protocol === 'TCP_SERVER'">
					<span>连接的客户端</span>
					<a-select class="net_input" style="width: 200px" :dropdownMatchSelectWidth="200" @change="handleChangeClient" :value="client">
						<a-select-option v-for="(item, index) in connects" :key="index" :value="item.id">{{ item.content }}</a-select-option>
					</a-select>
				</div>
				<div class="net_udpConnectTag" v-if="open && protocol === 'UDP'">
					<div>
						<span>目标主机</span>
						<IPAddress :text="targetIp" @myChange="changeTargetIp" />
					</div>
					<div>
						<span>目标端口</span>
						<a-input-number v-model:value="targetPort" :min="0" :max="99999" />
					</div>
				</div>
				<div class="net_sendMsg">
					<a-textarea class="net_send_input" placeholder="请输入要发送的信息" @change="handleSendValue" allowClear autoSize />
					<div class="net_btn">
						<a-button type="primary" :disabled="!open" @click="handleSendMsg">发送</a-button>
						<a-button type="danger" @click="clearMsg">清空</a-button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup>
import { getCurrentInstance, ref, toRaw } from 'vue';
import IPAddress from '@/components/IPAddress';
import net from 'net';
import os from 'os';
import dgram from 'dgram';
const currentInstance = getCurrentInstance();
const { $message } = currentInstance.appContext.config.globalProperties;
console.log('toRaw', toRaw);
// 协议类型
const protocolTypes = [
	{ id: 'TCP_SERVER', content: 'TCP 服务器' },
	{ id: 'TCP_CLIENT', content: 'TCP 客户端' },
	{ id: 'UDP', content: 'UDP' }
];

// 当前协议
const protocol = ref('TCP_SERVER');
// 当前ip
const ip = ref(getIpAddress());
// 端口
const port = ref(3000);

// 目标ip
const targetIp = ref(getIpAddress());
// 目标端口
const targetPort = ref(8080);
// 开关状态
const open = ref(false);
// 消息
const msg = ref([]);
// 发送的信息
let sendMsg = ref('');
// 滚动对象
const scrollRef = ref('all');
// 连接对象
let sockets = ref([]);
let connects = ref([{ id: 'all', content: '所有客户端', socket: null }]);
// 客户端
const client = ref('all');

console.log('connects', connects);

// 切换协议
const handleChangeProtocol = value => {
	protocol.value = value;
};
/**
 * 获取当前机器的ip地址
 */
function getIpAddress() {
	var ifaces = os.networkInterfaces();
	console.log('iface', ifaces);
	for (var dev in ifaces) {
		let iface = ifaces[dev];

		for (let i = 0; i < iface.length; i++) {
			let { family, address, internal } = iface[i];

			if (dev === 'WLAN' && family === 'IPv4' && address !== '127.0.0.1' && !internal) {
				return address;
			}
		}
	}
}

const changeValue = value => {
	console.log('value@@@', value);
	ip.value = value;
};

const changeTargetIp = value => {
	targetIp.value = value;
};

const handleChangeClient = value => {
	client.value = value;
};
//创建服务器
const tcpServer = net.createServer();
// tcp客户端
let tcpClient = null;
// udp服务器
let udpServer = dgram.createSocket('udp4');
// udp客户端
const updClient = dgram.createSocket('udp4');
tcpServer.on('connection', socket => {
	console.log('connect====>');
	sockets.value.push(socket);
	console.log('sockets.value', sockets.value);
	const conn = [{ id: 'all', content: '所有客户端', socket: null }];
	sockets.value.map(item => {
		const id = `${toRaw(item).remoteAddress}:${toRaw(item).remotePort}`;
		conn.push({ id, content: id, socket: item });
	});
	connects.value = [...conn];
	console.log('connects', connects.value);
	socket.once('close', function () {
		sockets.value.splice(sockets.value.indexOf(socket), 1);
		const conn = [];
		sockets.value.map(item => {
			const id = `${toRaw(item).remoteAddress}:${toRaw(item).remotePort}`;
			conn.push({ id, content: id, socket: item });
		});
		connects.value = [...conn];
		console.log('connects', connects.value);
	});
	socket.on('data', function (data) {
		console.log('data', data);
		msg.value.push({ chat: 'roboto', content: data.toString() });
		scrollRef.value.scrollTop = scrollRef.value.scrollHeight;
	});
});
tcpServer.on('error', err => {
	open.value = false;
	console.log(err.message);
	$message.error(err.message.split(':')[1]);
	console.log(err.message.split(':')[1]);
});
console.log('$message', $message);
const createTCPServer = () => {
	//设置监听端口
	tcpServer.listen(
		{
			host: ip.value,
			port: port.value
		},
		function () {
			console.log('server is listening');
		}
	);
};
//关闭之前，我们需要手动清理连接池中得socket对象
function closeServer() {
	tcpServer.close();
	sockets.value.map(function (socket) {
		console.log('socket', socket);
		console.log('socket.destroyed', socket.destroyed);
		if (!socket.destroyed) {
			toRaw(socket).destroy();
		}
	});
	sockets.value = [];
}

// 清空消息
const clearMsg = () => {
	msg.value = [];
};

// 设置发送消息
const handleSendValue = e => {
	sendMsg.value = e.currentTarget.value;
};

/**
 * tcp serve send
 */
const handleTcpServerSendMsg = () => {
	if (client.value === 'all') {
		sockets.value.forEach(function (socket) {
			console.log('socket', socket);
			toRaw(socket).write(sendMsg.value);
		});
		return;
	}

	connects.value.forEach(item => {
		if (item.id === client.value) {
			toRaw(item.socket).write(sendMsg.value);
		}
	});
};

/**
 * tcp client send
 */
const handleTcpClientSendMsg = () => {
	tcpClient && tcpClient.write(sendMsg.value);
};

/**
 * udp client send
 */
const handleUpdClientSendMsg = () => {
	console.log('updClient', updClient);
	udpServer && udpServer.send(sendMsg.value, 0, sendMsg.value.length, targetPort.value, targetIp.value);
};

// 发送消息
const handleSendMsg = () => {
	msg.value.push({ chat: 'me', content: sendMsg.value });
	if (protocol.value === 'TCP_SERVER') {
		handleTcpServerSendMsg();
	}

	if (protocol.value === 'TCP_CLIENT') {
		handleTcpClientSendMsg();
	}
	if (protocol.value === 'UDP') {
		handleUpdClientSendMsg();
	}
};

/**
 * tcp 服务器处理
 */
const handleTcpServer = checked => {
	if (checked) {
		createTCPServer();
	} else {
		closeServer();
	}
};

/**
 * tcp 客户端
 */
const handleTcpClient = checked => {
	if (checked) {
		tcpClient = net.connect(
			{
				host: ip.value,
				port: port.value
			},
			function () {
				console.log('tcp 客户端启动');
			}
		);
		tcpClient.on('data', function (data) {
			console.log('data', data);
			msg.value.push({ chat: 'roboto', content: data.toString() });
			scrollRef.value.scrollTop = scrollRef.value.scrollHeight;
		});
	} else {
		tcpClient && tcpClient.end();
	}
};

/**
 * upd 客户端
 */
const handleUdpClient = checked => {
	if (checked) {
		console.log('udpServer', udpServer);
		udpServer = dgram.createSocket('udp4');
		udpServer && udpServer.bind(port.value, ip.value);
		udpServer.on('message', (m, y) => {
			msg.value.push({ chat: 'roboto', content: m.toString() });
			console.log(y);
		});
		udpServer.on('error', err => {
			open.value = false;
			console.log(err.message);
			$message.error(err.message.split(':')[1]);
			console.log(err.message.split(':')[1]);
		});
	} else {
		// udpServer.close();
		udpServer &&
			udpServer.close(() => {
				console.log('已关闭');
			});
		udpServer.unref();
	}
};

/**
 * 切换开关状态
 */
const handleSwitch = checked => {
	if (protocol.value === 'TCP_SERVER') {
		handleTcpServer(checked);
	}

	if (protocol.value === 'TCP_CLIENT') {
		handleTcpClient(checked);
	}
	if (protocol.value === 'UDP') {
		handleUdpClient(checked);
	}
};
</script>
<style scoped>
.net_container {
	flex: 1;
	display: flex;
	padding: 10px;
}
.net_c {
	flex: 1;
	display: flex;
	margin: 10px;
}
.net_left {
	display: flex;
	flex-direction: column;
}
.net_top {
	flex: 1;
	width: 240px;
	padding-bottom: 20px;
	margin-bottom: 10px;
	box-sizing: border-box;
	border: 1px solid #ededed;
	user-select: none;
}

.net_top > div {
	margin-left: 10px;
	margin-right: 10px;
	padding-top: 20px;
}

.net_top > div > span {
	display: inline-block;
	width: 50px;
	margin-right: 10px;
}

.net_top > div .net_input {
	width: 150px !important;
}
.net_top > div > .net_check {
	margin-bottom: 10px;
}
.net_check span {
	margin-right: 10px;
}
.net_text {
	margin-left: 10px;
	border: 1px solid #ededed;
	padding-top: 10px;
	overflow-y: scroll;
}
.net_send > .net_sendMsg {
	display: flex;
	margin-top: 10px;
	margin-left: 10px;
}
.net_client {
	width: 200px;
}
.net_connectTag {
	margin-top: 10px;
	margin-left: 10px;
}
.net_connectTag span {
	margin-right: 10px;
}
.net_udpConnectTag {
	display: flex;
	align-items: center;
	padding-left: 10px;
	height: 43px;
}
.net_udpConnectTag > div {
	margin-right: 10px;
}
.net_udpConnectTag span {
	margin-right: 10px;
}
.net_send_input {
	margin-right: 10px !important;
	height: 75.6px;
}
.left_msg,
.right_msg {
	display: flex;
	align-items: center;
	position: relative;
	width: 100%;
	margin-bottom: 10px;
}

.left_msg .ant-avatar {
	width: 38px;
	height: 38px;
	margin-left: 5px;
}
.right_msg .ant-avatar {
	order: 2;
	width: 38px;
	height: 38px;
	margin-right: 5px;
}
.right_msg {
	display: flex;
	justify-content: flex-end;
}
.left_msg .msgContent {
	position: relative;
	display: inline-block;
	min-width: 38px;
	min-height: 38px;
	margin-left: 10px;
	word-break: break-word;
	padding: 5px 8px;
	border-radius: 5px;
	/* background-color: #348dfe; */
	border: 1px solid #ededed;
	width: auto;
	max-width: 490px;
	font-size: 14px;
	letter-spacing: 0px;
	color: black;
}
.right_msg .msgContent {
	position: relative;
	display: inline-block;
	min-width: 38px;
	min-height: 38px;
	margin-right: 10px;
	padding: 5px 8px;
	border-radius: 5px;
	background-color: #5a64c1;
	max-width: 500px;
	font-size: 18px;
	font-weight: normal;
	color: #e9e9e9;
}
.right_msg .msgContent::before {
	content: '';
	position: absolute;
	width: 0;
	height: 0;
	right: -5px;
	top: 14px;
	border-style: solid;
	border-width: 5px 0 5px 5px;
	border-color: transparent transparent transparent #5fc5f5;
}
.net_b {
	flex: 1;
	display: flex;
	flex-direction: column;
}
.net_sendConfig {
	width: 240px;
	padding: 10px;
	border: 1px solid #ededed;
	user-select: none;
}
.net_btn {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

::-webkit-scrollbar {
	z-index: 50;
	width: 7px;
	height: 3px;
}

::-webkit-scrollbar-track {
	background-color: rgba(0, 0, 0, 0);
}

::-webkit-scrollbar-thumb {
	-webkit-border-radius: 5px;
	-moz-border-radius: 5px;
	border-radius: 5px;
	background-color: rgba(0, 0, 0, 0.1);
	transition: all 0.2s;
	height: 20px;
}
:hover::-webkit-scrollbar-thumb {
	transition: all 0.2s;
}
::-webkit-scrollbar-button {
	display: none;
}
::-webkit-scrollbar-corner {
	display: none;
}
</style>
