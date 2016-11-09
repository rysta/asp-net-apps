var del_kart_app = {

    _area_kart_info  : $( '#kart_info'     ),
    _span_del_succes : $( '#del_succes'    ),
    _btn_search      : $( '#search'        ),
    _input_kart_id   : $( '#input_kart_id' ),
    _person_table    : $( '#person_table'  ),
    _del_kart_btn    : $( '#del_kart_btn'  ),
    _confirm_win     : $( '#confirm_win'   ),



    init: function () {
        with (this) {
            _init_del_kart_events()
        }
    },

    /// Get functions.
    get_area_kart_info  : function () { return this._area_kart_info;  },

    get_span_del_succes : function () { return this._span_del_succes; },

    get_btn_search      : function () { return this._btn_search;      },

    get_input_kart_id   : function () { return this._input_kart_id;   },

    get_person_list     : function () { return this._person_table;    },

    get_del_kart        : function () { return this._del_kart_btn;        },

    get_confirm_win     : function () { return this._confirm_win;     },

    /// Set functions.

    /// Events.
    _init_del_kart_events: function () {
        this.default_state_for_del_kart();
        this._on_click_btn_search();
        this._on_click_btn_del_kart();
    },

    _on_click_btn_search: function() {
        var btn_search = this.get_btn_search();
        var div_area_kart_info = this.get_area_kart_info();

        btn_search.on( 'click', function () {
            var input_kart_id_val = del_kart_app.get_input_kart_id().val();
            del_kart_app.get_span_del_succes().hide();

            if ( input_kart_id_val.match( /\d+/ ) ) {

                main_app.show_ajax_loader();

                var jqxhr = $.get( '/PSP/Administration/GetKartInfo?kart_id=' + input_kart_id_val, function () { } )
                             .done( function ( data ) {
                                 if ( data.length != 0 ) {

                                     del_kart_app.draw_table_kart_info( data );
                                     main_app.fade_in_block( div_area_kart_info );
                                     main_app.hide_ajax_loader();
                                 }
                                 else {
                                     main_app.fade_out_block( div_area_kart_info );
                                     main_app.hide_ajax_loader();
                                     error_wndw_app.set_error_window_message( 'Запись с таким номером отсутствует!' );
                                     error_wndw_app.show_error_window();
                                 }
                             } )
                             .fail( function () {
                                 main_app.hide_ajax_loader();

                                 error_wndw_app.set_error_window_message( 'При обработке запроса "GetKartInfo" возникли ошибки, обратитесь пожалуйста к администратору!' );
                                 error_wndw_app.show_error_window();
                             } );
            }
            else {
                error_wndw_app.set_error_window_message( 'Данные в поле ввода "Карточка №" не удовлетворяют условию - только цифры!' );
                error_wndw_app.show_error_window();
            }
        } )
    },

    _on_click_btn_del_kart: function () {
        var btn_del_kart = this.get_del_kart();

        btn_del_kart.on( 'click', function () {

            var confirm_win = del_kart_app.get_confirm_win();

            confirm_win.modal( 'show' );

            $( '#confirm' ).one( 'click', function () {

                var kart_id = del_kart_app.get_person_list().children().children(':first').attr('kart_id');

                var jqxhr = $.get( '/PSP/Administration/DelCard?kart_id=' + kart_id, function () { confirm_win.modal( 'hide' ); } )
                             .done( function ( data ) {
                                 if ( data ) {
                                     main_app.hide_ajax_loader();
                                     del_kart_app.get_span_del_succes().show();
                                 }
                                 else {
                                     del_kart_app.get_span_del_succes().show();
                                     main_app.hide_ajax_loader();
                                     error_wndw_app.set_error_window_message( 'При обработке запроса "DelCard" возникли ошибки, обратитесь пожалуйста к администратору!' );
                                     error_wndw_app.show_error_window();
                                 }
                             } )
                             .fail( function () {
                                 main_app.hide_ajax_loader();

                                 error_wndw_app.set_error_window_message( 'При обработке запроса "DelCard" возникли ошибки, обратитесь пожалуйста к администратору!' );
                                 error_wndw_app.show_error_window();
                             } );
            } )
        } )
    },

    /// Other functions.
    default_state_for_del_kart: function () {
        var div_kart_info   = this.get_area_kart_info();
        var span_del_succes = this.get_span_del_succes();

        div_kart_info.hide();
        span_del_succes.hide();
    },

    draw_table_kart_info: function ( list_data ) {
        var div_get_person_list = this.get_person_list();
        var rows_table = '<tr kart_id=' + list_data[0][0] +'>'
                            + '<th>Номер карточки</th>'
                            + '<th>Номер человека</th>'
                            + '<th>Дата рождения</th>'
                            + '<th>ФИО</th>'
                            + '</tr>';
        for ( var i = 0; i < list_data.length; i++ ) {
            rows_table +=
                                '<tr>'
                                  + '<td>' + list_data[i][0] + '</td>'
                                  + '<td>' + list_data[i][1] + '</td>'
                                  + '<td>' + list_data[i][2] + '</td>'
                                  + '<td>' + list_data[i][3] + '</td>'
                                + '</tr>';
        };
        div_get_person_list.empty();
        div_get_person_list.append( rows_table );
    }
}