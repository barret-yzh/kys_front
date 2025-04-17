<template>
	<div class="bodyClass">
		<article>
			<div class="videos box whitebg tab-num04" style="padding:20px;">
				<div style="margin-left:150px;width:70%">
					<h1>{{ majorDetail.model.majorName }}
					</h1>
					<div style="margin-top:12px">
					</div>
					<div style="margin-top:12px;">
						<a href="javascript:void(0)" :data-params="'schoolId=' + '+majorDetail.schoolIdT.id+'"
							data-href="/index/school_detail" @click="goToPage">
							<div
								style="color:	#808080;margin-top:25px;font-size:14px;background-color:	#F5F5F5;padding:15px;">
								院校：<span style="display:inline" v-html="'' + majorDetail.schoolIdT.name + ''"></span>
							</div>
						</a>
						<div
							style="color:	#808080;margin-top:25px;font-size:14px;background-color:	#F5F5F5;padding:15px;">
							<span style="display:inline" v-html="'' + majorDetail.model.majorIntro + ''"></span>
						</div>
						<div
							style="color:	#808080;margin-top:25px;font-size:14px;background-color:	#F5F5F5;padding:15px;">
							初试科目：<span style="display:inline" v-html="'' + majorDetail.model.csProject + ''"></span>
						</div>
						<div
							style="color:	#808080;margin-top:25px;font-size:14px;background-color:	#F5F5F5;padding:15px;">
							导师信息：<span style="display:inline" v-html="'' + majorDetail.model.dsMsg + ''"></span> </div>
						<div style="margin-top:25px">
							<button class="custom-btn btn-5"><span><a :href="'' + majorDetail.model.fsfa + ''"
										target="_blank">点击下载复试方案</a></span></button>
						</div>
					</div>
				</div>
			</div>
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
			majorDetail: {
				model: {},
				schoolIdT: {},
				fsfaList: [],
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
				url: that.REQUEST_URL + "/index/major_detail/getData",
				async: false,
				data: {
					id: that.id,
					"loginToken": that.currentLoginToken,
				},
				success: function (result) {
					that.majorDetail = result.majorDetail;
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

/* 5 */
.btn-5 {
	width: 130px;
	height: 40px;
	line-height: 42px;
	padding: 0;
	border: none;
	background: rgb(255, 27, 0);
	background: linear-gradient(0deg, rgba(255, 27, 0, 1) 0%, rgba(251, 75, 2, 1) 100%);
}

.btn-5:hover {
	color: #f0094a;
	background: transparent;
	box-shadow: none;
}

.btn-5:before,
.btn-5:after {
	content: '';
	position: absolute;
	top: 0;
	right: 0;
	height: 2px;
	width: 0;
	background: #f0094a;
	box-shadow:
		-1px -1px 5px 0px #fff,
		7px 7px 20px 0px #0003,
		4px 4px 5px 0px #0002;
	transition: 400ms ease all;
}

.btn-5:after {
	right: inherit;
	top: inherit;
	left: 0;
	bottom: 0;
}

.btn-5:hover:before,
.btn-5:hover:after {
	width: 100%;
	transition: 800ms ease all;
}
</style>
