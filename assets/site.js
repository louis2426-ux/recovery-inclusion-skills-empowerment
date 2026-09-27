(function(){
  /* Legacy hash links from the old single-page version (e.g. /#episodes) now
     map onto the real page URLs. */
  var hashRoutes = {home:'/', episodes:'/episodes/', about:'/about/', contact:'/contact/'};
  var hash = location.hash.replace('#','');
  if(hash && hashRoutes.hasOwnProperty(hash)){
    var target = hashRoutes[hash];
    if(target === location.pathname){ history.replaceState(null,'',location.pathname); }
    else { location.replace(target); return; }
  }

  var navLinks = document.getElementById('navLinks');
  var burger = document.getElementById('burgerBtn');
  if(burger && navLinks){
    burger.addEventListener('click', function(){
      var open = navLinks.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  var wf = document.getElementById('waveform');
  if(wf){
    var bars = 60, html = '';
    for(var i=0;i<bars;i++){
      var h = 6 + Math.round(Math.random()*26);
      html += '<span style="height:'+h+'px;"></span>';
    }
    wf.innerHTML = html;
  }

  /* Install the app: use the browser prompt where there is one, otherwise explain how. */
  if('serviceWorker' in navigator){
    window.addEventListener('load', function(){ navigator.serviceWorker.register('/sw.js').catch(function(){}); });
  }
  var deferredPrompt = null;
  window.addEventListener('beforeinstallprompt', function(e){ e.preventDefault(); deferredPrompt = e; });
  var standalone = window.matchMedia('(display-mode: standalone)').matches || navigator.standalone;
  var installLinks = document.querySelectorAll('[data-install]');
  for(var j=0;j<installLinks.length;j++){
    if(standalone){ installLinks[j].style.display = 'none'; continue; }
    installLinks[j].addEventListener('click', function(e){
      e.preventDefault();
      if(deferredPrompt){
        deferredPrompt.prompt();
        deferredPrompt.userChoice.finally(function(){ deferredPrompt = null; });
        return;
      }
      var ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
      alert(ios
        ? 'To install RISE Conversations, tap the Share button in Safari, then "Add to Home Screen".'
        : 'To install RISE Conversations, open your browser menu and choose "Install app" or "Add to Home screen".');
    });
  }

})();
