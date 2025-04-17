

<template>
	<div id="body" class="bodyClass" >
		<ol class="breadcrumb">
			<li>轮播图-修改</li>
		</ol>
		<div class="tabli">
			<span class="active">轮播图-修改</span>
		</div>
		<div class="tabbody">
			<div class="bodyli active">
				<div class="inputbox"  id="bannerForm">
					<span class="title">轮播图</span>
					<div class="inputright">
						<div id="banner" class="dropzone" data-id="banner" max-num="1" file-type="1" max-size="1000" init-val="" :request-url="REQUEST_URL" :init-val="banner"></div>
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
export default {
	components: {
	},
	data() {
		return {
			currentLoginToken:'',
			id:'',
			banner:'',
		};
	},
	mounted() {
		var that = this;
		that.currentLoginToken=utils.getCookie('loginToken');
		that.id= that.$route.query.id;
		var bannerDrop = initDropZone('banner');
		that.queryDataDetail();
		setZoneImg(bannerDrop,that.banner);
	},
	methods:{
		queryDataDetail(){
			var that = this;
			$.ajax({
				type : 'get',
				url : this.REQUEST_URL+"/admin/banner/queryDataDetail",
				async: false,
				data : {
					'id':that.id,
					'loginToken':that.currentLoginToken,
				},
				success : function(result) {
					that.banner=result.banner;
				}
			});
		},
		submitData(){
			var that = this;
			var banner = getFileVal2('banner');
			$.ajax({
				type : 'post',
				url : this.REQUEST_URL+"/admin/banner/update_submit",
				async: false,
				data : {
					'id':that.id,
					'banner':banner,
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



