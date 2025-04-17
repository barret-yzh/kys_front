// Author: David Qin
// E-mail: david@hereapp.cn
// Date: 2014-11-05
import $ from 'jquery';
(function ($) {
  // a case insensitive jQuery :contains selector
  $.expr[":"].searchableSelectContains = $.expr.createPseudo(function (arg) {
    return function (elem) {
      return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
    };
  });
  // @ts-ignore
  $.searchableSelect = function (element, options) {
    this.element = element;
    this.options = options || {};
    // @ts-ignore
    this.init(options);
    var _this = this;
    // @ts-ignore
    this.searchableElement.click(function (event) {
      // event.stopPropagation();
      // @ts-ignore
      _this.show();
    }).on('keydown', function (event) {
      if (event.which === 13 || event.which === 40 || event.which == 38) {
        event.preventDefault();
        // @ts-ignore
        _this.show();
      }
    });
    $(document).on('click', null, function (event) {
      // @ts-ignore
      if (_this.searchableElement.has($(event.target)).length === 0)
        // @ts-ignore
        _this.hide();
    });
    // @ts-ignore
    this.input.on('keydown', function (event) {
      event.stopPropagation();
      if (event.which === 13) {         //enter
        event.preventDefault();
        // @ts-ignore
        _this.selectCurrentHoverItem();
        // @ts-ignore
        _this.hide();
      } else if (event.which == 27) { //ese
        // @ts-ignore
        _this.hide();
      } else if (event.which == 40) { //down
        // @ts-ignore
        _this.hoverNextItem();
      } else if (event.which == 38) { //up
        // @ts-ignore
        _this.hoverPreviousItem();
      }
    }).on('keyup', function (event) {
      if (event.which != 13 && event.which != 27 && event.which != 38 && event.which != 40)
        // @ts-ignore
        _this.filter();
    })
  }
  // @ts-ignore
  var $sS = $.searchableSelect;
  $sS.fn = $sS.prototype = {
    version: '0.0.1'
  };
  $sS.fn.extend = $sS.extend = $.extend;
  $sS.fn.extend({
    init: function (list) {
      var _this = this;
      this.element.hide();
      var pwidth = $(this.element[0]).css("width");
      this.searchableElement = $('<div tabindex="0" class="searchable-select ' + this.element.attr("id") + '-selectable" style="width:' + pwidth + '"></div>');
      this.holder = $('<div class="searchable-select-holder"></div>');
      this.dropdown = $('<div class="searchable-select-dropdown searchable-select-hide"></div>');
      this.input = $('<input type="text" class="searchable-select-input" />');
      this.items = $('<div class="searchable-select-items"></div>');
      this.caret = $('<span class="searchable-select-caret"></span>');
      this.scrollPart = $('<div class="searchable-scroll"></div>');
      this.hasPrivious = $('<div class="searchable-has-privious">...</div>');
      this.hasNext = $('<div class="searchable-has-next">...</div>');
      this.hasNext.on('mouseenter', function () {
        _this.hasNextTimer = null;
        var f = function () {
          var scrollTop = _this.items.scrollTop();
          _this.items.scrollTop(scrollTop + 20);
          _this.hasNextTimer = setTimeout(f, 50);
        }
        f();
        // @ts-ignore
      }).on('mouseleave', function (event) {
        clearTimeout(_this.hasNextTimer);
      });
      this.hasPrivious.on('mouseenter', function () {
        _this.hasPriviousTimer = null;
        var f = function () {
          var scrollTop = _this.items.scrollTop();
          _this.items.scrollTop(scrollTop - 20);
          _this.hasPriviousTimer = setTimeout(f, 50);
        }
        f();
        // @ts-ignore
      }).on('mouseleave', function (event) {
        clearTimeout(_this.hasPriviousTimer);
      });
      this.dropdown.append(this.input);
      this.dropdown.append(this.scrollPart);
      this.scrollPart.append(this.hasPrivious);
      this.scrollPart.append(this.items);
      this.scrollPart.append(this.hasNext);
      this.searchableElement.append(this.caret);
      this.searchableElement.append(this.holder);
      this.searchableElement.append(this.dropdown);
      this.element.after(this.searchableElement);
      this.buildItems(list);
      if (list.length > 0) {
        setSelectableVal(this.element.attr("id"), list[0].id);
      }
      this.setPriviousAndNextVisibility();
    },
    filter: function () {
      var text = this.input.val();
      this.items.find('.searchable-select-item').addClass('searchable-select-hide');
      this.items.find('.searchable-select-item:searchableSelectContains(' + text + ')').removeClass('searchable-select-hide');
      if (this.currentSelectedItem.hasClass('searchable-select-hide') && this.items.find('.searchable-select-item:not(.searchable-select-hide)').length > 0) {
        this.hoverFirstNotHideItem();
      }
      this.setPriviousAndNextVisibility();
    },
    hoverFirstNotHideItem: function () {
      this.hoverItem(this.items.find('.searchable-select-item:not(.searchable-select-hide)').first());
    },
    selectCurrentHoverItem: function () {
      if (!this.currentHoverItem.hasClass('searchable-select-hide'))
        this.selectItem(this.currentHoverItem);
    },
    hoverPreviousItem: function () {
      if (!this.hasCurrentHoverItem())
        this.hoverFirstNotHideItem();
      else {
        var prevItem = this.currentHoverItem.prevAll('.searchable-select-item:not(.searchable-select-hide):first')
        if (prevItem.length > 0)
          this.hoverItem(prevItem);
      }
    },
    hoverNextItem: function () {
      if (!this.hasCurrentHoverItem())
        this.hoverFirstNotHideItem();
      else {
        var nextItem = this.currentHoverItem.nextAll('.searchable-select-item:not(.searchable-select-hide):first')
        if (nextItem.length > 0)
          this.hoverItem(nextItem);
      }
    },
    buildItems: function (list) {
      var _this = this;
      for (var i = 0; i < list.length; i++) {
        var item = $('<div class="searchable-select-item" data-value="' + list[i].id + '">' + list[i].name + '</div>');
        if (this.selected) {
          _this.selectItem(item);
          _this.hoverItem(item);
        }
        item.on('mouseenter', function () {
          $(this).addClass('hover');
        }).on('mouseleave', function () {
          $(this).removeClass('hover');
        }).click(function (event) {
          event.stopPropagation();
          _this.selectItem($(this));
          _this.hide();
        });
        _this.items.append(item);
      }
      this.items.on('scroll', function () {
        _this.setPriviousAndNextVisibility();
      })
    },
    show: function () {
      this.dropdown.removeClass('searchable-select-hide');
      this.input.focus();
      this.status = 'show';
      this.setPriviousAndNextVisibility();
      this.dropdown.css('z-index', 99999); //打开下拉列表时调高z-index层级  
    },
    hide: function () {
      if (!(this.status === 'show'))
        return;
      if (this.items.find(':not(.searchable-select-hide)').length === 0)
        this.input.val('');
      this.dropdown.addClass('searchable-select-hide');
      this.searchableElement.trigger('focus');
      this.status = 'hide';
      this.dropdown.css('z-index', 1); //关闭下拉列表时恢复z-index层级  
    },
    hasCurrentSelectedItem: function () {
      return this.currentSelectedItem && this.currentSelectedItem.length > 0;
    },
    selectItem: function (item) {
      $(item.parent().children()).removeClass('selected');
      this.currentSelectedItem = item;
      item.addClass('selected');
      this.hoverItem(item);
      this.holder.text(item.text());
      var value = item.data('value');
      this.holder.data('value', value);
      this.element.val(value);
      this.element.trigger('change');
      if (this.options.afterSelectItem) {
        this.options.afterSelectItem.apply(this);
      }
    },
    hasCurrentHoverItem: function () {
      return this.currentHoverItem && this.currentHoverItem.length > 0;
    },
    hoverItem: function (item) {
      if (this.hasCurrentHoverItem())
        this.currentHoverItem.removeClass('hover');
      if (item.outerHeight() + item.position().top > this.items.height())
        this.items.scrollTop(this.items.scrollTop() + item.outerHeight() + item.position().top - this.items.height());
      else if (item.position().top < 0)
        this.items.scrollTop(this.items.scrollTop() + item.position().top);
      this.currentHoverItem = item;
      item.addClass('hover');
    },
    setPriviousAndNextVisibility: function () {
      if (this.items.scrollTop() === 0) {
        this.hasPrivious.addClass('searchable-select-hide');
        this.scrollPart.removeClass('has-privious');
      } else {
        this.hasPrivious.removeClass('searchable-select-hide');
        this.scrollPart.addClass('has-privious');
      }
      if (this.items.scrollTop() + this.items.innerHeight() >= this.items[0].scrollHeight) {
        this.hasNext.addClass('searchable-select-hide');
        this.scrollPart.removeClass('has-next');
      } else {
        this.hasNext.removeClass('searchable-select-hide');
        this.scrollPart.addClass('has-next');
      }
    }
  });
  // @ts-ignore
  $.fn.searchableSelect = function (options) {
    this.each(function () {
      // @ts-ignore
      var sS = new $sS($(this), options);
    });
    return this;
  };
})($);
export function getSelectableVal(domId) {
  var divs = $("." + domId + "-selectable .searchable-select-item");
  var val = '';
  for (var i = 0; i < divs.length; i++) {
    if ($(divs[i]).hasClass("selected")) {
      // @ts-ignore
      val = $(divs[i]).attr("data-value");
    }
  }
  return val;
}
export function setSelectableVal(domId, val) {
  var divs = $("." + domId + "-selectable .searchable-select-item");
  for (var i = 0; i < divs.length; i++) {
    if ($(divs[i]).attr("data-value") == val) {
      $(divs[i]).addClass("selected");
      $("." + domId + "-selectable .searchable-select-holder").html($(divs[i]).text());
    }
  }
  return val;
}
