var change_flat_app = {

    _area_flat_info     : $( '#flat_info'     ),
    _btn_search         : $( '#search'        ), 
    _inputKartId        : $( '#inputKartId'   ),
    _span_change_succes : $( '#change_succes' ),
    _input_kartIdInfo   : $( '#kartIdInfo'    ),
    _input_addres       : $( '#addres'        ),
    _input_flatInfo     : $( '#flatInfo'      ),
    _btn_change_flat    : $( '#change_flat_btn'),
    _input_newFlat      : $( '#newFlat'       ),
    _confirm_win        : $( '#confirm_win'   ),



    init: function () {
        with (this) {
            _init_change_flat_events()
        }
    },

    /// Get functions.
    get_area_flat_info      : function(){ return this._area_flat_info;        },
    get_btn_search          : function(){ return this._btn_search;            },
    get_inputKartId         : function(){ return this._inputKartId;           },
    get_span_change_succes  : function(){ return this._span_change_succes;    },
    get_input_kartIdInfo    : function(){ return this._input_kartIdInfo;      },
    get_input_addres        : function(){ return this._input_addres;          },
    get_input_flatInfo      : function(){ return this._input_flatInfo;        },
    get_btn_change_flat     : function(){ return this._btn_change_flat;       },
    get_input_newFlat       : function(){ return this._input_newFlat;         },
    get_confirm_win         : function(){ return this._confirm_win;           },    

    /// Set functions.

    /// Events.
    _init_change_flat_events: function () {
        this._on_click_btn_search();
        this._on_click_btn_change_flat();
        this.default_state_for_del_change_flat();
    },

    _on_click_btn_search: function () {
        var btn_search         = this.get_btn_search();
        var div_area_flat_info = this.get_area_flat_info();

        btn_search.on( 'click', function () {
            var input_kart_id_val = change_flat_app.get_inputKartId().val();
            change_flat_app.get_span_change_succes().hide();

            if ( input_kart_id_val.match( /\d+/ ) ) {

                main_app.show_ajax_loader();
                var input_kartIdInfo = change_flat_app.get_input_kartIdInfo();
                var input_addres     = change_flat_app.get_input_addres();
                var input_flatInfo   = change_flat_app.get_input_flatInfo();

                var jqxhr = $.get( '/PSP/Administration/GetFlatInfo?kartId=' + input_kart_id_val, function () { } )
                             .done( function ( data ) {
                                 if ( data[0] != null ) {

                                     input_kartIdInfo.val( data[0] );
                                     input_addres    .val( data[1] );
                                     input_flatInfo  .val( data[2] );

                                     main_app.fade_in_block( div_area_flat_info );
                                     main_app.hide_ajax_loader();
                                 }
                                 else {
                                     main_app.fade_out_block( div_area_flat_info );
                                     main_app.hide_ajax_loader();
                                     error_wndw_app.set_error_window_message( 'Запись с таким номером отсутствует!' );
                                     error_wndw_app.show_error_window();
                                 }
                             } )
                             .fail( function () {
                                 main_app.hide_ajax_loader();

                                 error_wndw_app.set_error_window_message( 'При обработке запроса "GetPersonInfo" возникли ошибки, обратитесь пожалуйста к администратору!' );
                                 error_wndw_app.show_error_window();
                             } );
            }
            else {
                error_wndw_app.set_error_window_message( 'Данные в поле ввода "Карточка №" не удовлетворяют условию - только цифры!' );
                error_wndw_app.show_error_window();
            }
        } )
    },

    _on_click_btn_change_flat: function () {
        var btn_change_flat = this.get_btn_change_flat();

        btn_change_flat.on( 'click', function () {
            var input_newFlat = change_flat_app.get_input_newFlat().val();
            var confirm_win = change_flat_app.get_confirm_win();

            if ( input_newFlat != '' ) {

                confirm_win.modal( 'show' );

                $( '#confirm' ).one( 'click', function () {

                    var input_kartIdInfo = change_flat_app.get_input_kartIdInfo().val();

                    var jqxhr = $.get( '/PSP/Administration/ChangeFlat?kartId=' + input_kartIdInfo + '&newFlat=' + input_newFlat, function () { confirm_win.modal( 'hide' ); } )
                                 .done( function ( data ) {
                                     if ( data ) {
                                         main_app.hide_ajax_loader();
                                         change_flat_app.get_span_change_succes().show();
                                     }
                                     else {
                                         change_flat_app.get_span_change_succes().hide();
                                         main_app.hide_ajax_loader();
                                         error_wndw_app.set_error_window_message( 'При обработке запроса "ChangeFlat" возникли ошибки, обратитесь пожалуйста к администратору!' );
                                         error_wndw_app.show_error_window();
                                     }
                                 } )
                                 .fail( function () {
                                     main_app.hide_ajax_loader();

                                     error_wndw_app.set_error_window_message( 'При обработке запроса "ChangeFlat" возникли ошибки, обратитесь пожалуйста к администратору!' );
                                     error_wndw_app.show_error_window();
                                 } );
                } )
            }
            else {
                error_wndw_app.set_error_window_message( 'Заполните пожалуйста поле "Новый номер"!' );
                error_wndw_app.show_error_window();
            }
        } )
    },

    /// Other functions.
    default_state_for_del_change_flat: function () {
        var div_area_flat_info = this.get_area_flat_info();
        var span_change_succes = this.get_span_change_succes()

        div_area_flat_info.hide();
        span_change_succes.hide();
    }
}