<template>
	<div id="system" class="body-class" style="width:102%">
		<header>
			<div class="left">
				<a href="javascript:void(0)">
					医学考研系统管理端
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
						<dt @click="gotoIframePage" :data-url="'/admin/user/list'"><i class="fa fa-fw fa-reorder"></i>
							<span>用户管理</span>
						</dt>
					</dl>
					<dl>
						<dt @click="handleExportJsMethod" data-methodtype="clickMenu"><i
								class="fa fa-fw fa-reorder"></i> <span>院校专业</span></dt>
						<dd>
							<div class='li'>
								<a href="javascript:void(0)" @click="gotoIframePage" :data-url="'/admin/school/list'"><i
										class="fa fa-fw fa-angle-right"></i><span>院校管理</span></a>
							</div>
						</dd>
						<dd>
							<div class='li'>
								<a href="javascript:void(0)" @click="gotoIframePage" :data-url="'/admin/major/list'"><i
										class="fa fa-fw fa-angle-right"></i><span>专业管理</span></a>
							</div>
						</dd>
					</dl>
					<dl>
						<dt @click="gotoIframePage" :data-url="'/admin/news/list'"><i class="fa fa-fw fa-reorder"></i>
							<span>资讯管理</span>
						</dt>
					</dl>
					<dl>
						<dt @click="handleExportJsMethod" data-methodtype="clickMenu"><i
								class="fa fa-fw fa-reorder"></i> <span>资料管理</span></dt>
						<dd>
							<div class='li'>
								<a href="javascript:void(0)" @click="gotoIframePage"
									:data-url="'/admin/zl_type/list'"><i
										class="fa fa-fw fa-angle-right"></i><span>资料类型</span></a>
							</div>
						</dd>
						<dd>
							<div class='li'>
								<a href="javascript:void(0)" @click="gotoIframePage"
									:data-url="'/admin/data_msg/list'"><i
										class="fa fa-fw fa-angle-right"></i><span>资料信息</span></a>
							</div>
						</dd>
					</dl>
					<dl>
						<dt @click="handleExportJsMethod" data-methodtype="clickMenu"><i
								class="fa fa-fw fa-reorder"></i> <span>交流平台管理</span></dt>
						<dd>
							<div class='li'>
								<a href="javascript:void(0)" @click="gotoIframePage" :data-url="'/admin/post/list'"><i
										class="fa fa-fw fa-angle-right"></i><span>帖子管理</span></a>
							</div>
						</dd>
						<dd>
							<div class='li'>
								<a href="javascript:void(0)" @click="gotoIframePage" :data-url="'/admin/dis/list'"><i
										class="fa fa-fw fa-angle-right"></i><span>评论管理</span></a>
							</div>
						</dd>
						<dd>
							<div class='li'>
								<a href="javascript:void(0)" @click="gotoIframePage"
									:data-url="'/admin/dis_reply/list'"><i
										class="fa fa-fw fa-angle-right"></i><span>评论回复</span></a>
							</div>
						</dd>
					</dl>
					<dl>
						<dt @click="gotoIframePage" :data-url="'/admin/banner/list'"><i class="fa fa-fw fa-reorder"></i>
							<span>轮播图</span>
						</dt>
					</dl>
				</div>
			</div>
			<div class="right">
				<iframe src="/admin/user/list" frameborder="0" id="iframeDom" name="rightiframe"
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
				url: this.REQUEST_URL + "/admin/index/getInitData",
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
