<template>
	<div class="login-body-class">
		<div id="main" class="login-main-warp">
			<div class="login-main-content">
				<div class="login-formDiv">
					<h2 style="text-align:center">医学考研系统-用户-注册</h2>
					<div>
						<div>
							<p style="margin-top:7px">登录名</p>
							<div>
								<input type="input" placeholder="请输入登录名" name="loginName" v-model="loginName"
									class="login-inputs" id="loginName">
							</div>
							<p style="margin-top:7px">密码</p>
							<div>
								<input type="input" placeholder="请输入密码" name="password" v-model="password"
									class="login-inputs" id="password">
							</div>
							<p style="margin-top:7px">姓名</p>
							<div>
								<input type="input" placeholder="请输入姓名" name="realName" v-model="realName"
									class="login-inputs" id="realName">
							</div>
							<p style="margin-top:7px">联系电话</p>
							<div>
								<input type="input" placeholder="请输入联系电话" name="celPhone" v-model="celPhone"
									class="login-inputs" id="celPhone">
							</div>
							<p style="margin-top:7px">性别</p>
							<div>
								<select class="login-inputs" data-id="sex" v-model="sex" id="sex">
									<template v-for="item in usexList" :key="item.id">
										<option :value="item.id">{{ item.name }}</option>
									</template>
								</select>
							</div>
							<p style="margin-top:20px">图片验证码</p>
							<div>
								<input id="imgCode" name="imgCode" type="text" placeholder="验证码" v-model="imgCode"
									style="width:260px;height:25px;">
								<img id="codeImg1" name="codeImg" @click="changeCode" :src="codeImg1" alt="点击更换"
									title="点击更换" style="height:30px;width:120px;float:right">
							</div>
							<div style="margin-left: 70px;margin-top: 15px;">
								<button type="button" @click="submitForm" id="submitBtn"
									class="btn-block loginBlue custom-btn btn-13">注册</button>
								<button class="btn-block loginBlue custom-btn btn-14" id="submitBtn"
									style="margin-left: 6px;"><a style="margin-left:5px;" data-href="/sys_login"
										data-params="" @click="goToPage" class="login-link">前往登录</a></button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import $ from 'jquery'
import { utils } from '../assets/listutils.js'
export default {
	components: {
	},
	data() {
		return {
			loginName: '',
			password: '',
			realName: '',
			celPhone: '',
			sex: '1',
			usexList: [],
			imgCode: '',
			codeImg1: '',
			codeToken: '',
		};
	},
	mounted() {
		var that = this;
		that.getDataList();
		this.changeCode();
	},
	methods: {
		getDataList() {
			var that = this;
			$.ajax({
				type: 'get',
				url: this.REQUEST_URL + "/regist/getListData",
				async: false,
				data: {
				},
				success: function (result) {
					that.usexList = result.usexList;
				}
			});
		},
		changeCode() {
			var that = this;
			$.ajax({
				type: 'post',
				url: this.REQUEST_URL + "/" + '/validCode/code',
				data: {
				},
				success: function (result) {
					that.codeToken = result.codeToken;
					that.codeImg1 = result.imgUrl;
				}
			});
		},
		submitForm() {
			var that = this;
			var loginName = that.loginName;
			var password = that.password;
			var realName = that.realName;
			var celPhone = that.celPhone;
			var sex = that.sex;
			$.ajax({
				type: 'post',
				url: this.REQUEST_URL + '/regist/userRegistSubmit',
				data: {
					'name': loginName,
					'password': password,
					'realName': realName,
					'celPhone': celPhone,
					'sex': sex,
					'imgCode': that.imgCode,
					'imgCodeToken': that.codeToken,
				},
				success: function (result) {
					alert(result.msg);
					if (result.code == 1) {
						that.goToPageJS('/sys_login', '');
					}
				}
			});
		},
	}
};

</script>
<style type="text/css" src="../assets/login/login.css?t=44" scoped></style>
<style scoped>
* {
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
}

p {
	font-size: 14px;
}

span {
	font-size: 14px;
}

.btn-block {
	display: block;
	width: 100%;
	padding: 10px;
}

.login-body-class {
	min-height: 950px;
	background-image: url(../assets/login_bg.jpg);
	background-size: 100% 100%;
	padding: 80px;
}

input::-ms-clear {
	display: none
}

input::-ms-reveal {
	display: none
}

.custom-btn {
	width: 130px;
	height: 40px;
	color: #fff;
	border-radius: 5px;
	padding: 10px 25px;
	font-family: 'Lato', sans-serif;
	font-weight: 500;
	background: transparent;
	cursor: pointer;
	transition: all 0.3s ease;
	position: relative;
	display: inline-block;
	box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, .5),
		7px 7px 20px 0px rgba(0, 0, 0, .1),
		4px 4px 5px 0px rgba(0, 0, 0, .1);
	outline: none;
}

/* 13 */
.btn-13 {
	background-color: #89d8d3;
	background-image: linear-gradient(315deg, #89d8d3 0%, #03c8a8 74%);
	border: none;
	z-index: 1;
}

.btn-13:after {
	position: absolute;
	content: "";
	width: 100%;
	height: 0;
	bottom: 0;
	left: 0;
	z-index: -1;
	border-radius: 5px;
	background-color: #4dccc6;
	background-image: linear-gradient(315deg, #4dccc6 0%, #96e4df 74%);
	box-shadow:
		-7px -7px 20px 0px #fff9,
		-4px -4px 5px 0px #fff9,
		7px 7px 20px 0px #0002,
		4px 4px 5px 0px #0001;
	transition: all 0.3s ease;
}

.btn-13:hover {
	color: #fff;
}

.btn-13:hover:after {
	top: 0;
	height: 100%;
}

.btn-13:active {
	top: 2px;
}


/* 14 */
.btn-14 {
	background: rgb(255, 151, 0);
	border: none;
	z-index: 1;
}

.btn-14:after {
	position: absolute;
	content: "";
	width: 100%;
	height: 0;
	top: 0;
	left: 0;
	z-index: -1;
	border-radius: 5px;
	background-color: #eaf818;
	background-image: linear-gradient(315deg, #eaf818 0%, #f6fc9c 74%);
	box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, .5),
		7px 7px 20px 0px rgba(0, 0, 0, .1),
		4px 4px 5px 0px rgba(0, 0, 0, .1);
	transition: all 0.3s ease;
}

.btn-14:hover {
	color: #000;
}

.btn-14:hover:after {
	top: auto;
	bottom: 0;
	height: 100%;
}

.btn-14:active {
	top: 2px;
}
</style>
