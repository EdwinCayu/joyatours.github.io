/**
 * JOYA TOURS PERÚ - JAVASCRIPT PRINCIPAL
 * Maneja la funcionalidad de la página web
 */

// ============================================
// MENÚ MOBILE (HAMBURGUESA)
// ============================================
function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('active');
}

// ============================================
// LIBRO DE RECLAMACIONES
// ============================================
function openLibro() {
    document.getElementById('libroModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeLibro() {
    document.getElementById('libroModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Cerrar modal al hacer clic fuera
window.onclick = function(event) {
    const modal = document.getElementById('libroModal');
    if (event.target == modal) {
        closeLibro();
    }
}

        // Manejar envío del libro de reclamaciones
        function handleLibroSubmit(event) {
            event.preventDefault();
            const formData = new FormData(event.target);
            const data = Object.fromEntries(formData);
            
            const tipo = data.tipo === 'reclamo' ? 'RECLAMO' : 'QUEJA';
            const numeroHoja = 'LR-' + Date.now().toString().slice(-6);
            
            alert('✅ Su ' + tipo + ' ha sido registrado correctamente.\n\n' +
                  'Número de Hoja: ' + numeroHoja + '\n' +
                  'Solicitante: ' + data.nombres + ' ' + data.apellidos + '\n' +
                  'Email: ' + data.email_libro + '\n\n' +
                  'Recibirá una respuesta en un plazo máximo de 15 días calendario.\n' +
                  'Se enviará una copia al correo electrónico consignado.');
            
            closeLibro();
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

// Establecer estado inicial del header al cargar la página
// Detecta correctamente AMBOS estados
const initialScroll = window.pageYOffset || document.documentElement.scrollTop;
if (initialScroll > 50) {
    header.classList.add("scrolled");
    header.classList.remove("at-top");
    if (topBar) {
        topBar.classList.add("hidden");
    }
} else {
    header.classList.add("at-top");
    header.classList.remove("scrolled");
    if (topBar) {
        topBar.classList.remove("hidden");
    }
}

// ============================================
// CARRUSEL INFINITO CON INDICADORES
// ============================================

let currentPosition = 0;
let realPosition = 0; // Posición lógica (0-7 para 8 cards)
const slider = document.getElementById('carouselSlider');
const btnPrev = document.querySelector('.carousel-btn.prev');
const btnNext = document.querySelector('.carousel-btn.next');

if (slider) {
    const originalCards = Array.from(document.querySelectorAll('.sugerencia-card'));
    const totalCards = originalCards.length;
    
    console.log('🎠 Carrusel infinito con indicadores - Total:', totalCards);
    
    // Función para calcular cards visibles según ancho de pantalla
    function getVisibleCards() {
        const width = window.innerWidth;
        if (width > 1200) return 4;
        if (width > 968) return 3;
        if (width > 480) return 2;
        return 1;
    }
    
    // Clonar cards al inicio y final para efecto infinito
    function setupInfiniteScroll() {
        slider.querySelectorAll('.clone').forEach(clone => clone.remove());
        
        const visibleCards = getVisibleCards();
        
        // Clonar cards del FINAL y ponerlos al INICIO
        for (let i = totalCards - visibleCards; i < totalCards; i++) {
            const clone = originalCards[i].cloneNode(true);
            clone.classList.add('clone');
            slider.insertBefore(clone, slider.firstChild);
        }
        
        // Clonar cards del INICIO y ponerlos al FINAL
        for (let i = 0; i < visibleCards; i++) {
            const clone = originalCards[i].cloneNode(true);
            clone.classList.add('clone');
            slider.appendChild(clone);
        }
        
        // Posicionar en el primer card real
        currentPosition = visibleCards;
        realPosition = 0;
        updatePosition(false);
    }
    
    // Actualizar posición del slider
    function updatePosition(withTransition = true) {
        const cardWidth = slider.children[0].offsetWidth;
        const sliderStyle = window.getComputedStyle(slider);
        const gap = parseFloat(sliderStyle.gap) || 32;
        const cardWithGap = cardWidth + gap;
        
        slider.style.transition = withTransition ? 'transform 0.4s ease' : 'none';
        const moveAmount = currentPosition * cardWithGap;
        slider.style.transform = `translateX(-${moveAmount}px)`;
        
        console.log('📍 Posición física:', currentPosition, '| Lógica:', realPosition);
    }
    
    // Crear indicadores
    function createIndicators() {
        const visibleCards = getVisibleCards();
        const totalPositions = totalCards - visibleCards + 1;
        const indicatorsContainer = document.getElementById('carouselIndicators');
        
        if (!indicatorsContainer) return;
        
        indicatorsContainer.innerHTML = '';
        
        for (let i = 0; i < totalPositions; i++) {
            const indicator = document.createElement('button');
            indicator.className = 'carousel-indicator';
            indicator.setAttribute('aria-label', `Ir a posición ${i + 1} de ${totalPositions}`);
            indicator.onclick = () => goToPosition(i);
            indicatorsContainer.appendChild(indicator);
        }
        
        updateIndicators();
    }
    
    // Actualizar indicador activo
    function updateIndicators() {
        const indicators = document.querySelectorAll('.carousel-indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === realPosition);
        });
    }
    
    // Ir a posición específica (click en indicador)
    function goToPosition(position) {
        const visibleCards = getVisibleCards();
        
        // Calcular posición física basada en posición lógica
        currentPosition = visibleCards + position;
        realPosition = position;
        
        updatePosition(true);
        updateIndicators();
        
        // Analytics
        if (typeof enviarEventoGA === 'function') {
            enviarEventoGA('Carrusel', 'click_indicador', `posicion_${position}`, position);
        }
    }
    
    // Mover el carrusel
    window.moverCarrusel = function(direction) {
        const visibleCards = getVisibleCards();
        const maxRealPosition = totalCards - visibleCards;
        
        // Mover posición física
        currentPosition -= direction;
        
        // Actualizar posición lógica
        realPosition -= direction;
        
        // Lógica circular para posición lógica
        if (realPosition > maxRealPosition) {
            realPosition = 0;
        } else if (realPosition < 0) {
            realPosition = maxRealPosition;
        }
        
        updatePosition(true);
        updateIndicators();
        
        // Detectar si llegamos a un clon y hacer salto invisible
        setTimeout(() => {
            // Si estamos en el primer clon (yendo hacia atrás)
            if (currentPosition < visibleCards) {
                currentPosition = totalCards + (currentPosition - visibleCards);
                updatePosition(false);
            }
            
            // Si estamos en el último clon (yendo hacia adelante)
            if (currentPosition >= totalCards + visibleCards) {
                currentPosition = visibleCards + (currentPosition - totalCards - visibleCards);
                updatePosition(false);
            }
        }, 400);
        
        // Analytics
        if (typeof enviarEventoGA === 'function') {
            enviarEventoGA('Carrusel', 'mover_infinito', direction > 0 ? 'siguiente' : 'anterior', realPosition);
        }
    };
    
    // Inicializar
    setupInfiniteScroll();
    createIndicators();
    
    // Reiniciar al cambiar tamaño de ventana
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            setupInfiniteScroll();
            createIndicators();
        }, 250);
    });
}

setInterval(() => {
    moverCarrusel(1); // Avanza automáticamente
}, 5000); // Cada 5 segundos

// ============================================
// INICIALIZACIÓN AL CARGAR LA PÁGINA
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('Joya Tours Perú - Sitio web cargado correctamente');
    
    // Agregar animaciones suaves a las tarjetas al hacer scroll
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
    document.querySelectorAll('.destino-card, .servicio-item, .certificacion-card, .testimonio-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
// ============================================
// CONFIGURACIÓN DE PAGINACIÓN
// ============================================
const TOURS_POR_PAGINA = 6; // Mostrar 6 tours por página
let paginaActual = 1;
let toursFiltrados = [];
let categoriaActual = 'all';

// ============================================
// MODAL DE RESERVA RÁPIDA
// ============================================

// Datos del tour seleccionado
let tourSeleccionado = {
    nombre: '',
    precio: '',
    url: ''
};

/**
 * Abrir modal de reserva rápida
 */
function abrirModalReserva(nombre, precio, url) {
    tourSeleccionado = { nombre, precio, url };
    
    // Actualizar información en el modal
    document.getElementById('modal-tour-nombre').textContent = nombre;
    document.getElementById('modal-tour-precio').innerHTML = 
        `S/ ${precio} <span class="modal-tour-precio-small">por persona</span>`;
    
    // Mostrar modal
    document.getElementById('modalReserva').classList.add('active');
    
    // Establecer fecha mínima (mañana)
    const fechaInput = document.getElementById('modal-fecha');
    if (fechaInput) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        fechaInput.min = tomorrow.toISOString().split('T')[0];
    }
    
    // Prevenir scroll del body
    document.body.style.overflow = 'hidden';
    
    // Evento Analytics
    if (typeof enviarEventoGA === 'function') {
        enviarEventoGA('Reservas', 'abrir_modal_reserva', nombre, parseInt(precio));
    }
}

/**
 * Cerrar modal de reserva
 */
function cerrarModalReserva() {
    document.getElementById('modalReserva').classList.remove('active');
    document.getElementById('formReservaRapida').reset();
    
    // Restaurar scroll del body
    document.body.style.overflow = '';
}

/**
 * Procesar reserva rápida y abrir WhatsApp
 */
function procesarReservaRapida(event) {
    event.preventDefault();
    
    const fecha = document.getElementById('modal-fecha').value;
    const personas = document.getElementById('modal-personas').value;
    
    if (!fecha || !personas) {
        alert('⚠️ Por favor completa todos los campos');
        return;
    }
    
    // Crear mensaje para WhatsApp
    const mensaje = `Hola, quiero reservar el tour *${tourSeleccionado.nombre}*%0A%0A` +
                   `📅 Fecha: ${fecha}%0A` +
                   `👥 Personas: ${personas}%0A` +
                   `💰 Precio: S/ ${tourSeleccionado.precio} por persona%0A%0A` +
                   `¿Podrían confirmar disponibilidad?`;
    
    // Evento Analytics
    if (typeof enviarEventoGA === 'function') {
        enviarEventoGA('Conversiones', 'click_reservar_whatsapp', tourSeleccionado.nombre, parseInt(tourSeleccionado.precio));
    }
    
    // Abrir WhatsApp
    window.open(`https://wa.me/51930905465?text=${mensaje}`, '_blank');
    
    // Cerrar modal
    cerrarModalReserva();
}

// ============================================
// GOOGLE ANALYTICS - EVENTOS
// ============================================

/**
 * Enviar evento a Google Analytics
 */
function enviarEventoGA(categoria, accion, etiqueta, valor) {
    if (typeof gtag !== 'undefined') {
        gtag('event', accion, {
            'event_category': categoria,
            'event_label': etiqueta,
            'value': valor
        });
    }
}

// ============================================
// PAGINACIÓN DE TOURS
// ============================================

/**
 * Inicializar paginación al cargar la página
 */
function inicializarPaginacion() {
    actualizarToursFiltrados();
    
    const totalTours = toursFiltrados.length;
    
    if (totalTours <= TOURS_POR_PAGINA) {
        // Si hay 6 o menos tours, ocultar paginación
        const paginationContainer = document.querySelector('.pagination-container');
        if (paginationContainer) {
            paginationContainer.style.display = 'none';
        }
        return;
    }
    
    mostrarPagina(1);
}

/**
 * Actualizar lista de tours filtrados según categoría
 */
function actualizarToursFiltrados() {
    const todasLasCards = document.querySelectorAll('.destino-card');
    
    if (categoriaActual === 'all') {
        toursFiltrados = Array.from(todasLasCards);
    } else {
        toursFiltrados = Array.from(todasLasCards).filter(card => 
            card.getAttribute('data-category') === categoriaActual
        );
    }
}

/**
 * Filtrar por categoría y resetear paginación
 */
function filterCategoryConPaginacion(category) {
    categoriaActual = category;
    
    // Actualizar tabs activos
    const tabs = document.querySelectorAll('.category-tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');
    
    // Mostrar/ocultar cards según categoría
    const cards = document.querySelectorAll('.destino-card');
    cards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
    
    // Actualizar tours filtrados y resetear a página 1
    actualizarToursFiltrados();
    mostrarPagina(1);
    
    // Mostrar/ocultar paginación según cantidad de tours
    const paginationContainer = document.querySelector('.pagination-container');
    if (paginationContainer) {
        if (toursFiltrados.length <= TOURS_POR_PAGINA) {
            paginationContainer.style.display = 'none';
        } else {
            paginationContainer.style.display = 'flex';
        }
    }
}

/**
 * Mostrar tours de una página específica
 */
function mostrarPagina(numeroPagina) {
    paginaActual = numeroPagina;
    
    const inicio = (numeroPagina - 1) * TOURS_POR_PAGINA;
    const fin = inicio + TOURS_POR_PAGINA;
    
    // Ocultar todos los tours filtrados primero
    toursFiltrados.forEach(card => {
        card.classList.add('hidden-page');
    });
    
    // Mostrar solo los tours de la página actual
    toursFiltrados.slice(inicio, fin).forEach(card => {
        card.classList.remove('hidden-page');
    });
    
    // Scroll suave al inicio de la sección de destinos
    const destinosSection = document.getElementById('destinos');
    if (destinosSection && numeroPagina > 1) {
        const offset = 100; // Ajuste para el header fijo
        const elementPosition = destinosSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
    
    renderizarPaginacion();
    actualizarInfoPaginacion();
}

/**
 * Renderizar botones de paginación
 */
function renderizarPaginacion() {
    const totalPaginas = Math.ceil(toursFiltrados.length / TOURS_POR_PAGINA);
    const paginationContainer = document.querySelector('.pagination');
    
    if (!paginationContainer || totalPaginas <= 1) return;
    
    let html = '';
    
    // Botón Anterior
    html += `<button class="pagination-btn" onclick="cambiarPagina(${paginaActual - 1})" ${paginaActual === 1 ? 'disabled' : ''}>
                ◀
             </button>`;
    
    // Lógica de páginas visibles
    const maxBotones = 5; // Máximo de números de página visibles
    let inicioPaginas = Math.max(1, paginaActual - 2);
    let finPaginas = Math.min(totalPaginas, inicioPaginas + maxBotones - 1);
    
    // Ajustar si estamos cerca del final
    if (finPaginas - inicioPaginas < maxBotones - 1) {
        inicioPaginas = Math.max(1, finPaginas - maxBotones + 1);
    }
    
    // Primera página si no está visible
    if (inicioPaginas > 1) {
        html += `<button class="pagination-btn" onclick="cambiarPagina(1)">1</button>`;
        if (inicioPaginas > 2) {
            html += `<span class="pagination-dots">...</span>`;
        }
    }
    
    // Páginas numeradas
    for (let i = inicioPaginas; i <= finPaginas; i++) {
        html += `<button class="pagination-btn ${i === paginaActual ? 'active' : ''}" 
                        onclick="cambiarPagina(${i})">
                    ${i}
                 </button>`;
    }
    
    // Última página si no está visible
    if (finPaginas < totalPaginas) {
        if (finPaginas < totalPaginas - 1) {
            html += `<span class="pagination-dots">...</span>`;
        }
        html += `<button class="pagination-btn" onclick="cambiarPagina(${totalPaginas})">${totalPaginas}</button>`;
    }
    
    // Botón Siguiente
    html += `<button class="pagination-btn" onclick="cambiarPagina(${paginaActual + 1})" ${paginaActual === totalPaginas ? 'disabled' : ''}>
                ▶
             </button>`;
    
    paginationContainer.innerHTML = html;
}

/**
 * Cambiar de página
 */
function cambiarPagina(numeroPagina) {
    const totalPaginas = Math.ceil(toursFiltrados.length / TOURS_POR_PAGINA);
    
    if (numeroPagina < 1 || numeroPagina > totalPaginas) return;
    
    mostrarPagina(numeroPagina);
}

/**
 * Actualizar información de paginación (mostrando X de Y tours)
 */
function actualizarInfoPaginacion() {
    const infoElement = document.querySelector('.pagination-info');
    if (!infoElement) return;
    
    const totalTours = toursFiltrados.length;
    const inicio = (paginaActual - 1) * TOURS_POR_PAGINA + 1;
    const fin = Math.min(paginaActual * TOURS_POR_PAGINA, totalTours);
    
    infoElement.innerHTML = `Mostrando <strong>${inicio}-${fin}</strong> de <strong>${totalTours}</strong> tours`;
}

// ============================================
// EVENTOS AL CARGAR LA PÁGINA
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar paginación
    inicializarPaginacion();
    
    // Cerrar modal al hacer clic fuera de él
    const modalOverlay = document.getElementById('modalReserva');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                cerrarModalReserva();
            }
        });
    }
    
    // Cerrar modal con tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
            cerrarModalReserva();
        }
    });
    
    // ============================================
    // EVENTOS DE GOOGLE ANALYTICS
    // ============================================
    
    // Evento: Click en "Ver Detalles"
    document.querySelectorAll('.btn-detalles').forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.destino-card');
            if (card) {
                const tourName = card.querySelector('h3').textContent;
                enviarEventoGA('Tours', 'click_ver_detalles', tourName, 0);
            }
        });
    });
    
    // Evento: Click en filtros de categoría
    document.querySelectorAll('.category-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const categoria = this.textContent.trim();
            enviarEventoGA('Filtros', 'filtrar_categoria', categoria, 0);
        });
    });
    
    // Evento: Click en WhatsApp flotante
    const whatsappFloat = document.querySelector('.whatsapp-float');
    if (whatsappFloat) {
        whatsappFloat.addEventListener('click', function() {
            enviarEventoGA('Contacto', 'click_whatsapp_float', 'Botón flotante', 0);
        });
    }
    
    // Evento: Click en botón WhatsApp top bar
    const whatsappTopBtn = document.querySelector('.whatsapp-btn');
    if (whatsappTopBtn) {
        whatsappTopBtn.addEventListener('click', function() {
            enviarEventoGA('Contacto', 'click_whatsapp_topbar', 'Barra superior', 0);
        });
    }
});
