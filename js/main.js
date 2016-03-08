;(function ($, window, document, undefined) {
    /**
     * price calculation
     */

    var calculate = function (dogs, walks, perWalk, perExtraDog) {
        return (walks * perWalk) + ((dogs - 1) * walks * perExtraDog);
    };

    var calculatePrice = function (dogs, walks) {
        dogs  = parseInt(dogs || 1);
        walks = parseInt(walks || 1);
        
        if (walks <= 0) {
            return 0;
        }
        else if (walks < 5) {
            return calculate(dogs, walks, 25, 12.50);
        }
        else if (walks < 10) {
            return calculate(dogs, walks, 20, 10);
        }
        else if (walks >= 10) {
            return calculate(dogs, walks, 18, 9);
        }
        else {
            var p = 0;
            
            while (walks > 0) {
                if (walks < 10) {
                    p += calculatePrice(dogs, walks);
                }
                else {
                    p += calculatePrice(dogs, 10);
                }
                
                walks -= 10;
            }
            
            return p;
        }
    };

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $(document).ready(function () {


        $('body').on('click', '.page-scroll a', function (event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top
            }, 800, 'easeInOutQuart');
            event.preventDefault();
        });

        // Floating label headings for the contact form

        $("body").on("input propertychange", ".floating-label-form-group", function (e) {
            $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
        }).on("focus", ".floating-label-form-group", function () {
            $(this).addClass("floating-label-form-group-with-focus");
        }).on("blur", ".floating-label-form-group", function () {
            $(this).removeClass("floating-label-form-group-with-focus");
        });

        // Highlight the top nav as scrolling occurs
        $('body').scrollspy({
            target: '.navbar-fixed-top'
        });

        // Closes the Responsive Menu on Menu Item Click
        $('.navbar-collapse ul li a:not(.dropdown-toggle)').click(function () {
            $('.navbar-toggle:visible').click();
        });

        // form spinners
        $('.spinner a.direction').click(function (e) {
            e.preventDefault();

            var $anchor = $(this),
                $input = $($anchor.attr('href')),
                dir = $anchor.data('direction').toString().toLowerCase(),
                val = parseInt($input.val());

            if (isNaN(val)) {
                val = 0;
            }

            switch (dir) {
                case 'down':
                    $input.val(Math.max(1, val - 1)).change();
                    break;
                case 'up':
                    $input.val(val + 1).change();
                    break;
            }

            return false;
        });

        $('.calculator').each(function () {
            var $calc   = $(this),
                $target = $($calc.data('target')),
                $dogs   = $($calc.data('dogs')),
                $walks  = $($calc.data('walks')),
                $disc   = $('.calculator-disclaimer', this);

            $(':input', this).change(function () {
                var price = calculatePrice($dogs.val(), $walks.val());
                
                if (price > 180) {
                    $disc.html('<small>Contact us for a personalised package</small>');
                }
                else {
                    $disc.text('');
                }
                
                $target.text(price);
            });
        });
        
        $('.contact-email-replace').html(function () {
            var e = "max", a = "@", d = "maxsmutts", c = ".com", h = 'mailto:' + e + a + d + c;
            
            $(this).parent('a').attr('href', h);
            
            // set formspree action
            $('#contact-form').attr('action', "//formspree.io/" + e + a + d + c);
            return e + a + d + c;
        });
    });
})(jQuery, window, document);
