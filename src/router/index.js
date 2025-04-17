import { createRouter, createWebHistory } from 'vue-router'
import index1 from '../views/index.vue';
import index_index from '../views/index/index.vue';
import index_school_search from '../views/index/school_search.vue';
import index_major_search from '../views/index/major_search.vue';
import index_news_search from '../views/index/news_search.vue';
import index_data_search from '../views/index/data_search.vue';
import index_post_search from '../views/index/post_search.vue';
import index_school_detail from '../views/index/school_detail.vue';
import index_major_detail from '../views/index/major_detail.vue';
import index_news_detail from '../views/index/news_detail.vue';
import index_data_detail from '../views/index/data_detail.vue';
import index_post_detail from '../views/index/post_detail.vue';
import sys_login from '../views/sys_login.vue';
import user_regist from '../views/user_regist.vue';
import admin_index from '../views/admin/index.vue';
import user_index from '../views/user/index.vue';
import admin_user_list from '../views/admin/user/list.vue';
import admin_school_list from '../views/admin/school/list.vue';
import admin_major_list from '../views/admin/major/list.vue';
import admin_news_list from '../views/admin/news/list.vue';
import admin_data_msg_list from '../views/admin/data_msg/list.vue';
import admin_post_list from '../views/admin/post/list.vue';
import user_post_list from '../views/user/post/list.vue';
import user_collect_log_list from '../views/user/collect_log/list.vue';
import admin_dis_list from '../views/admin/dis/list.vue';
import user_dis_list from '../views/user/dis/list.vue';
import admin_dis_reply_list from '../views/admin/dis_reply/list.vue';
import user_dis_reply_list from '../views/user/dis_reply/list.vue';
import admin_zl_type_list from '../views/admin/zl_type/list.vue';
import admin_banner_list from '../views/admin/banner/list.vue';
import user_personal from '../views/user/personal.vue';
import admin_news_detail from '../views/admin/news/detail.vue';
import admin_post_detail from '../views/admin/post/detail.vue';
import user_post_detail from '../views/user/post/detail.vue';
import alter_password from '../views/alter_password.vue';
import admin_user_add from '../views/admin/user/add_page.vue';
import admin_user_update from '../views/admin/user/update_page.vue';
import user_user_update1 from '../views/user/user/update1_page.vue';
import admin_school_add from '../views/admin/school/add_page.vue';
import admin_school_update from '../views/admin/school/update_page.vue';
import admin_major_add from '../views/admin/major/add_page.vue';
import admin_major_update from '../views/admin/major/update_page.vue';
import admin_news_add from '../views/admin/news/add_page.vue';
import admin_news_update from '../views/admin/news/update_page.vue';
import admin_data_msg_add from '../views/admin/data_msg/add_page.vue';
import admin_data_msg_update from '../views/admin/data_msg/update_page.vue';
import user_post_add from '../views/user/post/add_page.vue';
import user_post_update from '../views/user/post/update_page.vue';
import admin_zl_type_add from '../views/admin/zl_type/add_page.vue';
import admin_zl_type_update from '../views/admin/zl_type/update_page.vue';
import admin_banner_add from '../views/admin/banner/add_page.vue';
import admin_banner_update from '../views/admin/banner/update_page.vue';
import tool_detail from '@/views/index/tool_detail'
const routes = [
	{
		path: '/',
		component: index1,
		name: 'index10',
		meta: { auth: true }
	},
	{
		path: '/index',
		component: index1,
		name: 'index1',
		meta: { auth: true }
	},
	{
		path: '/index/index',
		component: index_index,
		name: 'index_index',
		meta: { auth: true }
	},
	{
		path: '/index/school_search',
		component: index_school_search,
		name: 'index_school_search',
		meta: { auth: true }
	},
	{
		path: '/index/major_search',
		component: index_major_search,
		name: 'index_major_search',
		meta: { auth: true }
	},
	{
		path: '/index/news_search',
		component: index_news_search,
		name: 'index_news_search',
		meta: { auth: true }
	},
	{
		path: '/index/data_search',
		component: index_data_search,
		name: 'index_data_search',
		meta: { auth: true }
	},
	{
		path: '/index/post_search',
		component: index_post_search,
		name: 'index_post_search',
		meta: { auth: true }
	},
	{
		path: '/index/school_detail',
		component: index_school_detail,
		name: 'index_school_detail',
		meta: { auth: true }
	},
	{
		path: '/index/major_detail',
		component: index_major_detail,
		name: 'index_major_detail',
		meta: { auth: true }
	},
	{
		path: '/index/news_detail',
		component: index_news_detail,
		name: 'index_news_detail',
		meta: { auth: true }
	},
	{
		path: '/index/data_detail',
		component: index_data_detail,
		name: 'index_data_detail',
		meta: { auth: true }
	},
	{
		path: '/index/post_detail',
		component: index_post_detail,
		name: 'index_post_detail',
		meta: { auth: true }
	},
	{
		path: '/sys_login',
		component: sys_login,
		name: 'sys_login',
		meta: { auth: true }
	},
	{
		path: '/user_regist',
		component: user_regist,
		name: 'user_regist',
		meta: { auth: true }
	},
	{
		path: '/admin/index',
		component: admin_index,
		name: 'admin_index',
		meta: { auth: true }
	},
	{
		path: '/user/index',
		component: user_index,
		name: 'user_index',
		meta: { auth: true }
	},
	{
		path: '/admin/user/list',
		component: admin_user_list,
		name: 'admin_user_list',
		meta: { auth: true }
	},
	{
		path: '/admin/school/list',
		component: admin_school_list,
		name: 'admin_school_list',
		meta: { auth: true }
	},
	{
		path: '/admin/major/list',
		component: admin_major_list,
		name: 'admin_major_list',
		meta: { auth: true }
	},
	{
		path: '/admin/news/list',
		component: admin_news_list,
		name: 'admin_news_list',
		meta: { auth: true }
	},
	{
		path: '/admin/data_msg/list',
		component: admin_data_msg_list,
		name: 'admin_data_msg_list',
		meta: { auth: true }
	},
	{
		path: '/admin/post/list',
		component: admin_post_list,
		name: 'admin_post_list',
		meta: { auth: true }
	},
	{
		path: '/user/post/list',
		component: user_post_list,
		name: 'user_post_list',
		meta: { auth: true }
	},
	{
		path: '/user/collect_log/list',
		component: user_collect_log_list,
		name: 'user_collect_log_list',
		meta: { auth: true }
	},
	{
		path: '/admin/dis/list',
		component: admin_dis_list,
		name: 'admin_dis_list',
		meta: { auth: true }
	},
	{
		path: '/user/dis/list',
		component: user_dis_list,
		name: 'user_dis_list',
		meta: { auth: true }
	},
	{
		path: '/admin/dis_reply/list',
		component: admin_dis_reply_list,
		name: 'admin_dis_reply_list',
		meta: { auth: true }
	},
	{
		path: '/user/dis_reply/list',
		component: user_dis_reply_list,
		name: 'user_dis_reply_list',
		meta: { auth: true }
	},
	{
		path: '/admin/zl_type/list',
		component: admin_zl_type_list,
		name: 'admin_zl_type_list',
		meta: { auth: true }
	},
	{
		path: '/admin/banner/list',
		component: admin_banner_list,
		name: 'admin_banner_list',
		meta: { auth: true }
	},
	{
		path: '/user/personal',
		component: user_personal,
		name: 'user_personal',
		meta: { auth: true }
	},
	{
		path: '/admin/news/detail',
		component: admin_news_detail,
		name: 'admin_news_detail',
		meta: { auth: true }
	},
	{
		path: '/admin/post/detail',
		component: admin_post_detail,
		name: 'admin_post_detail',
		meta: { auth: true }
	},
	{
		path: '/user/post/detail',
		component: user_post_detail,
		name: 'user_post_detail',
		meta: { auth: true }
	},
	{
		path: '/alter_password',
		component: alter_password,
		name: 'alter_password',
		meta: { auth: true }
	},
	{
		path: '/admin/user/add_page',
		component: admin_user_add,
		name: 'admin_user_add',
		meta: { auth: true }
	},
	{
		path: '/admin/user/update_page',
		component: admin_user_update,
		name: 'admin_user_update',
		meta: { auth: true }
	},
	{
		path: '/user/user/update1_page',
		component: user_user_update1,
		name: 'user_user_update1',
		meta: { auth: true }
	},
	{
		path: '/admin/school/add_page',
		component: admin_school_add,
		name: 'admin_school_add',
		meta: { auth: true }
	},
	{
		path: '/admin/school/update_page',
		component: admin_school_update,
		name: 'admin_school_update',
		meta: { auth: true }
	},
	{
		path: '/admin/major/add_page',
		component: admin_major_add,
		name: 'admin_major_add',
		meta: { auth: true }
	},
	{
		path: '/admin/major/update_page',
		component: admin_major_update,
		name: 'admin_major_update',
		meta: { auth: true }
	},
	{
		path: '/admin/news/add_page',
		component: admin_news_add,
		name: 'admin_news_add',
		meta: { auth: true }
	},
	{
		path: '/admin/news/update_page',
		component: admin_news_update,
		name: 'admin_news_update',
		meta: { auth: true }
	},
	{
		path: '/admin/data_msg/add_page',
		component: admin_data_msg_add,
		name: 'admin_data_msg_add',
		meta: { auth: true }
	},
	{
		path: '/admin/data_msg/update_page',
		component: admin_data_msg_update,
		name: 'admin_data_msg_update',
		meta: { auth: true }
	},
	{
		path: '/user/post/add_page',
		component: user_post_add,
		name: 'user_post_add',
		meta: { auth: true }
	},
	{
		path: '/user/post/update_page',
		component: user_post_update,
		name: 'user_post_update',
		meta: { auth: true }
	},
	{
		path: '/admin/zl_type/add_page',
		component: admin_zl_type_add,
		name: 'admin_zl_type_add',
		meta: { auth: true }
	},
	{
		path: '/admin/zl_type/update_page',
		component: admin_zl_type_update,
		name: 'admin_zl_type_update',
		meta: { auth: true }
	},
	{
		path: '/admin/banner/add_page',
		component: admin_banner_add,
		name: 'admin_banner_add',
		meta: { auth: true }
	},
	{
		path: '/admin/banner/update_page',
		component: admin_banner_update,
		name: 'admin_banner_update',
		meta: { auth: true }
	},
	{
		path: '/index/tool_detail',
		component: tool_detail,
		name: 'tool_detail',
		meta: { auth: true }
	},
]
const router = createRouter({
	// @ts-ignore
	mode: 'history', // 设置为history模式
	history: createWebHistory(),
	base: process.env.BASE_URL,
	routes
})
export default router
