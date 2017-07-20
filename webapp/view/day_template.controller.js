jQuery.sap.require("sap.ui.core.mvc.Controller");
jQuery.sap.require("sap.m.MessageToast");
jQuery.sap.require("sap.ca.scfld.md.controller.BaseFullscreenController");
jQuery.sap.require("sap.ui.model.odata.datajs");
jQuery.sap.require("hcm.mytimesheet.model.TimeEntry");
jQuery.sap.require("hcm.mytimesheet.utils.DataManager");
jQuery.sap.require("hcm.mytimesheet.utils.ConcurrentEmployment");
jQuery.sap.require("sap.ca.ui.model.format.DateFormat");
jQuery.sap.require("sap.ca.ui.model.type.Number");
sap.ui.controller("hcm.mytimesheet.zecetimesheet.view.day_template", {

//sap.ui.define([
//		"sap/ui/core/mvc/Controller",
	//	"sap/m/MessageBox",
	//	"sap/ui/core/routing/History"
	//], function(BaseController, MessageBox, History) {
	//	"use strict";
	//	return BaseController.extend("hcm.mytimesheet.zecetimesheet.view.day_template", {
			handleRouteMatched: function(oEvent) {
				var oParams = {};
				if (oEvent.mParameters.data.context || oEvent.mParameters.data.masterContext) {
					var oModel = this.getView ? this.getView().getModel() : null;
					if (oModel) {
						oModel.setRefreshAfterChange(true);
						if (oModel.hasPendingChanges()) {
							oModel.resetChanges();
						}
					}
					this.sContext = oEvent.mParameters.data.context;
					this.sMasterContext = oEvent.mParameters.data.masterContext;
					if (!this.sContext) {
						this.getView().bindElement("/" + this.sMasterContext, oParams);
					} else {
						this.getView().bindElement("/" + this.sContext, oParams);
					}
				}
			},
			_onButtonPress17: function(oEvent) {
				// button for Validate
				var sDialogName = "dialog_5";
				this.mDialogs = this.mDialogs || {};
				var oDialog = this.mDialogs[sDialogName];
				var oSource = oEvent.getSource();
				var oBindingContext = oSource.getBindingContext();
				var sPath = oBindingContext ? oBindingContext.getPath() : null;
				var oModel = oBindingContext ? oBindingContext.getModel() : this.getView().getModel();
				var oView;
				if (!oDialog) {
					this.getOwnerComponent().runAsOwner(function() {
						oView = sap.ui.xmlview({
							viewName: "generated.app.view." + sDialogName
						});
						this.getView().addDependent(oView);
						oView.getController().setRouter(this.oRouter);
						oDialog = oView.getContent()[0];
						this.mDialogs[sDialogName] = oDialog;
					}.bind(this));
				}
				return new ES6Promise.Promise(function(resolve, reject) {
					oDialog.attachEventOnce("afterOpen", null, resolve);
					oDialog.open();
					if (oView) {
						oDialog.attachAfterOpen(function() {
							oDialog.rerender();
						});
					} else {
						oView = oDialog.getParent();
					}
					oView.setModel(oModel);
					if (sPath) {
						var oParams = oView.getController().getBindingParameters();
						oView.bindElement(sPath, oParams);
					}
				});
			},
			_onButtonPress18: function(oEvent) {
				var sDialogName = "dialog_5";
				this.mDialogs = this.mDialogs || {};
				var oDialog = this.mDialogs[sDialogName];
				var oSource = oEvent.getSource();
				var oBindingContext = oSource.getBindingContext();
				var sPath = oBindingContext ? oBindingContext.getPath() : null;
				var oModel = oBindingContext ? oBindingContext.getModel() : this.getView().getModel();
				var oView;
				if (!oDialog) {
					this.getOwnerComponent().runAsOwner(function() {
						oView = sap.ui.xmlview({
							viewName: "generated.app.view." + sDialogName
						});
						this.getView().addDependent(oView);
						oView.getController().setRouter(this.oRouter);
						oDialog = oView.getContent()[0];
						this.mDialogs[sDialogName] = oDialog;
					}.bind(this));
				}
				return new ES6Promise.Promise(function(resolve, reject) {
					oDialog.attachEventOnce("afterOpen", null, resolve);
					oDialog.open();
					if (oView) {
						oDialog.attachAfterOpen(function() {
							oDialog.rerender();
						});
					} else {
						oView = oDialog.getParent();
					}
					oView.setModel(oModel);
					if (sPath) {
						var oParams = oView.getController().getBindingParameters();
						oView.bindElement(sPath, oParams);
					}
				});
			},
			_onButtonPress19: function(oEvent) {
				var oBindingContext = oEvent.getSource().getBindingContext();
				return new ES6Promise.Promise(function(resolve, reject) {
					this.doNavigate("week_template_detail", oBindingContext, resolve, "");
				}.bind(this));
			},
			doNavigate: function(sRouteName, oBindingContext, fnPromiseResolve, sViaRelation) {
				var that = this;
				var sPath = oBindingContext ? oBindingContext.getPath() : null;
				var oModel = oBindingContext ? oBindingContext.getModel() : null;
				var entityNameSet;
				if (sPath !== null && sPath !== "") {
					if (sPath.substring(0, 1) === "/") {
						sPath = sPath.substring(1);
					}
					entityNameSet = sPath.split("(")[0];
				}
				var navigationPropertyName;
				var sMasterContext = this.sMasterContext ? this.sMasterContext : sPath;
				if (entityNameSet !== null) {
					navigationPropertyName = sViaRelation || that.getOwnerComponent().getNavigationPropertyForNavigationWithContext(entityNameSet,
						sRouteName);
				}
				if (navigationPropertyName !== null && navigationPropertyName !== undefined) {
					if (navigationPropertyName === "") {
						this.oRouter.navTo(sRouteName, {
							context: sPath,
							masterContext: sMasterContext
						}, false);
					} else {
						oModel.createBindingContext(navigationPropertyName, oBindingContext, null, function(bindingContext) {
							if (bindingContext) {
								sPath = bindingContext.getPath();
								if (sPath.substring(0, 1) === "/") {
									sPath = sPath.substring(1);
								}
							} else {
								sPath = "undefined";
							}
							// If the navigation is a 1-n, sPath would be "undefined" as this is not supported in Build
							if (sPath === "undefined") {
								that.oRouter.navTo(sRouteName);
							} else {
								that.oRouter.navTo(sRouteName, {
									context: sPath,
									masterContext: sMasterContext
								}, false);
							}
						});
					}
				} else {
					this.oRouter.navTo(sRouteName);
				}
				if (typeof fnPromiseResolve === "function") {
					fnPromiseResolve();
				}
			},
			onInit: function() {
				this.mBindingOptions = {};
				this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				this.oRouter.getTarget("day_template").attachDisplay(jQuery.proxy(this.handleRouteMatched, this));
			},
			/**
			 *@memberOf generated.app.controller.day_template
			 */
			addDayTemplateRow: function() {
				var formattedNum = this.getView().byId("myTimeAmount").getValue();
				//formattedNum = formattedNum.toFixed(2);
				//This code was generated by the layout editor.
				var objectTemplate = new sap.m.ObjectListItem({
					title: this.getView().byId("myWBSNo").getValue(),
					//text: "My PSP Element Dummy number",
					//press: [oView.getController()oController.productListTap, oController],
					attributes: [new sap.m.ObjectAttribute({
						//text: this.getView().byId("myWBSNo").getValue()
						text : "WBS Element number of my newly added element"
					})],
					firstStatus: new sap.m.ObjectStatus({
						state: "None"
					}),
					number: formattedNum,
					numberUnit: "ZE",
					numberState: "Success",
					type: "Active",
					selected: false,
					showMarker: false
				});
				//var table = this.getView().byId("tableId");
				var myList = this.getView().byId("dayTemplateList");
				myList.addItem(objectTemplate);
			},
			/**
			 *@memberOf generated.app.controller.day_template
			 */
			delDayTemplateRow: function() {
				//This code was generated by the layout editor.
				var myList = this.getView().byId("dayTemplateList");
				var rowItems = myList.getSelectedItems();
				rowItems.removeSelections();
				//rowItems.remove;
				for (var i = 0; i < rowItems.length; i++) {
					//var myRowItems = myRowItems[i];
					var context = rowItems.getBindingContext();
					var obj = context.getProperty("number", context);
					console.log(JSON.stringify(obj.Name));
					
					rowItems.removeSelections();
					
				}
			},
			/**
			 *@memberOf generated.app.controller.day_template
			 */
			selDTrow: function(e) {
				//This code was generated by the layout editor.
				// The actual Item
			    var oItem = e.getSource();
			    // The model that is bound to the item
			    var oContext = oItem.getBindingContext("text");
			    // A single property from the bound model
			    var sName = oContext.getProperty("id");
			    jQuery.sap.log.info("selected > " + sName);
			}
		});
//	}, /* bExport= */
//	true);
//		);