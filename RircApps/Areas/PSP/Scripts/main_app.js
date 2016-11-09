var main_app = {
    _ajax_loader                  : $( '#ajax-loader'             ),
    _child_body                   : $( '#child_body'              ),
    _menu_write_out               : $( '#write_out'               ),
    _menu_arrived_military        : $( '#arrived_military'        ),
    _menu_drop_out_military       : $( '#drop_out_military'       ),
    _menu_strenght_change         : $( '#strenght_change'         ),
    _menu_del_person_registration : $( '#del_person_registration' ),
    _menu_del_kard_registration   : $( '#del_kard_registration'   ), 
    _menu_del_house               : $( '#del_house'               ),
    _menu_change_flat             : $( '#change_flat'             ),
    _menu_add_ovd                 : $( '#add_ovd'                 ),


    init: function () {
        with (this) {
            _init_page_events();
            _load_general_scripts();
        }

    },

    _init_page_events: function () {
        this.set_all_defaults();
        this._on_click_menu_write_out();
        this._on_click_menu_arrived_military();
        this._on_click_menu_drop_out_military();
        this._on_click_menu_del_person_registration();
        this._on_click_menu_del_kard_registration();
        //this._on_click_menu_del_house();
        this._on_click_menu_strenght_change();
        this._on_click_menu_change_flat();
        this._on_click_menu_add_ovd();
    },
    // Подгружаем общие скрипты для работы приложения.
    _load_general_scripts: function () {
        var error_wndw_script = $.getScript("/Areas/PSP/Scripts/error_wndw_app.js", function () { })
              .done(function () {
                  $(function () { error_wndw_app.init(); });
              })
              .fail(function () {
                  alert('Script "error_wndw_app.js" download error!');
              });
    },

    /// Get functions.
    get_ajax_loader                  : function () { return this._ajax_loader;                  },
    get_child_body                   : function () { return this._child_body;                   },
    get_menu_write_out               : function () { return this._menu_write_out;               },
    get_menu_arrived_military        : function () { return this._menu_arrived_military;        },
    get_menu_drop_out_military       : function () { return this._menu_drop_out_military;       },
    get_menu_strenght_change         : function () { return this._menu_strenght_change;         },
    get_menu_del_person_registration : function () { return this._menu_del_person_registration; },
    get_menu_del_kard_registration   : function () { return this._menu_del_kard_registration;   },
    get_menu_del_house               : function () { return this._menu_del_house;               },
    get_menu_change_flat             : function () { return this._menu_change_flat;             },
    get_menu_add_ovd                 : function () { return this._menu_add_ovd                  },

    /// Events.
    set_all_defaults: function () {
        this.hide_ajax_loader();
    },

    hide_ajax_loader: function () {
        var div_ajax_loader = this.get_ajax_loader();
        div_ajax_loader.hide();
    },

    show_ajax_loader: function () {
        var div_ajax_loader = this.get_ajax_loader();
        div_ajax_loader.show();
    },
    // Затухание div блока.
    fade_out_block: function (block) {
        block.fadeOut();
    },
    // Отобразить div блок.
    fade_in_block: function (block) {
        block.fadeIn();
    },
    // Возврат меню в исходное состояние.
    clear_list_group_item_class: function () {
        $('.list-group-item').removeClass('list-group-item active').addClass('list-group-item');
    },

    // Событие для кнопки Отчёты - Все выписанные за период.
    _on_click_menu_write_out: function () {
        var menu_write_out = this.get_menu_write_out();

        menu_write_out.on('click', function () {
            main_app.clear_list_group_item_class();
            menu_write_out.removeClass('list-group-item').addClass('list-group-item active');
            main_app.show_ajax_loader();
            var write_out_html_load = $.get('/PSP/Home/GetWriteOutHtml', function () { })
                                   .done(function (data) {
                                       var div_child_body = main_app.get_child_body();
                                       div_child_body.empty();
                                       div_child_body.append(data);
                                       main_app.hide_ajax_loader();
                                       main_app.show_ajax_loader();
                                       var jqxhr = $.getScript("/Areas/PSP/Scripts/write_out_app.js", function () { })
                                                .done(function () {

                                                    $(function () { write_out_app.init(); });
                                                    main_app.hide_ajax_loader();
                                                })

                                                .fail(function () {
                                                    main_app.hide_ajax_loader();
                                                    error_wndw_app.set_error_window_message('При загрузке приложения "write_out_app.js" возникли ошибки. Обратитесь пожалуйста к администратору!');
                                                    error_wndw_app.show_error_window();
                                                });

                                   })
                                       .fail(function () {
                                           main_app.hide_ajax_loader();
                                           error_wndw_app.set_error_window_message('При загрузке разметки приложения возникли ошибки. Обратитесь пожалуйста к администратору!');
                                           error_wndw_app.show_error_window();
                                       });
        })
    },

    // Событие для кнопки Отчёты - Все прибывшие военнообязанные.
    _on_click_menu_arrived_military: function () {
        var menu_arrived_military = this.get_menu_arrived_military();

        menu_arrived_military.on('click', function () {
            main_app.clear_list_group_item_class();
            menu_arrived_military.removeClass('list-group-item').addClass('list-group-item active');

            main_app.show_ajax_loader();
            var arrived_military_html_load = $.get('/PSP/Home/GetArrivedMilitaryHtml', function () { })
                                   .done(function (data) {
                                       var div_child_body = main_app.get_child_body();
                                       div_child_body.empty();
                                       div_child_body.append(data);
                                       main_app.hide_ajax_loader();
                                       main_app.show_ajax_loader();
                                       var jqxhr = $.getScript("/Areas/PSP/Scripts/arrived_military_app.js", function () { })
                                                .done(function () {

                                                    $(function () { arrived_military_app.init(); });
                                                    main_app.hide_ajax_loader();
                                                })

                                                .fail(function () {
                                                    main_app.hide_ajax_loader();
                                                    error_wndw_app.set_error_window_message('При загрузке приложения "arrived_military_app.js" возникли ошибки. Обратитесь пожалуйста к администратору!');
                                                    error_wndw_app.show_error_window();
                                                });

                                   })
                                       .fail(function () {
                                           main_app.hide_ajax_loader();
                                           error_wndw_app.set_error_window_message('При загрузке разметки приложения возникли ошибки. Обратитесь пожалуйста к администратору!');
                                           error_wndw_app.show_error_window();
                                       });
        })
    },

    // Событие для кнопки Отчёты - Все выбывшие военнообязанные.
    _on_click_menu_drop_out_military: function () {
        var menu_drop_out_military = this.get_menu_drop_out_military();

        menu_drop_out_military.on('click', function () {
            main_app.clear_list_group_item_class();
            menu_drop_out_military.removeClass('list-group-item').addClass('list-group-item active');

            main_app.show_ajax_loader();
            var drop_out_military_html_load = $.get('/PSP/Home/GetDropOutMilitaryHtml', function () { })
                                   .done(function (data) {
                                       var div_child_body = main_app.get_child_body();
                                       div_child_body.empty();
                                       div_child_body.append(data);
                                       main_app.hide_ajax_loader();
                                       main_app.show_ajax_loader();
                                       var jqxhr = $.getScript("/Areas/PSP/Scripts/drop_out_military_app.js", function () { })
                                                .done(function () {

                                                    $(function () { drop_out_military_app.init(); });
                                                    main_app.hide_ajax_loader();
                                                })

                                                .fail(function () {
                                                    main_app.hide_ajax_loader();
                                                    error_wndw_app.set_error_window_message('При загрузке приложения "drop_out_military_app.js" возникли ошибки. Обратитесь пожалуйста к администратору!');
                                                    error_wndw_app.show_error_window();
                                                });

                                   })
                                       .fail(function () {
                                           main_app.hide_ajax_loader();
                                           error_wndw_app.set_error_window_message('При загрузке разметки приложения возникли ошибки. Обратитесь пожалуйста к администратору!');
                                           error_wndw_app.show_error_window();
                                       });
        })
    },

    // Событие для кнопки Отчёты - Изменение численного состава.
    _on_click_menu_strenght_change: function () {
        var menu_strenght_change = this.get_menu_strenght_change();

        menu_strenght_change.on('click', function () {
            main_app.clear_list_group_item_class();
            menu_strenght_change.removeClass('list-group-item').addClass('list-group-item active');

            main_app.show_ajax_loader();
            var strenght_change_html_load = $.get('/PSP/Home/StrenghtChangeReportHtml', function () { })
                                   .done(function (data) {
                                       var div_child_body = main_app.get_child_body();
                                       div_child_body.empty();
                                       div_child_body.append(data);
                                       main_app.hide_ajax_loader();
                                       main_app.show_ajax_loader();
                                       var jqxhr = $.getScript("/Areas/PSP/Scripts/strength_change.js", function () { })
                                                .done(function () {

                                                    $(function () { strenght_change_app.init(); });
                                                    main_app.hide_ajax_loader();
                                                })

                                                .fail(function () {
                                                    main_app.hide_ajax_loader();
                                                    error_wndw_app.set_error_window_message('При загрузке приложения "strenght_change_app.js" возникли ошибки. Обратитесь пожалуйста к администратору!');
                                                    error_wndw_app.show_error_window();
                                                });

                                   })
                                       .fail(function () {
                                           main_app.hide_ajax_loader();
                                           error_wndw_app.set_error_window_message('При загрузке разметки приложения возникли ошибки. Обратитесь пожалуйста к администратору!');
                                           error_wndw_app.show_error_window();
                                       });
        })
    },

    // Событие для кнопки Администрирование - Удаление человека из карточки.
    _on_click_menu_del_person_registration: function () {
        var menu_del_person_registration = this.get_menu_del_person_registration();

        menu_del_person_registration.on('click', function () {
            main_app.clear_list_group_item_class();
            menu_del_person_registration.removeClass('list-group-item').addClass('list-group-item active');

            main_app.show_ajax_loader();
            var del_person_registration_html_load = $.get('/PSP/Administration/DelPersonRegistrationHtml', function () { })
                                                .done(function (data) {
                                                    var div_child_body = main_app.get_child_body();
                                                    div_child_body.empty();
                                                    div_child_body.append(data);
                                                    main_app.hide_ajax_loader();
                                                    main_app.show_ajax_loader();
                                                    var jqxhr = $.getScript("/Areas/PSP/Scripts/Admin/del_person_registration_app.js", function () { })
                                                             .done(function () {

                                                                 $(function () { del_person_registration_app.init(); });
                                                                 main_app.hide_ajax_loader();
                                                             })

                                                             .fail(function () {
                                                                 main_app.hide_ajax_loader();
                                                                 error_wndw_app.set_error_window_message('При загрузке приложения "del_person_registration_app.js" возникли ошибки. Обратитесь пожалуйста к администратору!');
                                                                 error_wndw_app.show_error_window();
                                                             });

                                                })
                                                    .fail(function () {
                                                        main_app.hide_ajax_loader();
                                                        error_wndw_app.set_error_window_message('При загрузке разметки приложения возникли ошибки. Обратитесь пожалуйста к администратору!');
                                                        error_wndw_app.show_error_window();
                                                    });
        })
    },

    // Событие для кнопки Администрирование - Удаление карточки.
    _on_click_menu_del_kard_registration: function () {
        var menu_del_kard_registration = this.get_menu_del_kard_registration();

        menu_del_kard_registration.on('click', function () {
            main_app.clear_list_group_item_class();
            menu_del_kard_registration.removeClass('list-group-item').addClass('list-group-item active');

            main_app.show_ajax_loader();
            var del_kart_html_load = $.get( '/PSP/Administration/DelKartHtml', function () { } )
                                                .done( function ( data ) {
                                                    var div_child_body = main_app.get_child_body();
                                                    div_child_body.empty();
                                                    div_child_body.append( data );
                                                    main_app.hide_ajax_loader();
                                                    main_app.show_ajax_loader();
                                                    var jqxhr = $.getScript( "/Areas/PSP/Scripts/Admin/del_kart_app.js", function () { } )
                                                             .done( function () {

                                                                 $( function () { del_kart_app.init(); } );
                                                                 main_app.hide_ajax_loader();
                                                             } )

                                                             .fail( function () {
                                                                 main_app.hide_ajax_loader();
                                                                 error_wndw_app.set_error_window_message( 'При загрузке приложения "del_kart_app.js" возникли ошибки. Обратитесь пожалуйста к администратору!' );
                                                                 error_wndw_app.show_error_window();
                                                             } );

                                                } )
                                                    .fail( function () {
                                                        main_app.hide_ajax_loader();
                                                        error_wndw_app.set_error_window_message( 'При загрузке разметки приложения возникли ошибки. Обратитесь пожалуйста к администратору!' );
                                                        error_wndw_app.show_error_window();
                                                    } );

        })
    },

    // Событие для кнопки Администрирование - Изменение номера помещения.
    _on_click_menu_change_flat: function () {
        var menu_change_flat = this.get_menu_change_flat();

        menu_change_flat.on('click', function () {
            main_app.clear_list_group_item_class();
            menu_change_flat.removeClass('list-group-item').addClass('list-group-item active');

            main_app.show_ajax_loader();
            var change_flat_html_load = $.get( '/PSP/Administration/ChangeFlatHtml', function () { } )
                                                .done( function ( data ) {
                                                    var div_child_body = main_app.get_child_body();
                                                    div_child_body.empty();
                                                    div_child_body.append( data );
                                                    main_app.hide_ajax_loader();
                                                    main_app.show_ajax_loader();
                                                    var jqxhr = $.getScript( "/Areas/PSP/Scripts/Admin/change_flat_app.js", function () { } )
                                                             .done( function () {

                                                                 $( function () { change_flat_app.init(); } );
                                                                 main_app.hide_ajax_loader();
                                                             } )

                                                             .fail( function () {
                                                                 main_app.hide_ajax_loader();
                                                                 error_wndw_app.set_error_window_message( 'При загрузке приложения "change_flat_app.js" возникли ошибки. Обратитесь пожалуйста к администратору!' );
                                                                 error_wndw_app.show_error_window();
                                                             } );

                                                } )
                                                    .fail( function () {
                                                        main_app.hide_ajax_loader();
                                                        error_wndw_app.set_error_window_message( 'При загрузке разметки приложения возникли ошибки. Обратитесь пожалуйста к администратору!' );
                                                        error_wndw_app.show_error_window();
                                                    } );

        })
    },

    // Событие для кнопки Администрирование - Добавление новой записи "кем выдан".
    _on_click_menu_add_ovd: function () {
        var menu_add_ovd = this.get_menu_add_ovd();

        menu_add_ovd.on('click', function () {
            main_app.clear_list_group_item_class();
            menu_add_ovd.removeClass('list-group-item').addClass('list-group-item active');

            main_app.show_ajax_loader();
            var add_ovd_html_load = $.get( '/PSP/Administration/AddOvdHtml', function () { } )
                                                .done( function ( data ) {
                                                    var div_child_body = main_app.get_child_body();
                                                    div_child_body.empty();
                                                    div_child_body.append( data );
                                                    main_app.hide_ajax_loader();
                                                    main_app.show_ajax_loader();
                                                    var jqxhr = $.getScript( "/Areas/PSP/Scripts/Admin/add_ovd_app.js", function () { } )
                                                             .done( function () {

                                                                 $( function () { add_ovd_app.init(); } );
                                                                 main_app.hide_ajax_loader();
                                                             } )

                                                             .fail( function () {
                                                                 main_app.hide_ajax_loader();
                                                                 error_wndw_app.set_error_window_message( 'При загрузке приложения "add_ovd_app.js" возникли ошибки. Обратитесь пожалуйста к администратору!' );
                                                                 error_wndw_app.show_error_window();
                                                             } );

                                                } )
                                                    .fail( function () {
                                                        main_app.hide_ajax_loader();
                                                        error_wndw_app.set_error_window_message( 'При загрузке разметки приложения возникли ошибки. Обратитесь пожалуйста к администратору!' );
                                                        error_wndw_app.show_error_window();
                                                    } );

        })
    },

    // Событие для кнопки Администрирование - Удаление дома.
    //_on_click_menu_del_house: function () {
    //    var menu_del_house = this.get_menu_del_house();

    //    menu_del_house.on('click', function () {
    //        main_app.clear_list_group_item_class();
    //        menu_del_house.removeClass('list-group-item').addClass('list-group-item active');
    //    })
    //},

}

$(function () { main_app.init(); });