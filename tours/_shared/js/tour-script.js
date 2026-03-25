/**
 * JOYA TOURS PERÚ - JAVASCRIPT PARA TOURS
 * Archivo compartido para Full Day y Multi-día
 */

// ============================================
// FUNCIÓN DE RESERVA
// ============================================
function realizarReserva(event) {
    event.preventDefault();
    
    const fecha = document.getElementById('fecha').value;
    const personas = document.getElementById('personas').value;
    
    if (!fecha || !personas) {
        alert('Por favor completa todos los campos');
        return;
    }

    // Obtener el nombre del tour desde el título de la página
    const tourNombre = document.title.split(' - ')[0];

    const mensaje = `Hola, quiero reservar el tour *${tourNombre}*%0A%0A` +
                  `📆 Fecha: ${fecha}%0A` +
                  `👥 Personas: ${personas}%0A%0A` +
                  `¿Podrían darme más información?`;
    
    window.open(`https://wa.me/51930905465?text=${mensaje}`, '_blank');
}

// ============================================
// CONTROL DEL HEADER Y BARRA SUPERIOR
// ============================================
window.addEventListener("scroll", function() {
    const header = document.querySelector("header");
    const topBar = document.getElementById("topBar");

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
        if (topBar) {
            topBar.classList.add("hidden");
        }
    } else {
        header.classList.remove("scrolled");
        if (topBar) {
            topBar.classList.remove("hidden");
        }
    }
});

// ============================================
// MENÚ STICKY - ACTIVAR SEGÚN SCROLL
// ============================================
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section-tour');
    const menuLinks = document.querySelectorAll('.tour-menu a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    menuLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ============================================
// SMOOTH SCROLL PARA MENÚ
// ============================================
document.querySelectorAll('.tour-menu a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const offset = 100;
        const targetPosition = target.offsetTop - offset;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
});

// ============================================
// ESTABLECER FECHA MÍNIMA (MAÑANA)
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const dateInput = document.getElementById('fecha');
    if (dateInput) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        dateInput.min = tomorrow.toISOString().split('T')[0];
    }
});
