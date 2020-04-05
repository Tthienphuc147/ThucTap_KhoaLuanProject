/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

 CKEDITOR.editorConfig = function( config ) {
	config.filebrowserBrowseUrl = './tool/ckeditor/ckfinder/ckfinder.html';
	config.filebrowserImageBrowseUrl = './tool/ckeditor/ckfinder/ckfinder.html?type=Images';
	config.filebrowserFlashBrowseUrl = './tool/ckeditor/ckfinder/ckfinder.html?type=Flash';
	config.filebrowserUploadUrl = './tool/ckeditor/ckfinder/core/connector/php/connector. php?command=QuickUpload&type=Files';
	config.filebrowserImageUploadUrl = './tool/ckeditor/ckfinder/core/connector/php/connector. php?command=QuickUpload&type=Images';
	config.filebrowserFlashUploadUrl = './tool/ckeditor/ckfinder/core/connector/php/connector. php?command=QuickUpload&type=Flash';
	//config.extraPlugins = 'image';
	config.extraPlugins='image,ruler'

};
