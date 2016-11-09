var error_wndw_app = {
    _error_window: $('#errorWindow'),

    init: function () {
        with (this) {
            _init_error_window_events();

        }
    },

    _init_error_window_events: function () {

    },

    /// Get functions.
    get_div_error_window: function () {
        return this._error_window;
    },


    /// Set functions.
    set_error_window_message: function (msg) {
        var div_error_window = this.get_div_error_window();
        div_error_window.find('#errorMsg').html('<p>' + msg + '</p>');
    },

    show_error_window: function () {
        var div_error_window = this.get_div_error_window();
        div_error_window.modal('show');
    }

}