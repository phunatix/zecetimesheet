jQuery.sap.require("sap.ui.core.mvc.Controller");
jQuery.sap.require("sap.m.MessageToast");
jQuery.sap.require("sap.ca.scfld.md.controller.BaseFullscreenController");
jQuery.sap.require("sap.ui.model.odata.datajs");
jQuery.sap.require("hcm.mytimesheet.model.TimeEntry");
jQuery.sap.require("hcm.mytimesheet.utils.DataManager");
jQuery.sap.require("hcm.mytimesheet.utils.ConcurrentEmployment");
jQuery.sap.require("sap.ca.ui.model.format.DateFormat");
jQuery.sap.require("sap.ca.ui.model.type.Number");
sap.ui.controller("hcm.mytimesheet.zecetimesheet.view.S31Custom", {
	//    extHookChangeHeaderFooterOptions: null,
	//    extHookChangeObjectBeforePost: null,
	//    onInit: function () {
	//        sap.ca.scfld.md.controller.BaseFullscreenController.prototype.onInit.call(this);
	//        this.RESULTS_TOP = 30;
	//        this.top = this.RESULTS_TOP;
	//        this.localSkip = 0;
	//        this.remoteSkip = 0;
	//        this.MODEL_SIZE_LIMIT = 1000;
	//        this.gv_fieldRelated = "";
	//        this.searchField_begDa = "";
	//        this.searchField_endDa = "";
	//        this.pagingEnabled = false;
	//        this.localTypeList = [];
	//        this.favoriteDeletedIds = [];
	//        this.remoteTypeList = [];
	//        this.resultsTotalCount = 0;
	//        this.remoteSearchPhrase = "";
	//        this.favoriteSelected = false;
	//        this.worklistSelectedObj = {};
	//        this.worklistItemSelected = false;
	//        this.continueSearchOnServerActive = false;
	//        this.initialize();
	//        this.entry = new hcm.mytimesheet.model.TimeEntry(0, "", false, true);
	//        var s = this;
	//        this.oRouter.attachRouteMatched(function (e) {
	//            if (e.getParameter("name") === "S31") {
	//                if (s.oApplication.pernr) {
	//                    s.initializeView(e.getParameter("arguments").context);
	//                } else {
	//                    s.context = e.getParameter("arguments").context;
	//                }
	//            }
	//        }, this);
	//    },
	    onAfterRendering: function () {
	        var s = this;
	        if (!this.oApplication.pernr) {
	            hcm.mytimesheet.utils.ConcurrentEmployment.getCEEnablement(this, function () {
	                if (s.context) {
	                    s.initializeView(s.context);
	                }
	            });
	        }
	        this.ngoGetCurrentWeek();
	    },
	    // initializeView: function (c) {
	    //     this.noneText = "(" + this.oBundle.getText("None") + ")";
	    //     if (!this.oApplication.getModel("TSM_WEEKLY")) {
	    //         var a = new Date();
	    //         this.setInitialInfoModelData(a);
	    //     }
	    //     this.getHderFooterOptions();
	    //     var b = new sap.ui.model.json.JSONModel();
	    //     this.oApplication.setModel(b, "createScreenModel");
	    //     this.worklistItemSelected = false;
	    //     this.worklistSelectedObj = {};
	    //     this.entry = new hcm.mytimesheet.model.TimeEntry(0, "", false, true);
	    //     var f = parseInt(c[c.indexOf("offset") + 6], 10);
	    //     this.byId("weeklyCalendar").setFirstDayOffset(f);
	    //     var d = decodeURIComponent(c), n;
	    //     d = d.replace("offset", "");
	    //     d = d.slice(0, -1);
	    //     var w = this.oApplication.getModel("TSM_WEEKLY");
	    //     var e = new Date(d);
	    //     if (sap.ui.Device.system.phone) {
	    //         this.byId("weeklyCalendar").setWeeksPerRow(1);
	    //         n = 6;
	    //     } else {
	    //         n = 13;
	    //     }
	    //     var g = new Date(e.getFullYear(), e.getMonth(), e.getDate() - this.getActualOffset(f, e.getDay()));
	    //     var l = new Date(g.getFullYear(), g.getMonth(), g.getDate() + n);
	    //     if (w.getData().createdFromS31) {
	    //         this.clockEntry = w.getProperty("/clockEntry");
	    //         b.setProperty("/start", this.getDateStr(g));
	    //         b.setProperty("/weekStart", this.getDateStr(g));
	    //         b.setProperty("/weekEnd", this.getDateStr(l));
	    //         w.setProperty("/weekStart", this.getDateStr(g));
	    //         w.setProperty("/weekEnd", this.getDateStr(l));
	    //     } else {
	    //         b.setProperty("/start", this.getDateStr(g));
	    //         b.setProperty("/weekStart", this.getDateStr(g));
	    //         b.setProperty("/weekEnd", this.getDateStr(l));
	    //         this.clockEntry = w.getProperty("/clockEntry");
	    //         this.releaseFuture = w.getProperty("/releaseFuture");
	    //         this.releaseAllowed = w.getProperty("/releaseAllowed");
	    //         this.FavoriteAvailable = w.getProperty("/favoriteAvailable");
	    //     }
	    //     b.setProperty("/clockEntry", this.clockEntry);
	    //     b.setProperty("/decimalTimeEntryVisible", !this.clockEntry);
	    //     b.setProperty("/editButtonEnabled", false);
	    //     b.setProperty("/updateButtonEnabled", false);
	    //     this.initView();
	    //     this.getProfileFields();
	    //     this.getWorkListCollection();
	    //     this.getFavoritesCollection();
	    //     this.getView().setModel(b);
	    // },
	    initialize: function () {
	        if (!this.oApplication) {
	            this.oApplication = this.oApplicationFacade.oApplicationImplementation;
	            this.oConfiguration = new hcm.mytimesheet.utils.InitialConfigHelper();
	            this.oService = new hcm.mytimesheet.Service();
	            this.oConnectionManager = this.oApplication.oConnectionManager;
	            this.oBundle = this.oApplicationFacade.oApplicationImplementation.getResourceBundle();
	            this.oConfiguration.setResourceBundle(this.oBundle);
	        }
	    },
	//    setInitialInfoModelData: function (c) {
	//        var m = new sap.ui.model.json.JSONModel();
	//        var n = 13;
	//        if (sap.ui.Device.system.phone) {
	//            n = 6;
	//            this.byId("weeklyCalendar").setWeeksPerRow(1);
	//        }
	//        var f = c.getTime() - c.getDay() * 24 * 60 * 60 * 1000;
	//        var l = f + n * 24 * 60 * 60 * 1000;
	//        var a = new Date(f);
	//        var b = new Date(l);
	//        this.oApplication.setModel(m, "TSM_WEEKLY");
	//        this.oService.getInitialInfos(this, this.oApplication.pernr, this.getDateStr(c), this.getDateStr(c));
	//        m.setProperty("/showSubmit", false);
	//        m.setProperty("/selected", this.getDateStr(c));
	//        m.setProperty("/selectedDate", c);
	//        m.setProperty("/year", c.getFullYear());
	//        m.setProperty("/start", this.getDateStr(a));
	//        m.setProperty("/weekStart", this.getDateStr(a));
	//        m.setProperty("/weekEnd", this.getDateStr(b));
	//        m.setProperty("/createdFromS31", true);
	//        var I = this.oConfiguration.getInitialInfoModel();
	//        this.releaseAllowed = I.ReleaseDirectly === "TRUE";
	//        m.setProperty("/releaseAllowed", this.releaseAllowed);
	//        m.setProperty("/releaseFuture", I.ReleaseFuture);
	//        this.releaseFuture = I.ReleaseFuture;
	//        m.setProperty("/favoriteAvailable", I.FavoriteAvailable);
	//        this.FavoriteAvailable = I.FavoriteAvailable;
	//        this.clockEntry = I.ClockEntry === "TRUE";
	//        m.setProperty("/clockEntry", this.clockEntry);
	//        m.setProperty("/decimalTimeEntryVisible", !this.clockEntry);
	//        return m;
	//    },
	//    initView: function () {
	//        var s = this.oApplication.getModel("S31modelexch");
	//        var w = this.oApplication.getModel("TSM_WEEKLY");
	//        this.byId("timeAssignment").setValue("");
	//        var c = this.oApplication.getModel("createScreenModel");
	//        var d = [
	//            "Sun",
	//            "Mon",
	//            "Tue",
	//            "Wed",
	//            "Thu",
	//            "Fri",
	//            "Sat"
	//        ];
	//        if (!s) {
	//            s = new sap.ui.model.json.JSONModel();
	//            s.setProperty("/selectedDates", w.getProperty("/selectedDate"));
	//            s.setProperty("/editentryview", false);
	//            this.oApplication.setModel(s, "S31modelexch");
	//        }
	//        if (!this.FavoriteAvailable) {
	//            this.byId("timeAssignmentLbl").setText(this.oBundle.getText("SELECT_WORKLIST"));
	//        }
	//        var a = this.byId("weeklyCalendar");
	//        a.setEnableMultiselection(true);
	//        a.unselectAllDates();
	//        if (!s.getProperty("/editentryview")) {
	//            a.setEnableMultiselection(true);
	//            a.toggleDatesSelection(s.getData().selectedDates, true);
	//            if (s.getProperty("/copySelected")) {
	//                this.edit_entry = false;
	//                this.edit_entry_data = this.clone(s.getData().editeddata);
	//                this.byId("accountingInfoPanel").setExpanded(true);
	//                this.editdatafroms3 = s.getData().editeddata;
	//                this.entry = this.editdatafroms3.entry;
	//                this.entry.time = sap.ca.ui.model.format.NumberFormat.getInstance({ style: "standard" }).format(this.entry.time);
	//                c.setProperty("/entry", this.entry);
	//                if (this.isClockEntry()) {
	//                    this.byId("startTime").setValue(this.entry.startTime);
	//                    this.byId("endTime").setValue(this.entry.endTime);
	//                } else {
	//                    this.byId("decimalTimeEntryValue").setValue(this.entry.time);
	//                }
	//                if (this.entry.hasNotes) {
	//                    this.byId("S31TextArea").setValue(this.entry.notes);
	//                }
	//            } else {
	//                this.edit_entry = false;
	//                this.byId("decimalTimeEntryValue").setValue("");
	//                this.byId("startTime").setValue("");
	//                this.byId("endTime").setValue("");
	//                this.byId("timeAssignment").setValue("");
	//            }
	//        } else {
	//            a.toggleDatesSelection(s.getData().selectedDates, true);
	//            this.edit_entry = true;
	//            this.edit_entry_data = this.clone(s.getData().editeddata);
	//            this.byId("accountingInfoPanel").setExpanded(true);
	//            a.setEnableMultiselection(true);
	//            this.editdatafroms3 = s.getData().editeddata;
	//            this.entry = this.editdatafroms3.entry;
	//            this.entry.time = sap.ca.ui.model.format.NumberFormat.getInstance({ style: "standard" }).format(this.entry.time);
	//            c.setProperty("/entry", this.entry);
	//            if (this.isClockEntry()) {
	//                if (this.entry.startTime !== this.entry.endTime) {
	//                    this.byId("startTime").setValue(this.entry.startTime);
	//                    this.byId("endTime").setValue(this.entry.endTime);
	//                } else {
	//                    this.byId("ClkTimeDecimalTimeEntryValue").setValue(this.entry.time);
	//                }
	//            } else {
	//                this.byId("decimalTimeEntryValue").setValue(this.entry.time);
	//            }
	//            if (this.entry.hasNotes) {
	//                this.byId("S31TextArea").setValue(this.entry.notes);
	//            }
	//        }
	//        if (a.getSelectedDates().length > 1) {
	//            this.byId("createPanel").setHeaderText(this.oBundle.getText("SUBMIT_HEADER_TEXT", [
	//                this.formatDateMMMDD(new Date(a.getSelectedDates()[0])),
	//                a.getSelectedDates().length - 1
	//            ]));
	//        } else if (a.getSelectedDates().length === 1) {
	//            this.byId("createPanel").setHeaderText(this.oBundle.getText("SUBMIT_HEADER_TEXT_SINGLE", [this.formatDateMMMDD(new Date(a.getSelectedDates()[0]))]));
	//        } else {
	//            this.byId("createPanel").setHeaderText(this.oBundle.getText("ENTRY_DETAILS"));
	//            this.setBtnEnabled("SUBMIT_BTN", false);
	//        }
	//        if (s.getData().pageData) {
	//            var l = s.getData().pageData.legendforS31;
	//            a.toggleDatesType(l.yellow, sap.me.CalendarEventType.Type04, true);
	//            a.toggleDatesType(l.green, sap.me.CalendarEventType.Type01, true);
	//            a.toggleDatesType(l.grey, sap.me.CalendarEventType.Type00, true);
	//            a.toggleDatesType(l.red, sap.me.CalendarEventType.Type07, true);
	//            a.toggleDatesType(l.rejected, sap.me.CalendarEventType.Type06, true);
	//        }
	//    },
	//    clone: function (o) {
	//        if (o === null || typeof o !== "object") {
	//            return o;
	//        }
	//        if (o instanceof Object) {
	//            var c = {};
	//            var a = null;
	//            for (a in o) {
	//                if (o.hasOwnProperty(a)) {
	//                    c[a] = this.clone(o[a]);
	//                }
	//            }
	//            return c;
	//        }
	//        throw new Error("Unable to copy obj! Its type isn't supported.");
	//    },
	//    formatDateMMMDD: function (d) {
	//        var m = d.getMonth();
	//        var a = d.getDate();
	//        var b = this.oBundle.getText("MONTH_" + m) + " " + a;
	//        return b;
	//    },
	//    getActualOffset: function (f, c) {
	//        var a = 7;
	//        if (f > c) {
	//            return c + a - f;
	//        } else {
	//            return c - f;
	//        }
	//    },
	//    validate: function () {
	//        if (this.favoriteSelected) {
	//            this.byId("timeAssignment").setValue("");
	//        }
	//        this.byId("ClkTimeDecimalTimeEntryValue").setValue("");
	//        this.byId("ClkTimeDecimalTimeEntryValue").setEnabled(false);
	//        this.dateTimeModified = true;
	//        this.validateSaveBtnVisibility();
	//    },
	//    check_for_changed_data: function () {
	//        var c = this.byId("weeklyCalendar");
	//        var s = c.getSelectedDates();
	//        var d = null;
	//        if (this.isClockEntry()) {
	//            var a = this.byId("startTime").getValue();
	//            var e = this.byId("endTime").getValue();
	//        } else {
	//            d = this.byId("decimalTimeEntryValue").getValue();
	//        }
	//        var n = this.byId("S31TextArea").getValue();
	//        var b = this.byId("COST_ASSIGNMENT_RECENTLY_USED_LIST").getValue();
	//        if (this.edit_entry) {
	//            var f = this.edit_entry_data;
	//            var g = this.getDateStr(new Date(s[0]));
	//            var o = f.pageData.days[f.dayIndex].dateStr;
	//            var h = f.entry.notes;
	//            var j = f.entry.mainName;
	//            var k = f.entry.mainCode;
	//            var l = this.getView().getModel("fordynamictypes").getData().types;
	//            var m;
	//            var p;
	//            var q;
	//            var r, t;
	//            var u, v;
	//            if (this.isClockEntry()) {
	//                var w = f.entry.startTime;
	//                var x = f.entry.endTime;
	//                if (w !== a || x !== e)
	//                    return true;
	//            } else {
	//                var y = f.entry.time;
	//                if (y !== d)
	//                    return true;
	//            }
	//            for (u = 0; u < l.length; u++) {
	//                m = l[u].fieldName;
	//                if (m === j) {
	//                    q = l[u].value;
	//                    r = l[u].value.indexOf("(");
	//                    t = l[u].value.indexOf(")");
	//                    p = l[u].value.substring(r + 1, t);
	//                    if (p !== k) {
	//                        return true;
	//                    }
	//                }
	//                for (v = 0; f.entry.childItems && f.entry.childItems[v]; v++) {
	//                    if (f.entry.childNames[v] === m) {
	//                        q = l[u].value;
	//                        r = l[u].value.indexOf("(");
	//                        t = l[u].value.indexOf(")");
	//                        p = l[u].value.substring(r + 1, t);
	//                        if (f.entry.childCodes[v] !== p) {
	//                            return true;
	//                        }
	//                    }
	//                }
	//            }
	//            if (s.length > 1 || o !== g || h !== n) {
	//                return true;
	//            }
	//            return false;
	//        } else {
	//            var z = false;
	//            var A = this.getView().getModel("fordynamictypes").getData().types;
	//            if (A) {
	//                for (var i = 0; i < A.length; i++) {
	//                    if (A[i].value.trim()) {
	//                        z = true;
	//                    }
	//                }
	//            }
	//            if (this.isClockEntry()) {
	//                if (s.length !== 0 || a !== "" || e !== "" || b !== "" || z)
	//                    return true;
	//            } else {
	//                if (s.length !== 0 || d !== "0" && d !== "" || b !== "" || z)
	//                    return true;
	//            }
	//            return false;
	//        }
	//    },
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
	    onTapOnDate: function (e) {
	        var d = e.getSource().getSelectedDates();
	        var n = d.length;
	        if (this.edit_entry) {
	            var a = sap.ui.core.format.DateFormat.getDateInstance({ pattern: "YYYYMMdd" });
	            var b = a.parse(this.edit_entry_data.pageData.days[this.edit_entry_data.dayIndex].dateStr);
	            for (var i = 0; i < n; i++) {
	                var c = new Date(d[i]);
	                if (!(c.getFullYear() === b.getFullYear() && c.getMonth() === b.getMonth() && c.getDate() === b.getDate())) {
	                    e.getSource().toggleDatesSelection([c.toDateString()], false);
	                }
	            }
	            this.validateSaveBtnVisibility(e);
	            return;
	        }
	        this.validateSaveBtnVisibility(e);
	        this.outOfRangeWarning(e);
	        if (n > 1) {
	            this.byId("createPanel").setHeaderText(this.oBundle.getText("SUBMIT_HEADER_TEXT", [
	                this.formatDateMMMDD(new Date(d[0])),
	                n - 1
	            ]));
	        } else if (n === 1) {
	            this.byId("createPanel").setHeaderText(this.oBundle.getText("SUBMIT_HEADER_TEXT_SINGLE", [this.formatDateMMMDD(new Date(d[0]))]));
	        } else if (n === 0) {
	            this.byId("createPanel").setHeaderText(this.oBundle.getText("ENTRY_DETAILS"));
	        }
	    },
	    validateSaveBtnVisibility: function () {
	        var t = false;
	        if (this.isClockEntry()) {
	            var s = this.byId("startTime").getValue();
	            var e = this.byId("endTime").getValue();
	            var c = this.byId("ClkTimeDecimalTimeEntryValue").getValue();
	            if (c !== "0" && c !== "") {
	                this.clkTimeDurationFilled = true;
	            } else {
	                this.clkTimeDurationFilled = false;
	            }
	            if (s && e && s !== e || this.clkTimeDurationFilled) {
	                t = true;
	            } else {
	                t = false;
	            }
	        } else {
	            var d = this.byId("decimalTimeEntryValue").getValue();
	            if (d !== "0" && d !== "") {
	                if (this._isValidDecimalNumber(d)) {
	                    t = true;
	                } else {
	                    t = false;
	                }
	            } else {
	                t = false;
	            }
	        }
	        var a = this.byId("weeklyCalendar").getSelectedDates().length;
	        var f = false;
	        var b = this.getView().getModel().getData().types;
	        var errMsg = "";
	        if (this.worklistItemSelected) {
	            f = true;
	        } else if (b) {
	            for (var i = 0; i < b.length; i++) {
	                if (b[i].value.trim() || b[i].valueStateText.trim()) {
	                    f = true;
	                    break;
	                }
	            }
	        }
	        if (f && a && t) {
	            this.setBtnEnabled("SUBMIT_BTN", true);
	            this.byId("S31TextArea").setValue("");
	            //errMsg = " ";
	            
	           /* extension hook: check if time is full or 0.5 units */ 
	           var d = this.byId("decimalTimeEntryValue").getValue();
	           if (this._isValidDecimalNumber(d)) {
	           		// ECE condition: time must be full or half
	           		if ((parseFloat(d) % 0.5) !== 0 ){
	           			// showing the warning for invalid hours
	           			errMsg = this.oBundle.getText("ECE_NON_VALID_TIME_DURATION");
	           		}
	           		// ECE condition: not more than 8 units per day
	           		if(d > 8){
	        			// warning message and locking the submission button
	        			errMsg += "Bitte nicht mehr als 8 ZE verbuchen";
	           			
	        		}
	        		if (errMsg.length > 1){
	        		sap.m.MessageToast.show(errMsg);
	        		this.byId("S31TextArea").setValue(errMsg);
	        		// disable posting until actions taken
	        		this.setBtnEnabled("SUBMIT_BTN", false);
	        		}	
	        	}
	            /* extension hook end */ 
	        } else {
	            this.setBtnEnabled("SUBMIT_BTN", false);
	        }
	    },
	//    suggestionHelpChange: function (e) {
	//        e.getSource().setValue("");
	//        this.validateSaveBtnVisibility(e);
	//    },
	//    onFavoriteItemSelection: function (e) {
	//        this.validateSaveBtnVisibility(e);
	//    },
	//    onFavValueChange: function () {
	//        this.byId("timeAssignment").setValue("");
	//    },
	//    onManualItemSelection: function (e) {
	//        this.validateSaveBtnVisibility(e);
	//    },
	//    timeAssignmentLiveChange: function () {
	//        this.byId("timeAssignment").setValue("");
	//    },
	//    manualHelpChange: function (e) {
	//        if (this.favoriteSelected) {
	//            this.byId("timeAssignment").setValue("");
	//        }
	//        e.getSource().setValueStateText(e.getSource().getValue());
	//        e.getSource().setValue(e.getSource().getValue());
	//        this.validateSaveBtnVisibility(e);
	//    },
	    // onDurationValueChange: function (e) {
	    // 	var timeAssign = this.byId("decimalTimeEntryValue").getValue();
	    // 	if (timeAssign !== "undefined") {
	    // 			sap.m.MessageToast.show("You changed the duration!");	
	    // 	}
	    //     this.validateSaveBtnVisibility(e);
	    // },
	    onDecimalTimeValueChange: function (e) {
	        if (this.favoriteSelected) {
	            this.byId("timeAssignment").setValue("");
	        }
	        this.dateTimeModified = true;
	        var d;
	        if (!this.isClockEntry()) {
	            d = this.byId("decimalTimeEntryValue").getValue();
	        } else {
	            d = this.byId("ClkTimeDecimalTimeEntryValue").getValue();
	        }
	        if (this._isValidDecimalNumber(d)) {
	            this.validateSaveBtnVisibility(e);
	        } else {
	            this.setBtnEnabled("SUBMIT_BTN", false);
	        }
	    },
	    _isValidDecimalNumber: function (n) {
	        var a = n.toString();
	        var d = a.indexOf(".");
	        var c = a.indexOf(",");
	        if (d > 0 && c > 0) {
	            return false;
	        }
	        var s = d;
	        if (s < 0) {
	            s = a.indexOf(",");
	        }
	        var b = "0123456789";
	        var i;
	        var f;
	        var e = 0;
	        var h = false;
	        if (s === -1) {
	            i = a;
	            f = "";
	        } else {
	            i = a.slice(0, s);
	            f = a.slice(s + 1, a.length);
	        }
	        if (i.length > 5) {
	            return false;
	        }
	        for (e = 0; e < i.length; e++) {
	            if (b.indexOf(i[e]) === -1) {
	                return false;
	            } else {
	                h = true;
	            }
	        }
	        if (f.length > 2) {
	            return false;
	        }
	        for (e = 0; e < f.length; e++) {
	            if (b.indexOf(f[e]) === -1) {
	                return false;
	            } else {
	                h = true;
	            }
	        }
	        if (h === false) {
	            return false;
	        }
	        return true;
	    },
	//    onNavButton: function () {
	//        var c = this.byId("weeklyCalendar");
	//        var s = c.getCurrentDate();
	//        var d = s;
	//        s = d + "offset" + c.getFirstDayOffset();
	//        var m = new sap.ui.model.json.JSONModel();
	//        m.setProperty("/currentDate", new Date(d));
	//        this.oApplication.setModel(m, "S3exchangeModel");
	//        this.cleanUpOnBack();
	//        delete this.entry;
	//        this.oRouter.navTo("S3", { context: s }, true);
	//    },
	//    cleanUpOnBack: function () {
	//        this.byId("timeAssignment").setValue("");
	//        this.byId("decimalTimeEntryValue").setValue("");
	//        this.byId("startTime").setValue("");
	//        this.byId("endTime").setValue("");
	//        delete this.worklistSelectedObj;
	//        this.worklistItemSelected = false;
	//        this.byId("weeklyCalendar").setDisabledWeekDays([]);
	//        this.byId("weeklyCalendar").unselectAllDates();
	//        this.byId("S31TextArea").setValue("");
	//        this.byId("ClkTimeDecimalTimeEntryValue").setValue("");
	//        var t = this.oApplication.getModel("accountingInfoModel").getData().types;
	//        for (var i = 0; i < t.length; i++) {
	//            if (t[i].value !== "" || t[i].valueStateText !== "") {
	//                t[i].value = "";
	//                t[i].valueStateText = "";
	//            }
	//        }
	//        this.byId("accountingInfoPanel").setExpanded(false);
	//        this.getView().getModel().setProperty("/types", t);
	//        this.oApplication.getModel("accountingInfoModel").setProperty("/types", t);
	//    },
	//    getDateStr: function (d) {
	//        return "" + d.getFullYear() + ("" + (d.getMonth() + 101)).substring(1) + ("" + (d.getDate() + 100)).substring(1);
	//    },
	//    getDateTimeStr: function (d) {
	//        return "" + d.getFullYear() + "-" + ("" + (d.getMonth() + 101)).substring(1) + "-" + ("" + (d.getDate() + 100)).substring(1) + "T00:00:00";
	//    },
	//    getValueHelpCollection: function (o) {
	//        var s = this;
	//        var c = 0;
	//        var d = o && o.fieldName;
	//        if (this.remoteSearchPhrase) {
	//            c = this.remoteSkip;
	//        } else {
	//            c = this.localSkip;
	//        }
	//        var l = ";;";
	//        var e = "";
	//        var f = this.getView().getModel("accountingInfoModel").getData().types.length;
	//        for (var i = 0; i < f; i++) {
	//            var g = this.getView().getModel("accountingInfoModel").getData().types[i].valueStateText;
	//            var h = this.getView().getModel("accountingInfoModel").getData().types[i].fieldName;
	//            if (g.length !== 0 && h !== d) {
	//                var k = h + "=" + g;
	//                if (e) {
	//                    e += l + k;
	//                } else {
	//                    e += k;
	//                }
	//            }
	//        }
	//        this.gv_fieldRelated = e;
	//        var m = this.byId("weeklyCalendar");
	//        var n = m.getSelectedDates();
	//        if (n[0]) {
	//            var p = n.length;
	//            this.searchField_begDa = this.getDateStr(new Date(n[0]));
	//            this.searchField_endDa = this.getDateStr(new Date(n[p - 1]));
	//        } else {
	//            var M = this.oApplication.getModel("TSM_WEEKLY");
	//            this.searchField_begDa = M.getProperty("/weekStart");
	//            this.searchField_endDa = M.getProperty("/weekEnd");
	//        }
	//        this.oService.getValueHelpList(this.oApplication.pernr, d || this.fieldName, this.top, c, this.remoteSearchPhrase, this.gv_fieldRelated, this.searchField_begDa, this.searchField_endDa, function (q) {
	//            s.remoteSearchActive = false;
	//            var t = [];
	//            if (s.remoteSearch()) {
	//                t = s.localTypeList;
	//                s.remoteSearchActive = true;
	//                s.lastRemoteSearchPhrase = s.remoteSearchPhrase;
	//            } else if (c != 0) {
	//                t = s.localTypeList;
	//            }
	//            if (q.length > 0 && t.length === 0) {
	//                t.push({
	//                    fieldValueId: s.noneText,
	//                    fieldValue: s.noneText,
	//                    fieldId: ""
	//                });
	//            }
	//            var r;
	//            for (var i = 0; i < q.length; i++) {
	//                r = 1;
	//                for (var j = 0; j < t.length; j++) {
	//                    var C = "(" + q[i].FieldId + ")";
	//                    if (t[j].fieldValue === q[i].FieldValue && t[j].fieldId === C) {
	//                        r = 0;
	//                        break;
	//                    }
	//                }
	//                if (r === 1) {
	//                    t.push({
	//                        fieldValue: q[i].FieldValue,
	//                        fieldId: "(" + q[i].FieldId + ")",
	//                        fieldValueId: q[i].FieldValue + " (" + q[i].FieldId + ")"
	//                    });
	//                }
	//            }
	//            function u(v) {
	//                var w = 1;
	//                if (v[0] === "-") {
	//                    w = -1;
	//                    v = v.substr(1);
	//                }
	//                return function (a, b) {
	//                    var x = a[v] < b[v] ? -1 : a[v] > b[v] ? 1 : 0;
	//                    return x * w;
	//                };
	//            }
	//            t.sort(u("fieldId"));
	//            s.oApplication.getModel("createScreenModel").setProperty("/" + (o && o.fieldName), t);
	//            s.oApplication.getModel("createScreenModel").updateBindings();
	//            if (s.remoteSearch()) {
	//                s.remoteResultsLength = q.length;
	//                s.checkRemotePaging(s.remoteResultsLength);
	//            } else {
	//                s.localResultsLength = q.length;
	//                s.checkLocalPaging(s.localResultsLength, o && o.fieldName);
	//            }
	//        });
	//    },
	//    remoteSearch: function () {
	//        if ("remoteSearchPhrase" in this) {
	//            if (this.remoteSearchPhrase) {
	//                return this.remoteSearchPhrase;
	//            }
	//        }
	//        return false;
	//    },
	//    checkLocalPaging: function (r) {
	//        var t = this.typeListControl.getItems();
	//        var a = t.length;
	//        if (a === 0 || a >= this.MODEL_SIZE_LIMIT) {
	//            return;
	//        }
	//        if (t) {
	//            if (t[a - 1].getTitle() === this.oBundle.getText("TAP_TO_LOAD_MORE_LOADING")) {
	//                this.typeListControl.removeItem(t[a - 1]);
	//            }
	//        }
	//        if (r < this.top) {
	//            if (t[a - 1].getTitle() === this.oBundle.getText("TAP_TO_LOAD_MORE") || t[a - 1].getTitle() === this.oBundle.getText("CONTINUE_SEARCH_ON_SERVER")) {
	//                this.typeListControl.removeItem(t[a - 1]);
	//            }
	//        } else if (r >= this.top) {
	//            if (t[a - 1].getTitle() === this.oBundle.getText("TAP_TO_LOAD_MORE")) {
	//                return;
	//            } else {
	//                if (t[a - 1].getTitle() === this.oBundle.getText("CONTINUE_SEARCH_ON_SERVER")) {
	//                    t[a - 1].setTitle(this.oBundle.getText("TAP_TO_LOAD_MORE"));
	//                } else {
	//                    this.loadMoreItem = new sap.m.StandardListItem({
	//                        title: this.oBundle.getText("TAP_TO_LOAD_MORE"),
	//                        active: true
	//                    });
	//                    this.typeListControl.addItem(this.loadMoreItem);
	//                }
	//            }
	//        }
	//    },
	//    checkRemotePaging: function (r) {
	//        if (r >= this.top || !this.remoteSearchActive || this.lastRemoteSearchPhrase !== this.remoteSearchPhrase) {
	//            var t = this.typeListControl.getItems();
	//            var a = t.length;
	//            if (a === 0 || a >= this.MODEL_SIZE_LIMIT) {
	//                this.noneTextItem = new sap.m.StandardListItem({
	//                    title: this.noneText,
	//                    active: true
	//                });
	//                this.typeListControl.insertItem(this.noneTextItem, 0);
	//                this.addContinueSearchItem(this.oBundle.getText("CONTINUE_SEARCH_ON_SERVER"));
	//                return;
	//            }
	//            if (t[a - 1].getTitle() === this.oBundle.getText("CONTINUE_SEARCH_ON_SERVER")) {
	//                return;
	//            } else {
	//                if (t[a - 1].getTitle() === this.oBundle.getText("TAP_TO_LOAD_MORE")) {
	//                    t[a - 1].setTitle(this.oBundle.getText("CONTINUE_SEARCH_ON_SERVER"));
	//                } else {
	//                    this.addContinueSearchItem(this.oBundle.getText("CONTINUE_SEARCH_ON_SERVER"));
	//                }
	//            }
	//        } else {
	//            t = this.typeListControl.getItems();
	//            a = t.length;
	//            if (t[a - 1].getTitle() === this.oBundle.getText("CONTINUE_SEARCH_ON_SERVER") && r < this.top) {
	//                this.typeListControl.removeItem(t[a - 1]);
	//            }
	//        }
	//    },
	//    addContinueSearchItem: function () {
	//        this.continueSearchItem = new sap.m.StandardListItem({
	//            title: this.oBundle.getText("CONTINUE_SEARCH_ON_SERVER"),
	//            active: true
	//        });
	//        this.typeListControl.addItem(this.continueSearchItem);
	//        this.continueSearchItem.addEventDelegate({
	//            onAfterRendering: function () {
	//                $(this.continueSearchItem.$().context.firstChild).attr("colspan", "2");
	//            }
	//        }, this);
	//    },
	//    tapToLoadMore: function (s) {
	//        this.localSkip += this.top;
	//        this.getValueHelpCollection(s);
	//    },
	//    continueSearchOnServer: function (s) {
	//        this.remoteSearchPhrase = this.searchPhrase;
	//        if (this.firstRemoteSearch) {
	//            this.firstRemoteSearch = false;
	//            this.continueSearchOnServerActive = true;
	//        } else {
	//            this.remoteSkip += this.top;
	//        }
	//        this.getValueHelpCollection(s);
	//        return this.remoteSearchPhrase;
	//    },
	//    refineSearchResult: function () {
	//        this.typeBinding = this.typeListControl.getBinding("items");
	//        var f = [];
	//        if (this.searchPhrase) {
	//            f.push(new sap.ui.model.Filter("fieldValueId", sap.ui.model.FilterOperator.Contains, this.searchPhrase));
	//            f.push(new sap.ui.model.Filter("fieldValueId", sap.ui.model.FilterOperator.Contains, this.noneText));
	//        }
	//        this.typeBinding.filter(f);
	//    },
	//    onLiveFavChange: function (e) {
	//        var f = e.getParameter("value");
	//        f = f.toLowerCase();
	//        var l = e.getSource().getItems();
	//        var v;
	//        var g = null;
	//        var c = 0;
	//        for (var i = 0; i < l.length; i++) {
	//            if (l[i] instanceof sap.m.GroupHeaderListItem) {
	//                if (g) {
	//                    g.setCount(c);
	//                }
	//                g = l[i];
	//                c = 0;
	//            } else {
	//                v = this.applySearchPatternToListItem(l[i], f);
	//                l[i].setVisible(v);
	//                if (v) {
	//                    c++;
	//                }
	//            }
	//        }
	//        if (g) {
	//            if (g.getTitle() !== this.oBundle.getText("NO_WORKLIST") || g.getTitle() !== this.oBundle.getText("NO_WORKLIST")) {
	//                g.setCount(c);
	//            }
	//        }
	//    },
	//    applySearchPatternToListItem: function (i, f) {
	//        if (f === "") {
	//            return true;
	//        }
	//        if (i.getTitle() && i.getTitle().toLowerCase().indexOf(f) !== -1 || i.getDescription() && i.getDescription().toLowerCase().indexOf(f) !== -1 || i.getInfo() && i.getInfo().toLowerCase().indexOf(f) !== -1) {
	//            return true;
	//        }
	//        return false;
	//    },
	//    onLiveChange: function (e) {
	//        var v = e.getParameter("value");
	//        var f = [];
	//        f.push(new sap.ui.model.Filter("fieldValueId", sap.ui.model.FilterOperator.Contains, v));
	//        this.searchPhrase = e.getParameter("value");
	//        this.searchField = e.getSource();
	//        if (this.searchPhrase) {
	//            this.refineSearchResult();
	//            if (this.searchPhrase !== this.remoteSearchPhrase) {
	//                this.resetRemoteSearch();
	//            }
	//            this.remoteSearchPhrase = this.searchPhrase;
	//            this.checkRemotePaging(this.remoteResultsLength);
	//        } else {
	//            this.refineSearchResult();
	//            this.remoteSearchPhrase = "";
	//            if (this.oApplication.getModel("createScrenModel")) {
	//                this.oApplication.getModel("createScrenModel").setProperty("typeList", this.localTypeList);
	//            }
	//            this.remoteSearchActive = false;
	//            this.checkLocalPaging(this.localResultsLength);
	//            this.resetRemoteSearch();
	//        }
	//    },
	//    resetRemoteSearch: function () {
	//        this.firstRemoteSearch = true;
	//        this.remoteSkip = 0;
	//        this.remoteTypeList = [];
	//        this.continueSearchOnServerActive = false;
	//        this.remoteSearchPhrase = "";
	//        this.remoteSearchActive = false;
	//    },
	//    clearSearchField: function () {
	//        if ("searchField" in this) {
	//            this.searchField.setValue("");
	//            this.typeBinding.filter([]);
	//        }
	//    },
	//    bindFavDialog: function (s) {
	//        var c, a = this;
	//        var m = a.oApplication.getModel("createScreenModel");
	//        var w = new sap.m.GroupHeaderListItem({
	//            title: a.oBundle.getText("WORKLIST"),
	//            upperCase: false,
	//            count: m.getProperty("/projects").length
	//        });
	//        var n = new sap.m.GroupHeaderListItem({
	//            title: a.oBundle.getText("NO_WORKLIST"),
	//            upperCase: false
	//        });
	//        if (this.FavoriteAvailable) {
	//            var f = new sap.m.GroupHeaderListItem({
	//                title: a.oBundle.getText("FAVORITE"),
	//                upperCase: false,
	//                count: m.getProperty("/favorites").length
	//            });
	//            var b = new sap.m.GroupHeaderListItem({
	//                title: a.oBundle.getText("NO_FAVORITE"),
	//                upperCase: false
	//            });
	//            c = m.getProperty("/favorites").concat(m.getProperty("/projects"));
	//        } else {
	//            c = m.getProperty("/projects");
	//        }
	//        m.setProperty("/combinedFavList", c);
	//        var i = new sap.m.StandardListItem({
	//            title: "{name}",
	//            description: "{subText}",
	//            info: "{info}",
	//            customData: [
	//                {
	//                    key: "items",
	//                    value: "{childs}"
	//                },
	//                {
	//                    key: "type",
	//                    value: "{type}"
	//                },
	//                {
	//                    key: "id",
	//                    value: "{id}"
	//                },
	//                {
	//                    key: "fieldId",
	//                    value: "{fieldName}"
	//                },
	//                {
	//                    key: "fieldValue",
	//                    value: "{fieldValue}"
	//                }
	//            ]
	//        });
	//        s.setModel(a.oApplication.getModel("createScreenModel"));
	//        s.bindAggregation("items", "/combinedFavList", i);
	//        this.favoriteDialog = s;
	//        if (this.FavoriteAvailable) {
	//            if (m.getProperty("/favorites").length === 0) {
	//                s.insertItem(b, 0);
	//            } else {
	//                s.insertItem(f, 0);
	//            }
	//            if (m.getProperty("/projects").length === 0) {
	//                s.insertItem(n, m.getProperty("/favorites").length + 1);
	//            } else {
	//                s.insertItem(w, m.getProperty("/favorites").length + 1);
	//            }
	//        } else {
	//            if (m.getProperty("/projects").length === 0) {
	//                s.insertItem(n, 0);
	//            } else {
	//                s.insertItem(w, 0);
	//            }
	//        }
	//    },
	//    onFavoriteInputHelp: function (e) {
	//        var s = this, D;
	//        this.favDialogHeaders = [];
	//        if (this.FavoriteAvailable) {
	//            D = this.oBundle.getText("SELECT_FAVORITE");
	//        } else {
	//            D = this.oBundle.getText("SELECT_WORKLIST");
	//        }
	//        var S = new sap.m.SelectDialog({
	//            title: D,
	//            liveChange: [
	//                this.onLiveFavChange,
	//                this
	//            ]
	//        });
	//        this.bindFavDialog(S);
	//        S.open();
	//        var a = arguments[0].getSource(), t, b, c;
	//        s = this;
	//        S.attachConfirm(function (d) {
	//            var f = d.getParameter("selectedItem");
	//            if (f.data().type) {
	//                s.favoriteSelected = true;
	//                s.worklistItemSelected = false;
	//                t = f.data().type;
	//                b = f.data().items;
	//                c = f.data().id;
	//                var g = 0, h = 0, k = 0, i, j, l;
	//                if (f) {
	//                    a.setValue(f.getTitle());
	//                }
	//                if (t === "F") {
	//                    for (var m = 0; m < s.favorites.length; m++) {
	//                        if (s.favorites[m].id === c) {
	//                            if (!s.isClockEntry()) {
	//                                h = s.favorites[m].FavoriteDataFields.CATSHOURS;
	//                                h = parseFloat(h, 10).toFixed(2);
	//                                s.byId("decimalTimeEntryValue").setValue(h);
	//                            } else {
	//                                g = s.favorites[m].FavoriteDataFields.BEGUZ;
	//                                k = s.favorites[m].FavoriteDataFields.ENDUZ;
	//                                if (g !== k) {
	//                                    var n = sap.ca.ui.model.format.DateFormat.getTimeInstance({ pattern: "HHmm" });
	//                                    var o = sap.ca.ui.model.format.DateFormat.getTimeInstance({ style: "short" });
	//                                    g = n.parse(g);
	//                                    g = o.format(g);
	//                                    k = n.parse(k);
	//                                    k = o.format(k);
	//                                    s.byId("startTime").setValue(s.favorites[m].FavoriteDataFields.BEGUZ);
	//                                    s.byId("endTime").setValue(s.favorites[m].FavoriteDataFields.ENDUZ);
	//                                    s.byId("ClkTimeDecimalTimeEntryValue").setEnabled(false);
	//                                } else {
	//                                    h = s.favorites[m].FavoriteDataFields.CATSHOURS;
	//                                    h = parseFloat(h, 10).toFixed(2);
	//                                    s.byId("ClkTimeDecimalTimeEntryValue").setValue(h);
	//                                }
	//                            }
	//                        }
	//                    }
	//                } else {
	//                    s.byId("decimalTimeEntryValue").setValue("");
	//                    s.byId("startTime").setValue("");
	//                    s.byId("endTime").setValue("");
	//                    s.byId("ClkTimeDecimalTimeEntryValue").setValue("");
	//                }
	//                l = s.oApplication.getModel("accountingInfoModel").getData().types;
	//                for (i = 0; i < l.length; i++) {
	//                    l[i].value = "";
	//                }
	//                for (j = 0; j < b.length; j++) {
	//                    for (i = 0; i < l.length; i++) {
	//                        if (l[i].fieldName === b[j].name) {
	//                            l[i].value = b[j].value;
	//                            l[i].valueStateText = b[j].value;
	//                            break;
	//                        }
	//                    }
	//                }
	//                s.byId("accountingInfoPanel").setExpanded(true);
	//                s.getView().getModel().setProperty("/types", l);
	//                s.oApplication.getModel("accountingInfoModel").setProperty("/types", l);
	//                s.validateSaveBtnVisibility(d);
	//            } else {
	//                s.worklistItemSelected = true;
	//                s.favoriteSelected = false;
	//                a.setValue(f.getTitle());
	//                b = f.data().items;
	//                var p = f.data().fieldId, q = f.data().fieldValue;
	//                l = s.oApplication.getModel("accountingInfoModel").getData().types;
	//                for (i = 0; i < l.length; i++) {
	//                    l[i].value = "";
	//                }
	//                if (!s.worklistSelectedObj) {
	//                    s.worklistSelectedObj = {};
	//                }
	//                if (s.checkFieldName(p)) {
	//                    s.worklistSelectedObj[p] = q;
	//                }
	//                for (j = 0; j < b.length; j++) {
	//                    if (s.checkFieldName(b[j].fieldName)) {
	//                        s.worklistSelectedObj[b[j].fieldName] = b[j].fieldValue;
	//                    }
	//                    for (i = 0; i < l.length; i++) {
	//                        if (b[j].fieldName === "LTXA1") {
	//                            s.byId("S31TextArea").setValue(b[j].name);
	//                        }
	//                        var r = f.getTitle() + " " + "(" + q + ")";
	//                        if (l[i].fieldName === p && l[i].value !== r) {
	//                            l[i].value = r;
	//                            l[i].valueStateText = q;
	//                        }
	//                        if (l[i].fieldName === b[j].fieldName) {
	//                            l[i].value = b[j].fieldValue;
	//                            l[i].valueStateText = b[j].name;
	//                            break;
	//                        }
	//                    }
	//                }
	//                s.byId("accountingInfoPanel").setExpanded(true);
	//                s.getView().getModel().setProperty("/types", l);
	//                s.oApplication.getModel("accountingInfoModel").setProperty("/types", l);
	//                s.validateSaveBtnVisibility(d);
	//            }
	//            S.destroy();
	//            S = null;
	//        });
	//    },
	//    onInputHelp: function () {
	//        var s = this;
	//        var a = {};
	//        a.name = arguments[0].getSource().getValueStateText();
	//        a.fieldName = arguments[0].getSource().getName();
	//        var S = arguments[0].getSource().getParent().getLabel().getText();
	//        var o = new sap.m.SelectDialog({
	//            title: S,
	//            search: [
	//                this.onLiveChange,
	//                this
	//            ],
	//            liveChange: [
	//                this.onLiveChange,
	//                this
	//            ]
	//        });
	//        var i = new sap.m.StandardListItem({
	//            title: "{fieldValue}",
	//            description: "{fieldId}",
	//            active: true
	//        });
	//        s.typeListControl = o;
	//        s.getValueHelpCollection(a);
	//        o.setModel(s.oApplication.getModel("createScreenModel"));
	//        if (a.fieldName.indexOf("/") >= 0) {
	//            a.fieldName = a.fieldName.split("/").join("-");
	//        }
	//        o.bindAggregation("items", "/" + a.fieldName, i);
	//        o.open();
	//        var b = arguments[0].getSource();
	//        o.attachConfirm(function (e) {
	//            var c = e.getParameter("selectedItem");
	//            if (c) {
	//                s.selectedIndex = e.getParameter("selectedItem").getParent().indexOfItem(e.getParameter("selectedItem"));
	//                if (c.getTitle() === s.oBundle.getText("TAP_TO_LOAD_MORE")) {
	//                    s.tapToLoadMore(a);
	//                    o.open();
	//                    return;
	//                } else if (c.getTitle() === s.oBundle.getText("CONTINUE_SEARCH_ON_SERVER")) {
	//                    var d = s.continueSearchOnServer(a);
	//                    o.open(d);
	//                    return;
	//                } else if (c.getTitle() === "(None)") {
	//                    b.setValue("");
	//                    b.setValueStateText("");
	//                } else {
	//                    b.setValue(c.getTitle() + " " + c.getDescription());
	//                    b.setValueStateText(c.getDescription().replace("(", "").replace(")", ""));
	//                }
	//                s.validateSaveBtnVisibility(e);
	//            }
	//            o.destroy();
	//            o = null;
	//            s.localTypeList = [];
	//            s.remoteTypeList = [];
	//            s.resetRemoteSearch();
	//            s.top = s.RESULTS_TOP;
	//            s.remoteSkip = 0;
	//            s.localSkip = 0;
	//        });
	//        o.attachCancel(function () {
	//            o = null;
	//            s.localTypeList = [];
	//            s.remoteTypeList = [];
	//            s.resetRemoteSearch();
	//            s.top = s.RESULTS_TOP;
	//            s.remoteSkip = 0;
	//            s.localSkip = 0;
	//        });
	//    },
	//    getFavoritesCollection: function () {
	//        var s = this;
	//        var F, a;
	//        if (this.FavoriteAvailable) {
	//            this.oService.getFavorites(this, this.oApplication.pernr, function (d) {
	//                var f = 0;
	//                s.favorites = [];
	//                for (var i = 0; i < d.length; i++) {
	//                    if (d[i].ObjType === "FW") {
	//                        s.favorites[f] = {
	//                            name: d[i].Name,
	//                            type: d[i].ObjType,
	//                            id: d[i].ID,
	//                            FavoriteDataFields: d[i].FavoriteDataFields,
	//                            childs: [],
	//                            info: "",
	//                            active: true,
	//                            subText: d[i].Field_Text
	//                        };
	//                    } else {
	//                        if (parseFloat(d[i].FavoriteDataFields.CATSHOURS)) {
	//                            a = s.oBundle.getText("TOTAL_RECORDED_HOURS", [d[i].FavoriteDataFields.CATSHOURS]);
	//                            if (a.indexOf("Target:") >= 0) {
	//                                a = d[i].FavoriteDataFields.CATSHOURS + " h";
	//                            }
	//                        } else {
	//                            var b = d[i].FavoriteDataFields.BEGUZ, e = d[i].FavoriteDataFields.ENDUZ;
	//                            var t = sap.ca.ui.model.format.DateFormat.getTimeInstance({ pattern: "HHmm" });
	//                            var c = sap.ca.ui.model.format.DateFormat.getTimeInstance({ style: "short" });
	//                            b = t.parse(b);
	//                            b = c.format(b);
	//                            e = t.parse(e);
	//                            e = c.format(e);
	//                            a = s.oBundle.getText("WEEK_DATE_RANGE", [
	//                                b,
	//                                e
	//                            ]);
	//                        }
	//                        s.favorites[f] = {
	//                            name: d[i].Name,
	//                            type: d[i].ObjType,
	//                            id: d[i].ID,
	//                            FavoriteDataFields: d[i].FavoriteDataFields,
	//                            childs: [],
	//                            info: a,
	//                            active: true,
	//                            subText: d[i].Field_Text
	//                        };
	//                    }
	//                    f++;
	//                }
	//                for (i = 0; i < f; i++) {
	//                    F = s.favorites[i].FavoriteDataFields;
	//                    for (var p in F) {
	//                        if (p !== "CATSHOURS" && p !== "PERNR" && p !== "BEGUZ" && p !== "ENDUZ") {
	//                            if (F[p] !== "" && typeof F[p] !== "undefined") {
	//                                if (parseInt(F[p], 10) !== 0 || p === "AWART") {
	//                                    s.favorites[i].childs.push({
	//                                        name: p,
	//                                        value: F[p]
	//                                    });
	//                                }
	//                            }
	//                        }
	//                    }
	//                }
	//                s.oApplication.getModel("createScreenModel").setProperty("/favorites", s.favorites);
	//                if (s.oApplication.getModel("createScreenModel").getProperty("/projects")) {
	//                    if (s.oApplication.getModel("createScreenModel").getProperty("/favorites").length === 0 && s.oApplication.getModel("createScreenModel").getProperty("/projects").length === 0) {
	//                        s.byId("accountingInfoPanel").setExpanded(true);
	//                        s.byId("timeAssignmentLbl").setVisible(false);
	//                        s.byId("timeAssignment").setVisible(false);
	//                    }
	//                }
	//            });
	//        }
	//    },
	//    getWorkListCollection: function () {
	//        this.workList = [];
	//        this.workListType = [];
	//        var s = this;
	//        var m = this.oApplication.getModel("TSM_WEEKLY");
	//        this.searchField_begDa = m.getProperty("/weekStart");
	//        this.searchField_endDa = m.getProperty("/weekEnd");
	//        this.oService.getWorkListCollection(this, this.oApplication.pernr, this.searchField_begDa, this.searchField_endDa, function (d) {
	//            var w = 0;
	//            for (var i = 0; i < d.length; i++) {
	//                if (d[i].Level === 0) {
	//                    s.workList[w] = {
	//                        name: d[i].FieldValueText,
	//                        childs: [],
	//                        fieldName: d[i].FieldName,
	//                        fieldValue: d[i].FieldValue,
	//                        recordNumber: d[i].RecordNumber
	//                    };
	//                    w++;
	//                }
	//            }
	//            var a = [];
	//            var b = [];
	//            var R = 0;
	//            for (i = 0; i < d.length; i++) {
	//                R = d[i].RecordNumber - 1;
	//                if (d[i].IsVisible == true && a[R] == null) {
	//                    a[R] = d[i].FieldValueText;
	//                } else if (d[i].IsVisible == true && b[R] == null) {
	//                    b[R] = d[i].FieldValueText;
	//                } else if (d[i].IsVisible == true && b[R] != null) {
	//                    b[R] += ", " + d[i].FieldValueText;
	//                }
	//                if (d[i].Level !== 0) {
	//                    for (var j = 0; j < s.workList.length; j++) {
	//                        if (s.workList[j].recordNumber === d[i].RecordNumber) {
	//                            s.workList[j].childs.push({
	//                                name: d[i].FieldValueText,
	//                                fieldName: d[i].FieldName,
	//                                fieldValue: d[i].FieldValue
	//                            });
	//                        }
	//                    }
	//                }
	//            }
	//            var p = [];
	//            for (i = 0; i < s.workList.length; i++) {
	//                var c = [];
	//                var e = [];
	//                var f = [];
	//                for (j = 0; j < s.workList[i].childs.length; j++) {
	//                    c.push(s.workList[i].childs[j].name);
	//                    e.push(s.workList[i].childs[j].fieldName);
	//                    f.push(s.workList[i].childs[j].fieldValue);
	//                }
	//                if (a[i] == null) {
	//                    a[i] = s.workList[i].name;
	//                    b[i] = c.join(", ");
	//                }
	//                p.push({
	//                    name: a[i],
	//                    subText: b[i],
	//                    type: false,
	//                    childs: s.workList[i].childs,
	//                    fieldName: s.workList[i].fieldName,
	//                    fieldValue: s.workList[i].fieldValue,
	//                    fieldValueId: s.workList[i].name + c.join(", ")
	//                });
	//            }
	//            s.workList = p;
	//            s.oApplication.getModel("createScreenModel").setProperty("/projects", s.workList);
	//            if (s.FavoriteAvailable) {
	//                if (s.oApplication.getModel("createScreenModel").getProperty("/favorites")) {
	//                    if (s.oApplication.getModel("createScreenModel").getProperty("/favorites").length === 0 && s.oApplication.getModel("createScreenModel").getProperty("/projects").length === 0) {
	//                        s.byId("accountingInfoPanel").setExpanded(true);
	//                        s.byId("timeAssignmentLbl").setVisible(false);
	//                        s.byId("timeAssignment").setVisible(false);
	//                    } else {
	//                        s.byId("timeAssignmentLbl").setVisible(true);
	//                        s.byId("timeAssignment").setVisible(true);
	//                    }
	//                }
	//            } else {
	//                if (s.oApplication.getModel("createScreenModel").getProperty("/projects").length === 0) {
	//                    s.byId("accountingInfoPanel").setExpanded(true);
	//                    s.byId("timeAssignmentLbl").setVisible(false);
	//                    s.byId("timeAssignment").setVisible(false);
	//                } else {
	//                    s.byId("timeAssignmentLbl").setVisible(true);
	//                    s.byId("timeAssignment").setVisible(true);
	//                }
	//            }
	//        });
	//    },
	//    valueHelpDataForamtter: function (f, a) {
	//        if (f) {
	//            return f + " (" + a + ")";
	//        }
	//    },
	//    durationDateForamtter: function (h, m) {
	//        return h + ":" + m;
	//    },
	//    getProfileFields: function () {
	//        this.profileFields = [];
	//        var s = this;
	//        var a = new sap.ui.model.json.JSONModel();
	//        this.oApplication.setModel(a, "accountingInfoModel");
	//        this.oService.getProfileFields(this, this.oApplication.pernr, function (d) {
	//            var e = {}, i;
	//            var b = s.oApplication.getModel("S31modelexch").getData().editentryview;
	//            var c = s.oApplication.getModel("S31modelexch").getData().copySelected;
	//            if (b || c) {
	//                e = s.oApplication.getModel("S31modelexch").getData().editeddata;
	//                s.validateSaveBtnVisibility();
	//            }
	//            for (i = 0; i < d.length; i++) {
	//                var n = d[i].FieldText;
	//                var f = d[i].FieldName;
	//                var g = s.NON_BREAKING_SPACE;
	//                var h = "";
	//                var r = d[i].ReadOnly;
	//                if (s.editCostAssignment) {
	//                    if (s.selectedMainName === f) {
	//                        h = s.selectedMainCode;
	//                        g = s.selectedMainItem;
	//                    } else {
	//                        if ("selectedChildItems" in s) {
	//                            for (var j = 0; j < s.selectedChildNames.length; j++) {
	//                                if (s.selectedChildNames[j] === f) {
	//                                    h = s.selectedChildCodes[j];
	//                                    g = s.selectedChildItems[j];
	//                                }
	//                            }
	//                        }
	//                    }
	//                }
	//                var v = "";
	//                var k = "";
	//                if (e && e.entry) {
	//                    if (e.entry.childItems) {
	//                        var l = e.entry.childCodes[e.entry.childNames.indexOf(f)];
	//                        var m = e.entry.childItems[e.entry.childNames.indexOf(f)];
	//                        if (l) {
	//                            v = m + " (" + l + ")";
	//                        }
	//                        if (m) {
	//                            k = l;
	//                        }
	//                        if (!v) {
	//                            if (f === e.entry.mainName) {
	//                                v = e.entry.mainItem + " (" + e.entry.mainCode + ")";
	//                                k = e.entry.mainCode;
	//                            }
	//                        }
	//                    } else {
	//                        if (f === e.entry.mainName) {
	//                            v = e.entry.mainItem + " (" + e.entry.mainCode + ")";
	//                            k = e.entry.mainCode;
	//                        }
	//                    }
	//                }
	//                s.profileFields.push({
	//                    name: n,
	//                    selectedName: g,
	//                    fieldName: f,
	//                    listType: "Active",
	//                    labelVisible: true,
	//                    typeVisible: true,
	//                    fieldValue: h,
	//                    value: v,
	//                    valueStateText: k,
	//                    ReadOnly: r.toLowerCase() === "true" ? false : true,
	//                    valueHelp: true
	//                });
	//                if (!s.checkDisplayFieldNames(f)) {
	//                    s.profileFields[i].ReadOnly = false;
	//                }
	//            }
	//            a.setProperty("/types", s.profileFields);
	//            s.oApplication.setModel(a, "accountingInfoModel");
	//            s.oApplication.getModel("createScreenModel").setProperty("/types", s.profileFields);
	//            s.getView().setModel(a, "accountingInfoModel");
	//            s.validateSaveBtnVisibility();
	//        });
	//    },
	//    checkDisplayFieldNames: function (f) {
	//        var a = [
	//            "DISPTEXT",
	//            "CPR_",
	//            "LTXA1"
	//        ];
	//        for (var i = 0; i < a.length; i++) {
	//            if (f.match(a[i])) {
	//                return false;
	//            }
	//        }
	//        return true;
	//    },
	//    onDone: function () {
	//        this.entry.showError = false;
	//        this.entry.error = "";
	//        this.resetMainAndChildItems();
	//        var m = true;
	//        this.entry.notes = this.byId("S31TextArea").getValue();
	//        m = false;
	//        var i = this.byId("manualAccountingInfos").getFormElements();
	//        var v;
	//        for (var j = 0; j < i.length; j++) {
	//            var k = i[j].getFields()[0].getName();
	//            if (i[j].getFields()[0].getValue().split("").indexOf("(") !== -1) {
	//                v = i[j].getFields()[0].getValueStateText();
	//            } else {
	//                v = i[j].getFields()[0].getValue();
	//            }
	//            if (!v) {
	//                v = i[j].getFields()[0].getValue();
	//            }
	//            if (v) {
	//                if (!m) {
	//                    this.entry.mainItem = k;
	//                    this.entry.mainName = k;
	//                    this.entry.mainCode = v;
	//                    m = true;
	//                } else {
	//                    if (!this.entry.childItems) {
	//                        this.initializeChildItems();
	//                        this.childItemsInitialized = true;
	//                    }
	//                    this.entry.childItems.push(k);
	//                    this.entry.childNames.push(k);
	//                    this.entry.childCodes.push(v);
	//                }
	//            }
	//        }
	//        if ("childItems" in this.entry) {
	//            if (this.entry.childItems.length > 1) {
	//                this.entry.subItems = this.entry.childItems.join(", ");
	//            } else if (this.entry.childItems.length === 1) {
	//                this.entry.subItems = this.entry.childItems[0];
	//            }
	//        }
	//        if (m || this.worklistItemSelected) {
	//            this.onSubmit();
	//        } else {
	//            this.initializeChildItems();
	//        }
	//    },
	//    onSubmit: function () {
	//        this.entry.showError = false;
	//        this.entry.error = "";
	//        this.entry.rejectionReason = "";
	//        this.updatePageData();
	//    },
	//    updatePageData: function () {
	//        var c = this.byId("weeklyCalendar");
	//        var s = c.getSelectedDates();
	//        this.entry.selectedDate = s;
	//        if (!this.isClockEntry() || this.clkTimeDurationFilled) {
	//            var l;
	//            if (!this.clkTimeDurationFilled) {
	//                l = this.byId("decimalTimeEntryValue").getValue();
	//            } else {
	//                l = this.byId("ClkTimeDecimalTimeEntryValue").getValue();
	//            }
	//            if (l.indexOf(",") > 0) {
	//                l = l.replace(",", ".");
	//            }
	//            this.entry.time = l;
	//        } else {
	//            var a = this.byId("startTime").getDateValue(), e = this.byId("endTime").getDateValue();
	//            this.entry.startTime = this.convertTime(a);
	//            this.entry.endTime = this.convertTime(e);
	//            var d = (e.getTime() - a.getTime()) / (1000 * 60);
	//            this.entry.hours = parseInt(d / 60, 10);
	//            this.entry.minutes = d % 60;
	//            this.entry.time = "0.0";
	//        }
	//        this.entry.hasNotes = this.entry.notes && this.entry.notes.length > 0 ? true : false;
	//        this.submitToOdata();
	//    },
	//    convertTime: function (d) {
	//        var t = sap.ui.core.format.DateFormat.getTimeInstance({ pattern: "HHmmss" });
	//        return t.format(d);
	//    },
	//    formatAMPM: function (d) {
	//        var h = d.getHours();
	//        var m = d.getMinutes();
	//        var a = h >= 12 ? "PM" : "AM";
	//        h = h % 12;
	//        h = h ? h : 12;
	//        m = m < 10 ? "0" + m : m;
	//        var s = h + ":" + m + " " + a;
	//        return s;
	//    },
	//    submitToOdata: function () {
	//        var s = this, c = this.byId("weeklyCalendar"), a = c.getSelectedDates(), S, t;
	//        this.errors = null;
	//        var b = null, i = 0, d, e, f, g, h, p, j;
	//        if (this.isClockEntry() && !this.clkTimeDurationFilled) {
	//            d = this.byId("startTime").getDateValue();
	//            e = this.byId("endTime").getDateValue();
	//        }
	//        if (!this.isClockEntry() || this.clkTimeDurationFilled) {
	//            if (this.clkTimeDurationFilled) {
	//                g = this.getView().byId("ClkTimeDecimalTimeEntryValue").getValue();
	//            } else {
	//                g = this.getView().byId("decimalTimeEntryValue").getValue();
	//            }
	//            if (g.indexOf(",") > -1) {
	//                g = g.replace(",", ".");
	//            }
	//            g = parseFloat(g);
	//            g = g.toFixed(2);
	//            h = sap.ca.ui.model.format.NumberFormat.getInstance({ style: "standard" }).format(g);
	//            f = h;
	//        }
	//        if (!this.releaseAllowed) {
	//            p = this.oBundle.getText("DRAFT_CONFIRMATION_SUMMARY");
	//            j = this.oConfiguration.getText("DRAFT_CONFIRMATION");
	//        } else {
	//            p = this.oBundle.getText("SUBMISSION_CONFIRMATION_SUMMARY");
	//            j = this.oConfiguration.getText("SUBMISSION_CONFIRMATION");
	//        }
	//        t = sap.ca.ui.model.format.DateFormat.getTimeInstance({ style: "short" });
	//        if (this.isClockEntry() && !this.clkTimeDurationFilled) {
	//            if (this.byId("startTime").getDisplayFormat() === "hh:mm a" || this.byId("startTime").getDisplayFormat() === "h:mm a") {
	//                d = this.formatAMPM(d);
	//                e = this.formatAMPM(e);
	//            } else {
	//                d = t.format(d);
	//                e = t.format(e);
	//            }
	//            S = {
	//                question: p,
	//                additionalInformation: [
	//                    {
	//                        label: this.oBundle.getText("DELETE_CONFIRMATION_SUMMARY_ENTRIES"),
	//                        text: a.length.toString()
	//                    },
	//                    {
	//                        label: this.oBundle.getText("START_TIME"),
	//                        text: d
	//                    },
	//                    {
	//                        label: this.oBundle.getText("END_TIME"),
	//                        text: e
	//                    }
	//                ],
	//                showNote: false,
	//                title: j,
	//                confirmButtonLabel: this.oBundle.getText("OK")
	//            };
	//        } else {
	//            S = {
	//                question: p,
	//                additionalInformation: [
	//                    {
	//                        label: this.oBundle.getText("DELETE_CONFIRMATION_SUMMARY_ENTRIES"),
	//                        text: a.length.toString()
	//                    },
	//                    {
	//                        label: this.oBundle.getText("DURATION"),
	//                        text: f
	//                    }
	//                ],
	//                showNote: false,
	//                title: j,
	//                confirmButtonLabel: this.oBundle.getText("OK")
	//            };
	//        }
	//        this.openConfirmationPopup(S, function (r) {
	//            var k = [], w = "";
	//            var o = s.oApplication.getModel("S31modelexch").getData().editentryview ? "U" : "C";
	//            if (a.length !== 0) {
	//                for (i = 0; i < a.length; i++) {
	//                    s.entry = s.replaceSpecialChar(s.entry);
	//                    w = s.getDateTimeStr(new Date(a[i]));
	//                    k.push(s.setPostObject(s.entry.counter, o, w, s.entry.time, s.entry.mainName, s.entry.mainCode, s.entry.notes, s.entry.startTime, s.entry.endTime, s.entry.subItems, s.entry.childCodes, s.entry.childNames));
	//                }
	//            }
	//            if (k.length === 0) {
	//                b.close();
	//            } else {
	//                s.oService.submitTimeEntry(s, k, [], [], function () {
	//                    var l;
	//                    if (!s.releaseAllowed) {
	//                        l = s.oBundle.getText("DRAFT_SUCCESS");
	//                    } else {
	//                        l = s.oBundle.getText("SUBMIT_SUCCESS");
	//                    }
	//                    var m = s.byId("weeklyCalendar");
	//                    var n = m.getCurrentDate();
	//                    var q = n;
	//                    n = q + "offset" + m.getFirstDayOffset();
	//                    var M = new sap.ui.model.json.JSONModel();
	//                    M.setProperty("/currentDate", new Date(q));
	//                    s.oApplication.setModel(M, "S3exchangeModel");
	//                    delete s.entry;
	//                    s.cleanUpOnBack();
	//                    s.oRouter.navTo("S3", { context: n }, true);
	//                    sap.m.MessageToast.show(l);
	//                }, function (l, m) {
	//                    var n = s.byId("weeklyCalendar");
	//                    n.unselectAllDates();
	//                    n.toggleDatesSelection(m, true);
	//                });
	//            }
	//        });
	//    },
	    openConfirmationPopup: function (s, a) {
	    	
	    	//this.onValidateWeek(null);
	    	
	        var b = this;
	        var e = [];
	        for (var i = 0; i < s.additionalInformation.length; i++) {
	            e.push(new sap.m.Label({
	                text: s.additionalInformation[i].label,
	                design: "Bold"
	            }));
	            e.push(new sap.m.Text({ text: s.additionalInformation[i].text }));
	        }
	        /* hook: Gesamtstunden der Woche*/
	        	e.push(new sap.m.Label({
	                text: "Zeiteinheiten bereits verbucht",
	                design: "Bold"
	            }));
	        	e.push(new sap.m.Text({ text: "in Arbeit" }));
	        var f = new sap.ui.layout.form.SimpleForm({
	            minWidth: 1024,
	            editable: false,
	            maxContainerCols: 2,
	            layout: "ResponsiveGridLayout",
	            labelSpanL: 7,
	            labelSpanM: 7,
	            labelSpanS: 7,
	            emptySpanL: 1,
	            emptySpanM: 1,
	            emptySpanS: 1,
	            columnsL: 1,
	            columnsM: 1,
	            columnsS: 1,
	            content: e
	        });
	        var c = new sap.m.Dialog({
	            title: s.title,
	            content: [f],
	            beginButton: new sap.m.Button({
	                text: s.confirmButtonLabel,
	                press: function () {
	                    a();
	                    c.close();
	                }
	            }),
	            endButton: new sap.m.Button({
	                text: this.oBundle.getText("CANCEL"),
	                press: function () {
	                    c.close();
	                }
	            })
	        });
	        c.addStyleClass("sapUiContentPadding sapUiMediumMarginTopBottom");
	        c.open();
	    },
	//    replaceAllOccurances: function (s) {
	//        if (typeof s === "undefined") {
	//            return;
	//        }
	//        var S = "/";
	//        var r = "-";
	//        while (s.indexOf(S) > -1) {
	//            s = s.replace(S, r);
	//        }
	//        return s;
	//    },
	//    replaceSpecialChar: function (e) {
	//        if (typeof e.mainName !== "undefined") {
	//            e.mainName = this.replaceAllOccurances(e.mainName);
	//        }
	//        if (typeof e.subItems !== "undefined") {
	//            e.subItems = this.replaceAllOccurances(e.subItems);
	//        }
	//        if (typeof e.childNames !== "undefined") {
	//            for (var i = 0; i < e.childNames.length; i++) {
	//                e.childNames[i] = this.replaceAllOccurances(e.childNames[i]);
	//            }
	//        }
	//        return e;
	//    },
	//    getPostData: function (d, e) {
	//        var p = {};
	//        p.day = d;
	//        p.entry = e;
	//        return p;
	//    },
	//    setPostObject: function (C, T, W, a, N, b, n, s, e, c, d, f) {
	//        var t = {
	//            Pernr: this.oApplication.pernr,
	//            Counter: C,
	//            TimeEntryOperation: T,
	//            TimeEntryDataFields: {
	//                WORKDATE: W,
	//                CATSAMOUNT: "" + a
	//            }
	//        };
	//        if (this.isClockEntry()) {
	//            t.TimeEntryDataFields.BEGUZ = s;
	//            t.TimeEntryDataFields.ENDUZ = e;
	//        }
	//        t.TimeEntryRelease = " ";
	//        if (N) {
	//            if (N.indexOf("-") >= 0) {
	//                N = N.split("-").join("/");
	//            }
	//            if (this.checkFieldName(N) === true) {
	//                t.TimeEntryDataFields[N] = b;
	//            }
	//        }
	//        if (c && c !== "") {
	//            for (var i = 0; i < f.length; i++) {
	//                if (f[i].indexOf("-") >= 0) {
	//                    f[i] = f[i].split("-").join("/");
	//                }
	//                if (this.checkFieldName(f[i]) === true) {
	//                    t.TimeEntryDataFields[f[i]] = d[i];
	//                }
	//            }
	//        }
	//        if (this.worklistItemSelected) {
	//            t.TimeEntryDataFields = this.addWorklistFields(t.TimeEntryDataFields);
	//        }
	//        if (n && n !== "") {
	//            t.TimeEntryDataFields.LONGTEXT_DATA = n;
	//            t.TimeEntryDataFields.LONGTEXT = "X";
	//        }
	//        if (t.TimeEntryDataFields.hasOwnProperty("SPLIT")) {
	//            t.TimeEntryDataFields.SPLIT = parseInt(t.TimeEntryDataFields.SPLIT, 10);
	//        }
	//        if (this.extHookChangeObjectBeforePost) {
	//            t = this.extHookChangeObjectBeforePost(t);
	//        }
	//        return t;
	//    },
	//    checkFieldName: function (f) {
	//        var c = f;
	//        if (c.match("DISPTEXT")) {
	//            return false;
	//        }
	//        if (c.match("CPR_OBJTEXT")) {
	//            return false;
	//        }
	//        if (c.match("CPR_TEXT")) {
	//            return false;
	//        }
	//        return true;
	//    },
	//    addWorklistFields: function (o) {
	//        for (var w in this.worklistSelectedObj) {
	//            if (o.hasOwnProperty(w) || o[w] === "LTXA1") {
	//                continue;
	//            } else {
	//                o[w] = this.worklistSelectedObj[w];
	//            }
	//        }
	//        return o;
	//    },
	//    parseDateYYYYMMdd: function (d) {
	//        var a = sap.ui.core.format.DateFormat.getDateInstance({ pattern: "YYYYMMdd" });
	//        return a.parse(d);
	//    },
	//    onCancel: function () {
	//        var c = this.byId("weeklyCalendar");
	//        var s = c.getCurrentDate();
	//        var d = s;
	//        s = d + "offset" + c.getFirstDayOffset();
	//        var m = new sap.ui.model.json.JSONModel();
	//        m.setProperty("/currentDate", new Date(d));
	//        this.oApplication.setModel(m, "S3exchangeModel");
	//        this.cleanUpOnBack();
	//        delete this.entry;
	//        this.oRouter.navTo("S3", { context: s }, true);
	//    },
	//    onReset: function () {
	//        this.byId("timeAssignment").setValue("");
	//        this.byId("createPanel").setHeaderText(this.oBundle.getText("ENTRY_DETAILS"));
	//        this.byId("decimalTimeEntryValue").setValue("");
	//        this.byId("startTime").setValue("");
	//        this.byId("endTime").setValue("");
	//        this.byId("weeklyCalendar").setDisabledWeekDays([]);
	//        this.byId("weeklyCalendar").unselectAllDates();
	//        this.byId("S31TextArea").setValue("");
	//        this.byId("ClkTimeDecimalTimeEntryValue").setValue("");
	//        this.byId("ClkTimeDecimalTimeEntryValue").setEnabled(true);
	//        this.setBtnEnabled("SUBMIT_BTN", false);
	//        delete this.worklistSelectedObj;
	//        this.worklistSelectedObj = {};
	//        this.worklistItemSelected = false;
	//        var t = this.oApplication.getModel("accountingInfoModel").getData().types;
	//        for (var i = 0; i < t.length; i++) {
	//            if (t[i].value !== "" || t[i].valueStateText !== "") {
	//                t[i].value = "";
	//                t[i].valueStateText = "";
	//            }
	//        }
	//        if (this.isClockEntry() && this.byId("ClkTimeDecimalTimeEntryValue").getVisible()) {
	//            this.entry.startTime = "000000";
	//            this.entry.endTime = "000000";
	//            this.entry.time = "";
	//        }
	//        this.getView().getModel().setProperty("/types", t);
	//        this.oApplication.getModel("accountingInfoModel").setProperty("/types", t);
	//    },
	//    openEditfavDialog: function () {
	//        if (!this.oApplication.getModel("createScreenModel").getProperty("/favorites")) {
	//            this.getFavoritesCollection();
	//        }
	//        var i = new sap.ui.core.Item({
	//            text: "{name}",
	//            key: "{id}"
	//        });
	//        this.editFavForm = new sap.ui.layout.form.Form({
	//            maxContainerCols: 2,
	//            layout: new sap.ui.layout.form.ResponsiveGridLayout({
	//                labelSpanL: 4,
	//                emptySpanL: 3,
	//                labelSpanM: 4,
	//                emptySpanM: 2,
	//                columnsL: 1,
	//                columnsM: 1
	//            }),
	//            formContainers: new sap.ui.layout.form.FormContainer({
	//                formElements: [
	//                    new sap.ui.layout.form.FormElement({
	//                        label: new sap.m.Label({ text: this.oBundle.getText("EXISTING_FAV_NAME") }),
	//                        fields: new sap.m.Select().bindAggregation("items", "/favorites", i)
	//                    }),
	//                    new sap.ui.layout.form.FormElement({
	//                        label: new sap.m.Label({ text: this.oBundle.getText("NEW_FAVORITE_NAME") }),
	//                        fields: new sap.m.Input({
	//                            liveChange: [
	//                                this.validateEditFavSaveBtn,
	//                                this
	//                            ],
	//                            maxLength: 30
	//                        })
	//                    })
	//                ]
	//            })
	//        }).setModel(this.oApplication.getModel("createScreenModel"));
	//        this.editFavDialog = new sap.m.Dialog({
	//            title: this.oBundle.getText("EDIT_FAVORITE"),
	//            content: [this.editFavForm],
	//            beginButton: new sap.m.Button({
	//                text: this.oBundle.getText("SAVE"),
	//                enabled: false,
	//                press: [
	//                    this.updateFavorites,
	//                    this
	//                ]
	//            }),
	//            endButton: new sap.m.Button({
	//                text: this.oBundle.getText("CANCEL"),
	//                press: jQuery.proxy(function () {
	//                    this.editFavDialog.close();
	//                }, this)
	//            }),
	//            afterClose: jQuery.proxy(function () {
	//                this.editFavDialog.destroy();
	//            }, this)
	//        });
	//        this.editFavDialog.addStyleClass("sapUiContentPadding");
	//        this.editFavDialog.open();
	//    },
	//    validateEditFavSaveBtn: function (e) {
	//        var n = e.getParameters("value");
	//        var o = this.editFavForm.getFormContainers()[0].getFormElements()[0].getFields()[0].getSelectedKey();
	//        if (!n.value || o === "") {
	//            this.editFavDialog.getBeginButton().setEnabled(false);
	//        } else {
	//            this.editFavDialog.getBeginButton().setEnabled(true);
	//        }
	//    },
	//    openFavDialog: function () {
	//        var f = new sap.ui.layout.form.Form({
	//            maxContainerCols: 2,
	//            layout: new sap.ui.layout.form.ResponsiveGridLayout({
	//                labelSpanL: 4,
	//                emptySpanL: 3,
	//                labelSpanM: 4,
	//                emptySpanM: 2,
	//                columnsL: 1,
	//                columnsM: 1
	//            }),
	//            formContainers: new sap.ui.layout.form.FormContainer({
	//                formElements: [
	//                    new sap.ui.layout.form.FormElement({
	//                        label: new sap.m.Label({ text: this.oBundle.getText("FAVORITE_NAME") }),
	//                        fields: new sap.m.Input({
	//                            liveChange: [
	//                                this.validateSaveFavSaveBtn,
	//                                this
	//                            ],
	//                            maxLength: 30
	//                        })
	//                    }),
	//                    new sap.ui.layout.form.FormElement({
	//                        label: new sap.m.Label({}),
	//                        fields: new sap.m.CheckBox({ text: this.oBundle.getText("SAVE_FAVORITE_WITH_TIME") })
	//                    })
	//                ]
	//            })
	//        });
	//        this.favDialog = new sap.m.Dialog({
	//            title: this.oBundle.getText("ADD_FAVORITE"),
	//            type: "Message",
	//            content: [f],
	//            beginButton: new sap.m.Button({
	//                text: this.oBundle.getText("SAVE"),
	//                enabled: false,
	//                press: jQuery.proxy(this.addFavorite, this)
	//            }),
	//            endButton: new sap.m.Button({
	//                text: this.oBundle.getText("CANCEL"),
	//                press: jQuery.proxy(function () {
	//                    this.favDialog.close();
	//                }, this)
	//            }),
	//            afterClose: jQuery.proxy(function () {
	//                this.favDialog.destroy();
	//            }, this)
	//        });
	//        this.favDialog.addStyleClass("sapUiContentPadding");
	//        this.favDialog.open();
	//    },
	//    validateSaveFavSaveBtn: function (e) {
	//        var f = e.getParameter("value");
	//        if (f.trim() !== "") {
	//            this.favDialog.getBeginButton().setEnabled(true);
	//        } else {
	//            this.favDialog.getBeginButton().setEnabled(false);
	//        }
	//    },
	//    addFavorite: function () {
	//        var f, s = this;
	//        var n = this.favDialog.getContent()[0].getFormContainers()[0].getFormElements()[0].getFields()[0].getValue();
	//        var w = this.favDialog.getContent()[0].getFormContainers()[0].getFormElements()[1].getFields()[0].getSelected();
	//        f = this.setFavoritePostObject(n);
	//        var t;
	//        if (n === "") {
	//            t = this.oBundle.getText("FAV_NAME_ERROR");
	//            sap.m.MessageToast.show(t);
	//        } else if (f === null) {
	//            t = this.oBundle.getText("FAV_DATA_ERROR");
	//            sap.m.MessageToast.show(t);
	//        } else {
	//            if (w) {
	//                var a = this.byId("decimalTimeEntryValue").getValue();
	//                var b = this.byId("startTime").getValue(), e = this.byId("endTime").getValue();
	//                if (!this.isClockEntry() || this.clkTimeDurationFilled) {
	//                    if (this.clkTimeDurationFilled) {
	//                        a = this.byId("ClkTimeDecimalTimeEntryValue").getValue();
	//                    }
	//                    if (a === "" || !this._isValidDecimalNumber(a)) {
	//                        t = this.oBundle.getText("FAV_TIME_ERROR");
	//                        sap.m.MessageToast.show(t);
	//                        return;
	//                    } else {
	//                        f.FavoriteDataFields.CATSHOURS = a;
	//                    }
	//                } else {
	//                    if (b === "" || e === "" || b === e) {
	//                        t = this.oBundle.getText("FAV_CLOCK_TIME_ERROR");
	//                        sap.m.MessageToast.show(t);
	//                        return;
	//                    } else {
	//                        f.FavoriteDataFields.BEGUZ = b;
	//                        f.FavoriteDataFields.ENDUZ = e;
	//                    }
	//                }
	//            }
	//            if (!this.oService) {
	//                this.oService = new hcm.mytimesheet.Service();
	//            }
	//            this.oService.createFavorite(this, f, function (d) {
	//                var c = {
	//                    name: d.Name,
	//                    type: d.ObjType,
	//                    id: d.ID,
	//                    FavoriteDataFields: d.FavoriteDataFields,
	//                    childs: [],
	//                    info: "",
	//                    subText: d.Field_Text,
	//                    active: true
	//                };
	//                var F = c.FavoriteDataFields;
	//                var g = s.oApplication.getModel("createScreenModel").getProperty("/favorites");
	//                for (var p in f.FavoriteDataFields) {
	//                    if (p !== "CATSHOURS" && p !== "BEGUZ" && p !== "ENDUZ") {
	//                        F[p] = f.FavoriteDataFields[p];
	//                        c.childs.push({
	//                            name: p,
	//                            value: F[p]
	//                        });
	//                    } else {
	//                        if (s.isClockEntry() && !s.clkTimeDurationFilled) {
	//                            var h = sap.ca.ui.model.format.DateFormat.getTimeInstance({ pattern: "HHmm" });
	//                            var i = sap.ca.ui.model.format.DateFormat.getTimeInstance({ style: "short" });
	//                            b = h.parse(b);
	//                            b = i.format(b);
	//                            e = h.parse(e);
	//                            e = i.format(e);
	//                        }
	//                        F[p] = f.FavoriteDataFields[p];
	//                        switch (p) {
	//                        case "CATSHOURS":
	//                            c.info = s.oBundle.getText("TOTAL_RECORDED_HOURS", [f.FavoriteDataFields.CATSHOURS]);
	//                            break;
	//                        case "BEGUZ":
	//                        case "ENDUZ":
	//                            c.info = s.oBundle.getText("WEEK_DATE_RANGE", [
	//                                b,
	//                                e
	//                            ]);
	//                        }
	//                    }
	//                }
	//                if (!d.Field_Text) {
	//                    var k = c.childs, l = "";
	//                    for (var j = 0; j < k.length; j++) {
	//                        l += k[j].name + ":" + k[j].value + ",";
	//                    }
	//                    l = l.substring(0, l.length - 1);
	//                    c.subText = l;
	//                }
	//                g.push(c);
	//                s.byId("timeAssignmentLbl").setVisible(true);
	//                s.byId("timeAssignment").setVisible(true);
	//                s.favDialog.close();
	//                s.oApplication.getModel("createScreenModel").refresh();
	//            });
	//        }
	//    },
	//    updateFavorites: function () {
	//        var f = {};
	//        var i;
	//        f.Name = this.editFavDialog.getContent()[0].getFormContainers()[0].getFormElements()[1].getFields()[0].getValue();
	//        var o = this.editFavDialog.getContent()[0].getFormContainers()[0].getFormElements()[0].getFields()[0].getSelectedItem().getText();
	//        var a = this.oApplication.getModel("createScreenModel").getProperty("/favorites");
	//        f.Pernr = this.oApplication.pernr;
	//        for (i = 0; i < a.length; i++) {
	//            if (o === a[i].name) {
	//                f.ID = a[i].id;
	//                a[i].name = f.Name;
	//                if (o === this.byId("timeAssignment").getValue()) {
	//                    this.byId("timeAssignment").setValue(f.Name);
	//                }
	//                break;
	//            }
	//        }
	//        if (!this.oService) {
	//            this.oService = new hcm.mytimesheet.Service();
	//        }
	//        this.oService.updateFavorite(this, f, jQuery.proxy(function () {
	//            this.oApplication.getModel("createScreenModel").setProperty("/favorites", a);
	//            this.oApplication.getModel("createScreenModel").refresh();
	//            this.editFavDialog.close();
	//        }, this));
	//    },
	//    setFavoritePostObject: function (n) {
	//        var f, a, b, v;
	//        f = {};
	//        b = {};
	//        var t = this.oApplication.getModel("accountingInfoModel").getData().types;
	//        a = n;
	//        var c = false;
	//        for (var i = 0; i < t.length; i++) {
	//            v = "";
	//            if (t[i].value !== "" && t[i].valueStateText !== "") {
	//                if (t[i].value !== "") {
	//                    v = t[i].valueStateText;
	//                    c = true;
	//                }
	//                b[t[i].fieldName] = v;
	//            }
	//        }
	//        if (c) {
	//            f = {
	//                Pernr: this.oApplication.pernr,
	//                Name: a,
	//                FavoriteDataFields: b
	//            };
	//        } else {
	//            f = null;
	//        }
	//        return f;
	//    },
	//    handleDelete: function (e) {
	//        var s = this;
	//        var a = e.getParameter("listItem");
	//        var b = a.getCustomData()[2].getValue();
	//        if (!this.oService) {
	//            this.oService = new hcm.mytimesheet.Service();
	//        }
	//        var f = {
	//            Name: e.getParameter("listItem").getTitle(),
	//            ID: b,
	//            Pernr: this.oApplication.pernr
	//        };
	//        this.oService.deleteFavorite(this, f, function () {
	//            e.getSource().removeItem(a);
	//            s.favoriteDeletedIds.push(b);
	//        });
	//    },
	//    editFavorites: function (e) {
	//        var s = this;
	//        var m = new sap.m.Button({
	//            text: s.oBundle.getText("DELETE_FAVORITES"),
	//            press: function (e) {
	//                s.manageFavorites(e);
	//                s.oApplication.getModel("createScreenModel").refresh();
	//                s.actionSheet.close();
	//            }
	//        });
	//        var E = new sap.m.Button({
	//            text: s.oBundle.getText("EDIT_FAVORITE"),
	//            press: function (e) {
	//                s.openEditfavDialog(e);
	//                s.actionSheet.close();
	//            }
	//        });
	//        var a = new sap.m.Button({
	//            text: s.oBundle.getText("SAVE_AS_FAV"),
	//            press: function (e) {
	//                s.openFavDialog();
	//                s.actionSheet.close();
	//            }
	//        });
	//        var A = new sap.m.ActionSheet({
	//            placement: sap.m.PlacementType.Top,
	//            showCancelButton: true,
	//            buttons: [
	//                E,
	//                m,
	//                a
	//            ]
	//        });
	//        A.openBy(e.getSource());
	//        this.actionSheet = A;
	//    },
	//    manageFavorites: function () {
	//        var s = this;
	//        var c = new sap.m.Button({ text: this.oBundle.getText("OK") });
	//        if (!this.oApplication.getModel("createScreenModel").getProperty("/favorites")) {
	//            this.getFavoritesCollection();
	//        }
	//        var d = new sap.m.StandardListItem({
	//            title: "{name}",
	//            description: "{subText}",
	//            active: "true",
	//            info: "{info}",
	//            customData: [
	//                new sap.ui.core.CustomData({
	//                    key: "items",
	//                    value: "{childs}"
	//                }),
	//                new sap.ui.core.CustomData({
	//                    key: "type",
	//                    value: "{type}"
	//                }),
	//                new sap.ui.core.CustomData({
	//                    key: "id",
	//                    value: "{id}"
	//                })
	//            ]
	//        });
	//        this.favList = new sap.m.List({ mode: "Delete" }).bindAggregation("items", "/favorites", d);
	//        this.favList.attachDelete(function (a) {
	//            s.handleDelete(a);
	//        });
	//        var e = new sap.m.Dialog({
	//            title: this.oBundle.getText("FAV_DIALOG_BOX"),
	//            content: [this.favList],
	//            beginButton: c,
	//            afterClose: jQuery.proxy(function () {
	//                e.destroy();
	//            }, this)
	//        });
	//        e.setModel(this.oApplication.getModel("createScreenModel"));
	//        c.attachPress(function () {
	//            if (s.favoriteDeletedIds.length) {
	//                var f = [], g = 0;
	//                var h = s.oApplication.getModel("createScreenModel").getProperty("/favorites");
	//                for (g = 0; g < s.favoriteDeletedIds.length; g++) {
	//                    for (var i = 0; i < h.length; i++) {
	//                        if (s.favoriteDeletedIds[g] === h[i].id) {
	//                            f.push(i);
	//                            break;
	//                        }
	//                    }
	//                }
	//                f.sort(function (a, b) {
	//                    return b - a;
	//                });
	//                for (i = 0; i < f.length; i++) {
	//                    h.splice(f[i], 1);
	//                }
	//                s.favoriteDeletedIds = [];
	//            }
	//            e.close();
	//        });
	//        e.open();
	//    },
	//    isClockEntry: function () {
	//        return this.clockEntry;
	//    },
	//    resetMainAndChildItems: function () {
	//        if ("mainItem" in this.entry) {
	//            this.deleteMainItem();
	//        }
	//        if ("subItems" in this.entry) {
	//            this.deleteSubItems();
	//        }
	//    },
	//    deleteMainItem: function () {
	//        delete this.entry.mainItem;
	//        delete this.entry.mainName;
	//        delete this.entry.mainCode;
	//    },
	//    deleteSubItems: function () {
	//        delete this.entry.subItems;
	//        delete this.entry.childItems;
	//        delete this.entry.childNames;
	//        delete this.entry.childCodes;
	//    },
	//    initializeChildItems: function () {
	//        this.entry.childItems = [];
	//        this.entry.childNames = [];
	//        this.entry.childCodes = [];
	//    },
	//    getHderFooterOptions: function () {
	//        if (this.oApplication.pernr) {
	//            var c = this.oApplicationFacade.getResourceBundle().getText("CANCEL");
	//            var r = this.oApplicationFacade.getResourceBundle().getText("RESET");
	//            var e = this.oApplicationFacade.getResourceBundle().getText("FAVORITE");
	//            var s = this.oApplication.getModel("S31modelexch");
	//            var a;
	//            if (!this.oApplication.getModel("TSM_WEEKLY").getData().releaseAllowed) {
	//                a = this.oApplicationFacade.getResourceBundle().getText("SAVE_DRAFT");
	//            } else {
	//                a = this.oApplicationFacade.getResourceBundle().getText("SUBMIT");
	//            }
	//            var b;
	//            if (!s) {
	//                b = this.oApplicationFacade.getResourceBundle().getText("TIMESHEET_CREATE_ENTRY_TITLE");
	//            } else {
	//                if (s.getProperty("/editentryview")) {
	//                    b = this.oApplicationFacade.getResourceBundle().getText("TIMESHEET_EDIT_ENTRY_TITLE_SCREEN");
	//                } else {
	//                    b = this.oApplicationFacade.getResourceBundle().getText("TIMESHEET_CREATE_ENTRY_TITLE");
	//                }
	//            }
	//            var t = this;
	//            var v = {
	//                sId: "SUBMIT_BTN",
	//                sI18nBtnTxt: a,
	//                onBtnPressed: function (d) {
	//                    t.onDone(d);
	//                }
	//            };
	//            var o = {
	//                sI18NFullscreenTitle: b,
	//                oEditBtn: v,
	//                buttonList: [
	//                    {
	//                        sId: "cancelBtn",
	//                        sI18nBtnTxt: c,
	//                        onBtnPressed: function (d) {
	//                            t.onCancel(d);
	//                        }
	//                    },
	//                    {
	//                        sId: "resetBtn",
	//                        sI18nBtnTxt: r,
	//                        onBtnPressed: function () {
	//                            t.onReset();
	//                        }
	//                    }
	//                ],
	//                onBack: jQuery.proxy(function () {
	//                    this.onNavButton();
	//                }, this)
	//            };
	//            if (this.oApplication.getModel("TSM_WEEKLY").getData().favoriteAvailable) {
	//                o.buttonList[2] = {
	//                    sId: "EditFavoriteBtn",
	//                    sI18nBtnTxt: e,
	//                    onBtnPressed: function (d) {
	//                        t.editFavorites(d);
	//                    }
	//                };
	//            }
	//            var m = new sap.ui.core.routing.HashChanger();
	//            var u = m.getHash();
	//            if (u.indexOf("Shell-runStandaloneApp") >= 0) {
	//                o.bSuppressBookmarkButton = true;
	//            }
	//            if (this.extHookChangeHeaderFooterOptions) {
	//                o = this.extHookChangeHeaderFooterOptions(o);
	//            }
	//            this.setHeaderFooterOptions(o);
	//        }
	//    }
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
	ngoGetCurrentWeek: function(e){
		var s = this;
		var m = s.byId("weeklyCalendar");
		var n = m.getCurrentDate();
		console.log(n);
	}
});