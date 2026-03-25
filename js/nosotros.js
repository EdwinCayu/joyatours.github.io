/**
 * JOYA TOURS PERÚ - JAVASCRIPT NOSOTROS Y CONTACTO
 * Funcionalidad específica para la página de nosotros y contacto
 */

// ============================================
// MENÚ MOBILE (HAMBURGUESA)
// ============================================
function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('active');
}

// ============================================
// FORMULARIO DE CONTACTO
// ============================================
function handleSubmit(event) {
    event.preventDefault();
    alert('¡Gracias por tu consulta! Te contactaremos pronto.');
    event.target.reset();
}

// ============================================
// SCROLL SUAVE PARA ENLACES INTERNOS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            const offset = 110;
            const targetPosition = target.offsetTop - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Cerrar menú móvil si está abierto
            const menu = document.getElementById('menu');
            if (menu && menu.classList.contains('active')) {
                menu.classList.remove('active');
            }
        }
    });
});

// ============================================
// CONTROL DEL HEADER Y BARRA SUPERIOR
// ============================================
let lastScrollTop = 0;
const header = document.getElementById("header");
const topBar = document.getElementById("topBar");

window.addEventListener("scroll", function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 50) {
        header.classList.add("scrolled");
        header.classList.remove("at-top");
        if (topBar) {
            topBar.classList.add("hidden");
        }
    } else {
        header.classList.remove("scrolled");
        header.classList.add("at-top");
        if (topBar) {
            topBar.classList.remove("hidden");
        }
    }

    lastScrollTop = scrollTop;
});

// Establecer estado inicial del header
if (window.pageYOffset <= 50) {
    header.classList.add("at-top");
}

// ============================================
// INICIALIZACIÓN AL CARGAR LA PÁGINA
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('Joya Tours Perú - Página de Nosotros y Contacto cargada correctamente');
    
    // Agregar animaciones suaves a las secciones al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos que queremos animar
    document.querySelectorAll('.mvv-card, .stat-item, .contacto-info, form').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
