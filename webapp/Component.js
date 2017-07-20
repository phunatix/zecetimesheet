jQuery.sap.declare("hcm.mytimesheet.zecetimesheet.Component");
// use the load function for getting the optimized preload file if present
sap.ui.component.load({
	name: "hcm.mytimesheet",
	// Use the below URL to run the extended application when SAP-delivered application is deployed on cloud
	url: jQuery.sap.getModulePath("hcm.mytimesheet.zecetimesheet") + "/parent" // we use a URL relative to our own component
		// extension application is deployed with customer namespace
});
this.hcm.mytimesheet.Component.extend("hcm.mytimesheet.zecetimesheet.Component", {
	metadata: {
		version: "1.0",
		config: {
			"sap.ca.i18Nconfigs": {
				bundleName: "hcm.mytimesheet.zecetimesheet.i18n.i18n"
			}
		},
		fullScreenPageRoutes: {
			"S3": {
				"pattern": "",
				"view": "S3",
				"viewPath": "hcm.mytimesheet.view"
			},
			"S31": {
				"pattern": "detail/{context}",
				"view": "S31",
				"viewPath": "hcm.mytimesheet.view"
			},
			"dayTemplate": {
				"pattern": "",
				"view": "dayTemplate",
				"viewPath": "hcm.mytimesheet.zecetimesheet.view.day_template"
			}
		},
		customizing: {
			"sap.ui.controllerExtensions": {
				"hcm.mytimesheet.view.S3": {
					"controllerName": "hcm.mytimesheet.zecetimesheet.view.S3Custom"
				},
				"hcm.mytimesheet.view.S31": {
					"controllerName": "hcm.mytimesheet.zecetimesheet.view.S31Custom"
				},
				"hcm.mytimesheet.view.dayTemplate": {
					"controllerName": "hcm.mytimesheet.zecetimesheet.view.dayTemplate"
				}
			},
			"sap.ui.viewExtensions": {
				"hcm.mytimesheet.view.S31": {
					"extS31FormElementAccountingInfos": {
						"className": "sap.ui.core.Fragment",
						"fragmentName": "hcm.mytimesheet.zecetimesheet.view.S31_extS31FormElementAccountingInfosCustom",
						"type": "XML"
					}
				}
			}
		}
	} // new routing extensions
	/*
	init: function(){
		sap.ui.core.UIComponent.prototype.init.apply(this, arguments);	
		//this.getRouter().getTargets().addTarget("dayTemplate",{viewName:"day_template",viewPath:"hcm.mytimesheet.zecetimesheet.view",rootView:this.getAggregation("rootControl").getId()});
		//this.getRouter().addRoute({name:"newRoute",pattern:"newRoute",target:"newTarget"});
		this.getRouter.initialize();
    	/* all other method calls from original init() method 
	} */
});