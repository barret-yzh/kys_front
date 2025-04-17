

<template>
	<div id="body" class="bodyClass" >
		<ol class="breadcrumb">
			<li>用户-修改</li>
		</ol>
		<div class="tabli">
			<span class="active">用户-修改</span>
		</div>
		<div class="tabbody">
			<div class="bodyli active">
				<div class="inputbox"  id="loginNameForm">
					<span class="title">登录名</span>
					<div class="inputright">
						<input type="input"  placeholder="请输入登录名" name="loginName" v-model="loginName" class="form-control edit-input" id="loginName">
					</div>
				</div>
				<div class="inputbox"  id="passwordForm">
					<span class="title">密码</span>
					<div class="inputright">
						<input type="input"  placeholder="请输入密码" name="password" v-model="password" class="form-control edit-input" id="password">
					</div>
				</div>
				<div class="inputbox"  id="realNameForm">
					<span class="title">姓名</span>
					<div class="inputright">
						<input type="input"  placeholder="请输入姓名" name="realName" v-model="realName" class="form-control edit-input" id="realName">
					</div>
				</div>
				<div class="inputbox"  id="celPhoneForm">
					<span class="title">联系电话</span>
					<div class="inputright">
						<input type="input"  placeholder="请输入联系电话" name="celPhone" v-model="celPhone" class="form-control edit-input" id="celPhone">
					</div>
				</div>
				<div class="inputbox"  id="headImgForm">
					<span class="title">头像</span>
					<div class="inputright">
						<div id="headImg" class="dropzone" data-id="headImg" max-num="1" file-type="1" max-size="1000" init-val="" :request-url="REQUEST_URL" :init-val="headImg"></div>
					</div>
				</div>
				<div class="inputbox"  id="sexForm">
					<span class="title">性别</span>
					<div class="inputright">
						<select  class="form-control edit-select" data-id="sex"  v-model="sex"  id="sex" >
							<template v-for="item in usexList">
								<option :value="item.id">{{item.name}}</option>
							</template>
						</select>
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
			loginName:'',
			password:'',
			realName:'',
			celPhone:'',
			headImg:'',
			sex:'',
			usexList:[],
		};
	},
	mounted() {
		var that = this;
		that.currentLoginToken=utils.getCookie('loginToken');
		that.id= that.$route.query.id;
		that.getDataList();
		var headImgDrop = initDropZone('headImg');
		that.queryDataDetail();
		setZoneImg(headImgDrop,that.headImg);
	},
	methods:{
		getDataList(){
			var that = this;
			$.ajax({
				type : 'get',
				url : this.REQUEST_URL+"/admin/user/getInitData",
				async: false,
				data : {
					'loginToken':that.currentLoginToken
				},
				success : function(result) {
					that.usexList = result.usexList;
				}
			});
		},
		queryDataDetail(){
			var that = this;
			$.ajax({
				type : 'get',
				url : this.REQUEST_URL+"/admin/user/queryDataDetail",
				async: false,
				data : {
					'id':that.id,
					'loginToken':that.currentLoginToken,
				},
				success : function(result) {
					that.loginName=result.loginName;
					that.password=result.password;
					that.realName=result.realName;
					that.celPhone=result.celPhone;
					that.headImg=result.headImg;
					that.sex=result.sex;
				}
			});
		},
		submitData(){
			var that = this;
			var loginName = that.loginName;
			var password = that.password;
			var realName = that.realName;
			var celPhone = that.celPhone;
			var headImg = getFileVal2('headImg');
			var sex = that.sex;
			$.ajax({
				type : 'post',
				url : this.REQUEST_URL+"/admin/user/update_submit",
				async: false,
				data : {
					'id':that.id,
					'loginName':loginName,
					'password':password,
					'realName':realName,
					'celPhone':celPhone,
					'headImg':headImg,
					'sex':sex,
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



