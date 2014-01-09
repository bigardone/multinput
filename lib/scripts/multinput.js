(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  (function($, window, document) {
    'use strict';
    var MultinputPlugin, defaults, pluginName;
    pluginName = "multinput";
    defaults = {
      patternAttribute: 'data-pattern',
      separator: '-',
      inputsClasses: ''
    };
    MultinputPlugin = (function() {
      function MultinputPlugin(element, options) {
        this.element = element;
        this._updateVal = __bind(this._updateVal, this);
        this._onInputKeyUp = __bind(this._onInputKeyUp, this);
        this._onInputKeyDown = __bind(this._onInputKeyDown, this);
        this._setValue = __bind(this._setValue, this);
        this._createInputs = __bind(this._createInputs, this);
        this._validPattern = __bind(this._validPattern, this);
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
      }

      MultinputPlugin.prototype.init = function() {
        this.$el = $(this.element);
        this.pattern = this.$el.data('pattern') && this.$el.data('pattern') !== '' ? this.$el.data('pattern') : this.$el.attr(this.settings.patternAttribute);
        this.separator = this.$el.data('separator') && this.$el.data('separator') !== '' ? this.$el.data('separator') : this.$el.attr(this.settings.separator);
        if (this._validPattern()) {
          this.inputsClasses = this.$el.data('classes') && this.$el.data('classes') !== '' ? this.$el.data('classes') : this.$el.attr(this.settings.inputsClasses);
          this.value = this.$el.val();
          this.$el.hide();
          this.$wrapper = $('<div class="multiple-inputs-wrapper"></div>').insertAfter(this.$el);
          return this._createInputs();
        }
      };

      MultinputPlugin.prototype._validPattern = function() {
        return this.pattern.indexOf(this.separator) !== -1;
      };

      MultinputPlugin.prototype._createInputs = function() {
        var input, part, _i, _len, _ref;
        this.inputs = [];
        _ref = this.pattern.split(this.separator);
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          part = _ref[_i];
          input = $('<input>', {
            "class": "multiple-inputs-part " + this.inputsClasses,
            type: 'text',
            maxlength: part.length,
            placeholder: part
          }).attr('size', part.length).data('type', isNaN(part) ? 'text' : 'number').on('keydown', this._onInputKeyDown).on('keyup', this._onInputKeyUp).on('focus', function(e) {
            return $(this).select();
          });
          this.$wrapper.append(input);
          this.inputs.push(input);
        }
        if (this.$el.val() !== '') {
          return this._setValue();
        }
      };

      MultinputPlugin.prototype._setValue = function() {
        var i, lastIndex, part, _i, _len, _ref, _results;
        lastIndex = 0;
        _ref = this.pattern.split(this.separator);
        _results = [];
        for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
          part = _ref[i];
          this.inputs[i].val(this.value.substr(lastIndex, part.length));
          _results.push(lastIndex += part.length);
        }
        return _results;
      };

      MultinputPlugin.prototype._onInputKeyDown = function(e) {
        var input;
        input = $(e.target);
        if (e.which <= 90 && e.which >= 48) {
          if (input.data('type') === 'text' && (e.which <= 90 && e.which >= 65)) {
            return true;
          } else if (input.data('type') === 'number' && (e.which <= 57 && e.which >= 48)) {
            return true;
          } else {
            return false;
          }
        } else {
          return true;
        }
      };

      MultinputPlugin.prototype._onInputKeyUp = function(e) {
        var input;
        input = $(e.target);
        if (input.val().length === parseInt(input.attr('maxlength'), 10) && (e.which <= 90 && e.which >= 48)) {
          input.next('.multiple-inputs-part').focus();
        }
        return this._updateVal();
      };

      MultinputPlugin.prototype._updateVal = function() {
        var value,
          _this = this;
        value = '';
        this.$wrapper.find('input').each(function(index, element) {
          return value += $(element).val();
        });
        return this.$el.val(value);
      };

      return MultinputPlugin;

    })();
    $.fn[pluginName] = function(options) {
      return this.each(function() {
        if (!$.data(this, "plugin_" + pluginName)) {
          return $.data(this, "plugin_" + pluginName, new MultinputPlugin(this, options));
        }
      });
    };
    return $(function() {
      return $('[data-multinput]').multinput();
    });
  })(jQuery, window, document);

}).call(this);
