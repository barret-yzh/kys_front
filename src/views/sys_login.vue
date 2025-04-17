<template>
	<div class="login-body-class">
		<div id="main" class="login-main-warp">
			<div class="login-main-content">
				<div class="login-formDiv">
					<h2 style="text-align:center">医学考研系统-登录</h2>
					<div>
						<div>
							<p style="margin-top:7px">登录名</p>
							<div>
								<input id="name" type="text" v-model="name" placeholder="请输入登录名" class="login-inputs ">
							</div>
							<p style="margin-top:7px">密码</p>
							<div>
								<input id="password" type="password" v-model="password" placeholder="请输入密码"
									class="login-inputs ">
							</div>
							<p style="margin-top:20px">图片验证码</p>
							<div>
								<input id="imgCode" name="imgCode" type="text" placeholder="验证码" v-model="imgCode"
									style="width:260px;height:25px;">
								<img id="codeImg1" name="codeImg" @click="changeCode" :src="codeImg1" alt="点击更换"
									title="点击更换" style="height:30px;width:120px;float:right">
							</div>
							<div class="gap">
								<div class="pretty-box" style="margin-top: 6px;">
									<input name="loginType" type="radio" value="1" v-model="loginType" id="loginType1"
										style="margin-left:1px;" />
									<label for="loginType1" style="font-size: 18px;">管理员</label>
									<input name="loginType" type="radio" value="2" v-model="loginType" id="loginType2"
										style="margin-left:10px;" />
									<label for="loginType2" style="font-size: 18px;">用户</label>
								</div>
							</div>
							<!-- <div>
								<div style="margin-top: 6px;float:right;font-size:14px;">
									<a style="margin-left:15px;" data-href="/user_regist" data-params=""
										@click="goToPage" class="login-link">注册用户</a>
								</div>
							</div> -->
							<div>
								<div style="margin-left: 60px;margin-top: 15px;">
									<!-- <input type="hidden" value="jsform" id="_app" /> -->
									<!-- <button type="button" @click="submitForm" id="submitBtn"
										class="btn-block loginBlue">登录</button> -->
									<button class="btn-block loginBlue custom-btn btn-1" @click="submitForm"
										id="submitBtn">登录</button>
									<button class="btn-block loginBlue custom-btn btn-2" style="margin-left: 6px;"> <a
											data-href="/user_regist" data-params="" @click="goToPage"
											class="login-link">注册</a></button>
								</div>
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
			name: '',
			password: '',
			imgCode: '',
			codeImg1: '',
			codeToken: '',
			loginType: '',
		};
	},
	mounted() {
		this.changeCode();
	},
	methods: {
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
			$.ajax({
				type: 'post',
				url: this.REQUEST_URL + '/login/sysSubmit',
				data: {
					'imgCode': that.imgCode,
					'imgCodeToken': that.codeToken,
					'name': that.name,
					'password': that.password,
					'loginType': that.loginType
				},
				success: function (result) {
					if (result.code == 1) {
						utils.setCookie('loginId', result.loginId, 1);
						utils.setCookie('loginType', result.loginType, 1);
						utils.setCookie('loginName', result.loginName, 1);
						utils.setCookie('loginToken', result.loginToken, 1);
						var lt = that.loginType;
						if (lt == '1') {
							that.goToPageJS('/admin/index', '');
						}
						if (lt == '2') {
							that.goToPageJS('/index', '');
						}
					} else {
						alert(result.msg);
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

/* 1 */
.btn-1 {
	background: rgb(6, 14, 131);
	background: linear-gradient(0deg, rgba(6, 14, 131, 1) 0%, rgba(12, 25, 180, 1) 100%);
	border: none;
}

.btn-1:hover {
	background: rgb(0, 3, 255);
	background: linear-gradient(0deg, rgba(0, 3, 255, 1) 0%, rgba(2, 126, 251, 1) 100%);
}

/* 2 */
.btn-2 {
	background: rgb(96, 9, 240);
	background: linear-gradient(0deg, rgba(96, 9, 240, 1) 0%, rgba(129, 5, 240, 1) 100%);
	border: none;

}

.btn-2:before {
	height: 0%;
	width: 2px;
}

.btn-2:hover {
	box-shadow: 4px 4px 6px 0 rgba(255, 255, 255, .5),
		-4px -4px 6px 0 rgba(116, 125, 136, .5),
		inset -4px -4px 6px 0 rgba(255, 255, 255, .2),
		inset 4px 4px 6px 0 rgba(0, 0, 0, .4);
}
</style>
