jQuery.sap.require("sap.m.MessageBox");
sap.ui.controller("hcm.mytimesheet.zecetimesheet.view.S3Custom", {
	onInit: function() {
		sap.ca.scfld.md.controller.BaseFullscreenController.prototype.onInit.call(this);
		
		//this.oRouter.getTargets().addTarget("dayTemplate",{viewName:"day_template",viewPath:"hcm.mytimesheet.zecetimesheet.view",rootView:this.getAggregation("rootControl").getId()});
		//this.oRouter.addRoute({name:"newRoute",pattern:"newRoute",target:"newTarget"});
		
		this.oApplication = this.oApplicationFacade.oApplicationImplementation;
		this.oBundle = this.oApplicationFacade.oApplicationImplementation.getResourceBundle();
		this.oConfiguration = new hcm.mytimesheet.utils.InitialConfigHelper();
		this.oConfiguration.setResourceBundle(this.oBundle);
		if (!this.oService) {
			this.oService = new hcm.mytimesheet.Service();
		}
		var w = this.byId("WEEKLY_CALENDAR");
		// w.setWeeksPerRow(2); 
		//var c = new Date(this.byId("WEEKLY_CALENDAR").getCurrentDate());
		//console.log(c);
		//var f = new Date(c.getFullYear(), c.getMonth(), c.getDate() - this.getActualOffset(this.byId("WEEKLY_CALENDAR").getFirstDayOffset(), c.getDay()));
		//console.log(f); // var m = this.byId("TSM_WEEKLY").getModel("TSM_WEEKLY");
		// var I = this.oConfiguration.getInitialInfoModel();
		// var withTargetHours = I.WithTargetHours;
		//var w3 = m.getProperty("/days").length;
		//var w2 = m.getProperty("/days");
		//var targetHours = w2[0].targetHours;
		//		for (i = 0; i < w2.length; i++) {
		//			totalTargetHours += w[i].targetHours;
		//		}
		//sap.m.MessageBox.show(this.withTargetHours);
	
	},
	
	/* onAfterRendering: function() {
		var s = this;
		if (!this.oApplication.pernr) {
			try {
				var c = sap.ui.core.Component.getOwnerIdFor(this.getView());
				var S = sap.ui.component(c).getComponentData().startupParameters;
				this.oApplication.pernr = S.pernr[0];
				this.initializeView();
				this.initializeTable();
				this.updateData();
				
				sap.m.MessageBox.show([j]);
				
				
			} catch (o) {
				hcm.mytimesheet.utils.ConcurrentEmployment.getCEEnablement(this, function() {
					s.initializeView();
					s.initializeTable();
					s.updateData();
				});
			}
		}
		this.incompleteWeekWarning();
	}, */
	
	setWeekOverviews: function(n) {
		var m = this.oApplication.getModel("TSM_WEEKLY");
		var w = m.getProperty("/days");
		var c = new Date(this.byId("WEEKLY_CALENDAR").getCurrentDate());
		var f = new Date(c.getFullYear(), c.getMonth(), c.getDate() - this.getActualOffset(this.byId("WEEKLY_CALENDAR").getFirstDayOffset(), c.getDay()));
		var l = new Date(f.getFullYear(), f.getMonth(), f.getDate() + (7 * n - 1));
		m.setProperty("/weekStart", this.getDateStr(f));
		m.setProperty("/weekEnd", this.getDateStr(l));
		var a = f.getTime();
		if (f.getTimezoneOffset() > 0) {
			a = a + (f.getTimezoneOffset() * 60000);
		}
		var b, s, i, t, r, d;
		var e, g, h, j, k, o, p, q, u;
		h = [];
		h[0] = this.formatDateMMMDD(f);
		if (n === 1) {
			h[1] = this.formatDateMMMDD(l);
			g = this.oBundle.getText("WEEK_DATE_RANGE", [h[0], h[1]]);
			this.byId("MTS3_CURRENT_WEEK_INFO_1").setTitle(g);
			j = 0;
			k = 0;
			o = 0;
			t = 0;
			q = [];
			for (i = 0; i < w.length; i++) {
				j += w[i].targetHours;
				k += w[i].recordedHours;
				o += w[i].approvedHours;
				if (w[i].entries.length) {
					q = this.pushUniqueElements(w[i].entries, q);
				}
			}
			t = q.length;
			if (j !== 0) {
				j = this.formatTime(j.toFixed(2));
			}
			
			//console.log([j]);
			// sap.m.MessageBox.show([j]);
			
			if (k !== 0) {
				k = this.formatTime(k.toFixed(2));
			}
			if (o !== 0) {
				o = this.formatTime(o.toFixed(2));
			}
			if (k !== 0) {
				r = this.oBundle.getText("TOTAL_RECORDED_HOURS", [k]);
			} else {
				r = this.oBundle.getText("NO_RECORDING");
			}
			if (t === 1) {
				d = this.oBundle.getText("TOTAL_ASSIGNMENT");
			} else if (t === 0) {
				d = this.oBundle.getText("NO_ASSIGNMENT");
			} else {
				d = this.oBundle.getText("TOTAL_ASSIGNMENTS", [t]);
			}
			if (o === 0) {
				p = " ";
			} else {
				p = this.oBundle.getText("TOTAL_APPROVED_HOURS", [o]);
			}
			if (j !== 0 && this.withTargetHours) {
				e = this.oBundle.getText("TOTAL_TARGET_HOURS", [j]);
			} else {
				e = "  ";
			}
			this.byId("MTS3_CURRENT_WEEK_INFO_1").setNumber(r);
			this.byId("MTS3_TARGET_TIME_1").setText(e);
			this.byId("MTS3_TXT_ASSIGNMENTS_1").setText(d);
			this.byId("MTS3_TXT_APPROVED_HOURS_1").setText(p);
		} else {
			b = a + ((7 * 1 - 1) * 24 * 60 * 60 * 1000);
			b = new Date(b);
			s = a + 7 * 24 * 60 * 60 * 1000;
			s = new Date(s);
			f.setHours(0, 0, 0, 0);
			b.setHours(0, 0, 0, 0);
			s.setHours(0, 0, 0, 0);
			l.setHours(0, 0, 0, 0);
			h[1] = this.formatDateMMMDD(b);
			g = this.oBundle.getText("WEEK_DATE_RANGE", [h[0], h[1]]);
			this.byId("MTS3_CURRENT_WEEK_INFO_1").setTitle(g);
			h[2] = this.formatDateMMMDD(s);
			h[3] = this.formatDateMMMDD(l);
			g = this.oBundle.getText("WEEK_DATE_RANGE", [h[2], h[3]]);
			this.byId("MTS3_CURRENT_WEEK_INFO_2").setTitle(g);
			j = [0, 0];
			k = [0, 0];
			o = [0, 0];
			t = [0, 0];
			q = [];
			u = [];
			for (i = 0; i < w.length; i++) {
				if (w[i].date.getTime() < s.getTime()) {
					j[0] += w[i].targetHours;
					k[0] += w[i].recordedHours;
					o[0] += w[i].approvedHours;
					if (w[i].entries.length) {
						q = this.pushUniqueElements(w[i].entries, q);
					}
				} else {
					j[1] += w[i].targetHours;
					k[1] += w[i].recordedHours;
					o[1] += w[i].approvedHours;
					if (w[i].entries.length) {
						u = this.pushUniqueElements(w[i].entries, u);
					}
				}
			}
			t[0] = q.length;
			t[1] = u.length;
			for (i = 0; i < 2; i++) {
				if (j[i] !== 0) {
					j[i] = this.formatTime(j[i].toFixed(2));
				}
				if (k[i] !== 0) {
					k[i] = this.formatTime(k[i].toFixed(2));
				}
				if (o[i] !== 0) {
					o[i] = this.formatTime(o[i].toFixed(2));
				}
			}
			if (k[0] !== 0) {
				if (k[0] === "01:00") {
					r = this.oBundle.getText("TOTAL_RECORDED_HOUR", [k[0]]);
				} else {
					r = this.oBundle.getText("TOTAL_RECORDED_HOURS", [k[0]]);
				}
			} else {
				r = this.oBundle.getText("NO_RECORDING");
			}
			if (t[0] === 1) {
				d = this.oBundle.getText("TOTAL_ASSIGNMENT");
			} else if (t[0] === 0) {
				d = this.oBundle.getText("NO_ASSIGNMENT");
			} else {
				d = this.oBundle.getText("TOTAL_ASSIGNMENTS", [t[0]]);
			}
			if (o[0] === 0) {
				p = " ";
			} else {
				p = this.oBundle.getText("TOTAL_APPROVED_HOURS", [o[0]]);
			}
			if (j[0] !== 0 && this.withTargetHours) {
				e = this.oBundle.getText("TOTAL_TARGET_HOURS", [j[0]]);
			} else {
				e = "  ";
			}
			this.byId("MTS3_CURRENT_WEEK_INFO_1").setNumber(r);
			this.byId("MTS3_TARGET_TIME_1").setText(e);
			
			this.byId("MTS3_TXT_ASSIGNMENTS_1").setText(d);
			/* hook: hide approved hours */
			this.byId("MTS3_TXT_APPROVED_HOURS_1").setText(" ");
			
			if (k[1] !== 0) {
				if (k[1] === "01:00") {
					r = this.oBundle.getText("TOTAL_RECORDED_HOUR", [k[1]]);
				} else {
					r = this.oBundle.getText("TOTAL_RECORDED_HOURS", [k[1]]);
				}
			} else {
				r = this.oBundle.getText("NO_RECORDING");
			}
			if (t[1] === 1) {
				d = this.oBundle.getText("TOTAL_ASSIGNMENT");
			} else if (t[1] === 0) {
				d = this.oBundle.getText("NO_ASSIGNMENT");
			} else {
				d = this.oBundle.getText("TOTAL_ASSIGNMENTS", [t[1]]);
			}
			if (o[1] === 0) {
				p = " ";
			} else {
				p = this.oBundle.getText("TOTAL_APPROVED_HOURS", [o[1]]);
			}
			if (j[1] !== 0 && this.withTargetHours) {
				e = this.oBundle.getText("TOTAL_TARGET_HOURS", [j[1]]);
			} else {
				e = "  ";
			}
			this.byId("MTS3_CURRENT_WEEK_INFO_2").setNumber(r);
			this.byId("MTS3_TARGET_TIME_2").setText(e);
			this.byId("MTS3_TXT_ASSIGNMENTS_2").setText(d);
			/* hook: hide approved hours */
			this.byId("MTS3_TXT_APPROVED_HOURS_1").setText(" ");
			
		}
	},
	
	/* hook to remove status column */
	extHookAlterColumns: function(h) {
		//console.log("reached column extension hook");
		// Remove the status column
		 
		var e = this.entryListContents = this.byId("ENTRY_LIST_CONTENTS");
		e.getItems();
		e.removeColumn(4); 
		
		//e.getColumns()[4].setProperty("visible",false);
		//this.byId("ENTRY_LIST_CONTENTS").getColumns()[4].setVisible(false);
	},

	fetchTargetTimes: function(){
		var m = this.oApplication.getModel("TSM_WEEKLY");
		var w = m.getProperty("/days");
		var c = new Date(this.byId("WEEKLY_CALENDAR").getCurrentDate());
		var f = new Date(c.getFullYear(), c.getMonth(), c.getDate() - this.getActualOffset(this.byId("WEEKLY_CALENDAR").getFirstDayOffset(), c
			.getDay()));
		var n = 1;
		var l = new Date(f.getFullYear(), f.getMonth(), f.getDate() + (7 * n - 1));
		m.setProperty("/weekStart", this.getDateStr(f));
		m.setProperty("/weekEnd", this.getDateStr(l));
		var a = f.getTime();
		if (f.getTimezoneOffset() > 0) {
			a = a + (f.getTimezoneOffset() * 60000);
		}
		var resultSet = { };
		var s, i, t;
		var j, k, o, q, u;
		s = a + 7 * 24 * 60 * 60 * 1000;
		s = new Date(s);
		j = [0, 0];
		k = [0, 0];
		o = [0, 0];
		t = [0, 0];
		q = [];
		u = [];
		for (i = 0; i < w.length; i++) {
			if (w[i].date.getTime() < s.getTime()) {
				j[0] += w[i].targetHours;
				k[0] += w[i].recordedHours;
				o[0] += w[i].approvedHours;
				if (w[i].entries.length) {
					q = this.pushUniqueElements(w[i].entries, q);
				}
			} else {
				j[1] += w[i].targetHours;
				k[1] += w[i].recordedHours;
				o[1] += w[i].approvedHours;
				if (w[i].entries.length) {
					u = this.pushUniqueElements(w[i].entries, u);
				}
			}
		}
		t[0] = q.length;
		t[1] = u.length;
		
		resultSet = {
			recordedHours : j[0],
			targetHours : k[0]
		};
		return resultSet;
	},
		
	
	incompleteWeekWarning: function(e){
		var currentDate = new Date();
		var c = currentDate.getDay;
		var t;
		// t = this.fetchTargetTimes();
		if (c === 1 || c === 5){
			this.outOfRangeWarning(e);
		//sap.m.MessageBox.show("Puh nochmal glueck gehabt!");
		}else{
			//sap.m.MessageBox.show("Puh nochmal glueck gehabt!");
			//	t = this.fetchTargetTimes();
		
		return true;
		}
		//console.log( JSON.stringify(t));
	},
	
	outOfRangeWarning: function(e){
			var d = e.getParameter("didSelect");
			var s = new Date(e.getParameter("date"));
			var oneDay = 24 * 60 * 60 * 1000;
			//all in msec
			var currentDate = new Date();
			var diffDays = Math.round((s.getTime() - currentDate.getTime()) / oneDay);
			//var errorMsg = this.oApplicationFacade.getResourceBundle().getText("ECE_WARNING_PAST_RANGE");
			var errorMsg = this.oBundle.getText("ECE_WARNING_PAST_RANGE");
			this.selectDate(s, d);
			//  debug only: Today is not monday but user clicked on date before last week
			if (currentDate.getDay() !== 1 && diffDays < -7) {
				//sap.m.MessageBox.show(errorMsg);
				sap.m.MessageToast.show(errorMsg, {
					duration: 5000,
					width: "20em",
					at: "center center"
				});
			}
			// Today is Monday and user clicked on days before last week
			if (currentDate.getDay() === 1 && diffDays < -7) {
				//sap.m.MessageBox.show("Nur Vorwoche bebuchbar.");
				sap.m.MessageToast.show(errorMsg, {
					duration: 5000,
					width: "20em",
					at: "center center"
				});
			}
	},
	/* hook to warn closed week (FSD E34) */
	onSelect: function(e) {
			var d = e.getParameter("didSelect");
			var s = new Date(e.getParameter("date"));
			this.outOfRangeWarning(e);
			// var oneDay = 24 * 60 * 60 * 1000;
			// //all in msec
			// var currentDate = new Date();
			// var diffDays = Math.round((s.getTime() - currentDate.getTime()) / oneDay);
			// //var errorMsg = this.oApplicationFacade.getResourceBundle().getText("ECE_WARNING_PAST_RANGE");
			// var errorMsg = this.oBundle.getText("ECE_WARNING_PAST_RANGE");
			this.selectDate(s, d);
			//  debug only: Today is not monday but user clicked on date before last week
			// if (currentDate.getDay() !== 1 && diffDays < -7) {
			// 	//sap.m.MessageBox.show(errorMsg);
			// 	sap.m.MessageToast.show(errorMsg, {
			// 		duration: 5000,
			// 		width: "20em",
			// 		at: "center center"
			// 	});
			// }
			// // Today is Monday and user clicked on days before last week
			// if (currentDate.getDay() === 1 && diffDays < -7) {
			// 	//sap.m.MessageBox.show("Nur Vorwoche bebuchbar.");
			// 	sap.m.MessageToast.show(errorMsg, {
			// 		duration: 5000,
			// 		width: "20em",
			// 		at: "center center"
			// 	});
			// }
		},

	onValidateWeek: function(e){
		//var d = this.byId("WEEKLY_CALENDAR").getCurrentDate();
		
		var m = this.oApplication.getModel("TSM_WEEKLY");
		var w = m.getProperty("/days");
		var c = new Date(this.byId("WEEKLY_CALENDAR").getCurrentDate());
		var f = new Date(c.getFullYear(), c.getMonth(), c.getDate() - this.getActualOffset(this.byId("WEEKLY_CALENDAR").getFirstDayOffset(), c
			.getDay()));
		var n = 1;
		var l = new Date(f.getFullYear(), f.getMonth(), f.getDate() + (7 * n - 1));
		m.setProperty("/weekStart", this.getDateStr(f));
		m.setProperty("/weekEnd", this.getDateStr(l));
		var a = f.getTime();
		// this.oRouter.navTo("S31", {
		// 	context: d + "offset" + this.byId("WEEKLY_CALENDAR").getFirstDayOffset()
		// }, true);
		var f = new Date(c.getFullYear(), c.getMonth(), c.getDate() - this.getActualOffset(this.byId("WEEKLY_CALENDAR").getFirstDayOffset(), c
			.getDay()));		
		if (f.getTimezoneOffset() > 0) {
			a = a + (f.getTimezoneOffset() * 60000);
		}
		var b, s, i, t, r, d;
		var e, g, h, j, k, o, p, q, u;
		var w = m.getProperty("/days");
		s = a + 7 * 24 * 60 * 60 * 1000;
		s = new Date(s);
		j = [0, 0];
		k = [0, 0];
		o = [0, 0];
		t = [0, 0];
		q = [];
		u = [];
		for (i = 0; i < w.length; i++) {
			if (w[i].date.getTime() < s.getTime()) {
				j[0] += w[i].targetHours;
				k[0] += w[i].recordedHours;
				o[0] += w[i].approvedHours;
				if (w[i].entries.length) {
					q = this.pushUniqueElements(w[i].entries, q);
				}
			} else {
				j[1] += w[i].targetHours;
				k[1] += w[i].recordedHours;
				o[1] += w[i].approvedHours;
				if (w[i].entries.length) {
					u = this.pushUniqueElements(w[i].entries, u);
				}
			}
		}
		t[0] = q.length;
		t[1] = u.length;
		
		console.log("recorded Hours:" + k[0]);
		console.log("target hours:" + j[0]);
		// var checkTxt = ((j[0] < k[0]) ? "Bitte nicht mehr als 40 ZE verbuchen!" : " ");
		// checkTxt = (j[0] === k[0] ? this.oBundle.getText("ECE_MSG_VALIDATE_WEEK_COMPLETE") : this.oBundle.getText("ECE_MSG_VALIDATE_WEEK_NOCOMPLETE"));
		var checkTxt = "";
		if (j[0] === k[0]) {
			checkTxt = this.oBundle.getText("ECE_MSG_VALIDATE_WEEK_COMPLETE");
		}
		else if(j[0] < k[0]){
			checkTxt = "Bitte nicht mehr als 40 ZE verbuchen!";
		}
		else {
			checkTxt = this.oBundle.getText("ECE_MSG_VALIDATE_WEEK_NOCOMPLETE");
		}
		
		

		sap.m.MessageToast.show(checkTxt, {
			duration: 5000,
			width: "20em",
			at: "center center"
		});
	},
	
	getHeaderFooterOptions: function() {
		var t = this;
		var o = {
			sI18NFullscreenTitle: "TIMESHEET_TITLE",

			oEditBtn: {
				id: "QUICK_FILL_BTN",
				sI18nBtnTxt: "CREATE",
				onBtnPressed: function(e) {
					t.onAddNewEntry(e);
				}
			},
			buttonList: [{
				sId: "copyBtn",
				sI18nBtnTxt: "Copy",
				onBtnPressed: function(e) {
					t.onCopy(e);
				}
			}, {
				sId: "deleteBtn",
				sI18nBtnTxt: "DELETE",
				onBtnPressed: function(e) {
					t.onDelete(e);
				}
			}, {
				sId: "SUBMIT_BTN",
				sI18nBtnTxt: "SUBMIT",
				onBtnPressed: function(e) {
					t.onSubmit(e);
				}
			},
				{
				sId: "TEMPLATE_BTN",
				sI18nBtnTxt: "VALIDATE_WEEK",
				icon: "sap-icon://accept",
				//iconFirst: "true",
				onBtnPressed: function(e) {
					t.onValidateWeek(e);
				}
			}]
		};
		var m = new sap.ui.core.routing.HashChanger();
		var u = m.getHash();
		if (u.indexOf("Shell-runStandaloneApp") >= 0) {
			o.bSuppressBookmarkButton = true;
		}
		// if (this.extHookChangeHeaderFooterOptions) {
		// 	o = this.extHookChangeHeaderFooterOptions(o);
		// }
		return o;
	}

});