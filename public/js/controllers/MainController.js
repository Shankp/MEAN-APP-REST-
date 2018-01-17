angular  .module('MainController', []) .controller('MainController', function($scope, Upload,Event) {

  /** Document Ready Functions **/
      /********************************************************************/
        $scope.tagline = 'See What you can do..!';

      $( document ).ready(function() {

        // Resive video
        scaleVideoContainer();

        initBannerVideoSize('.video-container .poster img');
        initBannerVideoSize('.video-container .filter');
        initBannerVideoSize('.video-container video');

        $(window).on('resize', function() {
            scaleVideoContainer();
            scaleBannerVideoSize('.video-container .poster img');
            scaleBannerVideoSize('.video-container .filter');
            scaleBannerVideoSize('.video-container video');
        });

        /** Reusable Functions **/
        /********************************************************************/

        function scaleVideoContainer() {

            var height = $(window).height();
            var unitHeight = parseInt(height) + 'px';
            $('.homepage-hero-module').css('height',unitHeight);

        }

        function initBannerVideoSize(element){

            $(element).each(function(){
                $(this).data('height', $(this).height());
                $(this).data('width', $(this).width());
            });

            scaleBannerVideoSize(element);

        }

        function scaleBannerVideoSize(element){

            var windowWidth = $(window).width(),
                windowHeight = $(window).height(),
                videoWidth,
                videoHeight;

            console.log(windowHeight);

            $(element).each(function(){
                var videoAspectRatio = $(this).data('height')/$(this).data('width'),
                    windowAspectRatio = windowHeight/windowWidth;

                if (videoAspectRatio > windowAspectRatio) {
                    videoWidth = windowWidth;
                    videoHeight = videoWidth * videoAspectRatio;
                    $(this).css({'top' : -(videoHeight - windowHeight) / 2 + 'px', 'margin-left' : 0});
                } else {
                    videoHeight = windowHeight;
                    videoWidth = videoHeight / videoAspectRatio;
                    $(this).css({'margin-top' : 0, 'margin-left' : -(videoWidth - windowWidth) / 2 + 'px'});
                }

                $(this).width(videoWidth).height(videoHeight);

                $('.homepage-hero-module .video-container video').addClass('fadeIn animated');


            });
        }

          /**back-to-top*/
          /*$('body').prepend('<a href="#" class="back-to-top">Back to Top</a>');*/

          var amountScrolled = 300;

          $(window).scroll(function() {
          	if ( $(window).scrollTop() > amountScrolled ) {
          		$('a.back-to-top').fadeIn('slow');
          	} else {
          		$('a.back-to-top').fadeOut('slow');
          	}
          });

          $('a.back-to-top, a.simple-back-to-top').click(function() {
          	$('html, body').animate({
          		scrollTop: 0
          	}, 700);
          	return false;
          });
    });

    // var _gaq = _gaq || [];
    // _gaq.push(['_setAccount', 'UA-36251023-1']);
    // _gaq.push(['_setDomainName', 'jqueryscript.net']);
    // _gaq.push(['_trackPageview']);
    //
    // (function() {
    //   var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    //   ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    //   var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    // })();

    $('.demo-1').percentcircle();

    $('.demo-2').percentcircle({
    animate : false,
    diameter : 100,
    guage: 3,
    coverBg: '#fff',
    bgColor: '#efefef',
    fillColor: '#E95546',
    percentSize: '15px',
    percentWeight: 'normal'
    });

    $('.demo-3').percentcircle({
    animate : false,
    diameter : 100,
    guage: 3,
    coverBg: '#fff',
    bgColor: '#efefef',
    fillColor: '#DA4453',
    percentSize: '18px',
    percentWeight: 'normal'
    });
    $('.demo-4').percentcircle({
    animate : true,
    diameter : 100,
    guage: 3,
    coverBg: '#fff',
    bgColor: '#efefef',
    fillColor: '#46CFB0',
    percentSize: '18px',
    percentWeight: 'normal'
    });
    $('.demo-5').percentcircle({
    animate : true,
    diameter : 100,
    guage: 3,
    coverBg: '#fff',
    bgColor: '#efefef',
    fillColor: '#8BC163',
    percentSize: '18px',
    percentWeight: '20px'
    });
    $('.demo-6').percentcircle({
    animate : true,
    diameter : 100,
    guage: 10,
    coverBg: '#fff',
    bgColor: '#efefef',
    fillColor: '#D870A9',
    percentSize: '18px',
    percentWeight: 'normal'
    });

    (function($) {
      "use strict";
      UIkit.on('domready.uk.dom', function() {
        //Change slideshow on focuschange of slider
        var slideshow = UIkit.slideshow('#slideshow');
        $('#slider').on('focusitem.uk.slider', function(event, index, item, slider) {
          slideshow.show($(item).data('ukSlideshowItem'));
        });
      });
    }(jQuery));
    //other way to reach component on init
    UIkit.on('init.uk.component', function(e, name, component) {
      if (name === 'slideshow') {
        UIkit.$('#autoplay').on('change.uk.button', function(e, active) {
          component[(active ? 'start' : 'stop')]();
        });
      }
    });
    UIkit.on('domready.uk.dom', function() {
      UIkit.$body.prepend('<div class="uk-float-right uk-badge">UIkit version ' + UIkit.version + '</div>');
    });






 });
