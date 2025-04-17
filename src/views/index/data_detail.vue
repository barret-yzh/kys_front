<template>
	<div class="bodyClass">
		<article>
			<div class="videos box whitebg tab-num04" style="padding:20px;">
				<div style="margin-left:150px;width:70%">
					<h1>{{ dataMsgDetail.model.title }}
					</h1>
					<div style="margin-top:12px">
					</div>
					<div style="margin-top:12px;">
						<div
							style="color:	#808080;margin-top:25px;font-size:14px;background-color:	#F5F5F5;padding:15px;">
							资料介绍：<span style="display:inline" v-html="'' + dataMsgDetail.model.zlIntro + ''"></span>
						</div>
						<div
							style="color:	#808080;margin-top:25px;font-size:14px;background-color:	#F5F5F5;padding:15px;">
							资料类型：<span style="display:inline" v-html="'' + dataMsgDetail.zlTypeT.typeName + ''"></span>
						</div>
						<div
							style="color:	#808080;margin-top:25px;font-size:14px;background-color:	#F5F5F5;padding:15px;">
							创建日期：<span style="display:inline" v-html="'' + dataMsgDetail.model.createDate + ''"></span>
						</div>
						<div style="margin-top:25px;margin-left:400px">
							<button class="custom-btn btn-6"><a :href="'' + dataMsgDetail.model.zlFile + ''"
									target="_blank">点击下载文件</a></button>
						</div>
					</div>
				</div>
			</div>
			<div style="height:100px;margin-top:100px"></div>
		</article>
	</div>
</template>

<script>
import $ from 'jquery'
import { utils } from '../../assets/listutils.js'
export default {
	components: {
	},
	data() {
		return {
			currentLoginToken: '',
			id: '',
			dataMsgDetail: {
				model: {},
				zlFileList: [],
				zlTypeT: {},
			},
		};
	},
	mounted() {
		var that = this;
		that.currentLoginToken = utils.getCookie('loginToken');
		that.id = that.$route.query.id;
		this.initData();
	},
	methods: {
		initData() {
			var that = this;
			$.ajax({
				type: 'get',
				url: that.REQUEST_URL + "/index/data_detail/getData",
				async: false,
				data: {
					id: that.id,
					"loginToken": that.currentLoginToken,
				},
				success: function (result) {
					that.dataMsgDetail = result.dataMsgDetail;
				}
			});
		},
	}
};

</script>
<style type="text/css" src="../../assets/index/css/base.css?t=44" scoped></style>
<style type="text/css" src="../../assets/index/css/m.css?t=44" scoped></style>
<style scoped>
.selectClass {
	background-color: red !important;
	color: white !important;
}

.labelClass {
	background-color: #FFFFFF;
	color: black;
	padding: 5px;
	margin-left: 5px;
	border-width: 1px;
	border-style: solid
}

.redSpan {
	color: red !important
}

.client-layui-btn {
	display: inline-block;
	height: 38px;
	line-height: 38px;
	padding: 0 18px;
	background-color: #009688;
	color: #fff;
	white-space: nowrap;
	text-align: center;
	font-size: 14px;
	border: none;
	border-radius: 2px;
	cursor: pointer;
}

.bodyClass {
	font: 15px "Microsoft YaHei", Arial, Helvetica, sans-serif;
	color: #000;
	background: #f1f1f1;
	font-size: 15px;
	scrollbar-width: none;
	/* firefox */
	-ms-overflow-style: none;
	/* IE 10+ */
	overflow-x: hidden;
	overflow-y: auto;
}

img {
	border: 0;
	display: block
}

ul,
li {
	list-style: none;
}

a {
	text-decoration: none;
	color: #000;
}

a:hover {
	color: #218af1;
	text-decoration: none;
}

h1 {
	font-size: 28px
}

h2 {
	font-size: 18px
}

h3 {
	font-size: 16px
}

i {
	font-style: normal;
	display: block
}

span {
	display: block
}

.client-form-input {
	width: 350px;
	height: 30px;
	border: 1px solid #e9e9e9;
	padding-left: 6px
}

.client-form-textarea {
	width: 350px;
	height: 80px;
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

.btn-6 {
	background: rgb(247, 150, 192);
	background: radial-gradient(circle, rgba(247, 150, 192, 1) 0%, rgba(118, 174, 241, 1) 100%);
	line-height: 42px;
	padding: 0;
	border: none;
}

.btn-6 span {
	position: relative;
	display: block;
	width: 100%;
	height: 100%;
}

.btn-6:before,
.btn-6:after {
	position: absolute;
	content: "";
	height: 0%;
	width: 1px;
	box-shadow:
		-1px -1px 20px 0px rgba(255, 255, 255, 1),
		-4px -4px 5px 0px rgba(255, 255, 255, 1),
		7px 7px 20px 0px rgba(0, 0, 0, .4),
		4px 4px 5px 0px rgba(0, 0, 0, .3);
}

.btn-6:before {
	right: 0;
	top: 0;
	transition: all 500ms ease;
}

.btn-6:after {
	left: 0;
	bottom: 0;
	transition: all 500ms ease;
}

.btn-6:hover {
	background: transparent;
	color: #76aef1;
	box-shadow: none;
}

.btn-6:hover:before {
	transition: all 500ms ease;
	height: 100%;
}

.btn-6:hover:after {
	transition: all 500ms ease;
	height: 100%;
}

.btn-6 span:before,
.btn-6 span:after {
	position: absolute;
	content: "";
	box-shadow:
		-1px -1px 20px 0px rgba(255, 255, 255, 1),
		-4px -4px 5px 0px rgba(255, 255, 255, 1),
		7px 7px 20px 0px rgba(0, 0, 0, .4),
		4px 4px 5px 0px rgba(0, 0, 0, .3);
}

.btn-6 span:before {
	left: 0;
	top: 0;
	width: 0%;
	height: .5px;
	transition: all 500ms ease;
}

.btn-6 span:after {
	right: 0;
	bottom: 0;
	width: 0%;
	height: .5px;
	transition: all 500ms ease;
}

.btn-6 span:hover:before {
	width: 100%;
}

.btn-6 span:hover:after {
	width: 100%;
}
</style>
