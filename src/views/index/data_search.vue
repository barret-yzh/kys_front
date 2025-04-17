

<template>
	<div class="bodyClass">
		<article>
			<div class="clear blank"></div>
			<div class="search" style="border: 1px solid #ccc!important;display:flex">
				<input id="titleClick"   class="input_text"  placeholder="请输入标题搜索"  style="color: rgb(153, 153, 153);"  type="text">
				<input @click="queryDataMsgList(1)" class="input_submit" value="搜索" type="button">
			</div>
			<div class="clear blank"></div>
			<div class="whitebg box tags">
				<div class="news-title">
					<h2  style="width:138px"> 资料类型</h2>
				</div>
				<ul>
					<a href="javascript:void(0)" @click="zlTypeClick" data-id="" class="zlTypeClass"  style="border-radius:10px;">全部</a>
					<template v-for="item in tableZlTypeList">
						<a href="javascript:void(0)" @click="zlTypeClick" :data-id="item.id" class="zlTypeClass"  style="border-radius:10px;">{{item.typeName}}</a>
					</template>
				</ul>
			</div>
			<div class="clear blank"></div>
			<!-- tuijian-news begin-->
			<div class="tuijian-news box whitebg tab-num01">
				<div class="gd-box">
					<ul id="tab">
						<li class="tab-current">资料</li>
					</ul>
				</div>
				<div id="tab-content">
					<section>
						<div class="tuijian-news-list" style="width:100%">
							<ul  id="dataQl"  >
								<template v-for="(item,index) in ql">
									<li>
										<a  data-href="/index/data_detail" :data-params="'id='+item.model.id+''" @click="goToPage" style="height:80px;">
											<div style="float:right">
												<span  style="color:white;background-color:#f60;padding:5px;height:auto;border:none;margin-left:5px;border-radius:10%;">{{item.zlType}}</span>
											</div>
											<h3>{{item.model.title}}</h3>
										</a>
									</li>
								</template>
								<template v-if="ql&&ql.length==0">
									<h2 style="color:gray;text-align:center">暂无资料数据</h2>
								</template>
							</ul>
						</div>
						<div style="margin-top:20px;width:100%;float:left">
							<div id="qlBar" class="pagination" style="margin-top:20px;"></div>
						</div>
					</section>
				</div>
			</div>
			<div class="clear"></div>
		</article>
	</div>
</template>

<script>
import $ from 'jquery'
import {utils} from '../../assets/listutils.js'
import {myPagination} from '../../assets/page/myPagination.js'
export default {
	components: {
	},
	data() {
		return {
			currentLoginToken:'',
			tableZlTypeList:[],
			ql:[],
		};
	},
	mounted() {
		var that = this;
		this.initData();
		that.queryDataMsgList(1);
	},
	methods:{
		zlTypeClick(e){
			var that = this;
			$(".zlTypeClass").removeClass("selectStyle");
			$(e.currentTarget).addClass("selectStyle");
			that.zlType = e.currentTarget.dataset.id;
			that.queryDataMsgList(1)
		},
		queryDataMsgList(page){
			var that = this;
			var  title= $("#titleClick").val();
			var  zlType = that.zlType;
			$.ajax({
				type : 'get',
				url : that.REQUEST_URL+"/index/data_search/queryDataMsgList",
				async: false,
				data : {
					'title':title,
					'zlType':zlType,
					"page":page,
					"loginToken":that.currentLoginToken,
				},
				success : function(result) {
					var count = result.count;
					var totalPage = result.totalPage;
					var pageSize = result.pageSize;
					that.ql = result.list;
					new myPagination({
						id: 'qlBar',
						curPage:page, //初始页码
						pageTotal:totalPage, //总页数
						pageAmount: pageSize,  //每页多少条
						dataTotal: count, //总共多少条数据
						pageSize: pageSize, //可选,分页个数
						showPageTotalFlag:true, //是否显示数据统计
						showSkipInputFlag:false, //是否支持跳转
						getPage: function (page) {
							that.queryDataMsgList(page)
						}
					})
				}
			});
		},
		initData(){
			var that = this;
			$.ajax({
				type : 'get',
				url : that.REQUEST_URL+"/index/data_search/getData",
				async: false,
				data : {
					"loginToken":that.currentLoginToken,
				},
				success : function(result) {
					that.tableZlTypeList = result.tableZlTypeList;
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
	.selectStyle{
	background-color:#1487f4 !important;;
	color:white !important;;
	}
	.bodyClass::-webkit-scrollbar {
	display: none; /* Chrome Safari */
	}
	.bodyClass {
	font: 15px "Microsoft YaHei", Arial, Helvetica, sans-serif;
	color: #000;
	background: #f1f1f1;
	font-size: 15px;
	scrollbar-width: none; /* firefox */
	-ms-overflow-style: none; /* IE 10+ */
	overflow-x: hidden;
	overflow-y: auto;
	min-height:800px;
	}
	img { border: 0; display: block }
	ul, li { list-style: none; }
	a { text-decoration: none; color: #000; }
	a:hover { color: #218af1; text-decoration: none; }
	h1 { font-size: 28px }
	h2 { font-size: 18px }
	h3 { font-size: 16px }
	i { font-style: normal; display: block }
	span { display: block }
</style>



