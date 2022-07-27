const fs = require('fs');
const path = require('path');

const { generateTheme } = require('antd-theme-generator');
//生成的theme.less文件的位置
const outputFilePath = path.join(__dirname, '../../../public/static/theme.less');
//自定义样式
const cusCssFilePath = path.join(__dirname, '../cus-theme.less');

generateTheme({
	//node_modules中antd的路径
	antDir: path.join(__dirname, '../../../node_modules/ant-design-vue'),
	//styles对应的目录路径,需要和下面的variables.less在一个文件夹
	stylesDir: path.join(__dirname, './src'),
	//less变量的入口文件，variables.less里面定义的变量，必须在themeVariables里面定义
	varFile: path.join(__dirname, '../variables.less'),
	//您要动态更改的变量列表
	themeVariables: ['@primary-color', '@header-item-hover-color', '@header-back-color'],
	outputFilePath: outputFilePath,
	customColorRegexArray: [/^fade\(.*\)$/]
})
	.then(() => {
		console.log('配置主题成功');
		//自定义样式与ant主题样式合并
		//读取提取过的ant样式
		const themeCss = fs.readFileSync(outputFilePath).toString();
		// //读取自定义的CSS
		const cusCss = fs.readFileSync(cusCssFilePath).toString();
		fs.writeFileSync(outputFilePath, themeCss + cusCss);
		//重新覆盖themeCss
		console.log(`🌈 主题覆盖成功. OutputFile: ${outputFilePath}`);
	})
	.catch(() => {
		console.log('配置主题失败');
	});
