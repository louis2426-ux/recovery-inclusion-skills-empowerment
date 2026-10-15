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

  /* Cookie disclaimer — shown until the visitor accepts or saves their settings. */
  var CONSENT_KEY = 'rise_cookie_consent';
  function readConsent(){
    var m = document.cookie.match(new RegExp('(?:^|; )'+CONSENT_KEY+'=([^;]*)'));
    if(m){ try{ return JSON.parse(decodeURIComponent(m[1])); }catch(e){} }
    try{ var v = localStorage.getItem(CONSENT_KEY); if(v){ return JSON.parse(v); } }catch(e){}
    return null;
  }
  function saveConsent(prefs){
    var val = JSON.stringify(prefs);
    document.cookie = CONSENT_KEY+'='+encodeURIComponent(val)+'; max-age='+(60*60*24*365)+'; path=/; SameSite=Lax';
    try{ localStorage.setItem(CONSENT_KEY, val); }catch(e){}
  }
  if(!readConsent()){
    var box = document.createElement('div');
    box.className = 'cookie-consent';
    box.setAttribute('role','dialog');
    box.setAttribute('aria-live','polite');
    box.setAttribute('aria-label','Cookie notice');
    box.innerHTML =
      '<div class="cookie-main">'+
        '<p>This site uses cookies. By continuing to browse the site, you are agreeing to our use of cookies.</p>'+
        '<div class="cookie-actions">'+
          '<button type="button" class="cookie-btn cookie-btn-ghost" data-cookie="settings" aria-expanded="false">Change settings</button>'+
          '<button type="button" class="cookie-btn cookie-btn-accept" data-cookie="accept">Accept</button>'+
        '</div>'+
      '</div>'+
      '<div class="cookie-settings" hidden>'+
        '<label class="cookie-opt"><input type="checkbox" checked disabled> <span><strong>Essential</strong> — needed for the site to work. Always on.</span></label>'+
        '<label class="cookie-opt"><input type="checkbox" name="analytics" checked> <span><strong>Analytics</strong> — helps us understand how the site is used.</span></label>'+
        '<label class="cookie-opt"><input type="checkbox" name="marketing"> <span><strong>Marketing</strong> — used to show relevant content from partners.</span></label>'+
        '<div class="cookie-actions"><button type="button" class="cookie-btn cookie-btn-accept" data-cookie="save">Save settings</button></div>'+
      '</div>';
    document.body.appendChild(box);
    var panel = box.querySelector('.cookie-settings');
    var close = function(prefs){ saveConsent(prefs); box.classList.add('cookie-hide'); setTimeout(function(){ box.remove(); }, 300); };
    box.addEventListener('click', function(e){
      var btn = e.target.closest('[data-cookie]');
      if(!btn){ return; }
      var action = btn.getAttribute('data-cookie');
      if(action === 'accept'){ close({essential:true, analytics:true, marketing:true}); }
      else if(action === 'settings'){
        var open = panel.hasAttribute('hidden');
        if(open){ panel.removeAttribute('hidden'); } else { panel.setAttribute('hidden',''); }
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      }
      else if(action === 'save'){
        close({essential:true, analytics:box.querySelector('[name="analytics"]').checked, marketing:box.querySelector('[name="marketing"]').checked});
      }
    });
  }

})();
