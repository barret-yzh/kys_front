

<template>
	<div id="body" class="bodyClass" >
		<ol class="breadcrumb">
			<li>修改密码</li>
		</ol>
		<div class="tabli">
			<span class="active">修改密码</span>
		</div>
		<div class="tabbody">
			<div class="bodyli active">
				<div class="inputbox">
					<span class="title">旧密码</span>
					<div class="inputright">
						<input type="password"  placeholder="旧密码" v-model="password1" class="form-control input-sm"  id="password1">
					</div>
				</div>
				<div class="inputbox">
					<span class="title">新密码</span>
					<div class="inputright">
						<input type="password"  placeholder="新密码" v-model="password2"  class="form-control input-sm"  id="password2">
					</div>
				</div>
				<div class="inputbox">
					<span class="title">新密码</span>
					<div class="inputright">
						<input type="password"  placeholder="再次输入新密码" v-model="password3"  class="form-control input-sm"  id="password3">
					</div>
				</div>
			</div>
		</div>
		<div class="tbfooter">
			<button class="btn btn-success"   @click="alterPassword" ><i class="fa fa-floppy-o"></i> 保存</button>
		</div>
	</div>
</template>

<script>
import $ from 'jquery'
import {utils} from '../assets/listutils.js'
export default {
	components: {
	},
	data() {
		return {
			currentLoginToken:'',
			password1:'',
			password2:'',
			password3:'',
		};
	},
	mounted() {
		this.currentLoginToken=utils.getCookie('loginToken');
	},
	methods:{
		alterPassword(){
			var that = this;
			var password1 =that.password1;
			var password2 =that.password2;
			var password3 =that.password3;
			$.ajax({
				type : 'get',
				url : this.REQUEST_URL+"/alterPwd/alterPassword/submit",
				async: false,
				data : {
					'password1':password1,
					'password2':password2,
					'password3':password3,
					'loginToken':that.currentLoginToken,
				},
				success : function(result) {
					alert(result.msg);
				}
			});
		},
	}
};

</script>
<style type="text/css" src="../assets/admin/style.css?t=9?t=44" scoped></style>
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
	width:400px;
	display:inline
	}
	.edit-select{
	height:35px;width:400px;display:inline
	}
</style>



