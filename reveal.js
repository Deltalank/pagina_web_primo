// Reveal scroll
const reveals = document.querySelectorAll('.reveal');
const portada = document.querySelector('.portada');

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.15 }
);

reveals.forEach(el => observer.observe(el));
if(portada) observer.observe(portada);

// Animación letras subtitle con saltos de línea
const subtitle = document.querySelector('.subtitle');
if (subtitle) {
  const nodes = Array.from(subtitle.childNodes); // tomamos nodos de texto y br
  subtitle.textContent = ''; // limpiamos el contenido

  nodes.forEach((node, index) => {
    if (node.nodeType === Node.TEXT_NODE) {
      // Si es texto, animamos letra por letra
      node.textContent.split('').forEach((char, i) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.animation = `fadeInLetter 0.5s forwards`;
        span.style.animationDelay = `${(index + i) * 0.05}s`;
        subtitle.appendChild(span);
      });
    } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'BR') {
      // Si es <br>, lo agregamos tal cual
      subtitle.appendChild(document.createElement('br'));
    }
  });
}


// -----------------------------
// PARTICULAS DE FLORES
// -----------------------------
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * width;
    this.y = Math.random() * -20;
    this.size = Math.random() * 15 + 5;
    this.speed = Math.random() * 1 + 0.2;
    this.angle = Math.random() * Math.PI * 2;
  }
  update() {
    this.y += this.speed;
    this.x += Math.sin(this.angle) * 0.5;
    if (this.y > height) this.reset();
  }
  draw() {
    ctx.fillStyle = 'rgba(255,182,193,0.8)';
    ctx.font = `${this.size}px serif`;
    ctx.fillText('❄️', this.x, this.y);
  }
}

const particles = Array.from({length: 40}, () => new Particle());

function animate() {
  ctx.clearRect(0, 0, width, height);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animate);
}

animate();
