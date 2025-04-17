<template>
	<div class="bodyClass">
		<article>
			<div class="videos box whitebg tab-num04" style="padding:20px;">
				<i><img :src="'' + schoolDetail.yxImg + ''"
						style="float:left;margin-left:10px;width:130px;height:130px"></i>
				<div style="margin-left:150px;width:70%">
					<h1>{{ schoolDetail.name }}
					</h1>
					<div style="margin-top:12px">
					</div>
					<div style="margin-top:12px;">
						<div
							style="color:	#808080;margin-top:25px;font-size:14px;background-color:	#F5F5F5;padding:15px;">
							院校介绍：<span style="display:inline" v-html="'' + schoolDetail.yxIntro + ''"></span> </div>
						<div>
						</div>
					</div>
					<ul>
					</ul>
					<div>
					</div>
					<div style="margin-top:20px;">
						<div style="margin-top:20px;">
						</div>
						<div style="margin-top:20px;">
						</div>
					</div>
				</div>
			</div>
			<div class="clear blank"></div>
			<!-- tuijian-news begin-->
			<div class="tuijian-news box whitebg tab-num01">
				<div class="gd-box">
					<ul id="tab">
						<li class="tab-current">专业</li>
					</ul>
				</div>
				<div id="tab-content">
					<section>
						<div class="tuijian-news-list" style="width:100%">
							<ul id="ml">
								<template v-for="(item, index) in ml">
									<li>
										<a data-href="/index/major_detail" :data-params="'id=' + item.model.id + ''"
											@click="goToPage" style="height:80px;">
											<div style="float:right">
												<span
													style="color:white;background-color:#f60;padding:5px;height:auto;border:none;margin-left:5px;border-radius:10%;">{{
					item.schoolId }}</span>
											</div>
											<h3>{{ item.model.majorName }}</h3>
											<p>{{ item.model.majorIntro }}</p>
										</a>
									</li>
								</template>
								<template v-if="ml && ml.length == 0">
									<h2 style="color:gray;text-align:center">暂无专业数据</h2>
								</template>
							</ul>
						</div>
						<div style="margin-top:20px;width:100%;float:left">
						</div>
					</section>
				</div>
			</div>
			<div class="clear"></div>
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
			schoolDetail: {
				model: {},
			},
			ml: [],
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
				url: that.REQUEST_URL + "/index/school_detail/getData",
				async: false,
				data: {
					id: that.id,
					"loginToken": that.currentLoginToken,
				},
				success: function (result) {
					that.schoolDetail = result.schoolDetail;
					that.ml = result.ml;
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
</style>
