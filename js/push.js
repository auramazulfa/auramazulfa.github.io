var webPush = require("web-push");
 
const vapidKeys = {
   "publicKey": "BEsKHdo_Zcu1BitQQdMg1DCHMchfXCbnZLX1EiEXFfkYcPVkUjV1RC756JPh_Xl1Ho0AEICXqKG0-2LmqCfs6BM",
   "privateKey": "IR0w0O1bbuB5YG02u4IuLJCQMdZ_BmefHVjxUdjgdjQ"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/exMyRlZj7as:APA91bFVFT-BPuNOOCDjPwKU4z73wuWCGt3NenTFaKzT_K-5AQlUCZWvhGdvi-kS0lj8ZPGBvae8xseQhd5sVEly51z7gs8wdacCbYSasbAJ04YC8VfmxHx4jBTnZ64oHdNpDzgs8_pz",
   "keys": {
       "p256dh": "BBMgETBNrahV18hXqdo7fYMx6hUojcpp/CYcwq18Pe/d46PjJFhOA4HMxpq61+Jk3WI5v95p7tmlWx9yjbpkT18=",
       "auth": "w1PjZtekZhfvTEwlUMGJHg=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '842760579879',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);