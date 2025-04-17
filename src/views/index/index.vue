<template>
	<div class="bodyClass">
		<article>
			<div>
				<template v-for="(item, index) in bl">
					<template v-if="index == 0">
						<div class="carousel-img" style="width:100%;display:block">
							<div>
								<!-- <div style="position:relative;left:95%;top:150px;">
									<div style="width:55px;padding:5px;background-color:#eee" @click="selectNextImg">
										<img src="../../assets/index/go.png" style="width:50px;">
									</div>
								</div> -->
								<a href="javascript:void"> <img :src="'' + item.banner + ''"
										style="width:100%;height:300px;"></a>
							</div>
						</div>
					</template>
					<template v-if="index != 0">
						<div class="carousel-img" style="width:100%;display:none">
							<div>
								<!-- <div style="position:relative;left:95%;top:150px;">
									<div style="width:55px;padding:5px;background-color:#eee" @click="selectNextImg">
										<img src="../../assets/index/go.png" style="width:50px;">
									</div>
								</div> -->
								<a href="javascript:void"> <img :src="'' + item.banner + ''"
										style="width:100%;height:300px;"></a>
							</div>
						</div>
					</template>
				</template>
				<template v-if="bl && bl.length == 0">
				</template>
			</div>
			<div class="clear blank"></div>
			<!-- tuijian-news begin-->
			<div class="tuijian-news box whitebg tab-num01">
				<div class="gd-box">
					<ul id="tab">
						<li class="tab-current">院校</li>
					</ul>
				</div>
				<div id="tab-content">
					<section>
						<div class="videos-list">
							<ul id="sl">
								<template v-for="(item, index) in sl">
									<li style="width:250px"><a data-href="/index/school_detail"
											:data-params="'id=' + item.id + ''" @click="goToPage">
											<i style="height:200px;padding:10px;"><img style="height:200px;"
													:src="'' + item.yxImg + ''"></i>
											<h3 style="text-align:center">{{ item.name }}</h3>
											<p style="margin-bottom:10px;">
											</p>
										</a>
									</li>
								</template>
								<template v-if="sl && sl.length == 0">
									<h2 style="color:gray;text-align:center">暂无院校数据</h2>
								</template>
							</ul>
						</div>
						<div style="margin-top:20px;width:100%;float:left">
						</div>
					</section>
				</div>
			</div>
			<div class="clear"></div>
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
			<div class="clear blank"></div>
			<!-- tuijian-news begin-->
			<div class="tuijian-news box whitebg tab-num01">
				<div class="gd-box">
					<ul id="tab">
						<li class="tab-current">资讯</li>
					</ul>
				</div>
				<div id="tab-content">
					<section>
						<div class="tuijian-news-list" style="width:100%">
							<ul id="nl">
								<template v-for="(item, index) in nl">
									<li>
										<a data-href="/index/news_detail" :data-params="'id=' + item.id + ''"
											@click="goToPage" style="height:80px;">
											<span><img :src="'' + item.newsImg + ''"
													style="width:70px;height:70px"></span>
											<div style="float:right">
											</div>
											<h3>{{ item.newsName }}</h3>
											<p>{{ item.createTime }}</p>
										</a>
									</li>
								</template>
								<template v-if="nl && nl.length == 0">
									<h2 style="color:gray;text-align:center">暂无资讯数据</h2>
								</template>
							</ul>
						</div>
						<div style="margin-top:20px;width:100%;float:left">
						</div>
					</section>
				</div>
			</div>
			<div class="clear"></div>
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
							<ul id="dl">
								<template v-for="(item, index) in dl">
									<li>
										<a data-href="/index/data_detail" :data-params="'id=' + item.model.id + ''"
											@click="goToPage" style="height:80px;">
											<div style="float:right">
												<span
													style="color:white;background-color:#f60;padding:5px;height:auto;border:none;margin-left:5px;border-radius:10%;">{{
					item.zlType }}</span>
											</div>
											<h3>{{ item.model.title }}</h3>
										</a>
									</li>
								</template>
								<template v-if="dl && dl.length == 0">
									<h2 style="color:gray;text-align:center">暂无资料数据</h2>
								</template>
							</ul>
						</div>
						<div style="margin-top:20px;width:100%;float:left">
						</div>
					</section>
				</div>
			</div>
			<div class="clear"></div>
			<div class="clear blank"></div>
			<!-- tuijian-news begin-->
			<!-- <div class="tuijian-news box whitebg tab-num01">
				<div class="gd-box">
					<ul id="tab">
						<li class="tab-current">推荐帖子</li>
					</ul>
				</div>
				<div id="tab-content">
					<section>
						<div class="tuijian-news-list" style="width:100%">
							<ul id="pl">
								<template v-for="(item, index) in pl">
									<li>
										<a data-href="/index/post_detail" :data-params="'id=' + item.model.id + ''"
											@click="goToPage" style="height:80px;">
											<div style="float:right">
											</div>
											<h3>{{ item.model.title }}</h3>
											<p>{{ item.model.praiseNum }}点赞数</p>
										</a>
									</li>
								</template>
								<template v-if="pl && pl.length == 0">
									<h2 style="color:gray;text-align:center">暂无帖子数据</h2>
								</template>
							</ul>
						</div>
						<div style="margin-top:20px;width:100%;float:left">
						</div>
					</section>
				</div>
			</div> -->
			<div class="clear"></div>
			<div class="clear blank"></div>
			<!-- tuijian-news begin-->
			<div class="tuijian-news box whitebg tab-num01">
				<div class="gd-box">
					<ul id="tab">
						<li class="tab-current">热门帖子</li>
					</ul>
				</div>
				<div id="tab-content">
					<section>
						<div class="tuijian-news-list" style="width:100%">
							<ul id="pl1">
								<template v-for="(item, index) in pl1">
									<li>
										<a data-href="/index/post_detail" :data-params="'id=' + item.model.id + ''"
											@click="goToPage" style="height:80px;">
											<div style="float:right">
											</div>
											<h3>{{ item.model.title }}</h3>
											<p>{{ item.model.praiseNum }}点赞数</p>
										</a>
									</li>
								</template>
								<template v-if="pl1 && pl1.length == 0">
									<h2 style="color:gray;text-align:center">暂无帖子数据</h2>
								</template>
							</ul>
						</div>
						<div style="margin-top:20px;width:100%;float:left">
						</div>
					</section>
				</div>
			</div>
			<div class="clear"></div>
			<div class="clear blank"></div>
			<!-- tuijian-news begin-->
			<div class="tuijian-news box whitebg tab-num01">
				<div class="gd-box">
					<ul id="tab">
						<li class="tab-current">最新帖子</li>
					</ul>
				</div>
				<div id="tab-content">
					<section>
						<div class="tuijian-news-list" style="width:100%">
							<ul id="pl2">
								<template v-for="(item, index) in pl2">
									<li>
										<a data-href="/index/post_detail" :data-params="'id=' + item.model.id + ''"
											@click="goToPage" style="height:80px;">
											<div style="float:right">
											</div>
											<h3>{{ item.model.title }}</h3>
											<p>{{ item.model.praiseNum }}点赞数</p>
										</a>
									</li>
								</template>
								<template v-if="pl2 && pl2.length == 0">
									<h2 style="color:gray;text-align:center">暂无帖子数据</h2>
								</template>
							</ul>
						</div>
						<div style="margin-top:20px;width:100%;float:left">
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
import { utils } from '../../assets/listutils.js'
export default {
	components: {
	},
	data() {
		return {
			currentLoginToken: '',
			sl: [],
			ml: [],
			nl: [],
			dl: [],
			pl: [],
			bl: [],
			lbindex: 0,
			pl1: [],
			pl2: [],
		};
	},
	mounted() {
		var that = this;
		this.initData();
		that.startCarousel();
	},
	methods: {
		startCarousel() {
			var that = this;
			setInterval(() => {
				that.selectNextImg();
			}, 5000); // 自动切换间隔时间
		},
		selectNextImg() {
			var divs = $(".carousel-img");
			this.lbindex = (this.lbindex + 1) % divs.length;
			$(".carousel-img").css("display", "none");
			$(divs[this.lbindex]).css("display", "block");
		},
		initData() {
			var that = this;
			$.ajax({
				type: 'get',
				url: that.REQUEST_URL + "/index/index/getData",
				async: false,
				data: {
					"loginToken": that.currentLoginToken,
				},
				success: function (result) {
					that.sl = result.sl;
					that.ml = result.ml;
					that.nl = result.nl;
					that.dl = result.dl;
					that.pl = result.pl;
					that.bl = result.bl;
					that.pl1 = result.pl1;
					that.pl2 = result.pl2;
				}
			});
		},
	}
};

</script>

<style type="text/css" src="../../assets/index/css/base.css?t=44" scoped></style>
<style type="text/css" src="../../assets/index/css/m.css?t=44" scoped></style>
<style scoped>
.selectStyle {
	background-color: #1487f4 !important;
	;
	color: white !important;
	;
}

.bodyClass::-webkit-scrollbar {
	display: none;
	/* Chrome Safari */
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
	min-height: 800px;
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
</style>
