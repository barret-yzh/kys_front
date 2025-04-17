<template>
	<div id="body" class="bodyClass">
		<div class="admin-modal admin-inmodal admin-in" id="bodyModal" tabindex="-1" role="dialog" aria-hidden="false"
			style="top: 80px; left: -200px; ">
			<div class="admin-modal-dialog">
				<div class="admin-modal-content">
					<div class="admin-modal-header">
						<button type="button" class="admin-close" @click="handleExportJsMethod"
							data-methodtype="hideModal"><span aria-hidden="true">×</span><span
								class="admin-sr-only">关闭</span>
						</button>
						<h4 class="admin-modal-title" id="bodyModalTile"></h4>
					</div>
					<div class="admin-modal-body" id="bodyModalContent" style="padding:30px;"></div>
					<div class="admin-modal-footer">
						<button type="button" class="admin-btn admin-btn-white" @click="handleExportJsMethod"
							data-methodtype="hideModal">关闭</button>
					</div>
				</div>
			</div>
		</div>
		<ol class="breadcrumb">
			<li>我的帖子</li>
		</ol>
		<div>
			<div style="padding:10px;">
				<div style="margin-left:20px;display:inline-block">
					<p style="margin-top:30px;">
						<span style="">标题</span>
					<div>
						<input type="input" placeholder="请输入标题" name="title" v-model="title"
							class="form-control  query-input" id="title">
					</div>
					</p>
				</div>
				<div style="margin-left:20px;display:inline-block">
					<button @click="ajaxList(1)" class="btn btn-primary">查询</button>
				</div>
			</div>
			<div style="padding:10px;">
				<a href="javascript:void(0)" :data-params="''" data-href="/user/post/add_page" @click="goToPage"
					style="margin-left:5px;margin-top:3px;" class="btnStyle1 btn btn-success">新增</a>
			</div>
			<div style="padding:10px;">
			</div>
		</div>
		<div class="tablebox">
			<table class="table table-bordered">
				<thead>
					<tr>
						<th>标题</th>
						<!-- <th>用户名</th> -->
						<th>创建日期</th>
						<th>点赞数</th>
						<th style="width:200px;">
							操作
						</th>
					</tr>
				</thead>
				<tbody id="postList">
					<template v-for="item in dataList">
						<tr>
							<td v-html="'' + (item.post.title == null ? '' : item.post.title) + ''"></td>
							<!-- <td v-html="'' + (item.userIdStr == null ? '' : item.userIdStr) + ''"></td> -->
							<td v-html="'' + (item.post.createDate == null ? '' : item.post.createDate) + ''"></td>
							<td v-html="'' + (item.post.praiseNum == null ? '' : item.post.praiseNum) + ''"></td>
							<td style="width:200px">
								<a href="javascript:void(0)" :data-params="'id=' + item.post.id + ''"
									data-href="/user/post/detail" @click="goToPage"
									style="margin-left:5px;margin-top:3px;" class="btnStyle1 btn btn-success">查看详情</a>
								<a href="javascript:void(0)" :data-params="'id=' + item.post.id + ''"
									data-href="/user/post/update_page" @click="goToPage"
									style="margin-left:5px;margin-top:3px;" class="btnStyle1 btn btn-primary">修改</a>
								<a href="javascript:void(0)" :data-id="item.post.id" @click="del1"
									style="margin-left:5px;margin-top:3px;" class="btnStyle1 btn btn-danger">删除</a>
							</td>
						</tr>
					</template>
					<template v-if="dataList == null || dataList.length == 0">
						<div style="height:60px;">
							<h2 style="position:fixed;margin-left:47%;width:100%;border:1px">无数据</h2>
						</div>
					</template>
				</tbody>
			</table>
			<div>
				<div id="post_bar" class="pagination" style="margin-top:20px;"></div>
			</div>
		</div>
	</div>
</template>

<script>
import $ from 'jquery'
import { utils } from '../../../assets/listutils.js'
import { admin_utils } from '../../../assets/admin/admin_utils.js'
import { myPagination } from '../../../assets/page/myPagination.js'
export default {
	components: {
	},
	data() {
		return {
			currentLoginToken: '',
			currentLoginId: '',
			currentLoginType: '',
			title: '',
			dataList: [],
		};
	},
	mounted() {
		var that = this;
		that.currentLoginToken = utils.getCookie('loginToken');
		that.currentLoginId = utils.getCookie('loginId');
		that.currentLoginType = utils.getCookie('loginType');
		that.ajaxList(1);
	},
	methods: {
		handleExportJsMethod(e) {
			var div = e.currentTarget;
			var methodtype = div.dataset.methodtype;
			if (methodtype == 'maxImg') {
				admin_utils.maxImg(div);
			}
			if (methodtype == 'hideModal') {
				admin_utils.hideModal(div);
			}
			if (methodtype == 'selectAll') {
				admin_utils.selectAll(div);
			}
			if (methodtype == 'maxQrcode') {
				maxQrcode(div);
			}
		},
		del1(e) {
			var that = this;
			var dataId = e.currentTarget.dataset.id;
			var r = confirm("确认删除该数据吗？");
			if (r == true) {
				$.ajax({
					type: 'get',
					url: this.REQUEST_URL + "/user/post/del1",
					async: false,
					data: {
						"loginToken": that.currentLoginToken,
						"id": dataId
					},
					success: function (result) {
						alert(result.msg);
						if (result.code == 1) {
							that.ajaxList(1);
						}
					}
				});
			}
		},
		ajaxCount() {
			var that = this;
			var rs = null;
			var title = that.title;
			$.ajax({
				type: 'get',
				url: this.REQUEST_URL + '/user/post/queryCount',
				async: false,
				data: {
					"loginToken": that.currentLoginToken,
					"title": title,
				},
				success: function (result) {
					rs = result;
				}
			});
			return rs;
		},
		ajaxList(page) {
			var that = this;
			if (page == undefined || page == null) {
				page = 1;
			}
			var title = that.title;
			var countRs = that.ajaxCount();
			if (countRs.totalPage < page) {
				page = countRs.totalPage;
			}
			$.ajax({
				type: 'get',
				url: this.REQUEST_URL + '/user/post/queryList',
				async: false,
				data: {
					"page": page,
					"loginToken": that.currentLoginToken,
					"title": title,
				},
				success: function (result) {
					admin_utils.hideLoading();
					var rows = result.list;
					var total = countRs.count;//得到数据总数
					var totalPage = countRs.totalPage;
					that.dataList = rows;
					new myPagination({
						id: 'post_bar',
						curPage: page, //初始页码
						pageTotal: totalPage, //总页数
						pageAmount: 10,  //每页多少条
						dataTotal: total, //总共多少条数据
						pageSize: 10, //可选,分页个数
						showPageTotalFlag: true, //是否显示数据统计
						showSkipInputFlag: false, //是否支持跳转
						getPage: function (page) {
							that.ajaxList(page)
						}
					})
				}
			});
		},
	}
};

</script>
<style type="text/css" src="../../../assets/page/myPagination.css?t=44" scoped></style>
<style type="text/css" src="../../../assets/admin/style.css?t=9?t=44" scoped></style>
<style scoped>
#body {
	font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
	font-size: 14px;
	line-height: 1.42857143;
	color: #333;
	background-color: #fff;
}

.btnStyle {
	margin-left: 8px;
	margin-top: 8px
}

.loadingModel {
	position: absolute;
	top: 0;
	left: 0;
	background-color: rgba(9, 9, 9, 0.63);
	width: 100%;
	height: 100%;
	z-index: 1000;
}

.loading-content {
	width: 50%;
	text-align: center;
	background: #ffffff;
	border-radius: 6px;
	line-height: 30px;
	z-index: 10001;
}

input {
	height: 35px !important
}

select {
	height: 35px !important
}

td>div {
	display: inline;
	margin-left: 5px;
}

table {
	border-collapse: collapse;
	border-spacing: 0;
}

* {
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
}

.query-select {
	height: 35px !important;
	width: 200px !important;
}

.query-input {
	width: 200px !important;
	display: inline !important;
}

td {
	text-align: center;
}
</style>
