

<template>
	<div id="body" class="bodyClass" >
		<ol class="breadcrumb">
			<li>帖子-修改</li>
		</ol>
		<div class="tabli">
			<span class="active">帖子-修改</span>
		</div>
		<div class="tabbody">
			<div class="bodyli active">
				<div class="inputbox"  id="titleForm">
					<span class="title">标题</span>
					<div class="inputright">
						<input type="input"  placeholder="请输入标题" name="title" v-model="title" class="form-control edit-input" id="title">
					</div>
				</div>
				<div class="inputbox"  id="contentForm">
					<span class="title">内容</span>
					<div class="inputright">
						<div class="editorDiv" id="content" data-id="content"></div>
					</div>
				</div>
			</div>
		</div>
		<div class="tbfooter">
			<button class="btn btn-success"  @click="submitData" ><i class="fa fa-floppy-o"></i> 保存</button>
			<button class="btn btn-default" onclick="javascript:history.back(-1);" >返回</button>
		</div>
	</div>
</template>

<script>
import $ from 'jquery'
import {utils} from '../../../assets/listutils.js'
import {admin_utils} from '../../../assets/admin/admin_utils.js'
import {initAllEditor,getEditVal,setEditorHtml} from '../../../assets/wangeditor/editor_utils.js'
export default {
	components: {
	},
	data() {
		return {
			currentLoginToken:'',
			id:'',
			title:'',
			content:'',
		};
	},
	mounted() {
		var that = this;
		that.currentLoginToken=utils.getCookie('loginToken');
		that.id= that.$route.query.id;
		initAllEditor(this.REQUEST_URL,'content');
		that.queryDataDetail();
		setEditorHtml('content',that.content)
	},
	methods:{
		queryDataDetail(){
			var that = this;
			$.ajax({
				type : 'get',
				url : this.REQUEST_URL+"/user/post/queryDataDetail",
				async: false,
				data : {
					'id':that.id,
					'loginToken':that.currentLoginToken,
				},
				success : function(result) {
					that.title=result.title;
					that.content=result.content;
					setEditorHtml('content',result.content)
				}
			});
		},
		submitData(){
			var that = this;
			var title = that.title;
			var content = getEditVal('content');
			$.ajax({
				type : 'post',
				url : this.REQUEST_URL+"/user/post/update_submit",
				async: false,
				data : {
					'id':that.id,
					'title':title,
					'content':content,
					'loginToken':that.currentLoginToken,
				},
				success : function(result) {
					alert(result.msg);
					if(result.code==1){
						that.$router.go(-1);
					}
				}
			});
		},
	}
};

</script>
<style type="text/css" src="../../../assets/admin/style.css?t=44" scoped></style>
<style scoped>
	.bodyClass::-webkit-scrollbar {
	display: none; /* Chrome Safari */
	}
	.bodyClass {
	scrollbar-width: none; /* firefox */
	-ms-overflow-style: none; /* IE 10+ */
	overflow-x: hidden;
	overflow-y: auto;
	}
	.dz-image>img{
	width:120px;
	height:120px;
	}
	* {
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
	}
	input{
	height:35px !important
	}
	.edit-input{
	border: 1px solid #ccc;
	width:800px !important;
	display:inline
	}
	.edit-select{
	height:35px !important;
	width:800px !important;
	display:inline
	}
	.edit-textarea{
	height:100px  !important;
	}
</style>



