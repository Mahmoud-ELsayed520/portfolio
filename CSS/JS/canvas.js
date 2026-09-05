/**
 * Canvas module - The Visuals are Back!
 */
const COLORS = ['#00d4ff', '#0077ff', '#ffffff'];
export function initHeroCanvas() {
  const canvas = document.querySelector('.hero__canvas');
  const heroSection = document.getElementById('hero');
  if (!canvas || !heroSection) return;

  const ctx = canvas.getContext('2d'); // رجعنا للـ 2d العادي عشان الـ Shadows تشتغل
  if (!ctx) return;

  let width, height;
  let shapes = [];
  // قللنا العدد حاجة بسيطة عشان الخطوط متعملش لاج
  const isMobile = window.innerWidth < 768;
  const shapeCount = isMobile ? 12 : 25; 
  
  const mouse = { x: null, y: null };

  function resize() {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
  }

  function createShapes() {
    shapes = [];
    for (let i = 0; i < shapeCount; i++) {
      shapes.push(new Shape(canvas, ctx));
    }
  }

  function drawLines() {
    // توصيل النقط ببعضها (الشكل الشبكي)
    for (let i = 0; i < shapes.length; i++) {
      for (let j = i + 1; j < shapes.length; j++) {
        const dx = shapes[i].x - shapes[j].x;
        const dy = shapes[i].y - shapes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150) { // مسافة التوصيل
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 - dist / 1500})`; // خطوط شفافة جداً
          ctx.lineWidth = 0.4;
          ctx.moveTo(shapes[i].x, shapes[i].y);
          ctx.lineTo(shapes[j].x, shapes[j].y);
          ctx.stroke();
        }
      }
      
      // توصيل النقط بالماوس
      if (mouse.x && mouse.y) {
        const dx = shapes[i].x - mouse.x;
        const dy = shapes[i].y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
           ctx.beginPath();
           ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 - dist / 200})`;
           ctx.lineWidth = 0.6;
           ctx.moveTo(shapes[i].x, shapes[i].y);
           ctx.lineTo(mouse.x, mouse.y);
           ctx.stroke();
        }
      }
    }
  }

  let rafId = null;
  let isVisible = true;

  function animate() {
    if (!isVisible) {
      setTimeout(() => requestAnimationFrame(animate), 500); // Check again later
      return;
    }

    ctx.clearRect(0, 0, width, height); // مسحنا اللون الأسود، دلوقتي الخلفية شفافة

    shapes.forEach(shape => {
      shape.update();
      shape.draw();
    });

    drawLines(); // رجعنا الخطوط
    
    rafId = requestAnimationFrame(animate);
  }

  // Mouse interactivity
  heroSection.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  
  heroSection.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Performance: Stop animation when scrolling down
  const observer = new IntersectionObserver((entries) => {
    isVisible = entries[0].isIntersecting;
  }, { threshold: 0.1 });
  
  observer.observe(heroSection);

  window.addEventListener('resize', () => {
    resize();
    createShapes();
  });

  resize();
  createShapes();
  animate();
}

class Shape {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.speedX = (Math.random() - 0.5) * 0.8;
    this.speedY = (Math.random() - 0.5) * 0.8;
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > this.canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > this.canvas.height) this.speedY *= -1;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.ctx.fillStyle = this.color;
    this.ctx.shadowBlur = 8; // رجعنا التوهج
    this.ctx.shadowColor = this.color;
    this.ctx.fill();
    this.ctx.shadowBlur = 0; // Reset performance
  }
}