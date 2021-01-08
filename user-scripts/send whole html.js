// ==UserScript==
// @name         [yad2] - send whole html
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.yad2.co.il/item/*
// @grant        window.close
// ==/UserScript==

(async function() {
  'use strict';
  const timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };
  const main = async () => {
    try {
      await timeout(1000);
      document.querySelector('#lightbox_contact_seller_0').click();
      await timeout(1000);
      document.querySelector('.has_images')?.click();
      await timeout(3000);
      document.querySelector('.y2i_PlayButton')?.click();
      await timeout(3000);

      const mainContent = document.querySelector('.main_adPage')?.outerHTML;
      const photoContent = document.querySelector('.swiper_content')?.outerHTML;
      const videoContent = document.querySelector('.video_container')?.outerHTML;


      const wholeHtml = {
        body: mainContent + photoContent + videoContent,
        apartmentId: location.href.split('/')[4].split('?')[0],
      };


      fetch('https://yad2.ngrok.io/misc/full-html', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(wholeHtml), // body data type must match "Content-Type" header
      }).then(async (resp) => {
        await timeout(3000);
        window.close();
      });
    } catch (e) {
      await timeout(5000);
      await main();
    }
  };

  await main()

})();
