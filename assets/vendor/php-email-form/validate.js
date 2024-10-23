jQuery(document).ready(function($) {
  "use strict";
 
  //Contact
  // $('form.php-email-form').submit(function() {
    $('form').submit(function() {
   
    var f = $(this).find('.form-group'),
      ferror = false,
      emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

    f.children('input').each(function() { // run all inputs
     
      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;

          case 'email':
            if (!emailExp.test(i.val())) {
              ferror = ierror = true;
            }
            break;

          case 'checked':
            if (! i.is(':checked')) {
              ferror = ierror = true;
            }
            break;

          case 'regexp':
            exp = new RegExp(exp);
            if (!exp.test(i.val())) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validate').html((ierror ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
    f.children('textarea').each(function() { // run all inputs

      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validate').html((ierror ? (i.attr('data-msg') != undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
    if (ferror) return false;
    else var str = $(this).serialize();

    var this_form = $(this);
    var action = $(this).attr('action');

    if( ! action ) {
      this_form.find('.loading').slideUp();
      this_form.find('.error-message').slideDown().html('The form action property is not set!');
      return false;
    }
    
    this_form.find('.sent-message').slideUp();
    this_form.find('.error-message').slideUp();
    this_form.find('.loading').slideDown();
    var chat_id = '-477676685'
    var toten = '1597774416:AAGbN4TwPCwS4PSh4QtvzRojIT8i8N5aLl8'
    // var toten = '1464068819:AAGHc3Yy4r3OGgUqGQemYYDrTBWDO3qUbZw'
    // var chat_id = '-458916939'
    $.ajax({
      url:'https://api.telegram.org/bot'+toten+'/sendMessage',
      method:'POST',
      data:{chat_id:chat_id,parse_mode:'Markdown',text:'Name : '+$('#name').val()+'\n E-mail : '+$('#email').val()+'\n Subject : '+$('#subject').val()+'\n Message body : '+$('#message_body').val()},
      success:function(){
          this_form.find('.loading').slideUp();
          this_form.find('.sent-message').slideDown();
          setTimeout(function(){
          this_form.find('.sent-message').slideUp();
         }, 2000);
          this_form.find("input:not(input[type=submit]), textarea").val('');
      },
      error: function (request, status, error) {
        var message = error;
        if(!error){
          message ='Unkown error';
        }
        this_form.find('.loading').slideUp();
        this_form.find('.error-message').slideDown().html("Error message : "+ message);
        setTimeout(function(){
          this_form.find('.error-message').slideUp().html("Error message : "+error);
         }, 3000);
      }
    });
    return false;
  });

});
function socialClick(message) {
  //var chat_id = '-458916939'
  var chat_id = '-487587096'
  var toten = '1597774416:AAGbN4TwPCwS4PSh4QtvzRojIT8i8N5aLl8'
  let date = new Date(); //actual time in miliseconds
  let string = date.getFullYear()+'-'+date.getMonth()+1+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()
  $.ajax({
    url:'https://api.telegram.org/bot'+toten+'/sendMessage',
    method:'POST',
    data:{chat_id:chat_id,text:'==> Social Clicked on : '+string+'\n==> Clicked on: '+message},
    success:function(){
    },
    error: function (request, status, error) {
    }
  });
 }
