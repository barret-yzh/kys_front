

<template>
	<div id="body" class="bodyClass" >
		<ol class="breadcrumb">
			<li>资料类型-修改</li>
		</ol>
		<div class="tabli">
			<span class="active">资料类型-修改</span>
		</div>
		<div class="tabbody">
			<div class="bodyli active">
				<div class="inputbox"  id="typeNameForm">
					<span class="title">类型名</span>
					<div class="inputright">
						<input type="input"  placeholder="请输入类型名" name="typeName" v-model="typeName" class="form-control edit-input" id="typeName">
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
export default {
	components: {
	},
	data() {
		return {
			currentLoginToken:'',
			id:'',
			typeName:'',
		};
	},
	mounted() {
		var that = this;
		that.currentLoginToken=utils.getCookie('loginToken');
		that.id= that.$route.query.id;
		that.queryDataDetail();
	},
	methods:{
		queryDataDetail(){
			var that = this;
			$.ajax({
				type : 'get',
				url : this.REQUEST_URL+"/admin/zl_type/queryDataDetail",
				async: false,
				data : {
					'id':that.id,
					'loginToken':that.currentLoginToken,
				},
				success : function(result) {
					that.typeName=result.typeName;
				}
			});
		},
		submitData(){
			var that = this;
			var typeName = that.typeName;
			$.ajax({
				type : 'post',
				url : this.REQUEST_URL+"/admin/zl_type/update_submit",
				async: false,
				data : {
					'id':that.id,
					'typeName':typeName,
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



