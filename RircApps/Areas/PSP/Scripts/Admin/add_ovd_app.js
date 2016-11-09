var add_ovd_app = {

    _span_add_succes : $( '#add_succes' ),
    _btn_add         : $( '#add'        ),
    _input_ovd       : $( '#input_ovd'  ),



    init: function () {
        with (this) {
            _init_add_ovd_events()
        }
    },

    /// Get functions.
    get_span_add_succes : function() { return this._span_add_succes; },
    get_btn_add         : function() { return this._btn_add;         },
    get_input_ovd       : function() { return this._input_ovd;       },



    /// Events.

    _init_add_ovd_events: function () {
        this.default_state_for_add_ovd();
        this._on_click_btn_add();
    },

    _on_click_btn_add: function () {
        var btn_add = this.get_btn_add();

        btn_add.on( 'click', function () {
            var input_ovd_val = add_ovd_app.get_input_ovd().val();
            add_ovd_app.get_span_add_succes().hide();

            if ( input_ovd_val != '' ) {

                main_app.show_ajax_loader();

                var jqxhr = $.get( '/PSP/Administration/AddOvd?ovd=' + input_ovd_val, function () { } )
                             .done( function ( data ) {
                                 main_app.hide_ajax_loader();

                                 if ( $.isNumeric( data ) ) {
                                     add_ovd_app.get_span_add_succes().show();
                                 }
                                 else {
                                     error_wndw_app.set_error_window_message( 'При обработке запроса "AddOvd" возникли ошибки, обратитесь пожалуйста к администратору! ' + data );
                                     error_wndw_app.show_error_window();
                                 }

                             } )
                             .fail( function () {
                                 main_app.hide_ajax_loader();

                                 error_wndw_app.set_error_window_message( 'При обработке запроса "AddOvd" возникли ошибки, обратитесь пожалуйста к администратору!' );
                                 error_wndw_app.show_error_window();
                             } );
            }
            else {
                error_wndw_app.set_error_window_message( 'Поле ввода не должно быть пустым!' );
                error_wndw_app.show_error_window();
            }
        } )
    },

    /// Other functions.
    default_state_for_add_ovd: function () {
        var span_add_succes = this.get_span_add_succes();

        span_add_succes.hide();
    }
}