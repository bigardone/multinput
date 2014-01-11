do ($ = jQuery, window, document) ->
  'use strict'
  pluginName = "multinput"
  defaults =
    patternAttribute:       'data-pattern'
    separator:              '-'
    inputsClasses:            ''

  class MultinputPlugin
    constructor: (@element, options) ->
      @settings = $.extend {}, defaults, options
      @_defaults = defaults
      @_name = pluginName
      @init()

    init: ->
      @$el = $(@element)
      @pattern = if @$el.data('pattern')? then @$el.data('pattern') else @$el.attr @settings.patternAttribute
      @separator = if @$el.data('separator')? then @$el.data('separator') else @$el.attr @settings.separator

      if @_validPattern()
        @inputsClasses = if @$el.data('classes')? then @$el.data('classes') else @settings.inputsClasses
        @value = @$el.val()
        @$el.hide()
        @$wrapper = $('<div class="multiple-inputs-wrapper"></div>').insertAfter @$el
        @_createInputs()


    _validPattern: =>
      @pattern.indexOf(@separator) != -1

    _createInputs: =>
      @inputs = []
      for part in @pattern.split(@separator)
        input = $('<input>',
          class:        "multiple-inputs-part #{@inputsClasses}"
          type:         'text'
          maxlength:    part.length
          placeholder:  part
        )
        .attr('size',part.length)
        .data('type',if isNaN(part) then 'text' else 'number')
        .on('keydown', @_onInputKeyDown)
        .on('keyup', @_onInputKeyUp)
        .on('focus', (e) -> $(@).select())

        @$wrapper.append input
        @inputs.push input

      @_setValue() unless @$el.val() is ''

    _setValue: =>
      lastIndex = 0
      for part, i in @pattern.split(@separator)
        @inputs[i].val @value.substr(lastIndex, part.length)
        lastIndex += part.length


    _onInputKeyDown: (e)=>
      input = $(e.target)

      if (e.which <= 90 && e.which >= 48)
        if input.data('type') == 'text' and (e.which <= 90 and e.which >= 65)
          true
        else if input.data('type') == 'number' and (e.which <= 57 and e.which >= 48)
          true
        else
          false
      else
        true

    _onInputKeyUp: (e)=>
      input = $(e.target)
      if input.val().length == parseInt(input.attr('maxlength'),10) and (e.which <= 90 && e.which >= 48)
        input.next('.multiple-inputs-part').focus()
      @_updateVal()

    _updateVal: ()=>
      value = ''
      @$wrapper.find('input').each (index,element)=>
        value += $(element).val()

      @$el.val value

  $.fn[pluginName] = (options) ->
    @each ->
      if !$.data(@, "plugin_#{pluginName}")
        $.data(@, "plugin_#{pluginName}", new MultinputPlugin(@, options))

  $ ->
    $('[data-multinput]').multinput()

