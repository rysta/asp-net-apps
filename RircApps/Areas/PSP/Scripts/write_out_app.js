var write_out_app = {
    _input_date_fn_from: $('#inputDateFN_from_write_out'),
    _input_date_fn_before: $('#inputDateFN_before_write_out'),
    _table_for_report: $('#table_for_report'),
    _btn_search_write_out: $('#search_write_out'),
    _export_to_excel: $('#export_to_excel'),


    init: function () {
        with (this) {
            _init_write_out_app_events();
        }
    },

    /// Get functions.
    get_div_input_date_fn_from: function () {
        return this._input_date_fn_from;
    },

    get_div_input_date_fn_before: function () {
        return this._input_date_fn_before;
    },

    get_btn_search_write_out: function () {
        return this._btn_search_write_out;
    },

    get_table_for_report: function () {
        return this._table_for_report;
    },

    get_btn_export_to_excel: function () {
        return this._export_to_excel;
    },


    /// Set functions.
    set_default_mask_in_input: function () {
        var div_input_date_fn_from = this.get_div_input_date_fn_from();
        div_input_date_fn_from.inputmask('99.99.9999');

        var div_input_date_fn_before = this.get_div_input_date_fn_before();
        div_input_date_fn_before.inputmask('99.99.9999');
    },


    /// Other functions.
    default_state: function () {
        var div_table_for_report = this.get_table_for_report();
        div_table_for_report.hide();
    },

    draw_table_report: function (list_data) {
        var div_table_for_report = this.get_table_for_report();
        var rows_table = '<tr>'
                                    + '<th>ПРУ</th>'
                                    + '<th>№ п/п</th>'
                                    + '<th>ФИО</th>'
                                    + '<th>Дата рождения</th>'
                                    + '<th>Адрес регистрации</th>'
                                    + '<th>Дата снятия с учета</th>'
                                    + '<th>Куда выбыл</th>'
                                    + '<th>Вид регистрации</th>'
                                    + '<th>Дата смерти</th>'
                                    + '<th>Управляющая организация</th>'
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
                                  + '<td>' + list_data[i].DateOfDeath + '</td>'
                                  + '<td>' + list_data[i].RegulatoryOrganization + '</td>'
                                + '</tr>';
        };
        div_table_for_report.find('table').empty();
        div_table_for_report.find('table').append(rows_table);
    },

    /// Events.
    _init_write_out_app_events: function () {
        this.set_default_mask_in_input();
        this.default_state();
        this._on_click_btn_search_write_out();
        this._on_click_btn_export_to_excel();

    },

    _on_click_btn_search_write_out: function () {
        var div_btn_search_write_out = this.get_btn_search_write_out();
        var div_input_date_fn_from = this.get_div_input_date_fn_from();
        var div_input_date_fn_before = this.get_div_input_date_fn_before();
        var table_for_report = this.get_table_for_report();

        div_btn_search_write_out.on('click', function () {

            var val_div_input_date_fn_from = div_input_date_fn_from.val();
            var val_div_input_date_fn_before = div_input_date_fn_before.val();

            if (val_div_input_date_fn_from != 0 && val_div_input_date_fn_before != 0) {
                main_app.show_ajax_loader();
                var jqxhr = $.get('/PSP/Home/GetWriteOutReport?dateFrom=' + val_div_input_date_fn_from + '&dateBefore=' + val_div_input_date_fn_before, function () { })
                         .done(function (data) {

                             main_app.fade_out_block(table_for_report);
                             write_out_app.draw_table_report(data);
                             main_app.fade_in_block(table_for_report)
                             main_app.hide_ajax_loader();
                         })

                         .fail(function () {
                             main_app.hide_ajax_loader();
                             error_wndw_app.set_error_window_message('При обработке запроса "_on_click_btn_search_write_out" возникли ошибки, обратитесь пожалуйста к администратору!');
                             error_wndw_app.show_error_window();
                         });
            }
            else {
                error_wndw_app.set_error_window_message('Не все поля отчёта заполнены! Заполните пожалуйста все поля ввода и попробуйте ещё раз.');
                error_wndw_app.show_error_window();
            }
        });

    },
 
    _on_click_btn_export_to_excel: function () {

        var div_btn_export_to_excel = this.get_btn_export_to_excel();

        div_btn_export_to_excel.on('click', function () {
            main_app.show_ajax_loader();

            var jqxhrq = $.get('/PSP/Home/GetWriteOutReportExcel', function () { })
                    .done(function (data) {
                        window.location.href = '/Areas/PSP/Reports/ReportWriteOut.xlsx';
                            main_app.hide_ajax_loader();
                    })

                     .fail(function () {
                         main_app.hide_ajax_loader();
                         error_wndw_app.set_error_window_message('При обработке запроса "GetWriteOutReportExcel" возникли ошибки, обратитесь пожалуйста к администратору!');
                         error_wndw_app.show_error_window();
                     });
        });
    },

}