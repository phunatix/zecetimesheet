jQuery.sap.require("sap.m.MessageBox");
sap.ui.controller("hcm.mytimesheet.zecetimesheet.view.S3Custom", {
	onInit: function() {
		sap.ca.scfld.md.controller.BaseFullscreenController.prototype.onInit.call(this);
		this.oApplication = this.oApplicationFacade.oApplicationImplementation;
		this.oBundle = this.oApplicationFacade.oApplicationImplementation.getResourceBundle();
		this.oConfiguration = new hcm.mytimesheet.utils.InitialConfigHelper();
		this.oConfiguration.setResourceBundle(this.oBundle);
		if (!this.oService) {
			this.oService = new hcm.mytimesheet.Service();
		}
		var w = this.byId("WEEKLY_CALENDAR");
		w.setWeeksPerRow(1);
	},
	/*getTimeSheetCalendar: function(d) {
		console.log("reached calender extension point");
	},*/
	extHookAlterColumns: function(h) {
		//console.log("reached column extension hook");
		// Remove the status column
		var e = this.entryListContents = this.byId("ENTRY_LIST_CONTENTS");
		e.getItems();
		e.removeColumn(4); //e.getColumns()[4].setVisible(false);
		//this.byId("ENTRY_LIST_CONTENTS").getColumns()[4].setVisible(false);
	},
	// hook to comply with FSD E34
	onSelect: function(e) {
		var oneDay = 24 * 60 * 60 * 1000;
		// hours*minutes*seconds*milliseconds
		var currentDate = new Date();
		var s = new Date(e.getParameter("date"));
		var d = e.getParameter("didSelect");
		var errorMsg = this.oApplicationFacade.getResourceBundle().getText("ECE_WARNING_PAST_RANGE");
		//var errorMsg = "Verbuchung ausserhalb des erlaubten Zeitraumes (bis zu 7 Tage rückwirkend).";
		this.selectDate(s, d);
		var diffDays = Math.round((s.getTime() - currentDate.getTime()) / oneDay);
		// console.log(diffDays);
		// if today is not monday and the selected date range 
		//if( (diffDays >= 8 ) && (diffDays <= 1 ) ) 
		if (currentDate.getDay() !== 1 && diffDays < -7) {
			sap.m.MessageBox.show(errorMsg);
		}
	}
	/* hook to comply with FSD_E29
	loadList: function() {
		var m = this.oApplication.getModel("TSM_WEEKLY");
		for (var i = 0; i < m.length; i++) {
			console.log(m[i].mainItem);
		}
	},
	
	extHookChangeHeaderFooterOptions: function(o) {
		o.push({
			buttonList: [{
				sId: "checkBtn",
				sI18nBtnTxt: "Check Week",
				onBtnPressed: function(e) {
					//t.checkWeekEntries(e);
					console.log("Fire Check button");
				}
			}]
		});
	}
	*/
});