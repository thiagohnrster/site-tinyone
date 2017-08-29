/* =================== */
/* jQuery Touch Slider */
/* =================== */
(function($) {
    $.fn.sliderTouch = function(params) {
        /* Merge default and user parameters */
        params = $.extend({
            nav: 'dots',
            prevValue: '',
            nextValue: '',
            autoPlay: false,
            interval: 4000
        }, params);

        this.each(function() {
            /* Config var */
            var $this = $(this);
            $this.wrap = $this.children('.showcase-wrap');
            var len = $this.wrap.children().length;
            var navigation = new Navigation($this, len);
            var totalwidth = 0;

            //show navigation element
            switch (params.nav) {
                case 'dots':
                    navigation.addDots();
                    break;
                case 'arrows':
                    navigation.addArrows(params.prevValue, params.nextValue);
                    break;
                case 'both':
                    navigation.addDots();
                    navigation.addArrows(params.prevValue, params.nextValue);
                    break;
            }

            /* Put sliders side by side after fix divs width */
            $this.wrap.children().each(function() {
                totalwidth += parseFloat($(this).width());
                $(this).css('float', 'left');
            });

            $this.wrap.width(totalwidth);

            $(this).on('swipeleft', function() {
                navigation.next();
            });

            $(this).on('swiperight', function() {
                navigation.prev();
            });

            /* Update sliders width to main div width */
            fixSlidersIn($this.wrap, $this.width());
            $(window).resize(function() {
                fixSlidersIn($this.wrap, $this.width());
                totalwidth = 0;

                $this.wrap.children().each(function() {
                    totalwidth += parseFloat($(this).width());
                    $(this).width($this.width());
                    $(this).css('float', 'left');
                });

                $this.wrap.width(totalwidth);
                navigation.keepPos();
            });

            /* autoPlay */
            if (params.autoPlay === true) {
                var timer = new TimerFor(navigation, params.interval);
                timer.startAutoPlay();
            }
        });

        return this;
    };


    /* Update all objects width */
    function fixSlidersIn(objWrap, withWidth) {
        objWrap.children().each(function() {
            $(this).width(withWidth);
        });
    }

    function TimerFor(navigation, interval) {
        var $this = this;
        var timer = null;

        $this.startAutoPlay = function() {
            if (timer !== null) return;
            timer = setInterval(function() {
                navigation.next();
                if (navigation.index == navigation.len - 1) {
                    navigation.index = -1;
                }
            }, interval);
        }

        $this.stopAutoPlay = function() {
            clearInterval(timer);
            timer = null
        };
    }

    /* Navigation object */
    function Navigation(slider, len) {
        /* Properties */
        var $this = this;
        $this.index = 0;
        $this.len = len;
        var dots = $('<nav class="showcase-dots"><ul></ul></nav>');
        var arrows = $('<nav class="showcase-arrows"><ul></ul></nav>')

        /* Methods */
        $this.addDots = function() {
            slider.append(dots);

            for (var i = 0; i < len; i++) {
                var li = $('<li></li>');
                dots.children('ul').append(li);
            }

            $this.changePos($this.index);

            slider.find(".showcase-dots").children('ul').children('li').bind('click', function() {
                $this.index = $(this).index();
                $this.changePos($this.index);
                DoTransition()
            });
        }

        $this.addArrows = function(prevValue, nextValue) {
            slider.append(arrows);
            var prev = $('<li class="showcase-prev">' + prevValue + '</li>');
            arrows.children('ul').append(prev);
            var next = $('<li class="showcase-next">' + nextValue + '</li>');
            arrows.children("ul").append(next);

            slider.find('.showcase-arrows').children('ul').children('li').bind('click', function() {
                if ($(this).hasClass("prev")) {
                    $this.index = Math.max(0, $this.index - 1);
                } else {
                    $this.index = Math.min($this.index + 1, len - 1);
                }
                $this.changePos($this.index);
                DoTransition()
            });
        }

        $this.changePos = function() {
            slider.find('.showcase-dots').children('ul').children('li').removeClass('on');
            slider.find('.showcase-dots').children('ul').children('li:eq(' + $this.index + ')').addClass('on');
        }

        $this.show = function() {
            nav.show();
        };

        $this.next = function() {
            if ($this.index < len - 1) {
                $this.index++
                    $this.changePos();
                DoTransition();
            };
        }

        $this.prev = function() {
            if ($this.index > 0) {
                $this.index--;
                $this.changePos();
                DoTransition();
            }
        }

        $this.keepPos = function() {
            DoTransition();
        }

        /* Animate slider */
        function DoTransition() {
            var elem = slider.wrap.children('div:eq(' + $this.index + ')');
            var elemOffset = elem.offset().left - elem.parent().offset().left;

            elem.parent().parent().stop().animate({
                scrollLeft: elemOffset
            }, 600);
        }
    }

    /* Start slider */
    $(function() {
        /* Slider settings */
        $('.showcase').sliderTouch({
            nav: 'dots',
            autoPlay: true,
            interval: 8000
        });
    });
})(jQuery);
