##The jQuery Pomodori Chrono plugin

A simple yet versatile stateful jQuery Pomodori countdown timer plugin, developed to support the UI timers and some of the AJAX functionality for the [Restful Pomodori](http://restfulpomodori.herokuapp.com) demo site.

![demo screenshot](https://github.com/florinpatrascu/pomo-chrono/raw/master/images/demo-screen.png)

## Usage:

Here is an excerpt from the demo page provided with the source:

define few divs in a html page:

````html
  <div class='large-font'>
    <span id="chronos"></span>
    <span id="chronos-break-time" class="break-time">00</span>
    <span id="chronos-status" class="pomo-status">working</span>
  </div>
````

attach the Pomodoro chrono plugin to the '#chronos' div defined above, and bind some custom functionality:  

    $('#chronos').pomochrono({
        activity_ref: 2,
        pomodoro_duration: 4,
        break_duration: 15,
        run_at_start: function() {
            $('#chronos-status').hide().html("working").fadeIn(600);
        },
        run_at_end: function() {
            $('#chronos-status').hide().html("did it again!").fadeIn(600);
        },
        run_when_cancelled: function() {
            $('#chronos-status').hide().html("cancelled").fadeIn(600);
        },
        run_when_paused: function() {
            $('#chronos-status').hide().html("paused").fadeIn(600);
        },
        display_break_time: function(seconds) {
            $('#chronos-break-time').hide().html(seconds).fadeIn(600);
        }
    }); 


There are a few options you can use:

    activity_ref: null,         //let the user store any reference to an activity represented by this timer
    pomodoro_duration: 25,      //minutes
    break_duration: 15,         //seconds
    run_at_start: null,         //custom code executed when the countdown starts
    run_at_end: null,           //custom code executed when the countdown ends
    run_when_cancelled: null,   //custom code executed when the countdown was cancelled
    run_when_paused: null,      //custom code executed when the countdown was paused
    display_working_time: null, // next release; currently we're displaying it by default
    display_break_time: null,   //custom function executed every second during a work interruption
    debug: false                // use or not the console.log for displaying debugging messages

#### Miscellaneous


The simple demo page provided is using the [jQuery-Chrono plugin](https://github.com/avk/jQuery-Chrono/tree/ecab45b09a674c3962e3c46e5e3f5467334b5d2a), but this plugin is not required by the Pomo-chrono plugin.

## Roadmap

### Version 0.2
- allow the plugin to run in 'quiet' mode, without displaying the countdown

## Contributing

I highly encourage you to fork my project and implement any of the features in the Roadmap. Just submit a pull request and be sure to give yourself credit here!

### Contributors
- you :)

License
-------
Released under the MIT license:

      (c) Copyright 2011 Florin T.PATRASCU.

      Permission is hereby granted, free of charge, to any person obtaining a copy of 
      this software and associated documentation files (the "Software"), to deal in the
      Software without restriction, including without limitation the rights to use, copy,
      modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, 
      and to permit persons to whom the Software is furnished to do so, subject to the 
      following conditions:

      The above copyright notice and this permission notice shall be included in all copies or
      substantial portions of the Software.

      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
      IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
      FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. IN NO EVENT SHALL THE 
      AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
      WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN 
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
