document.addEventListener('DOMContentLoaded', () => {
  // Efecto de tipeo mucho más rápido para elementos con la clase terminal-content
  const typeElements = document.querySelectorAll('.terminal-content');
  
  typeElements.forEach(el => {
    // Verificar si el contenido incluye una lista
    const hasList = el.querySelector('ol, ul');
    
    // Si hay lista, gestionamos de manera diferente (mostrar instantáneamente)
    if (hasList) {
      // Añadimos un botón para omitir la animación (opcional)
      const skipButton = document.createElement('button');
      skipButton.textContent = 'Skip';
      skipButton.className = 'skip-typing';
      skipButton.style.position = 'absolute';
      skipButton.style.right = '10px';
      skipButton.style.top = '10px';
      skipButton.style.background = 'rgba(50, 50, 50, 0.7)';
      skipButton.style.border = '1px solid #666';
      skipButton.style.color = '#aaa';
      skipButton.style.padding = '3px 8px';
      skipButton.style.borderRadius = '3px';
      skipButton.style.cursor = 'pointer';
      skipButton.style.fontFamily = "'Share Tech Mono', monospace";
      skipButton.style.fontSize = '0.7rem';
      skipButton.style.zIndex = '10';
      
      el.parentNode.style.position = 'relative';
      el.parentNode.appendChild(skipButton);
      
      // Añadir cursor al final
      setTimeout(() => {
        // Eliminar el botón de skip
        if (skipButton.parentNode) {
          skipButton.parentNode.removeChild(skipButton);
        }
        
        // Añadir cursor al final del último elemento
        const items = el.querySelectorAll('li');
        if (items.length > 0) {
          const lastItem = items[items.length - 1];
          const cursor = document.createElement('span');
          cursor.className = 'cursor';
          lastItem.appendChild(cursor);
        }
      }, 800);
      
      return; // Salimos para no procesar más este elemento
    }
    
    // Procesamiento normal para elementos sin listas
    const text = el.textContent;
    const typeSpeed = 2; // Reducido drásticamente de 50ms a 2ms
    
    // Añadimos un botón para omitir la animación
    const skipButton = document.createElement('button');
    skipButton.textContent = 'Skip';
    skipButton.className = 'skip-typing';
    skipButton.style.position = 'absolute';
    skipButton.style.right = '10px';
    skipButton.style.top = '10px';
    skipButton.style.background = 'rgba(50, 50, 50, 0.7)';
    skipButton.style.border = '1px solid #666';
    skipButton.style.color = '#aaa';
    skipButton.style.padding = '3px 8px';
    skipButton.style.borderRadius = '3px';
    skipButton.style.cursor = 'pointer';
    skipButton.style.fontFamily = "'Share Tech Mono', monospace";
    skipButton.style.fontSize = '0.7rem';
    skipButton.style.zIndex = '10';
    
    el.parentNode.style.position = 'relative';
    el.parentNode.appendChild(skipButton);
    
    el.textContent = '';
    
    let charIndex = 0;
    let typingInterval;
    
    function typeText() {
      if (charIndex < text.length) {
        // Aceleramos la velocidad añadiendo varios caracteres a la vez
        const charsToAdd = Math.min(10, text.length - charIndex); // Añade 10 caracteres a la vez
        el.textContent += text.substr(charIndex, charsToAdd);
        charIndex += charsToAdd;
        typingInterval = setTimeout(typeText, Math.random() * typeSpeed + 5);
      } else {
        // Agregar cursor al final
        const cursor = document.createElement('span');
        cursor.className = 'cursor';
        el.appendChild(cursor);
        // Eliminar el botón de skip cuando termine
        if (skipButton.parentNode) {
          skipButton.parentNode.removeChild(skipButton);
        }
      }
    }
    
    // Función para mostrar todo el texto de una vez (skip)
    function showAllTextImmediately() {
      clearTimeout(typingInterval);
      el.textContent = text;
      const cursor = document.createElement('span');
      cursor.className = 'cursor';
      el.appendChild(cursor);
      if (skipButton.parentNode) {
        skipButton.parentNode.removeChild(skipButton);
      }
    }
    
    skipButton.addEventListener('click', showAllTextImmediately);
    
    // Iniciar animación después de un breve delay
    setTimeout(() => {
      typeText();
    }, 200);
    
    // Auto-completar si ha pasado demasiado tiempo (5 segundos)
    setTimeout(() => {
      if (charIndex < text.length) {
        showAllTextImmediately();
      }
    }, 5000);
  });
  
  // Efecto de glitch para elementos con la clase glitch
  const glitchElements = document.querySelectorAll('.glitch');
  
  glitchElements.forEach(el => {
    el.setAttribute('data-text', el.textContent);
  });
  
  // Inicializar el efecto de parallax para el fondo de cuadrícula (muy sutil)
  document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    document.documentElement.style.setProperty('--mouse-x', mouseX.toString());
    document.documentElement.style.setProperty('--mouse-y', mouseY.toString());
    
    const grid = document.querySelector('body::before');
    if (grid) {
      grid.style.transform = `translate(${mouseX * 5}px, ${mouseY * 5}px)`;
    }
  });
  
  // Efecto de hover para las tarjetas (más sutil)
  const cards = document.querySelectorAll('.card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const angleX = (y - centerY) / 20;
      const angleY = (centerX - x) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateZ(5px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
      setTimeout(() => {
        card.style.transform = 'translateY(-5px)';
      }, 300);
    });
  });
  
  // Añadir efecto de brillo a enlaces en hover
  const links = document.querySelectorAll('a');
  
  links.forEach(link => {
    link.addEventListener('mouseenter', () => {
      document.documentElement.style.setProperty('--glow-intensity', '0.8');
    });
    
    link.addEventListener('mouseleave', () => {
      document.documentElement.style.setProperty('--glow-intensity', '0.5');
    });
  });
  
  // Partículas flotantes (más sutiles y menos)
  createParticles();
});

// Función para crear partículas en el fondo
function createParticles() {
  const particles = document.createElement('div');
  particles.className = 'particles';
  document.body.appendChild(particles);
  
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Posición aleatoria
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    
    // Tamaño aleatorio (más pequeño)
    const size = Math.random() * 2 + 1;
    
    // Color monocromático
    const colors = ['#444', '#666', '#888'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    // Aplicar estilos
    particle.style.position = 'absolute';
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.backgroundColor = color;
    particle.style.borderRadius = '50%';
    particle.style.opacity = Math.random() * 0.4 + 0.2;
    particle.style.boxShadow = `0 0 ${size}px ${color}`;
    
    // Animación
    particle.style.animation = `float ${Math.random() * 10 + 15}s linear infinite`;
    particle.style.animationDelay = `${Math.random() * 5}s`;
    
    // Agregar la partícula al contenedor
    particles.appendChild(particle);
  }
  
  // Agregar la animación CSS
  const styleSheet = document.createElement('style');
  styleSheet.innerHTML = `
    @keyframes float {
      0% {
        transform: translateY(0) translateX(0);
      }
      25% {
        transform: translateY(-20px) translateX(5px);
      }
      50% {
        transform: translateY(-40px) translateX(-5px);
      }
      75% {
        transform: translateY(-60px) translateX(3px);
      }
      100% {
        transform: translateY(-100vh) translateX(0);
        opacity: 0;
      }
    }
    
    .particles {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
    }
    
    .skip-typing:hover {
      background: rgba(70, 70, 70, 0.9) !important;
      color: #ddd !important;
    }
  `;
  document.head.appendChild(styleSheet);
}

// Función para crear texto con efecto de glitch
function createGlitchText(elementId, text) {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  element.innerHTML = '';
  element.className = 'glitch';
  element.setAttribute('data-text', text);
  element.textContent = text;
} 