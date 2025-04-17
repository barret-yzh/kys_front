import $ from 'jquery'

export var admin_utils = {
	showLoading(imgPath) {
	},
	hideLoading() {
	},
	modalShowHtml(html) {
		$("#bodyModalContent").html(html);
		$("#bodyModal").css("display", "block")
	},
	hideModal() {
		$("#bodyModal").css("display", "none")
	},
	maxImg(e) {
		var src = $(e).attr("src");
		var html = '';
		html = '<img style="height:500px;max-width:500px;margin-left:20%" src="' + src + '"/>';
		$("#bodyModalContent").html(html);
		$("#bodyModal").css("display", "block")
	},
	clickMenu(e) {
		if (!$(e).siblings('dd').hasClass('active')) {
			$('.navbar dl dd').removeClass('active');
			$(e).siblings('dd').removeClass('active');
			$(e).siblings('dd').addClass('active');
		} else {
			$('.navbar dl dd').removeClass('active');
			$(e).siblings('dd').removeClass('active');
		}
		if (!$(e).hasClass('activeTop')) {
			$('.navbar dl dt').removeClass('activeTop');
			$(e).removeClass('activeTop');
			$(e).addClass('activeTop');
		} else {
			$('.navbar dl dt').removeClass('activeTop');
			$(e).removeClass('activeTop');
		}
	},
	selectAll(e) {
		if ($(e).prop("checked") == true) {
			$(".itemselect").prop("checked", true);
		} else {
			$(".itemselect").prop("checked", false);
		}
	},
	addAllSelect(list) {
		var map = {};
		map.id = '';
		map.name = '全部';
		var list2 = [];
		list2.push(map);
		for (var i = 0; i < list.length; i++) {
			var map2 = {};
			map2.id = list[i].id;
			map2.name = list[i].name;
			list2.push(map2);
		}
		return list2;
	}
}
