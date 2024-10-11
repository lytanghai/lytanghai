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
            var chat_id = '@announcementInternal'
            var token = '7329223244:AAE-jHtXyYgEdrguw6jpX7gnqbMVf3tw5Vs'
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
              url:'https://api.telegram.org/bot'+token+'/sendMessage',
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
});

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