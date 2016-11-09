var del_person_registration_app = {

    _area_person_info    : $( '#person_info'   ),
    _btn_del_person      : $( '#del_person'    ),
    _btn_search          : $( '#search'        ),   
    _inputPersonID       : $( '#inputPersonID' ),
    _input_personIDInfo  : $( '#personIDInfo'  ),
    _input_personFIOInfo : $( '#personFIOInfo' ),
    _confirm_win         : $( '#confirm_win'   ),
    _del_succes          : $( '#del_succes'    ),


    init: function () {
        with (this) {
            _init_del_person_events()
        }
    },

    /// Get functions.
    get_btn_del_person      : function () { return this._btn_del_person;      },
    get_area_person_info    : function () { return this._area_person_info;    },
    get_btn_search          : function () { return this._btn_search;          },
    get_inputPersonID       : function () { return this._inputPersonID;       },
    get_input_personIDInfo  : function () { return this._input_personIDInfo;  },
    get_input_personFIOInfo : function () { return this._input_personFIOInfo; },
    get_confirm_win         : function () { return this._confirm_win;         },
    get_del_succes          : function () { return this._del_succes;          },

    /// Set functions.

    /// Events.
    _init_del_person_events: function () {
        this._on_click_btn_del_person();
        this._on_click_btn_search();
        this.default_state_for_del_person_registration();
    },

    _on_click_btn_del_person: function () {
        var div_btn_del_person = this.get_btn_del_person();

    },

    _on_click_btn_search: function () {
        var btn_search           = this.get_btn_search();
        var div_area_person_info = this.get_area_person_info();

        btn_search.on( 'click', function () { 
            var input_person_id_val = del_person_registration_app.get_inputPersonID().val();
            del_person_registration_app.get_del_succes().hide();

            if ( input_person_id_val.match( /\d+/ ) ) {

                main_app.show_ajax_loader();

                var input_personIDInfo = del_person_registration_app.get_input_personIDInfo();
                var input_personFIOInfo = del_person_registration_app.get_input_personFIOInfo();

                var jqxhr = $.get( '/PSP/Administration/GetPersonInfo?person=' + input_person_id_val, function () { } )
                             .done( function ( data ) {
                                 if ( data[0] != null ) {
                                     input_personIDInfo.val( data[0] );
                                     input_personFIOInfo.val( data[1] );
                                     main_app.fade_in_block( div_area_person_info );
                                     main_app.hide_ajax_loader();
                                 }
                                 else {
                                     main_app.fade_out_block( div_area_person_info );
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
                error_wndw_app.set_error_window_message( 'Данные в поле ввода "Человек №" не удовлетворяют условию - только цифры!' );
                error_wndw_app.show_error_window();
            }
        } )
    },

    _on_click_btn_del_person: function () {
        var btn_del_person = this.get_btn_del_person();

        btn_del_person.on( 'click', function () {

            var confirm_win = del_person_registration_app.get_confirm_win();

            confirm_win.modal( 'show' );

            $( '#confirm' ).one( 'click', function () {

                var input_personIdInfo_val = del_person_registration_app.get_input_personIDInfo().val()

                var jqxhr = $.get( '/PSP/Administration/DelPerson?personId=' + input_personIdInfo_val, function () { confirm_win.modal( 'hide' ); } )
                             .done( function ( data ) {
                                 if ( data ) {
                                     main_app.hide_ajax_loader();
                                     del_person_registration_app.get_del_succes().show();
                                 }
                                 else {
                                     del_person_registration_app.get_del_succes().hide();
                                     main_app.hide_ajax_loader();
                                     error_wndw_app.set_error_window_message( 'При обработке запроса "DelPerson" возникли ошибки, обратитесь пожалуйста к администратору!' );
                                     error_wndw_app.show_error_window();
                                 }
                             } )
                             .fail( function () {
                                 main_app.hide_ajax_loader();

                                 error_wndw_app.set_error_window_message( 'При обработке запроса "DelPerson" возникли ошибки, обратитесь пожалуйста к администратору!' );
                                 error_wndw_app.show_error_window();
                             } );
            } )
        } )
    },

    /// Other functions.
    default_state_for_del_person_registration: function () {
        var div_area_person_info = this.get_area_person_info();
        var span_del_succes      = this.get_del_succes();

        div_area_person_info.hide();
        span_del_succes     .hide();
    }
}