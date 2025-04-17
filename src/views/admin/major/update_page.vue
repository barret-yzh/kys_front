<template>
	<div id="body" class="bodyClass">
		<ol class="breadcrumb">
			<li>专业-修改</li>
		</ol>
		<div class="tabli">
			<span class="active">专业-修改</span>
		</div>
		<div class="tabbody">
			<div class="bodyli active">
				<div class="inputbox" id="majorNameForm">
					<span class="title">专业名</span>
					<div class="inputright">
						<input type="input" placeholder="请输入专业名" name="majorName" v-model="majorName"
							class="form-control edit-input" id="majorName">
					</div>
				</div>
				<div class="inputbox" id="schoolIdForm">
					<span class="title">院校</span>
					<div class="inputright">
						<select class="form-control edit-select" data-id="schoolId" id="schoolId">
							<template v-for="item in schoolList">
								<option :value="item.id">{{ item.name }}</option>
							</template>
						</select>
					</div>
				</div>
				<div class="inputbox" id="majorIntroForm">
					<span class="title">专业介绍</span>
					<div class="inputright">
						<textarea class="form-control edit-textarea" name="majorIntro" v-model="majorIntro"
							id="majorIntro"></textarea>
					</div>
				</div>
				<div class="inputbox" id="csProjectForm">
					<span class="title">初试科目</span>
					<div class="inputright">
						<input type="input" placeholder="请输入初试科目" name="csProject" v-model="csProject"
							class="form-control edit-input" id="csProject">
					</div>
				</div>
				<div class="inputbox" id="fsfaForm">
					<span class="title">复试方案</span>
					<div class="inputright">
						<div id="fsfa" class="dropzone" data-id="fsfa" max-num="1" file-type="4" max-size="1000"
							init-val="" :request-url="REQUEST_URL" :init-val="fsfa">
						</div>
					</div>
				</div>

				<div class="inputbox" id="dsMsgForm">
					<span class="title">导师信息</span>
					<div class="inputright">
						<input type="input" placeholder="请输入导师信息" name="dsMsg" v-model="dsMsg"
							class="form-control edit-input" id="dsMsg">
					</div>
				</div>
			</div>
		</div>
		<div class="tbfooter">
			<button class="btn btn-success" @click="submitData"><i class="fa fa-floppy-o"></i> 保存</button>
			<button class="btn btn-default" onclick="javascript:history.back(-1);">返回</button>
		</div>
	</div>
</template>

<script>
import $ from 'jquery'
import { utils } from '../../../assets/listutils.js'
import { admin_utils } from '../../../assets/admin/admin_utils.js'
import { getFileVal2, initDropZone, setZoneImg2 } from '../../../assets/imgupload/js/imgupload.js'
import { getSelectableVal, setSelectableVal } from '../../../assets/selectsearch/jquery.searchableSelect.js'
export default {
	components: {
	},
	data() {
		return {
			currentLoginToken: '',
			id: '',
			majorName: '',
			schoolId: '',
			majorIntro: '',
			csProject: '',
			fsfa: '',
			dsMsg: '',
			schoolList: [],
		};
	},
	mounted() {
		var that = this;
		that.currentLoginToken = utils.getCookie('loginToken');
		that.id = that.$route.query.id;
		that.getDataList();
		$('#schoolId').next().remove();
		$('#schoolId').searchableSelect(that.schoolList);
		var fsfaDrop = initDropZone('fsfa');
		that.queryDataDetail();
		setSelectableVal('schoolId', that.schoolId)
		setZoneImg2(fsfaDrop, that.fsfa);
	},
	methods: {
		getDataList() {
			var that = this;
			$.ajax({
				type: 'get',
				url: this.REQUEST_URL + "/admin/major/getInitData",
				async: false,
				data: {
					'loginToken': that.currentLoginToken
				},
				success: function (result) {
					that.schoolList = result.schoolList;
				}
			});
		},
		queryDataDetail() {
			var that = this;
			$.ajax({
				type: 'get',
				url: this.REQUEST_URL + "/admin/major/queryDataDetail",
				async: false,
				data: {
					'id': that.id,
					'loginToken': that.currentLoginToken,
				},
				success: function (result) {
					that.majorName = result.majorName;
					that.schoolId = result.schoolId;
					that.majorIntro = result.majorIntro;
					that.csProject = result.csProject;
					that.fsfa = result.fsfa;
					that.dsMsg = result.dsMsg;
					$("#majorIntro").val(result.majorIntro);
				}
			});
		},
		submitData() {
			var that = this;
			var majorName = that.majorName;
			var schoolId = getSelectableVal('schoolId');
			var majorIntro = that.majorIntro;
			var csProject = that.csProject;
			var fsfa = getFileVal2('fsfa');
			var dsMsg = that.dsMsg;
			$.ajax({
				type: 'post',
				url: this.REQUEST_URL + "/admin/major/update_submit",
				async: false,
				data: {
					'id': that.id,
					'majorName': majorName,
					'schoolId': schoolId,
					'majorIntro': majorIntro,
					'csProject': csProject,
					'fsfa': fsfa,
					'dsMsg': dsMsg,
					'loginToken': that.currentLoginToken,
				},
				success: function (result) {
					alert(result.msg);
					if (result.code == 1) {
						that.$router.go(-1);
					}
				}
			});
		},
	}
};

</script>
<style type="text/css" src="../../../assets/admin/style.css?t=44" scoped></style>
<style type="text/css" src="../../../assets/imgupload/css/dropzone.min.css?t=44" scoped></style>
<style type="text/css" src="../../../assets/selectsearch/jquery.searchableSelect.css?t=44" scoped></style>
<style scoped>
.bodyClass::-webkit-scrollbar {
	display: none;
	/* Chrome Safari */
}

.bodyClass {
	scrollbar-width: none;
	/* firefox */
	-ms-overflow-style: none;
	/* IE 10+ */
	overflow-x: hidden;
	overflow-y: auto;
}

.dz-image>img {
	width: 120px;
	height: 120px;
}

* {
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
}

input {
	height: 35px !important
}

.edit-input {
	border: 1px solid #ccc;
	width: 800px !important;
	display: inline
}

.edit-select {
	height: 35px !important;
	width: 800px !important;
	display: inline
}

.edit-textarea {
	height: 100px !important;
}
</style>
