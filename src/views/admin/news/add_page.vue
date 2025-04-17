

<template>
	<div id="body" class="bodyClass" >
		<ol class="breadcrumb">
			<li>资讯-新增</li>
		</ol>
		<div class="tabli">
			<span class="active">资讯-新增</span>
		</div>
		<div class="tabbody">
			<div class="bodyli active">
				<div class="inputbox"  id="newsNameForm">
					<span class="title">标题</span>
					<div class="inputright">
						<input type="input"  placeholder="请输入标题" name="newsName" v-model="newsName" class="form-control edit-input" id="newsName">
					</div>
				</div>
				<div class="inputbox"  id="newsImgForm">
					<span class="title">资讯附图</span>
					<div class="inputright">
						<div id="newsImg" class="dropzone" data-id="newsImg" max-num="1" file-type="1" max-size="1000" init-val="" :request-url="REQUEST_URL" :init-val="newsImg"></div>
					</div>
				</div>
				<div class="inputbox"  id="newsDetailForm">
					<span class="title">资讯详情</span>
					<div class="inputright">
						<div class="editorDiv" id="newsDetail" data-id="newsDetail"></div>
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
import {getFileVal2,initDropZone,setZoneImg} from '../../../assets/imgupload/js/imgupload.js'
import {initAllEditor,getEditVal,setEditorHtml} from '../../../assets/wangeditor/editor_utils.js'
export default {
	components: {
	},
	data() {
		return {
			currentLoginToken:'',
			newsName:'',
			newsImg:'',
			newsDetail:'',
		};
	},
	mounted() {
		var that = this;
		that.currentLoginToken=utils.getCookie('loginToken');
		var newsImgDrop = initDropZone('newsImg');
		initAllEditor(this.REQUEST_URL,'newsDetail');
	},
	methods:{
		submitData(){
			var that = this;
			var newsName = that.newsName;
			var newsImg = getFileVal2('newsImg');
			var newsDetail = getEditVal('newsDetail');
			$.ajax({
				type : 'post',
				url : this.REQUEST_URL+"/admin/news/add_submit",
				async: false,
				data : {
					'newsName':newsName,
					'newsImg':newsImg,
					'newsDetail':newsDetail,
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
<style type="text/css" src="../../../assets/imgupload/css/dropzone.min.css?t=44" scoped></style>
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



