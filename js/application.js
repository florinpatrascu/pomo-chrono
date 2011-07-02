/**
 * jQuery support code accompanying the Pomodorui chronos html demo page
 *
 * @author <a href="mailto:florin.patrascu@gmail.com">Florin T.PATRASCU</a>
 * @since 2011.07.01
 */
$(document).ready(function() {

    $('#chronos-status').hide();
    $('#chronos2-status').hide();

    $('#chronos').pomochrono({
        activity_ref: 1,
        pomodoro_duration: 2,
        break_duration: 15,
        run_at_end: function() {
            $('#chronos-status').hide().html("done!").fadeIn(600);
        },
        display_break_time: function(seconds) {
            $('#chronos-break-time').hide().html(seconds).fadeIn(600);
        }
    });


    $('#chronos2').pomochrono({
        activity_ref: 2,
        pomodoro_duration: 4,
        break_duration: 15,
        run_at_start: function() {
            $('#chronos2-status').hide().html("working").fadeIn(600);
        },
        run_at_end: function() {
            $('#chronos2-status').hide().html("did it again!").fadeIn(600);
        },
        run_when_cancelled: function() {
            $('#chronos2-status').hide().html("cancelled").fadeIn(600);
        },
        run_when_paused: function() {
            $('#chronos2-status').hide().html("paused").fadeIn(600);
        },
        display_break_time: function(seconds) {
            $('#chronos2-break-time').hide().html(seconds).fadeIn(600);
        }
    });

    // start the demo timers
    $.after("4sec",
    function() {
        $('#chronos').data('pomochrono').start(function() {
            $('#chronos-status').fadeIn(600);
            $.after("5sec",
            function() {
                $('#chronos2').data('pomochrono').start(function() {
                    $('#chronos2-status').fadeIn(600);
                });
            });
        });
    });

    // let's simulate some interruptions on the first unit of work
    $.after("10sec",
    function() {
        $('#chronos').data('pomochrono').pause();
        $.after("10sec",
        function() {
            $('#chronos').data('pomochrono').start();
        });
    });

    // simulate interruptions for the second unit of work
    $.after("30sec",
    function() {
        $('#chronos2').data('pomochrono').pause();
        $.after("6sec",
        function() {
            $('#chronos2').data('pomochrono').start();
        });
    });

});
