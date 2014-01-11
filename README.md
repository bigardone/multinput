MultInput
=========
**MultInput** is a lightweight jQuery plugin that automatically splits your form inputs into multiple inputs with the help of a pattern.

###Features
- Lightweight jQuery plugin.
- JavaScript and CoffeeScript versions.
- CSS and SASS styling.
- Available markup API via data attributes.

###Getting started
Just make sure to include the following scripts on your HTML page:

	<script src="jquery.js"></script>
	<script src="multinput.js"></script>
	
Set the data-multinput and data-pattern attributes to the input you wish to split:

	<input type="text" data-multinput data-pattern="ES-99-9999-9999-9999-9999-9999">
	
And that's all :)

###Options
####Data attributes
- **data-multipart**: Add this attribute to automatically apply the plugin to the inputs you want to split.
- **data-pattern**: The pattern which will be used to generate the inputs.
- **data-separator**: The char which will be used to split the pattern and generate the inputs.
- **data-classes**: Additional classes you can add to the inputs generated to apply your own styles.