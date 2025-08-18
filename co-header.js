\
(function(){
  function $(s,r){return (r||document).querySelector(s)}
  function $$(s,r){return Array.from((r||document).querySelectorAll(s))}
  var header=$('.header'),toggle=$('.nav-toggle'),overlay=$('.overlay');
  function onScroll(){ if(!header) return; if(window.scrollY>10) header.classList.add('header-scrolled'); else header.classList.remove('header-scrolled'); }
  window.addEventListener('scroll',onScroll,{passive:true}); onScroll();
  if(toggle){ toggle.addEventListener('click',function(){ document.documentElement.classList.toggle('nav-open'); document.body.classList.toggle('nav-open'); }); }
  if(overlay){ overlay.addEventListener('click',function(){ document.documentElement.classList.remove('nav-open'); document.body.classList.remove('nav-open'); }); }

  // file:// fallback for links, assets, and logo image
  try{
    var isFile = location.protocol==='file:';
    if(isFile){
      var path=location.pathname.replace(/\\/g,'/');
      var parts=path.split('/').filter(Boolean);
      var atRootIndex=(parts.length>=1 && parts[parts.length-1].toLowerCase()==='index.html' && parts.length===1);
      var inSubIndex=(parts.length>=2 && parts[parts.length-1].toLowerCase()==='index.html' && parts.length===2);
      var prefix = inSubIndex ? '../' : './';

      // Rewrite logo link to root
      var logoLink=$('.logo');
      if(logoLink) logoLink.setAttribute('href', prefix);

      // Rewrite nav links to <slug>/index.html
      $$('.nav-link[data-slug], .cta-btn[data-slug]').forEach(function(a){
        var slug=a.getAttribute('data-slug'); if(!slug) return;
        a.setAttribute('href', prefix + slug + '/index.html');
      });

      // Rewrite shared assets if needed
      $$('link[rel="stylesheet"][href="/co-shared.css"]').forEach(function(l){ l.setAttribute('href', prefix + 'co-shared.css'); });
      $$('script[src="/co-header.js"]').forEach(function(s){ s.setAttribute('src', prefix + 'co-header.js'); });

      // Rewrite logo image to relative
      var logoImg=$('.logo img');
      if(logoImg && logoImg.getAttribute('src') && logoImg.getAttribute('src').indexOf('/images/')===0){
        logoImg.setAttribute('src', prefix + 'images/Logo.png');
      }
    }
  }catch(e){}
})();