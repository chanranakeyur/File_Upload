/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"com/FileUploaderBasic/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});