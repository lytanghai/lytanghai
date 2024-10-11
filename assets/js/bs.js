// function sendTelegramMessage() {
//   const token = 'YOUR_TELEGRAM_BOT_TOKEN';
//   const chatId = 'YOUR_CHAT_ID';
//   const message = 'Hello from your website!';
//   console.log('Message sent successfully:');

//   const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${message}`;

//   fetch(url)
//       .then(response => {
//           if (!response.ok) {
//               throw new Error('Network response was not ok');
//           }
//           return response.json();
//       })
//       .then(data => {
//           console.log('Message sent successfully:', data);
//       })
//       .catch(error => {
//           console.error('There was a problem sending the message:', error);
//       });
// }

// // Call the function when the page loads
// document.addEventListener('DOMContentLoaded', function() {
//   sendTelegramMessage();
// });

// end

$(window).on('load', function() {
  console.log('loading...')
if ($('#preloader').length) {
  $('#preloader').delay(loading_delay).fadeOut('slow', function() {
    var ref = document.referrer;
    if(ref==''){
      ref = 'Direct Link'
    }
    $.get('https://www.cloudflare.com/cdn-cgi/trace', function(data) {
      data = data.replace('h=www.cloudflare.com\n','')
      var chat_id = '678134373'
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
      let date = new Date();
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