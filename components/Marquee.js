function startMarquee(element) {
    const speed = parseInt(element.getAttribute('data-speed')) * 1000;
    const marquee = document.createElement('div');
    marquee.className = 'marquee';
    marquee.innerHTML = element.innerHTML;
    element.innerHTML = '';
    element.appendChild(marquee);
  
    let scrollPosition = 0;
    let animationFrame;
  
    function animateMarquee() {
      scrollPosition += 1;
      if (scrollPosition >= marquee.scrollWidth - element.offsetWidth) {
        scrollPosition = 0;
      }
      marquee.style.transform = `translateX(-${scrollPosition}px)`;
      animationFrame = requestAnimationFrame(animateMarquee);
    }
  
    function startAnimation() {
      if (!animationFrame) {
        animateMarquee();
      }
    }
  
    function stopAnimation() {
      cancelAnimationFrame(animationFrame);
      animationFrame = null;
    }
  
    element.addEventListener('mouseenter', stopAnimation);
    element.addEventListener('mouseleave', startAnimation);
  
    startAnimation();
  }
  
  export { startMarquee };
  