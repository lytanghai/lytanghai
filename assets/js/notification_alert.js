// const visitorInfo = {
//   operatingSystem: getOperatingSystem(),
//   browser: detectBrowser(),
//   screenWidth: window.screen.width,
//   screenHeight: window.screen.height
// };

// function getOperatingSystem() {
//   const platform = navigator.platform;
//   const userAgent = navigator.userAgent;

//   if (platform.toLowerCase().includes('win')) {
//     return 'Windows';
//   } else if (platform.toLowerCase().includes('mac')) {
//     return 'Mac OS';
//   } else if (platform.toLowerCase().includes('linux')) {
//     return 'Linux';
//   } else if (userAgent.includes('Android')) {
//     return 'Android';
//   } else if (userAgent.includes('iOS')) {
//     return 'iOS';
//   } else if (userAgent.includes('X11')) {
//     return 'Unix';
//   } else if (userAgent.includes('iPhone')) {
//     return 'iOS';
//   } else if (userAgent.includes('iPad')) {
//     return 'iOS';
//   } else if (userAgent.includes('BlackBerry')) {
//     return 'BlackBerry';
//   } else {
//     return 'Unknown';
//   }
// }

// function detectBrowser() {
//   var userAgent = navigator.userAgent;
//   if (userAgent.indexOf("Edg") > -1) {
//     return "Microsoft Edge";
//   } else if (userAgent.indexOf("Chrome") > -1) {
//     return "Chrome";
//   } else if (userAgent.indexOf("Firefox") > -1) {
//     return "Firefox";
//   } else if (userAgent.indexOf("Safari") > -1) {
//     return "Safari";
//   } else if (userAgent.indexOf("Opera") > -1) {
//     return "Opera";
//   } else if (userAgent.indexOf("Trident") > -1 || userAgent.indexOf("MSIE") > -1) {
//     return "Internet Explorer";
//   }

//   return "Unknown";
// }

// function formatTelegramMessage(jsonObject) {
//   let formattedMessage = '';

//   for (const key in jsonObject) {
//     if (typeof jsonObject[key] === 'object') {
//       formattedMessage += `${key}: \n`;
//       const innerKeys = Object.keys(jsonObject[key]);
//       innerKeys.forEach(innerKey => {
//         formattedMessage += `   ${innerKey}: ${jsonObject[key][innerKey]}\n`;
//       });
//     } else {
//       formattedMessage += `${key}: ${jsonObject[key]}\n`;
//     }
//   }

//   return formattedMessage;
// }

// function sendTelegramMessage() {
//   const token = '6146637472:AAEF3MsqfUsFD4PXc81Ro4tYpiNyu4ajwQI';
//   const chatId = '678134373';
//   let source = 'direct';

//   const determineSource = () => {
//     const referrer = document.referrer;
//     if (referrer.includes('linkedin')) {
//       source = 'linkedin';
//     }
//   };

//   let ipAddr;
//   let jsonObject;
//   let url;

//   const fetchIPData = async () => {
//     try {
//       const response = await fetch('https://api.ipify.org/?format=json');
//       const data = await response.json();
//       ipAddr = data.ip;
//       jsonObject = {
//         "date": formatDate(new Date()),
//         "source": source,
//         "ip": ipAddr,
//         "visitor_info": visitorInfo
//       };
//       const jsonString = JSON.stringify(jsonObject, null, 2);

//       url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${jsonString}`;
//       return url;
//     } catch (error) {
//       console.error('Error fetching IP address:', error);
//     }
//   };

//   const sendMessage = async (url) => {
//     try {
//       const response = await fetch(url);
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       const data = await response.json();
//       console.log('Message sent successfully:', data);
//     } catch (error) {
//       console.error('There was a problem sending the message:', error);
//     }
//   };

//   determineSource();
//   fetchIPData().then(url => sendMessage(url));
// }

// function formatDate(inputDate) {
//   const date = new Date(inputDate);
//   date.setHours(date.getHours());

//   const gmtPlus7Time = date.toTimeString().split(' ')[0];
//   const day = date.getDate().toString().padStart(2, '0');
//   const month = (date.getMonth() + 1).toString().padStart(2, '0');
//   const year = date.getFullYear();

//   const formattedDate = `${gmtPlus7Time} ${day}/${month}/${year}`;

//   return formattedDate;
// }

// document.addEventListener('DOMContentLoaded', function () {
//   sendTelegramMessage();
// });

// -------------------

!(function ($) {
    "use strict";
    var location_visitor = 'Unknown';
    $(window).on('load', function () {
        $.get('https://www.cloudflare.com/cdn-cgi/trace', function (data) {
            data = data.replace('h=www.cloudflare.com\n', '')
            var chat_id = '678134373'
            var token = '6146637472:AAEF3MsqfUsFD4PXc81Ro4tYpiNyu4ajwQI'
            location_visitor = 'Unknown'
            var client_data = 'Unknown'
            var ip_data = 'Unknown'
            var ip = 'ip='
            var client_uag = 'uag='
            var loc = 'loc='
            if (data.includes(loc)) {
                location_visitor = data.slice(data.lastIndexOf(loc) + 4, data.lastIndexOf(loc) + 6);
            }
            if (data.includes(ip)) {
                ip_data = data.slice(data.lastIndexOf(ip) + 3, data.lastIndexOf('ts='));
            }
            if (data.includes(client_uag)) {
                client_data = data.slice(data.lastIndexOf(client_uag) + 4, data.lastIndexOf('colo='));
            }
            let date = new Date(); 
            let string = date.getFullYear() + '-' + date.getMonth() + 1 + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes()
            $.ajax({
                url: 'https://api.telegram.org/bot' + token + '/sendMessage',
                method: 'POST',
                data: { chat_id: chat_id, parse_mode: 'Markdown', text: '==> Visitor data: ' + string + ', Location: ' + location_visitor + '\n==> Reference from: ' + ref + '\n==> ip: ' + ip_data + '==> client device info: ' + client_data },
                success: function () {
                },
                error: function (request, status, error) {
                }
            });
            $(this).remove();
        });
    });
})(jQuery);