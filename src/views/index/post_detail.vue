<template>
	<div class="bodyClass">
		<article>
			<div class="videos box whitebg tab-num04" style="padding:10px;">
				<div style="margin-left:150px;width:70%">
					<div style="float:right">
						<img :src="'' + postDetail.userIdT.headImg + ''" alt="" style="width:45px;border-radius:50%">
						<div style="margin-left:5px">
							<p style="margin-top:-6px;margin-left:8px">{{ postDetail.userIdT.loginName }}</p>
						</div>
					</div>
					<h1>{{ postDetail.model.title }}
					</h1>
					<div style="margin-top:12px">
					</div>

					<div style="margin-top:20px;">
						<div
							style="width:90%;border-style: solid;border-width:1px;padding-left:20px;padding-right:20px;padding-bottom:20px;border-color:#DCDCDC;margin-top:10px;">
							<div style="width:80%;margin-left:6%" v-html="'' + postDetail.model.content + ''">
							</div>
						</div>
					</div>
					<div style="margin-top:12px;">
						<div
							style="color:	#808080;margin-top:25px;font-size:14px;background-color:	#F5F5F5;padding:15px;">
							创建日期：<span style="display:inline" v-html="'' + postDetail.model.createDate + ''"></span>
						</div>
						<div
							style="color:	#808080;margin-top:25px;font-size:14px;background-color:	#F5F5F5;padding:15px;">
							点赞数：<span style="display:inline" v-html="'' + postDetail.model.praiseNum + '点赞'"></span>
						</div>
					</div>
					<div style="margin-top:20px;">
						<span style="display:inline">
							<template v-if="isCollect == 1">
								<button @click="submitCollect" class="client-layui-btn"
									style="margin-left:5px;background-color:white;color:black;border: 1px solid #009688;">取消收藏</button>
							</template>
							<template v-if="isCollect == 0">
								<button @click="submitCollect" class="client-layui-btn client-layui-btn-normal"
									style="margin-left:5px;">收藏</button>
							</template>
						</span>
						<span style="display:inline">
							<template v-if="isPraise == 1">
								<button @click="submitPraise" class="client-layui-btn"
									style=" margin-left:5px;background-color:white;color:black;border: 1px solid #009688;">取消点赞</button>
							</template>
							<template v-if="isPraise == 0">
								<button @click="submitPraise" class="client-layui-btn"
									style="margin-left:5px;">点赞</button>
							</template>
						</span>
						<div style="margin-top:20px;">
						</div>

					</div>
				</div>
			</div>
			<div style="height:10px;"></div>
			<div style="width:1370px;min-height:500px;background-color:white;padding:20px;margin-left:0px;">
				<div style="margin-left:0px">
					<h1>评论</h1>
					<div class="client-layui-field-box">
						<ul class="jieda" id="commentList">
							<template v-for="item in disList">
								<li class="jieda-daan">
									<div class="detail-about-reply">
										<div style="display:flex">
											<img :src="'' + item.uidT.headImg + ''" alt=""
												style="width:45px;border-radius:50%">
											<div style="float:left;margin-left:5px">
												<cite>{{ item.uidT.loginName }}</cite>
											</div>
										</div>
									</div>
									<div>
										<p style="margin-left:10%;min-height:70px;margin-top:10px;">
											{{ item.model.content }}
										</p>
										<span style="margin-left:10%"><span>----{{ item.model.createTime }}</span>
										</span>
										<template v-for="item2 in item.replyList">
											<p style="margin-top:10px;">
											<p style="margin-left:15%;background-color:#E1FFFF;width:70%;padding:20px">
												{{ item2.uidT.loginName }}
												：{{ item2.model.content }}
												<span style="float:right">{{ item2.model.createTime }}
												</span>
											</p>
											<p style="height:20px;"></p>
											</p>
										</template>
										<div class="jieda-reply">
											<div class="client-layui-row replyInputDiv" :data-id="item.model.id"
												style="display:none">
												<div style="margin-left:30%;display:flex">
													<input type="text" style="width:300px;height:30px;"
														name="replyContent" :data-id="item.model.id">
													<button class="client-layui-btn client-layui-btn-normal"
														@click="submitReply" :data-id="item.model.id">回复</button>
												</div>
											</div>
											<a href="javascript:void(0)" class="tab-span" style="margin-left:90%"
												@click="clickReply" :data-id="item.model.id">
												回复
											</a>
										</div>
										<hr />
									</div>
								</li>
							</template>
						</ul>
						<div style="text-align:center">
							<div id="commentBar" class="pagination" style="margin-top:20px;"></div>
						</div>
						<div class="client-layui-form client-layui-form-pane">
							<div style="margin-left:100px;">
								<div class="client-layui-form-item client-layui-form-text">
									<div class="client-layui-input-block">
										<textarea id="ccontent" placeholder="请输入评论内容"
											class="client-layui-textarea client-fly-editor"
											style="height: 150px;width:80%"></textarea>
									</div>
								</div>
								<div class="client-layui-form-item">
									<button class="client-layui-btn client-layui-btn-normal"
										@click="submitDis">提交评论</button>
								</div>
							</div>
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
import { myPagination } from '../../assets/page/myPagination.js'
export default {
	components: {
	},
	data() {
		return {
			currentLoginToken: '',
			id: '',
			postDetail: {
				userIdT: {},
				model: {},
			},
			isCollect: '',
			isPraise: '',
			disList: [],
		};
	},
	mounted() {
		var that = this;
		that.currentLoginToken = utils.getCookie('loginToken');
		that.id = that.$route.query.id;
		this.initData();
		that.getCommentList(1);
	},
	methods: {
		submitCollect() {
			var that = this;
			$.ajax({
				type: 'get',
				url: this.REQUEST_URL + "/index/post_detail/submitCollect",
				async: false,
				data: {
					"loginToken": that.currentLoginToken,
					"id": that.id,
				},
				success: function (result) {
					alert(result.msg);
					if (result.code == 1) {
						window.location.reload();
					}
				}
			});
		},
		submitPraise() {
			var that = this;
			$.ajax({
				type: 'get',
				url: this.REQUEST_URL + "/index/post_detail/submitPraise",
				async: false,
				data: {
					"loginToken": that.currentLoginToken,
					"id": that.id,
				},
				success: function (result) {
					alert(result.msg);
					if (result.code == 1) {
						window.location.reload();
					}
				}
			});
		},
		clickReply(e) {
			var that = this;
			var id = e.currentTarget.dataset.id;
			$(".replyInputDiv").css("display", "none");
			var divs = $(".replyInputDiv");
			for (var i = 0; i < divs.length; i++) {
				if ($(divs[i]).attr("data-id") == id) {
					$(divs[i]).css("display", "block");
				}
			}
		},
		submitReply(e) {
			var that = this;
			var id = e.currentTarget.dataset.id;
			var replyContent = '';
			var inputs = $('input[name="replyContent"]');
			for (var i = 0; i < inputs.length; i++) {
				if ($(inputs[i]).attr("data-id") == id) {
					replyContent = $(inputs[i]).val();
				}
			}
			$.ajax({
				type: 'get',
				url: that.REQUEST_URL + "/index/post_detail/submitReply",
				data: {
					"id": id,
					"content": replyContent,
					"loginToken": that.currentLoginToken
				},
				success: function (result) {
					alert(result.msg);
					if (result.code == 1) {
						window.location.reload();
					}
				}
			})
		},
		//查询评论列表
		getCommentList(page) {
			var that = this;
			var id = that.id;
			$.ajax({
				type: 'get',
				url: that.REQUEST_URL + "/index/post_detail/getDis",
				async: false,
				data: {
					"page": page,
					"loginToken": that.currentLoginToken,
					"id": id,
				},
				success: function (result) {
					var count = result.count;
					var totalPage = result.totalPage;
					var pageSize = result.pageSize;
					that.disList = result.list;
					new myPagination({
						id: 'commentBar',
						curPage: page, //初始页码
						pageTotal: totalPage, //总页数
						pageAmount: pageSize,  //每页多少条
						dataTotal: count, //总共多少条数据
						pageSize: pageSize, //可选,分页个数
						showPageTotalFlag: true, //是否显示数据统计
						showSkipInputFlag: false, //是否支持跳转
						getPage: function (page) {
							that.getCommentList(page)
						}
					})
				}
			});
		},
		submitDis() {
			var that = this;
			var id = that.postDetail.model.id;
			var ccontent = $("#ccontent").val();
			$.ajax({
				type: 'get',
				url: that.REQUEST_URL + "/index/post_detail/submitDis",
				async: false,
				data: {
					"loginToken": that.currentLoginToken,
					"ccontent": ccontent,
					"id": id,
				},
				success: function (result) {
					alert(result.msg);
					if (result.code == 1) {
						window.location.reload();
					}
				}
			});
		},
		initData() {
			var that = this;
			$.ajax({
				type: 'get',
				url: that.REQUEST_URL + "/index/post_detail/getData",
				async: false,
				data: {
					id: that.id,
					"loginToken": that.currentLoginToken,
				},
				success: function (result) {
					that.postDetail = result.postDetail;
					that.isCollect = result.isCollect;
					that.isPraise = result.isPraise;
				}
			});
		},
	}
};

</script>
<style type="text/css" src="../../assets/index/css/base.css?t=44" scoped></style>
<style type="text/css" src="../../assets/index/css/m.css?t=44" scoped></style>
<style type="text/css" src="../../assets/page/myPagination.css?t=44" scoped></style>
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
