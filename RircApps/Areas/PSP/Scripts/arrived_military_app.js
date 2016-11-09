var arrived_military_app = {
    _inputDateRD_from_arrived_military: $('#inputDateRD_from_arrived_military'),
    _inputDateRD_before_arrived_military: $('#inputDateRD_before_arrived_military'),
    _inputDateST_from_arrived_military: $('#inputDateST_from_arrived_military'),
    _inputDateST_before_arrived_military: $('#inputDateST_before_arrived_military'),
    _table_for_report: $('#table_for_report'),
    _btn_search_arrived_military: $('#search_arrived_military'),
    _btn_export_to_excel: $('#export_to_excel'),

    init: function () {
        with (this) {
            _init_arrived_military_app_events();
        }
    },

    /// Get functions.
    get_inputDateRD_from_arrived_military: function () {
        return this._inputDateRD_from_arrived_military;
    },

    get_inputDateRD_before_arrived_military: function () {
        return this._inputDateRD_before_arrived_military;
    },

    get_inputDateST_from_arrived_military: function () {
        return this._inputDateST_from_arrived_military;
    },

    get_inputDateST_before_arrived_military: function () {
        return this._inputDateST_before_arrived_military;
    },

    get_table_for_report: function () {
        return this._table_for_report;
    },

    get_btn_search_arrived_military: function () {
        return this._btn_search_arrived_military;
    },

    get_btn_export_to_excel: function () {
        return this._btn_export_to_excel;
    },

    /// Set functions.
    set_default_mask_in_input_for_arrived_military: function () {
        var div_inputDateRD_from_arrived_military = this.get_inputDateRD_from_arrived_military();
        div_inputDateRD_from_arrived_military.inputmask('99.99.9999');

        var div_inputDateRD_before_arrived_military = this.get_inputDateRD_before_arrived_military();
        div_inputDateRD_before_arrived_military.inputmask('99.99.9999');

        var div_inputDateST_from_arrived_military = this.get_inputDateST_from_arrived_military();
        div_inputDateST_from_arrived_military.inputmask('99.99.9999');

        var div_inputDateST_before_arrived_military = this.get_inputDateST_before_arrived_military();
        div_inputDateST_before_arrived_military.inputmask('99.99.9999');
    },


    /// Events.
    _init_arrived_military_app_events: function () {
        this.set_default_mask_in_input_for_arrived_military();
        this.default_state_for_arrived_military();
        this._on_click_btn_search_arrived_military();
        this._on_click_btn_export_to_excel_arrived_military();
    },

    _on_click_btn_search_arrived_military: function () {
        var div_btn_search_arrived_military = this.get_btn_search_arrived_military();
        var table_for_report = this.get_table_for_report();

        div_btn_search_arrived_military.on('click', function () {
            var div_inputDateRD_from_arrived_military = arrived_military_app.get_inputDateRD_from_arrived_military()
                                                     .val();
            var div_inputDateRD_before_arrived_military = arrived_military_app.get_inputDateRD_before_arrived_military()
                                                     .val();
            var div_inputDateST_from_arrived_military = arrived_military_app.get_inputDateST_from_arrived_military()
                                                     .val();
            var div_inputDateST_before_arrived_military = arrived_military_app.get_inputDateST_before_arrived_military()
                                                     .val();
            if (div_inputDateRD_from_arrived_military != 0 && div_inputDateRD_from_arrived_military != 0 && div_inputDateST_from_arrived_military != 0 && div_inputDateST_before_arrived_military != 0) {
                main_app.show_ajax_loader();
                var jqxhr = $.get('/PSP/Home/GetArrivedMilitaryReport?dateRDFrom=' + div_inputDateRD_from_arrived_military + '&dateRDBefore=' + div_inputDateRD_before_arrived_military + '&dateSTFrom=' + div_inputDateST_from_arrived_military + '&dateSTBefore=' + div_inputDateST_before_arrived_military, function () { })
                         .done(function (data) {
                             main_app.fade_out_block(table_for_report);
                             arrived_military_app.draw_table_arrived_military_report(data);
                             main_app.fade_in_block(table_for_report)
                             main_app.hide_ajax_loader();
                         })

                         .fail(function () {
                             main_app.hide_ajax_loader();
                             error_wndw_app.set_error_window_message('При обработке запроса "_on_click_btn_search_arrived_military" возникли ошибки, обратитесь пожалуйста к администратору!');
                             error_wndw_app.show_error_window();
                         });
            }
            else {
                error_wndw_app.set_error_window_message('Не все поля отчёта заполнены! Заполните пожалуйста все поля ввода и попробуйте ещё раз.');
                error_wndw_app.show_error_window();
            }
        });
    },

    _on_click_btn_export_to_excel_arrived_military: function () {
        var div_btn_export_to_excel = this.get_btn_export_to_excel();

        div_btn_export_to_excel.on('click', function () {
                main_app.show_ajax_loader();
                var jqxhrq = $.get('/PSP/Home/GetArrivedMilitaryReportExcel', function () { })
                        .done(function (data) {
                            window.location.href = '/Areas/PSP/Reports/ReportArrivedMilitary.xlsx';
                            main_app.hide_ajax_loader();
                        })

                         .fail(function () {
                             main_app.hide_ajax_loader();
                             error_wndw_app.set_error_window_message('При обработке запроса "GetArrivedMilitaryReportExcel" возникли ошибки, обратитесь пожалуйста к администратору!');
                             error_wndw_app.show_error_window();
                         });
        });
    },

    /// Other functions.
    default_state_for_arrived_military: function () {
        var div_table_for_report = this.get_table_for_report();
        div_table_for_report.hide();
    },

    draw_table_arrived_military_report: function (list_data) {
        var div_table_for_report = this.get_table_for_report();
        var rows_table = '<tr>'
                                    + '<th>ПРУ</th>'
                                    + '<th>№ п/п</th>'
                                    + '<th>ФИО</th>'
                                    + '<th>Дата рождения</th>'
                                    + '<th>Адрес регистрации</th>'
                                    + '<th>Дата регистрации</th>'
                                    + '<th>Откуда прибыл</th>'
                                    + '<th>Вид регистрации</th>'
                                    + '<th>Кем выдан паспорт</th>'
                                    + '<th>УК</th>'
                                    + '</tr>';
        for (var i = 0; i < list_data.length; i++) {
            rows_table +=
                                '<tr>'
                                  + '<td>' + list_data[i].NumberPRU + '</td>'
                                  + '<td>' + list_data[i].NumberStepByStep + '</td>'
                                  + '<td>' + list_data[i].FIO + '</td>'
                                  + '<td>' + list_data[i].DateOfBirth + '</td>'
                                  + '<td>' + list_data[i].RegAddres + '</td>'
                                  + '<td>' + list_data[i].DateRegOut + '</td>'
                                  + '<td>' + list_data[i].WhichSent + '</td>'
                                  + '<td>' + list_data[i].RegType + '</td>'
                                  + '<td>' + list_data[i].PassportWhoGive + '</td>'
                                  + '<td>' + list_data[i].RegulatoryOrganization + '</td>'
                                + '</tr>';
        };
        div_table_for_report.find('table').empty();
        div_table_for_report.find('table').append(rows_table);
    }


}