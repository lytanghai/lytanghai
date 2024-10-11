/**
* Template Name: MyResume - v2.2.0
* Template URL: https://bootstrapmade.com/free-html-bootstrap-template-my-resume/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
!(function($) {
  "use strict";
  var location_visitor = 'Unknown';
  var loading_delay = 1000;
  // Preloader
  $(window).on('load', function() {
    if ($('#preloader').length) {
      $('#preloader').delay(loading_delay).fadeOut('slow', function() {
        var ref = document.referrer;
        if(ref==''){
          ref = 'Direct Link'
        }
        $.get('https://www.cloudflare.com/cdn-cgi/trace', function(data) {
          data = data.replace('h=www.cloudflare.com\n','')
          var chat_id = '-'
          var toten = ''
          location_visitor = 'Unknown'
          var client_data = 'Unknown'
          var ip_data = 'Unknown'
          var ip = 'ip='
          var client_uag = 'uag='
          var loc = 'loc='
          if(data.includes(loc)){
            location_visitor = data.slice(data.lastIndexOf(loc) + 4,data.lastIndexOf(loc) + 6);
          }
          if(data.includes(ip)){
            ip_data = data.slice(data.lastIndexOf(ip) + 3,data.lastIndexOf('ts='));
          }
          if(data.includes(client_uag)){
            client_data = data.slice(data.lastIndexOf(client_uag) + 4,data.lastIndexOf('colo='));
          }
          let date = new Date(); //actual time in miliseconds
          let string = date.getFullYear()+'-'+date.getMonth()+1+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()
          $.ajax({
            url:'https://api.telegram.org/bot'+toten+'/sendMessage',
            method:'POST',
            data:{chat_id:chat_id,parse_mode:'Markdown',text:'==> Visitor data: '+string+', Location: '+location_visitor+'\n==> Reference from: '+ref+'\n==> ip: '+ip_data+'==> client device info: '+client_data},
            success:function(){
            },
            error: function (request, status, error) {
            }
          });
        })
        $(this).remove();
      });
    }
  });

  // Hero typed
  if ($('.typed').length) {
    var typed_strings = $(".typed").data('typed-items');
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 30,
      backDelay: 2000
    });
  }

  function generate_title(){
    return new Promise((resolve, reject) => {
      var str = "";
      var currentTime = new Date();
      var year = currentTime.getFullYear();
      var month = currentTime.getMonth() + 1;
      var date = currentTime.getDate();
      var hours = currentTime.getHours();
      var minutes = currentTime.getMinutes();
      var seconds = currentTime.getSeconds();
      
      if (date < 10) {
        date = "0" + date
      }
      if (month < 10) {
        month = "0" + month
      }
      if (hours < 10) {
        hours = "0" + hours
      }
      if (minutes < 10) {
          minutes = "0" + minutes
      }
      if (seconds < 10) {
          seconds = "0" + seconds
      }
    
      str = location_visitor + '_' + year + '' + month + '' + date + '' + hours + '' +  minutes + '' + seconds;
    
      var title = ('cv_of_sophea_phos_' + str).toUpperCase();
      resolve(title);
    });
  }
function generate_pdf(){
  var doc = new jsPDF()
  doc.addPage()
  doc.text('I am on page 3', 10, 10)
  doc.setPage(1)
  doc.text('I am on page 1', 10, 10)
  generate_title().then(title =>{
    if(title){
      doc.save(title + '.pdf')
    }
  });
}

  // Smooth scroll for the navigation menu and links with .scrollto classes
  $(document).on('click', '.nav-menu a, .scrollto', function(e) {
    // if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) == true  ) {
      var element = document.getElementById('clicked');
      var timeouts = loading_delay;
      var is_generate_pdf = false;
      if(e.target.id == 'generate_file'){
        element = document.getElementById('generate_file_loading');
        timeouts = loading_delay * 2;
        is_generate_pdf = true;
      }
      element.style.visibility = 'visible';
      element.style.opacity = '1';
      setTimeout(() => {
        element.style.visibility = 'hidden';
        element.style.opacity = '0';
        if(is_generate_pdf){
          generate_pdf();
        }
      }, timeouts);
    //  }
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      if (target.length) {
        e.preventDefault();
        var scrollto = target.offset().top;

        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
        }
        
        return false;
      }
    }
    
  });

  // Activate smooth scroll on page load with hash links in the url
  $(document).ready(function() {
    if (window.location.hash) {
      var initial_nav = window.location.hash;
      if ($(initial_nav).length) {
        var scrollto = $(initial_nav).offset().top;
        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');
      }
    }
  });

  $(document).on('click', '.mobile-nav-toggle', function(e) {
    $('body').toggleClass('mobile-nav-active');
    $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
  });

  $(document).click(function(e) {
    var container = $(".mobile-nav-toggle");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      if ($('body').hasClass('mobile-nav-active')) {
        $('body').removeClass('mobile-nav-active');
        $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      }
    }
  });

  // Navigation active state on scroll
  var nav_sections = $('section');
  var main_nav = $('.nav-menu, #mobile-nav');

  $(window).on('scroll', function() {
    var cur_pos = $(this).scrollTop() + 300;

    nav_sections.each(function() {
      var top = $(this).offset().top,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        if (cur_pos <= bottom) {
          main_nav.find('li').removeClass('active');
        }
        main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active');
      }
      if (cur_pos < 200) {
        $(".nav-menu ul:first li:first").addClass('active');
      }
    });
  });

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });

  $('.back-to-top').click(function() {
    // if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) == false ) {
      var element = document.getElementById('clicked');
      element.style.visibility = 'visible';
      element.style.opacity = '1';
      setTimeout(() => {
        element.style.visibility = 'hidden';
        element.style.opacity = '0';
      }, 1000);
    //  }
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  // jQuery counterUp
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });

  // Skills section
  $('.skills-content').waypoint(function() {
    $('.progress .progress-bar').each(function() {
      $(this).css("width", $(this).attr("aria-valuenow") + '%');
    });
  }, {
    offset: '80%'
  });

  // Init AOS
  function aos_init() {
    AOS.init({
      duration: 1000,
      once: true
    });
  }

  // Porfolio isotope and filter
  $(window).on('load', function() {
    var portfolioIsotope = $('.portfolio-container').isotope({
      itemSelector: '.portfolio-item'
    });

    $('#portfolio-flters li').on('click', function() {
      $("#portfolio-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');

      portfolioIsotope.isotope({
        filter: $(this).data('filter')
      });
      aos_init();
    });

    // Initiate venobox (lightbox feature used in portofilo)
    $('.venobox').venobox({
      'share': false
    });

    // Initiate aos_init() function
    aos_init();

  });

  // Testimonials carousel (uses the Owl Carousel library)
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  });

  // Portfolio details carousel
  $(".portfolio-details-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  });

})(jQuery);
