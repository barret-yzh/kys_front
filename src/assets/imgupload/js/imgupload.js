import $ from 'jquery';
// @ts-ignore
import Dropzone from 'dropzone';
// @ts-ignore
Dropzone.autoDiscover = false;

var imgUrls = {};
export function initDropZone(domId) {

	imgUrls = {};

	var maxNum = $("#" + domId).attr("max-num");
	var fileType = $("#" + domId).attr("file-type");
	var maxSize = $("#" + domId).attr("max-size");
	var fileTypeStr = '';
	var fileName3 = '';
	var uri = $("#" + domId).attr("request-url");
	if (fileType == '1') {
		fileTypeStr = '.jpg,.jpeg,.png';
		fileName3 = '图片';
	}
	if (fileType == '2') {
		fileTypeStr = '.mp4,.avi';
		fileName3 = '视频';
	}
	if (fileType == '3') {
		fileTypeStr = '.mp3';
		fileName3 = '音频';
	}
	if (fileType == '4') {
		fileTypeStr = '.pdf,.docx,.zip,.rar,.doc,.xlsx,.xls,.txt';
		fileName3 = '文件';
	}
	if (maxSize == '') {
		// @ts-ignore
		maxSize = 20;
	}

	console.log($("#" + domId));

	// @ts-ignore
	var dropzone = new Dropzone("#" + domId, {
		url: uri + "/imgUpload/thumb",
		maxFiles: maxNum,
		maxFilesize: maxSize,
		acceptedFiles: fileTypeStr,
		autoProcessQueue: true,
		paramName: "file",
		addRemoveLinks: true,
		dictRemoveLinks: "删除",
		dictDefaultMessage: "拖入需要上传的" + fileName3 + "，数量不超过" + maxNum,
		//	    previewTemplate: "<div class=\"dz-preview dz-file-preview\">" +
		//        "<div class=\"dz-details\">" +
		//        "    <div class=\"dz-filename\"><span data-dz-name></span></div>" +
		//        "    <div class=\"dz-size\" data-dz-size></div>" +
		//        "    <img data-dz-thumbnail />" +
		//        "  </div>" +
		//        "  <div class=\"dz-progress\"><span class=\"dz-upload\" data-dz-uploadprogress></span></div>" +
		//        "</div>",



		init: function () {
			this.on("addedfile", function (file) {
				var allUrl = imgUrls[domId];
				var len = 0;
				if (allUrl != undefined) {
					len = allUrl.length;
				}
				// @ts-ignore
				if (len >= maxNum) {
					alert("上传文件数已达上限");
					this.removeFile(file);
				}
			});

			this.on("error", function (file, message) {
				if (message.indexOf('File is too big') != -1) {
					alert("上传" + fileName3 + "过大，请上传" + maxSize + "MB的" + fileName3);
				} else {
					alert(message);
				}

				this.removeFile(file);
			});
			// @ts-ignore
			this.on("queuecomplete", function (file) {
				//上传完成后触发的方法
				// @ts-ignore
				var i = 1;
			});
			this.on("removedfile", function (file) {
				//删除文件时触发的方法
				var imgUrl = file.imgUrl;
				var allUrl = imgUrls[domId];
				var allUrl2 = [];
				if (allUrl != undefined) {
					for (var i = 0; i < allUrl.length; i++) {
						if (allUrl[i] != imgUrl) {
							allUrl2.push(allUrl[i]);
						}
					}
				}
				imgUrls[domId] = allUrl2;
			});

			this.on("success", function (file, data) {
				//获取后台传回的文件名，放入输入框
				file.imgUrl = data.url;
				var allUrl = imgUrls[domId];
				if (allUrl == undefined) {
					allUrl = [];
				}
				allUrl.push(data.url);
				imgUrls[domId] = allUrl;

				//alert(data.url);
			});
		}
	});
	return dropzone;
}

export function setZoneImg(dom, initVal) {

	var imgSplit = [];
	if (initVal != undefined) {
		imgSplit = initVal.split(';');
	}
	for (var k = 0; k < imgSplit.length; k++) {
		if (imgSplit[k] != '') {
			var url = imgSplit[k];
			var data = {};
			data.url = url;
			var fileName = imgSplit[k].split("/");
			var name2 = fileName[fileName.length - 1];
			var mockFile = { name: name2, accepted: true, status: "success", processing: "true", url: url, imgUrl: url };
			dom.emit("addedfile", mockFile);
			dom.emit("thumbnail", mockFile, url);
			dom.emit("complete", mockFile);
			dom.emit("success", mockFile, data);
			dom.createThumbnailFromUrl(mockFile, url);
		}
	}

	$(".dz-image").parent().addClass("dz-file-preview dz-processing  dz-success dz-complete ");
	$(".dz-size").remove();

}

export function setZoneImg2(dom, initVal) {

	var imgSplit = [];
	if (initVal != undefined) {
		imgSplit = initVal.split(';');
	}
	for (var k = 0; k < imgSplit.length; k++) {
		if (imgSplit[k] != '') {
			var url = imgSplit[k];
			var data = {};
			data.url = url;
			var fileName = imgSplit[k].split("/");
			var name2 = fileName[fileName.length - 1];
			var mockFile = { name: name2, accepted: true, status: "success", processing: "true", url: url, imgUrl: url };
			dom.emit("addedfile", mockFile);
			// dom.emit("thumbnail", mockFile, url);
			dom.emit("complete", mockFile);
			dom.emit("success", mockFile, data);
			dom.createThumbnailFromUrl(mockFile, url);
		}
	}

	$(".dz-image").parent().addClass("dz-file-preview dz-processing  dz-success dz-complete ");
	$(".dz-size").remove();

}


export function clearAllImgs() {
	imgUrls = {};

}


export function getFileVal2(domId) {


	var allUrl = imgUrls[domId];
	var urls = '';
	if (allUrl != undefined) {
		for (var i = 0; i < allUrl.length; i++) {
			urls += allUrl[i] + ';';
		}
	}

	if (urls != '') {
		urls = urls.substring(0, urls.length - 1);
	}
	return urls;
}

//剩余时间格式转换：
// @ts-ignore
function arrive_timer_format(s) {
	var t;
	if (s > -1) {
		var hour = Math.floor(s / 3600);
		var min = Math.floor(s / 60) % 60;
		var sec = s % 60;
		// @ts-ignore
		var day = parseInt(hour / 24);
		if (day > 0) {
			hour = hour - 24 * day;
			t = day + "day " + hour + ":";
		}
		else t = hour + ":";
		if (min < 10) { t += "0"; }
		t += min + ":";
		if (sec < 10) { t += "0"; }
		t += sec;
	}
	return t;
}