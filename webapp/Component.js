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
		config: {},
		customizing: {
			
			"sap.ui.viewModifications": {
				"hcm.mytimesheet.view.S3": {
					"WEEKLY_CALENDAR": {
						"weeksPerRow": 2
					}
				}
			},
			
			"sap.ui.controllerExtensions": {
				"hcm.mytimesheet.view.S3": {
					"controllerName": "hcm.mytimesheet.zecetimesheet.view.S3Custom"
				},
				"hcm.mytimesheet.view.S31": {
					"controllerName": "hcm.mytimesheet.zecetimesheet.view.S31Custom"
				}
			}
		}
	}
});