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

})();
