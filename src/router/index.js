import { createRouter, createWebHashHistory } from 'vue-router';
import Dashboard from '../views/Dashboard.vue';

const routes = [
	{
		path: '/',
		name: 'Dashboard',
		component: Dashboard
	}
];

const router = createRouter({
	history: createWebHashHistory(),
	routes
});

export default router;
