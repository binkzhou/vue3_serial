/**
 * @description
 * @date 2022-01-12
 * @author tudou
 * @lastModify tudou 2022-01-12
 */
const serialConfig = {
	baudRate: [115200, 57600, 38400, 19200, 9600, 4800, 2400, 1800], // 波特率
	parity: ['none', 'even', 'mark', 'odd', 'space'], // 校验位
	dataBits: [8, 7, 6, 5], // 数据位
	stopBits: [1, 2] // 停止位
};

export default serialConfig;
