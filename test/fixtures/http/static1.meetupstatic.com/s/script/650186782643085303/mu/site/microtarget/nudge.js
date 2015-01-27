;(function() {

    

    define('site/microtarget/nudge',["jquery", "core/cookie"], nudge);

    function nudge($, Cookie){
        var NUDGE_VISIBLE_CLS = 'mt-nudge--visible',
            defaultOptions = {
                uniqueCookieSuffix: '',
                cookieName: '',
                maxCookieAgeInDays: 1,
                isDismissable: true,
                animateWithClassOnInit: 'mt-anim-slideup',
                cookieNoEscape: true

            };

        var init = function( area, rule, nudgeOptions ) {
            this.opts = $.extend({}, defaultOptions, nudgeOptions || {});
            this.elId = area + '__' + rule;
            this.cookieName = encodeURIComponent('mt_nudge_' + (this.opts.cookieName ? this.opts.cookieName : rule) + (this.opts.uniqueCookieSuffix ? '.' + this.opts.uniqueCookieSuffix : ''));

            var self = this;

            var setCookie = function(value) {
                Cookie.setCookie(self.cookieName, toUrlEncodedString(value),
                        self.opts.maxCookieAgeInDays, self.opts.cookiePath,
                        self.opts.cookieDomain, self.opts.cookieSecure,
                        self.opts.cookieNoEscape);
            };

            var getCookie = function() {
                var value = Cookie.getCookie(self.cookieName);
                return value ? getUrlVars(value) : undefined;
            };

            var dismissClickHandler = function(e) {
                $(e.currentTarget).closest('.mt-nudge').addClass('display-none');
                setCookie({'dismissed': 1});
            };
            
            var cookie = getCookie();

            self.$el = $('#' + self.elId);


            

            if (!cookie || typeof(cookie.dismissed) === "undefined") {
                // do [*]OnInit stuff as specified in `self.opts`
                if (self.opts.animateWithClassOnInit) {
                    self.$el.addClass(self.opts.animateWithClassOnInit);
                    // Pump the style calculator
                    self.$el[0].offsetHeight;
                }

                // Show/animate the nudge
                self.$el.addClass(NUDGE_VISIBLE_CLS);

                // Write new cookie value
                setCookie({'dismissed': 0});
                cookie = getCookie();

            } else if (!self.opts.isDismissable || cookie.dismissed == 0) {
                // Show the nudge immediately
                self.$el.addClass(NUDGE_VISIBLE_CLS);
            } else if (self.opts.isDismissable && cookie.dismissed == 1) {
                self.$el.addClass('display-none');
            }

            if (self.opts.isDismissable && cookie.dismissed == 0) {
                // Attach dismiss click handlers
                self.$el
                .on('click', '.j-mt-nudge-dismiss', function(e) {
                            e.preventDefault();
                            dismissClickHandler(e);
                        }
                )
                .on('click', '.primary', $.proxy(dismissClickHandler, self));
            }
        };

        return {
            init: init
        }
    }
}());

