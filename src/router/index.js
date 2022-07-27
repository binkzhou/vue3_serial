import { createRouter, createWebHashHistory } from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import Net from '../views/Net.vue';
import Setting from '../views/Setting.vue';

const routes = [
	{
		path: '/',
		name: 'Dashboard',
		component: Dashboard
	},
	{
		path: '/net',
		name: 'Net',
		component: Net
	},
	{
		path: '/setting',
		name: 'Setting',
		component: Setting
	}
];

const router = createRouter({
	history: createWebHashHistory(),
	routes
});

export default router;
