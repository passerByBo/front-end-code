ð»BFF èææ¶åæ¢  
âââ README.md #å¸®å©é¡¹ç®å¼åæä»¶  
âââ app.js #é¡¹ç®å¯å¨æä»¶éè¿  
âââ assets
âââ bin  
âââ config  
âââ controllers  
âââ libs  
âââ logs  
âââ middlewares  
âââ models  
âââ node_modules  
âââ npm-debug.log  
âââ package-lock.json  
âââ package.json  
âââ tests  
âââ views  
âââ widgets  

12 directories, 5 files

node.js

books/list
-> html(vue/react/html/js) js ä»£ç  res.end("<html/>")
â  è½çè§è¿ä¸ªé¡µé¢
â¡ è½çè§è¿å¾å¿«

-> éæ©
â  åå°æ¨¡æ¿ + åç«¯æ¨¡æ¿
å¢å¼º çå¥ html + html çæä½ èæ dom
â¡ js åäºä¸ºä¸ åæ

->mpa çå¤é¡µåºç¨ webpack
â  node.js + åå°æ¨¡æ¿ + html
â¡ pages/books/list.html <-ç»§æ¿èª layout.html
â¢ å»æ¾é¡µé¢éè¦åªäºç»ä»¶ï¼banner ç»ä»¶
{% include "./components/banner/banner.html" %}
â£ å³é®ä¸æ­¥ banner.js + banner.css å¸¦è¿æ¥ koa

â¤chunk js ç¸äºä¾èµ

books/list -> list.html -> banner.html -> banne.css+banner.js

list.html -> list.entry.js + banner.js ->list.js
