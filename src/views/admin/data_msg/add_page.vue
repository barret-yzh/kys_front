

<template>
	<div id="body" class="bodyClass" >
		<ol class="breadcrumb">
			<li>资料-新增</li>
		</ol>
		<div class="tabli">
			<span class="active">资料-新增</span>
		</div>
		<div class="tabbody">
			<div class="bodyli active">
				<div class="inputbox"  id="titleForm">
					<span class="title">标题</span>
					<div class="inputright">
						<input type="input"  placeholder="请输入标题" name="title" v-model="title" class="form-control edit-input" id="title">
					</div>
				</div>
				<div class="inputbox"  id="zlTypeForm">
					<span class="title">资料类型</span>
					<div class="inputright">
						<select  class="form-control edit-select" data-id="zlType"    id="zlType" >
							<template v-for="item in zlTypeList">
								<option :value="item.id">{{item.name}}</option>
							</template>
						</select>
					</div>
				</div>
				<div class="inputbox"  id="zlIntroForm">
					<span class="title">资料介绍</span>
					<div class="inputright">
						<textarea class="form-control edit-textarea"  name="zlIntro" v-model="zlIntro"  id="zlIntro"></textarea>
					</div>
				</div>
				<div class="inputbox"  id="zlFileForm">
					<span class="title">资料文件</span>
					<div class="inputright">
						<div id="zlFile" class="dropzone" data-id="zlFile" max-num="1" file-type="4" max-size="1000" init-val="" :request-url="REQUEST_URL" :init-val="zlFile"></div>
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
import {getSelectableVal,setSelectableVal} from '../../../assets/selectsearch/jquery.searchableSelect.js'
export default {
	components: {
	},
	data() {
		return {
			currentLoginToken:'',
			title:'',
			zlType:'',
			zlIntro:'',
			zlFile:'',
			zlTypeList:[],
		};
	},
	mounted() {
		var that = this;
		that.currentLoginToken=utils.getCookie('loginToken');
		that.getDataList();
		$('#zlType').next().remove();
		$('#zlType').searchableSelect(that.zlTypeList);
		var zlFileDrop = initDropZone('zlFile');
	},
	methods:{
		getDataList(){
			var that = this;
			$.ajax({
				type : 'get',
				url : this.REQUEST_URL+"/admin/data_msg/getInitData",
				async: false,
				data : {
					'loginToken':that.currentLoginToken
				},
				success : function(result) {
					that.zlTypeList = result.zlTypeList;
				}
			});
		},
		submitData(){
			var that = this;
			var title = that.title;
			var zlType = getSelectableVal('zlType');
			var zlIntro = that.zlIntro;
			var zlFile = getFileVal2('zlFile');
			$.ajax({
				type : 'post',
				url : this.REQUEST_URL+"/admin/data_msg/add_submit",
				async: false,
				data : {
					'title':title,
					'zlType':zlType,
					'zlIntro':zlIntro,
					'zlFile':zlFile,
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
<style type="text/css" src="../../../assets/selectsearch/jquery.searchableSelect.css?t=44" scoped></style>
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



