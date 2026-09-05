export function initCustomCursor() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  document.body.appendChild(cursor);

  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animate() {
    // تنعيم الحركة (Lerp)
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;

    // استخدام translate3d يضمن إن الـ GPU هو اللي يحرك الدائرة
    cursor.style.transform = `translate3d(${cursorX - 10}px, ${cursorY - 10}px, 0)`;
    
    requestAnimationFrame(animate);
  }
  animate();
}