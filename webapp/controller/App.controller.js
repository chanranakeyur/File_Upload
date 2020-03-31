sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/util/Export",
	"sap/ui/core/util/ExportTypeCSV"
], function (Controller, MessageToast, JSONModel, Export, ExportTypeCSV) {
	"use strict";
	var oModel;
	return Controller.extend("com.FileUploaderBasic.controller.App", {
		onUploadPress: function () {
			var oTable = this.getView().byId("itemsTable");
			var oFileUploader = this.getView().byId("fileUploader");
			if (!oFileUploader.getValue()) {
				MessageToast.show("Choose a file first");
				return;
			} else {
				var file = oFileUploader.getFocusDomRef().files[0];
				if (file && window.FileReader) {
					var reader = new FileReader(); // Create a  File Reader object 
					reader.onload = function (e) {
						var strCSV = e.target.result;
						var arrCSV = strCSV.match(/[\w - -':./,()]+(?=;?)/g);
						var noOfCols = 5;
						var hdrRow = arrCSV.splice(0, noOfCols); // To ignore the first row   which is header 
						var data = [];
						while (arrCSV.length > 0) {
							var obj = {};
							var row = arrCSV.splice(0, noOfCols); // extract remaining rows    one by one 
							for (var i = 0; i < row.length; i++) {
								obj[hdrRow[i]] = row[i];
							}
							data.push(obj); //  push row to an array 
						}
						// var oModel = new JSONModel();  
						// oTable.setModel(oModel.setData(data)); 
						var oModel = new JSONModel(data); //Bind the data to the Table 
						oTable.setModel(oModel);
					};
					reader.readAsBinaryString(file);
				}
			}
		},
		onDataExport: sap.m.Table.prototype.exportData || function () {

			var oExport = new Export({

				exportType: new ExportTypeCSV({
					fileExtension: "csv",
					separatorChar: ";"
				}),
				models: oModel,

				rows: {
					path: "/"
				},
				columns: [{
					name: "Item Description",
					template: {
						content: "{ITEM}"
					}
				}, {
					name: "ABC",
					template: {
						content: "{ABC}"
					}
				}, {
					name: "DEF",
					template: {
						content: "{DEF}"
					}
				}, {
					name: "DAS",
					template: {
						content: "{DAS}"
					}
				}, {
					name: "AMOUNT",
					template: {
						content: "{AMOUNT}"
					}
				}]
			});
			oExport.saveFile().catch(function (oError) {

			}).then(function () {
				oExport.destroy();
			});
		}
	});
});