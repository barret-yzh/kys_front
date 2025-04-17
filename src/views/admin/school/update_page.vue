

<template>
	<div id="body" class="bodyClass" >
		<ol class="breadcrumb">
			<li>院校-修改</li>
		</ol>
		<div class="tabli">
			<span class="active">院校-修改</span>
		</div>
		<div class="tabbody">
			<div class="bodyli active">
				<div class="inputbox"  id="nameForm">
					<span class="title">院校名</span>
					<div class="inputright">
						<input type="input"  placeholder="请输入院校名" name="name" v-model="name" class="form-control edit-input" id="name">
					</div>
				</div>
				<div class="inputbox"  id="yxImgForm">
					<span class="title">院校照片</span>
					<div class="inputright">
						<div id="yxImg" class="dropzone" data-id="yxImg" max-num="1" file-type="1" max-size="1000" init-val="" :request-url="REQUEST_URL" :init-val="yxImg"></div>
					</div>
				</div>
				<div class="inputbox"  id="yxIntroForm">
					<span class="title">院校介绍</span>
					<div class="inputright">
						<textarea class="form-control edit-textarea"  name="yxIntro" v-model="yxIntro"  id="yxIntro"></textarea>
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
			name:'',
			yxImg:'',
			yxIntro:'',
		};
	},
	mounted() {
		var that = this;
		that.currentLoginToken=utils.getCookie('loginToken');
		that.id= that.$route.query.id;
		var yxImgDrop = initDropZone('yxImg');
		that.queryDataDetail();
		setZoneImg(yxImgDrop,that.yxImg);
	},
	methods:{
		queryDataDetail(){
			var that = this;
			$.ajax({
				type : 'get',
				url : this.REQUEST_URL+"/admin/school/queryDataDetail",
				async: false,
				data : {
					'id':that.id,
					'loginToken':that.currentLoginToken,
				},
				success : function(result) {
					that.name=result.name;
					that.yxImg=result.yxImg;
					that.yxIntro=result.yxIntro;
					$("#yxIntro").val(result.yxIntro);
				}
			});
		},
		submitData(){
			var that = this;
			var name = that.name;
			var yxImg = getFileVal2('yxImg');
			var yxIntro = that.yxIntro;
			$.ajax({
				type : 'post',
				url : this.REQUEST_URL+"/admin/school/update_submit",
				async: false,
				data : {
					'id':that.id,
					'name':name,
					'yxImg':yxImg,
					'yxIntro':yxIntro,
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



