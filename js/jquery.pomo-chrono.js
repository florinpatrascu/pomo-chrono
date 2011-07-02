/**
 * The jQuery Simple Pomodori Chrono plugin
 * Copyright (c)2011 Florin T.PATRASCU
 *
 * Released under the MIT license.
 * http://en.wikipedia.org/wiki/MIT_License
 *
 * @author <a href="mailto:florin.patrascu@gmail.com">Florin T.PATRASCU</a>
 * @version 1.0
 */

 (function($) {

    $.pomochrono = function(el, options) {
        var base = this;
        
        // each supported unit of time, in milliseconds
        var ms  = 1,
            sec = ms  * 1000,
            min = sec * 60,
            hr  = min * 60,
            day = hr  * 24;
        
        // Access to jQuery and DOM versions of element
        base.$el = $(el);
        base.el = el;
        // base.id = $(el).attr('id'); // or Date.now?
        // Add a reverse reference to the DOM object
        base.$el.data("pomochrono", base);
        base.total_break_time=0; //in seconds
        base.interrupts =[];
        base.total_interrupts =0;
        base.is_break = false;
        base.is_cancelled = false; // starting again, should I keep this behavior? Hmm
        base.is_started   = false;             

        /**
         * private functions 
         */
         var pad_for_two_digits = function( x) {
             return x > 9 ? x : "0" + x;
         };

         function number_with_commas( x) {
            return x.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
         };

         
        // construct
        base.init = function() {
            base.options = $.extend({},
            $.pomochrono.defaultOptions, options);    
            base.$el.html( pad_for_two_digits( base.options.pomodoro_duration) + ":00");        
        };

        //public functions
        base.start = function( f) {
          if ( base.is_break) {
            base.is_break = false;
            base.end_time += base.interrupts.pop();            
            if( base.options.debug ) console.log( "end-time after interruption: "+ base.end_time);

          }else{

            if (base.timer) {
               // check if the chrono is already running
               base.cancel();
             };

             var date      = new Date();
             base.end_time = date.getTime() + (base.options.pomodoro_duration * min);
             base.remaining_time = base.end_time - date.getTime();
             base.timer    = setInterval( base.tick, sec);
             base.is_cancelled = false; // starting again, should I keep this behavior? Hmm
             base.is_started =true;             
             base.interrupts =[];
             base.total_break_time =0;
             base.total_interrupts =0;
             base.show_remaining_time();
             base.show_break_time();
             
             if( f) f();   
          }

          if( base.options.run_at_start) base.options.run_at_start();           
          if( base.options.debug) console.log( base.timer + " started.");

        };

        // cancel the current pomodoro and call the user callback, if defined
        base.cancel = function( break_too_long) {
           clearInterval( base.timer);
           if( base.options.debug) console.log( base.timer + " cancelled.");
           
           if (break_too_long) {
             // act on this?
           };
           
           base.is_cancelled = true;
           base.is_break = false;
           base.is_started =false;
           
           if( base.options.run_when_cancelled ){             
             base.options.run_when_cancelled();
           }
        };
        
        /**
         * will pause the pomodor if it is already in progress
         * the pause cannot be longer than the base.break_duration
         */
        base.pause = function( paramaters, callback) {
          var new_interrupt = sec;
          base.interrupts.push( new_interrupt); //accumulator for the seconds spent during this interruption
          base.is_break = true;
          base.total_interrupts ++;
          
          if (base.timer) {
            if( base.options.run_when_paused ){             
              base.options.run_when_paused();
            }
            
            if( base.options.debug) console.log( base.timer + " paused.");
          };
          
        };

        //tick ... 
        base.tick =function(){
          base.tock();
        };
        
        // and tock :)
        base.tock =function() {

          if( base.is_break){
            var current_interrupt = base.interrupts.pop() + sec; // interrupts are in seconds!
            base.total_break_time ++;
            base.interrupts.push( current_interrupt);
            
            if( base.total_break_time > base.options.break_duration){
               if( base.options.debug) console.log( "Unacceptable :) too much break. Cancelling ... ");
               return base.cancel( true);
            }
            
          }else{
            var date = new Date();
            base.remaining_time = base.end_time - date.getTime();

            if ( base.remaining_time <= 0 || base.total_break_time >= base.break_duration) {
              base.cancel();
              base.options.run_at_end( base.total_break_time >= base.break_duration);
            }
          }

          base.show_remaining_time();
        };
        
        //show the remaining time from current pomodoro
        base.show_remaining_time = function() {
          if ( !base.is_break) {
            var date = new Date();
            var minutes = Math.floor( ( base.remaining_time / min) % 60);
            var seconds = Math.floor( ( base.remaining_time / sec) % 60);
            //poorman padding solution
            base.$el.html( base.is_cancelled ? "00:00" : 
                      pad_for_two_digits( minutes) + ":" + pad_for_two_digits( seconds));
              
          }else{
            base.show_break_time();
          };
        };
        
        base.show_break_time = function( ) {
          base.$el.fadeOut( 200).fadeIn(300);
          if (base.options.display_break_time) {
            base.options.display_break_time( pad_for_two_digits( base.total_break_time));
          };
        };
        
        // call Construct
        base.init();
    };

    $.pomochrono.defaultOptions = {
        activity_ref: null,  //let the user store any reference to an activity represented by this timer
        pomodoro_duration: 25,  //minutes
        break_duration: 15,     //seconds
        run_at_start: null,
        run_at_end: null,
        run_when_cancelled: null,
        run_when_paused: null,
        display_working_time: null, // next release; currently we're displaying it by default
        display_break_time: null,
        debug: false
    };

    $.fn.pomochrono = function(options) {
        return this.each(function() {
            (new $.pomochrono(this, options));
        });
    };

    // This function breaks the chain, but returns
    // the pomochrono if it has been attached to the object.
    $.fn.getPomoChrono = function() {
        this.data("pomochrono");
    };


})(jQuery);
