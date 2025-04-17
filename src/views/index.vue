<template>

	<div class="bodyClass">
		<header>
			<div class="logo-section box">
				<div class="logo">
					<a href="#">
						<h1 class="logo-title">医学考研系统</h1>
					</a>
				</div>
				<div style="float:right;right:20px;">
					<template v-if="loginType == 2 && loginId != ''">
						<a href="javascript:void(0)" :data-params="''" data-href="/user/index" @click="goToPage"
							data-type="1">
							<button class="custom-btn btn-3"><span>个人中心</span></button>
						</a>
					</template>
					<template v-if="loginType == 2 && loginId != ''">
						<a href="javascript:void(0)" @click="logoutAct" data-type="1">
							<button class="custom-btn btn-4"><span>退出</span></button>
						</a>
					</template>
					<template v-if="loginType == ''">
						<a href="javascript:void(0)" :data-params="''" data-href="/user_regist" @click="goToPage"
							data-type="1">
							<button class="custom-btn btn-1">注册</button>
							<!-- <font style="margin-left:10px;font-size:20px">注册</font> -->
						</a>
					</template>
					<template v-if="loginType == ''">
						<a href="javascript:void(0)" :data-params="''" data-href="/sys_login" @click="goToPage"
							data-type="1">
							<button class="custom-btn btn-2">登录</button>
							<!-- <font style="margin-left:10px;font-size:20px">登录</font> -->
						</a>
					</template>
				</div>
			</div>
			<div class="clear"></div>
			<div class="topnav">
				<nav>
					<ul id="starlist">
						<li><a data-type="2" href="javascript:void(0)" @click="goPage" data-href="/index/index"
								class="clientPageHref"
								style="margin-left: 25px;margin-right: 60px;font-size:25px">首页</a></li>
						<li><a data-type="2" href="javascript:void(0)" @click="goPage" data-href="/index/school_search"
								class="clientPageHref" style="margin-right: 30px;font-size:25px">院校库</a></li>
						<li><a data-type="2" href="javascript:void(0)" @click="goPage" data-href="/index/major_search"
								class="clientPageHref" style="margin-right: 30px;font-size:25px">专业库</a></li>
						<li><a data-type="2" href="javascript:void(0)" @click="goPage" data-href="/index/news_search"
								class="clientPageHref" style="margin-right: 30px;font-size:25px">资讯库</a></li>
						<li><a data-type="2" href="javascript:void(0)" @click="goPage" data-href="/index/data_search"
								class="clientPageHref" style="margin-right: 30px;font-size:25px">资料库</a></li>
						<li><a data-type="2" href="javascript:void(0)" @click="goPage" data-href="/index/post_search"
								class="clientPageHref" style="margin-right: 30px;font-size:25px">交流平台</a></li>
						<li><a data-type="2" href="javascript:void(0)" @click="goPage" data-href="/index/tool_detail"
								class="clientPageHref" style="margin-right: 30px;font-size:25px">工具箱</a></li>
					</ul>
				</nav>
				<h2 id="mnavh"><span class="navicon"></span></h2>
			</div>
		</header>
		<iframe src="/index/index" id="iframeDom" style="width:102%;min-height:800px" frameborder="0"></iframe>
	</div>
</template>

<script>
import $ from 'jquery'
import { utils } from '../assets/listutils.js'
export default {
	components: {
	},
	data() {
		return {
			loginId: '',
			loginType: '',
			loginToken: '',
			loginName: '',
			headImg: '',
		};
	},
	mounted() {
		var childPageUrl = this.$route.query.childPageUrl;
		if (childPageUrl != null && childPageUrl != '' && childPageUrl != 'null') {
			childPageUrl = window.atob(childPageUrl);
			$("#iframeDom").attr("src", childPageUrl);
		}
		this.loginToken = utils.getCookie('loginToken');
		this.loginId = utils.getCookie('loginId');
		this.loginType = utils.getCookie('loginType');
		this.loginName = utils.getCookie('loginName');
		this.initData();
	},
	methods: {
		initData() {
			var that = this;
			$.ajax({
				type: 'get',
				url: that.REQUEST_URL + "/index/getData",
				async: false,
				data: {
					"loginToken": that.loginToken,
				},
				success: function (result) {
					that.headImg = result.headImg;
					if (result.login == null) {
						that.loginToken = '';
						that.loginId = '';
						that.loginType = '';
						that.loginName = '';
						that.headImg = '';
					}
				}
			});
		},
		logoutAct() {
			var that = this;
			$.ajax({
				type: 'get',
				url: this.REQUEST_URL + "/login/sys_logout",
				async: false,
				data: {
					'loginToken': that.currentLoginToken,
				},
				success: function (result) {
					that.goToPageJS('/sys_login', '');
				}
			});
		},
		goPage(e) {
			var that = this;
			var dataType = e.currentTarget.dataset.type;
			if (dataType == 2) {
				$(".clientPageHref").removeClass("head-selected");
				$(e).addClass("head-selected");
			}
			var href = e.currentTarget.dataset.href;
			$("#iframeDom").attr("src", href);
		},
	},
};


</script>
<style type="text/css" src="../assets/index/css/base.css?t=44" scoped></style>
<style type="text/css" src="../assets/index/css/m.css?t=44" scoped></style>
<style scoped>
.bg {
	position: fixed;
	/*设置定位*/
	top: 0;
	left: 0;
	z-index: -1;
	/*使画布基于最低层*/
	background: #0e1729;
	/*画布背景色*/
}

.selectStyle {
	background: rgb(9, 118, 220);
}

.bodyClass::-webkit-scrollbar {
	display: none;
	/* Chrome Safari */
}

.bodyClass {
	font: 15px "Microsoft YaHei", Arial, Helvetica, sans-serif;
	color: #000;
	background: #f1f1f1;
	font-size: 15px;
	scrollbar-width: none;
	/* firefox */
	-ms-overflow-style: none;
	/* IE 10+ */
	overflow-x: hidden;
	overflow-y: auto;
}

img {
	border: 0;
	display: block
}

ul,
li {
	list-style: none;
}

a {
	text-decoration: none;
	color: #000;
}

a:hover {
	color: #218af1;
	text-decoration: none;
}

h1 {
	font-size: 28px
}

h2 {
	font-size: 18px
}

h3 {
	font-size: 16px
}

i {
	font-style: normal;
	display: block
}

span {
	display: block
}

.head-selected {
	background-color: rgb(9, 118, 220) !important;
}

.custom-btn {
	width: 130px;
	height: 40px;
	color: #fff;
	border-radius: 5px;
	padding: 10px 25px;
	font-family: 'Lato', sans-serif;
	font-weight: 500;
	background: transparent;
	cursor: pointer;
	transition: all 0.3s ease;
	position: relative;
	display: inline-block;
	box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, .5),
		7px 7px 20px 0px rgba(0, 0, 0, .1),
		4px 4px 5px 0px rgba(0, 0, 0, .1);
	outline: none;
}

/* 1 */
.btn-1 {
	background: rgb(6, 14, 131);
	background: linear-gradient(0deg, rgba(6, 14, 131, 1) 0%, rgba(12, 25, 180, 1) 100%);
	border: none;
}

.btn-1:hover {
	background: rgb(0, 3, 255);
	background: linear-gradient(0deg, rgba(0, 3, 255, 1) 0%, rgba(2, 126, 251, 1) 100%);
}

/* 2 */
.btn-2 {
	background: rgb(96, 9, 240);
	background: linear-gradient(0deg, rgba(96, 9, 240, 1) 0%, rgba(129, 5, 240, 1) 100%);
	border: none;

}

.btn-2:before {
	height: 0%;
	width: 2px;
}

.btn-2:hover {
	box-shadow: 4px 4px 6px 0 rgba(255, 255, 255, .5),
		-4px -4px 6px 0 rgba(116, 125, 136, .5),
		inset -4px -4px 6px 0 rgba(255, 255, 255, .2),
		inset 4px 4px 6px 0 rgba(0, 0, 0, .4);
}

/* 3 */
.btn-3 {
	background: rgb(0, 172, 238);
	background: linear-gradient(0deg, rgba(0, 172, 238, 1) 0%, rgba(2, 126, 251, 1) 100%);
	width: 80px;
	height: 40px;
	line-height: 42px;
	padding: 0;
	border: none;

}

.btn-3 span {
	position: relative;
	display: block;
	width: 100%;
	height: 100%;
}

.btn-3:before,
.btn-3:after {
	position: absolute;
	content: "";
	right: 0;
	top: 0;
	background: rgba(2, 126, 251, 1);
	transition: all 0.3s ease;
}

.btn-3:before {
	height: 0%;
	width: 2px;
}

.btn-3:after {
	width: 0%;
	height: 2px;
}

.btn-3:hover {
	background: transparent;
	box-shadow: none;
}

.btn-3:hover:before {
	height: 100%;
}

.btn-3:hover:after {
	width: 100%;
}

.btn-3 span:hover {
	color: rgba(2, 126, 251, 1);
}

.btn-3 span:before,
.btn-3 span:after {
	position: absolute;
	content: "";
	left: 0;
	bottom: 0;
	background: rgba(2, 126, 251, 1);
	transition: all 0.3s ease;
}

.btn-3 span:before {
	width: 2px;
	height: 0%;
}

.btn-3 span:after {
	width: 0%;
	height: 2px;
}

.btn-3 span:hover:before {
	height: 100%;
}

.btn-3 span:hover:after {
	width: 100%;
}

/* 4 */
.btn-4 {
	background-color: #4dccc6;
	background-image: linear-gradient(315deg, #4dccc6 0%, #96e4df 74%);
	width: 80px;
	height: 40px;
	line-height: 42px;
	padding: 0;
	border: none;
}

.btn-4:hover {
	background-color: #89d8d3;
	background-image: linear-gradient(315deg, #89d8d3 0%, #03c8a8 74%);
}

.btn-4 span {
	position: relative;
	display: block;
	width: 100%;
	height: 100%;
}

.btn-4:before,
.btn-4:after {
	position: absolute;
	content: "";
	right: 0;
	top: 0;
	box-shadow: 4px 4px 6px 0 rgba(255, 255, 255, .9),
		-4px -4px 6px 0 rgba(116, 125, 136, .2),
		inset -4px -4px 6px 0 rgba(255, 255, 255, .9),
		inset 4px 4px 6px 0 rgba(116, 125, 136, .3);
	transition: all 0.3s ease;
}

.btn-4:before {
	height: 0%;
	width: .1px;
}

.btn-4:after {
	width: 0%;
	height: .1px;
}

.btn-4:hover:before {
	height: 100%;
}

.btn-4:hover:after {
	width: 100%;
}

.btn-4 span:before,
.btn-4 span:after {
	position: absolute;
	content: "";
	left: 0;
	bottom: 0;
	box-shadow: 4px 4px 6px 0 rgba(255, 255, 255, .9),
		-4px -4px 6px 0 rgba(116, 125, 136, .2),
		inset -4px -4px 6px 0 rgba(255, 255, 255, .9),
		inset 4px 4px 6px 0 rgba(116, 125, 136, .3);
	transition: all 0.3s ease;
}

.btn-4 span:before {
	width: .1px;
	height: 0%;
}

.btn-4 span:after {
	width: 0%;
	height: .1px;
}

.btn-4 span:hover:before {
	height: 100%;
}

.btn-4 span:hover:after {
	width: 100%;
}
</style>
