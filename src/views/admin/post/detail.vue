

<template>
	<div id="body">
		<div class="admin-modal admin-inmodal admin-in" id="bodyModal" tabindex="-1" role="dialog" aria-hidden="false" style="top: 80px; left: -200px; ">
			<div class="admin-modal-dialog">
				<div class="admin-modal-content">
					<div class="admin-modal-header">
						<button type="button" class="admin-close" @click="handleExportJsMethod"  data-methodtype="hideModal"><span aria-hidden="true">×</span><span class="admin-sr-only">关闭</span>
						</button>
						<h4 class="admin-modal-title" id="bodyModalTile"></h4>
					</div>
					<div class="admin-modal-body" id="bodyModalContent" style="padding:30px;"></div>
					<div class="admin-modal-footer">
						<button type="button" class="admin-btn admin-btn-white" @click="handleExportJsMethod"  data-methodtype="hideModal">关闭</button>
					</div>
				</div>
			</div>
		</div>
		<ol class="breadcrumb">
			<li>帖子</li>
		</ol>
		<div class="barboxs">
		</div>
		<div class="tablebox"  style="width:90%">
			<table class="table table-bordered">
				<tbody >
					<tr>
						<td class="col1">标题</td>
						<td class="col2" v-html="title==null?'':title"></td>
					</tr>
					<tr>
						<td class="col1">内容</td>
						<td class="col2" v-html="content==null?'':content"></td>
					</tr>
					<tr>
						<td class="col1">用户ID</td>
						<td class="col2" v-html="userIdStr"></td>
					</tr>
					<tr>
						<td class="col1">创建日期</td>
						<td class="col2" v-html="createDate==null?'':createDate"></td>
					</tr>
					<tr>
						<td class="col1">点赞数</td>
						<td class="col2" v-html="praiseNum==null?'':praiseNum"></td>
					</tr>
				</tbody>
			</table>
			<div>
				<a href="javascript:void(0)"  onclick="javascript:history.back(-1);" class="btn btn-default">返回</a>
			</div>
		</div>
	</div>
</template>

<script>
import $ from 'jquery'
import {utils} from '../../../assets/listutils.js'
import {admin_utils} from '../../../assets/admin/admin_utils.js'
export default {
	components: {
	},
	data() {
		return {
			id:'',
			currentLoginToken:'',
			currentLoginId:'',
			currentLoginType:'',
			title:'',
			content:'',
			userIdStr:'',
			createDate:'',
			praiseNum:'',
			detail:{},
		};
	},
	mounted() {
		this.id= this.$route.query.id;
		this.currentLoginToken=utils.getCookie('loginToken');
		this.currentLoginId=utils.getCookie('loginId');
		this.currentLoginType=utils.getCookie('loginType');
		this.queryDataDetail();
	},
	methods:{
		queryDataDetail(){
			var that = this;
			$.ajax({
				type : 'get',
				url : this.REQUEST_URL+"/admin/post/getDetailData",
				async: false,
				data : {
					'id':that.id,
					'loginToken':that.currentLoginToken,
				},
				success : function(result) {
					that.title = (result.detail.post.title==null?'':result.detail.post.title);
					that.content = (result.detail.post.content==null?'':result.detail.post.content);
					that.userIdStr = (result.detail.userIdStr==null?'':result.detail.userIdStr);
					that.createDate = (result.detail.post.createDate==null?'':result.detail.post.createDate);
					that.praiseNum = (result.detail.post.praiseNum==null?'':result.detail.post.praiseNum);
				}
			});
		},
	}
};

</script>
<style type="text/css" src="../../../assets/admin/style.css?t=9?t=44" scoped></style>
<style scoped>
	a{
	text-decoration: none;
	font-weight: 600;
	cursor: pointer;
	}
	#body {
	font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
	font-size: 14px;
	line-height: 1.42857143;
	color: #333;
	background-color: #fff;
	}
	.btnStyle{
	margin-left:8px;
	margin-top:8px
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
	input{
	height:35px !important
	}
	select{
	height:35px !important
	}
	td >div{
	display:inline;
	margin-left:5px;
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
	.query-select{
	height:35px;
	width:200px;
	display:inline;
	}
	.query-input{
	width:200px;
	display:inline;
	}
	video{
	width:200px !important;
	}
	audio{
	width:200px !important;
	}
	input{
	height:20px;
	}
	th{
	background-color:white !important
	}
	.col1{
	width:15%;
	background-color:#F5F5F6 !important
	}
	.col2{
	width:85%;
	text-align:left !important
	}
</style>



