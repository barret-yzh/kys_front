<template>
	<div id="system" class="body-class" style="width:102%">
		<header>
			<div class="left">
				<a data-href="/index" data-params="" href="javascript:void(0)" @click="goToPage">
					返回首页
				</a>
			</div>
			<div class="right" style="margin-right:2%">
				<a href="javascript:void(0)">
					欢迎您，{{ loginName }}！
				</a>
				<a href="javascript:void(0)" @click="alterPassword">
					修改密码
				</a>
				<a href="javascript:void(0)" @click="logout">
					退出
				</a>
			</div>
		</header>
		<section class="body">
			<div class="left">
				<div class="navbar">
					<dl>
						<dt @click="gotoIframePage" :data-url="'/user/personal'"><i class="fa fa-fw fa-reorder"></i>
							<span>个人信息</span>
						</dt>
					</dl>
					<dl>
						<dt @click="gotoIframePage" :data-url="'/user/post/list'"><i class="fa fa-fw fa-reorder"></i>
							<span>我的帖子</span>
						</dt>
					</dl>
					<dl>
						<dt @click="gotoIframePage" :data-url="'/user/collect_log/list'"><i
								class="fa fa-fw fa-reorder"></i> <span>我的收藏</span></dt>
					</dl>
					<dl>
						<dt @click="gotoIframePage" :data-url="'/user/dis/list'"><i class="fa fa-fw fa-reorder"></i>
							<span>我的评论</span>
						</dt>
					</dl>
					<dl>
						<dt @click="gotoIframePage" :data-url="'/user/dis_reply/list'"><i
								class="fa fa-fw fa-reorder"></i> <span>我的回复</span></dt>
					</dl>
				</div>
			</div>
			<div class="right">
				<iframe src="/user/personal" frameborder="0" id="iframeDom" name="rightiframe"
					style="width: 100%;height:100%"></iframe>
			</div>
		</section>
	</div>
</template>

<script>
import $ from 'jquery'
import { utils } from '../../assets/listutils.js'
import { admin_utils } from '../../assets/admin/admin_utils.js'
export default {
	components: {
	},
	data() {
		return {
			loginId: '',
			loginName: '',
			loginToken: '',
			loginType: '',
		};
	},
	mounted() {
		this.loginId = utils.getCookie('loginId');
		this.loginName = utils.getCookie('loginName');
		this.loginToken = utils.getCookie('loginToken');
		this.loginType = utils.getCookie('loginType');
		this.getInitData();
		this.checkIsLogin();
	},
	methods: {
		handleExportJsMethod(e) {
			var div = e.currentTarget;
			var methodtype = div.dataset.methodtype;
			if (methodtype == 'clickMenu') {
				admin_utils.clickMenu(div);
			}
		},
		gotoIframePage(e) {
			var that = this;
			var url = e.currentTarget.dataset.url;
			$('#iframeDom').attr('src', url);
		},
		alterPassword() {
			var that = this;
			$('#iframeDom').attr('src', '/alter_password');
			$("#page-container").removeClass("sidebar-o-xs");
		},
		logout() {
			var that = this;
			$.ajax({
				type: 'post',
				url: this.REQUEST_URL + "/login/sys_logout",
				data: {
					"token": that.loginToken
				},
				success: function (result) {
					if (result.code == 1) {
						that.goToPageJS('/sys_login', '');
					} else {
						alert(result.msg);
					}
				}
			});
		},
		getInitData() {
			var that = this;
			$.ajax({
				dataType: "json",
				type: "post",
				url: this.REQUEST_URL + "/user/index/getInitData",
				data: {
					"loginToken": that.loginToken
				},
				success: function (data, textStatus, jqXHR) {
					var statusCode = jqXHR.status;
					if (statusCode != 200) {
						that.goToPageJS('/sys_login', '');
					}
					if (data.code != undefined && data.code == 0) {
						alert(data.msg);
						that.goToPageJS('/sys_login', '');
					}
				},
				error: function (jqXHR, textStatus, errorThrown) {
					that.goToPageJS('/sys_login', '');
				}
			})
		},
		checkIsLogin() {
			var that = this;
			$.ajax({
				type: 'get',
				url: this.REQUEST_URL + "/login/checkIsLogin",
				async: false,
				data: {
					"loginToken": that.loginToken,
				},
				success: function (result) {
					if (result.code == 0) {
						that.goToPageJS('/sys_login', '');
					}
				}
			});
		},
	}
};

</script>
<style type="text/css" src="../../assets/admin/style.css?t=9?t=44" scoped></style>
<style scoped>
* {
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
	margin: 0;
}

a {
	background-color: transparent;
}

article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
main,
menu,
nav,
section,
summary {
	display: block;
}

dd {
	margin-left: 0;
}

dt,
dd {
	line-height: 1.42857143;
}
</style>
