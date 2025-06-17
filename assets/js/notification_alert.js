const token = '6146637472:AAEF3MsqfUsFD4PXc81Ro4tYpiNyu4ajwQI';
const chatId = '678134373';

function shouldNotify(ip) {
  const lastNotify = JSON.parse(localStorage.getItem('last_notification')) || {};
  const now = Date.now();

  if (lastNotify[ip] && now - lastNotify[ip] < 10 * 60 * 1000) {
    return false; // same IP notified recently
  }

  lastNotify[ip] = now;
  localStorage.setItem('last_notification', JSON.stringify(lastNotify));
  return true;
}


const visitorInfo = {
  operatingSystem: getOperatingSystem(),
  browser: detectBrowser(),
  screenWidth: window.screen.width,
  screenHeight: window.screen.height
};

function getOperatingSystem() {
  const platform = navigator.platform;
  const userAgent = navigator.userAgent;

  if (platform.toLowerCase().includes('win')) {
    return 'Windows';
  } else if (platform.toLowerCase().includes('mac')) {
    return 'Mac OS';
  } else if (platform.toLowerCase().includes('linux')) {
    return 'Linux';
  } else if (userAgent.includes('Android')) {
    return 'Android';
  } else if (userAgent.includes('iOS')) {
    return 'iOS';
  } else if (userAgent.includes('X11')) {
    return 'Unix';
  } else if (userAgent.includes('iPhone')) {
    return 'iOS';
  } else if (userAgent.includes('iPad')) {
    return 'iOS';
  } else if (userAgent.includes('BlackBerry')) {
    return 'BlackBerry';
  } else {
    return 'Unknown';
  }
}

function detectBrowser() {
  var userAgent = navigator.userAgent;
  if (userAgent.indexOf("Edg") > -1) {
    return "Microsoft Edge";
  } else if (userAgent.indexOf("Chrome") > -1) {
    return "Chrome";
  } else if (userAgent.indexOf("Firefox") > -1) {
    return "Firefox";
  } else if (userAgent.indexOf("Safari") > -1) {
    return "Safari";
  } else if (userAgent.indexOf("Opera") > -1) {
    return "Opera";
  } else if (userAgent.indexOf("Trident") > -1 || userAgent.indexOf("MSIE") > -1) {
    return "Internet Explorer";
  }

  return "Unknown";
}

function formatTelegramMessage(jsonObject) {
  let formattedMessage = '';

  for (const key in jsonObject) {
    if (typeof jsonObject[key] === 'object') {
      formattedMessage += `${key}: \n`;
      const innerKeys = Object.keys(jsonObject[key]);
      innerKeys.forEach(innerKey => {
        formattedMessage += `   ${innerKey}: ${jsonObject[key][innerKey]}\n`;
      });
    } else {
      formattedMessage += `${key}: ${jsonObject[key]}\n`;
    }
  }

  return formattedMessage;
}

function sendTelegramMessage() {

  let source = 'Direct';
  const determineSource = () => {
    const referrer = document.referrer.toString();
    if (referrer.includes('linkedin')) {
      source = 'Linkedin'
    } else if (referrer.includes('facebook')) {
      source = 'Facebook'
    } else if (referrer.includes('instagram')) {
      source = 'Instagram'
    } else if (referrer.includes('threads')) {
      source = 'Threads'
    } else if (referrer.includes('twitter') || referrer.includes('x.com') || referrer.includes('t.co')) {
      source = 'Twitter'
    }
  };

  const fetchIPData = async () => {
    try {
      if (!shouldNotify(ipAddr)) {
        console.log("IP has already been notified recently.");
        return;
      }

      const response = await fetch('https://api.ipify.org/?format=json');
      const data = await response.json();
      const ipAddr = data.ip;

      const jsonObject = {
        date: formatDate(new Date()),
        source: source, // make sure `source` is defined in your outer scope
        ip: ipAddr,
        visitor_info: {
          operatingSystem: visitorInfo.operatingSystem,
          browser: visitorInfo.browser,
          screenWidth: visitorInfo.screenWidth,
          screenHeight: visitorInfo.screenHeight
        }
      };

      // Format message in human-readable style
      const messageText = `
    Someone has viewed your profile!
    - Date: ${jsonObject.date}
    - Source: ${jsonObject.source}
    - IP: ${jsonObject.ip}
    - OS: ${jsonObject.visitor_info.operatingSystem}
    - Browser: ${jsonObject.visitor_info.browser}
    - Screen: ${jsonObject.visitor_info.screenWidth}x${jsonObject.visitor_info.screenHeight}
        `.trim();

      // Encode for Telegram
      const encodedMessage = encodeURIComponent(messageText);

      // Send message to Telegram
      const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodedMessage}`;

      // Send the message
      await fetch(url);

    } catch (error) {
      console.error('Error fetching IP address or sending to Telegram:', error);
    }
  };

  const sendMessage = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Message sent successfully:', data);
    } catch (error) {
      console.error('There was a problem sending the message:', error);
    }
  };

  determineSource();
  fetchIPData().then(url => sendMessage(url));
}

async function notifyTelegram() {

  const messageText = `Someone has downloaded your CV!`.trim();

  // Encode for Telegram
  const encodedMessage = encodeURIComponent(messageText);

  // Send message to Telegram
  const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodedMessage}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Telegram API error: ${response.status}`);
    }
    const data = await response.json();
    console.log('Message sent successfully:', data);
  } catch (error) {
    console.error('There was a problem sending the message:', error);
  }
}


function formatDate(inputDate) {
  const date = new Date(inputDate);
  date.setHours(date.getHours());

  const gmtPlus7Time = date.toTimeString().split(' ')[0];
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  const formattedDate = `${gmtPlus7Time} ${day}/${month}/${year}`;

  return formattedDate;
}

document.addEventListener('DOMContentLoaded', function () {
  sendTelegramMessage();
});

