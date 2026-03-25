[README.md](https://github.com/user-attachments/files/26234344/README.md)
# JOYA TOURS PERÚ - SITIO WEB

## 📁 Estructura del Proyecto

```
joya-tours-peru/
│
├── index.html                          # Página principal
├── nosotros-contacto.html              # Página de Nosotros y Contacto
│
├── css/                                 # Carpeta de estilos
│   ├── styles.css                      # Estilos principales (index)
│   └── nosotros.css                    # Estilos de nosotros (importa styles.css)
│
├── js/                                  # Carpeta de JavaScript
│   ├── main.js                         # JavaScript principal (index)
│   └── nosotros.js                     # JavaScript de nosotros
│
└── public/                              # Recursos estáticos
    ├── image/
    │   ├── logoJoya-encabezado.png     # Logo del header
    │   └── portada-principal.png       # Imagen del hero
    └── ico/
        ├── icoWhatsapp.png             # Icono de WhatsApp
        └── libroReclamaciones.png      # Icono libro de reclamaciones
```

## 🎯 Características Implementadas

### ✅ **BUENAS PRÁCTICAS**
- **Separación de responsabilidades:** HTML, CSS y JavaScript en archivos independientes
- **Código organizado y comentado**
- **Reutilización de estilos** mediante @import en CSS
- **Funciones modulares** en JavaScript
- **Semántica HTML5** correcta

### ✅ **FUNCIONALIDADES**

#### **Página Principal (index.html)**
1. **Header dinámico**
   - Barra superior con redes sociales (se oculta al hacer scroll)
   - Logo que cambia a blanco al hacer scroll
   - Menú responsive con hamburguesa en móvil

2. **Secciones:**
   - Hero con imagen de fondo
   - Destinos (con filtros por categoría: Todos/Full Day/Multi-día)
   - Servicios
   - Destinos Más Solicitados (carrusel horizontal con flechas)
   - Stats (3 tarjetas: Experiencia, Clientes, Destinos)
   - Certificaciones y Autorizaciones (4 tarjetas)
   - Opiniones de Clientes (6 testimonios)
   - Libro de Reclamaciones (modal)

3. **Carrusel de Destinos:**
   - Navegación con flechas izquierda/derecha
   - Responsive (1 tarjeta móvil, 3 tablet, 4 desktop)
   - Transiciones suaves

#### **Página Nosotros y Contacto (nosotros-contacto.html)**
1. **Sección Nosotros:**
   - Historia de la empresa
   - Stats (Experiencia, Clientes, Destinos)
   - Misión, Visión y Valores

2. **Sección Contacto:**
   - Información de contacto completa
   - Formulario de cotización
   - Redes sociales

### ✅ **DISEÑO RESPONSIVE**
- Adaptado para móviles, tablets y desktop
- Menú hamburguesa en móvil
- Grids que se ajustan automáticamente
- Carrusel optimizado por tamaño de pantalla

## 🚀 Cómo Usar

### 1. **Estructura de carpetas requerida:**
Asegúrate de tener esta estructura:

```
tu-proyecto/
├── index.html
├── nosotros-contacto.html
├── css/
│   ├── styles.css
│   └── nosotros.css
├── js/
│   ├── main.js
│   └── nosotros.js
└── public/
    ├── image/
    │   ├── logoJoya-encabezado.png
    │   └── portada-principal.png
    └── ico/
        ├── icoWhatsapp.png
        └── libroReclamaciones.png
```

### 2. **Archivos de imágenes necesarios:**
- `logoJoya-encabezado.png` - Logo de la empresa (50px altura recomendada)
- `portada-principal.png` - Imagen de fondo del hero (1920x1080px recomendado)
- `icoWhatsapp.png` - Icono de WhatsApp (60x60px)
- `libroReclamaciones.png` - Icono libro reclamaciones (35x18px)

### 3. **Abrir el sitio:**
Simplemente abre `index.html` en tu navegador.

## 📝 Personalización

### **Colores Principales (Variables CSS):**
```css
--color-primario: #0d5675      /* Azul corporativo */
--color-secundario: #39b671    /* Verde corporativo */
--color-acento: #f2aa21        /* Amarillo/dorado */
```

### **Modificar contenido:**
- **Tours:** Edita el HTML en la sección `#destinos`
- **Testimonios:** Edita la sección con clase `.testimonios-grid`
- **Certificaciones:** Edita `.certificaciones-grid`
- **Contacto:** Actualiza información en la sección `#contacto`

### **Agregar más tours al carrusel:**
Duplica este bloque dentro de `#carouselSlider`:
```html
<div class="sugerencia-card">
    <div class="sugerencia-img">🏔️</div>
    <div class="sugerencia-content">
        <h4>Nombre del Tour</h4>
        <p style="font-size: 0.9rem; color: #666;">Duración</p>
        <div class="sugerencia-precio">S/ Precio</div>
    </div>
</div>
```

## 🔧 Funciones JavaScript Principales

### **main.js:**
- `toggleMenu()` - Abre/cierra menú móvil
- `filterCategory(category)` - Filtra tours por categoría
- `moveCarousel(direction)` - Mueve el carrusel
- `openLibro()` / `closeLibro()` - Controla modal de libro
- Scroll suave para enlaces internos
- Control de header dinámico

### **nosotros.js:**
- `toggleMenu()` - Menú móvil
- `handleSubmit(event)` - Procesa formulario de contacto
- Control de header dinámico
- Animaciones al hacer scroll

## 📱 Navegación del Sitio

```
index.html (Inicio)
├── #inicio (Hero)
├── #destinos (Tours)
├── #servicios (Por qué elegirnos)
├── Destinos Solicitados + Stats
├── Certificaciones
├── Opiniones
└── Footer

nosotros-contacto.html
├── #nosotros (Sobre la empresa)
└── #contacto (Formulario)
```

## 🌐 Enlaces Importantes

### **Internos:**
- `index.html#inicio` - Inicio
- `index.html#destinos` - Destinos
- `index.html#servicios` - Servicios
- `nosotros-contacto.html#nosotros` - Nosotros
- `nosotros-contacto.html#contacto` - Contacto

### **Externos:**
- WhatsApp: `https://wa.me/51930905465`

## 💡 Notas Técnicas

1. **CSS Import:** `nosotros.css` importa `styles.css` para reutilizar estilos comunes
2. **Imágenes de fondo:** Usa rutas relativas desde el CSS (`../public/image/`)
3. **Responsive breakpoint:** 768px (móvil/desktop)
4. **Animaciones:** Se activan al hacer scroll (Intersection Observer API)
5. **Smooth scroll:** Nativo con `scroll-behavior: smooth`

## ✅ Checklist de Implementación

- [ ] Crear estructura de carpetas
- [ ] Subir archivos HTML, CSS y JS
- [ ] Agregar imágenes a carpeta `public/`
- [ ] Verificar rutas de imágenes
- [ ] Probar navegación entre páginas
- [ ] Probar carrusel (flechas izq/der)
- [ ] Probar filtros de categorías
- [ ] Probar menú móvil (responsive)
- [ ] Verificar formulario de contacto
- [ ] Probar libro de reclamaciones
- [ ] Verificar enlaces de WhatsApp

## 🎨 Mejoras Futuras Sugeridas

1. Backend para formularios (PHP/Node.js)
2. Base de datos para tours
3. Sistema de reservas online
4. Panel de administración
5. Integración con pasarela de pagos
6. Galería de fotos real con lightbox
7. Videos embebidos de YouTube
8. Mapa de Google Maps
9. Chat en vivo
10. Multi-idioma (ES/EN)

---

**Desarrollado con ❤️ para Joya Tours Perú**
**Última actualización:** Febrero 2026
