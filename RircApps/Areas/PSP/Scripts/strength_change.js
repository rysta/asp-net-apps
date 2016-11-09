strenght_change_app = {
    _input_date_fn_from: $('#inputDateFN_from_strength_change'),
    _input_date_fn_before: $('#inputDateFN_before_strength_change'),
    _table_for_report: $('#table_for_report'),
    _btn_search_strength_change: $('#search_strength_change'),
    _btn_export_to_excel: $('#export_to_excel'),
    _du_items: $('#du'),
    panel_du: $('#panel_du'),

    init: function () {
        with (this) {
            _init_strenght_change_app_events();
            _init_fill_items_du();
        }
    },

    /// Get functions.
    get_input_date_fn_from: function () {
        return this._input_date_fn_from;
    },

    get_input_date_fn_before: function () {
        return this._input_date_fn_before;
    },

    get_table_for_report: function () {
        return this._table_for_report;
    },

    get_btn_search_strength_change: function () {
        return this._btn_search_strength_change;
    },

    get_btn_export_to_excel: function () {
        return this._btn_export_to_excel;
    },

    get_du_items: function () {
        return this._du_items;
    },
    get_panel_du: function () {
        return this.panel_du;
    },


    /// Set functions.
    set_default_mask_in_input_for_strength_change: function () {
        var div_input_date_fn_from = this.get_input_date_fn_from()
                                  .inputmask('99.99.9999');
        var div_input_date_fn_beforey = this.get_input_date_fn_before()
                                  .inputmask('99.99.9999');
    },

    /// Events.
    _init_strenght_change_app_events: function () {
        this.set_default_mask_in_input_for_strength_change();
        this.default_state_for_strength_change();
        this.setPanelHeight();
        this._on_click_btn_search_strength_change();
        this._on_click_btn_export_to_excel_strenght_change();
    },

    _init_fill_items_du: function () {
        var div_du_items = this.get_du_items();
        var arr_chckbx = '';
        main_app.show_ajax_loader();
        var jqxhr = $.get('/PSP/Home/GetDUItems', function () { })
                 .done(function (data) {
                     div_du_items.empty();
                     for (var i = 0; i < data.length; i++) {
                         arr_chckbx += '<div class="checkbox"><label><input type="checkbox" value=' + data[i].Du_id + '>' + data[i].DuName + '</label></div>'
                     };
                     div_du_items.append(arr_chckbx);
                     main_app.hide_ajax_loader();
                 })

                 .fail(function () {
                     main_app.hide_ajax_loader();
                     error_wndw_app.set_error_window_message('При обработке запроса "GetDUItems" возникли ошибки, обратитесь пожалуйста к администратору!');
                     error_wndw_app.show_error_window();
                 });
    },

    _on_click_btn_search_strength_change: function () {
        var div_btn_search_strength_change = this.get_btn_search_strength_change();
        var table_for_report = this.get_table_for_report();

        div_btn_search_strength_change.on('click', function () {
            var div_input_date_fn_from = strenght_change_app.get_input_date_fn_from()
                                         .val();
            var div_input_date_fn_before = strenght_change_app.get_input_date_fn_before()
                                                     .val();
            var checked_checkbox = strenght_change_app.checked_checkbox();

            if (div_input_date_fn_from != 0 && div_input_date_fn_before) {
                main_app.show_ajax_loader();
                var jqxhr = $.get('/PSP/Home/GetStrengthChangeRegistrationReport?dateFrom=' + div_input_date_fn_from + '&dateBefore=' + div_input_date_fn_before + '&duItems=' + checked_checkbox, function () { })
                         .done(function (data) {
                             main_app.fade_out_block(table_for_report);
                             strenght_change_app.draw_table_strenght_change_report(data, $('#panel1 > div > table'));
                             main_app.fade_in_block(table_for_report)
                             main_app.hide_ajax_loader();
                         })

                         .fail(function () {
                             main_app.hide_ajax_loader();
                             error_wndw_app.set_error_window_message('При обработке запроса "GetStrengthChangeRegistrationReport" возникли ошибки, обратитесь пожалуйста к администратору!');
                             error_wndw_app.show_error_window();
                         });
                var jqxhrg = $.get('/PSP/Home/GetStrengthChangeDropOutReport?dateFrom=' + div_input_date_fn_from + '&dateBefore=' + div_input_date_fn_before + '&duItems=' + checked_checkbox, function () { })
                         .done(function (data) {
                             //main_app.fade_out_block(table_for_report);
                             strenght_change_app.draw_table_strenght_change_report(data, $('#panel2 > div > table'));
                             main_app.hide_ajax_loader();
                         })

                         .fail(function () {
                             main_app.hide_ajax_loader();
                             error_wndw_app.set_error_window_message('При обработке запроса "GetStrengthChangeDropOutReport" возникли ошибки, обратитесь пожалуйста к администратору!');
                             error_wndw_app.show_error_window();
                         });
            }
            else {
                error_wndw_app.set_error_window_message('Не все поля отчёта заполнены! Заполните пожалуйста все поля ввода и попробуйте ещё раз.');
                error_wndw_app.show_error_window();
            }
        })
    },

    _on_click_btn_export_to_excel_strenght_change: function () {
        var div_btn_export_to_excel = this.get_btn_export_to_excel();

        div_btn_export_to_excel.on('click', function () {
            main_app.show_ajax_loader();
            var jqxhrq = $.get('/PSP/Home/GetStrengthChangeRegistrationReportExcel', function () { })
                    .done(function (data) {
                        main_app.hide_ajax_loader();
                        window.location.href = '/Areas/PSP/Reports/ReportStrengthChange.xlsx';
                    })

                     .fail(function () {
                         main_app.hide_ajax_loader();
                         error_wndw_app.set_error_window_message('При обработке запроса "GetStrengthChangeRegistrationReportExcel" возникли ошибки, обратитесь пожалуйста к администратору!');
                         error_wndw_app.show_error_window();
                     });
        });
    },

    /// Other functions.
    default_state_for_strength_change: function () {
        var div_table_for_report = this.get_table_for_report();
        div_table_for_report.hide();
    },

    setPanelHeight: function () {
        var winHeight = $(window).height();
        var panel = this.get_panel_du();
        panel.attr("style", "overflow-y:scroll; height:" + winHeight * 0.38 + "px;");
    },

    checked_checkbox: function () {
        var checked = $(':checkbox:checked').map(function () { return this.value; }).get().join(',');
        //var from = checked.search(',on');
        //var checked_val = checked.substring(from, checked);
        return checked;
    },

    draw_table_strenght_change_report: function (list_data, selector) {
        var div_table_for_report = this.get_table_for_report();
        var rows_table = '<tr>'
                                    + '<th>№ п/п</th>'
                                    + '<th>Адрес регистрации</th>'
                                    + '<th>Наименование УК</th>'
                                    + '<th>Дата регистрации</th>'
                                    + '<th>Дата убытия</th>'
                                    + '</tr>';
        for (var i = 0; i < list_data.length; i++) {
            rows_table +=
                                '<tr>'
                                  + '<td>' + list_data[i].NumberStepByStep + '</td>'
                                  + '<td>' + list_data[i].RegAddres + '</td>'
                                  + '<td>' + list_data[i].RegulatoryOrganization + '</td>'
                                  + '<td>' + list_data[i].RegDate + '</td>'
                                  + '<td>' + list_data[i].DateRegOut + '</td>'
                                + '</tr>';
        };
        selector.empty();
        selector.append(rows_table);
    }
}