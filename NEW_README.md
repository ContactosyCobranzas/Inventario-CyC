# Sistema de Inventario CyC

Sistema de gestión de inventario desarrollado para Contactos y Cobranzas, diseñado para administrar equipos, licencias de software, direcciones IP y usuarios de manera eficiente.

##  Características Principales

- **Gestión de Equipos**: Control completo de hardware asignado
- **Licencias de Software**: Seguimiento de licencias y versiones
- **Administración de IPs**: Gestión de direcciones IP de la red
- **Control de Usuarios**: Sistema de usuarios y perfiles
- **Dashboard Interactivo**: Visualización de KPIs y estadísticas
- **Historial de Movimientos**: Seguimiento de todos los cambios
- **Tema Oscuro**: Interfaz moderna y cómoda para la vista

##  Tecnologías Utilizadas

### Frontend
- **React 18** - Biblioteca de interfaz de usuario
- **Vite** - Herramienta de construcción moderna
- **React Icons** - Iconos para la interfaz
- **React Toastify** - Notificaciones elegantes
- **CSS3** - Estilos modernos con variables CSS

### Herramientas de Desarrollo
- **ESLint** - Linter para mantener calidad del código
- **PowerShell Scripts** - Automatización de tareas de limpieza

##  Estructura del Proyecto

```
frontend/
├── src/
│   ├── auth/           # Componentes de autenticación
│   ├── common/         # Componentes reutilizables
│   ├── dashboard/      # Panel principal y KPIs
│   ├── hardware/       # Gestión de equipos e IPs
│   ├── inventory/      # Sistema de inventario
│   ├── users/          # Gestión de usuarios
│   └── assets/         # Recursos estáticos
├── public/             # Archivos públicos
└── package.json        # Dependencias del proyecto
```

##  Instalación y Configuración

### Prerrequisitos
- **Node.js** >= 16.x
- **npm** o **yarn**

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/ContactosyCobranzas/Inventario-CyC.git
   cd Inventario-CyC/frontend
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   # o usando yarn
   yarn install
   ```

3. **Iniciar el servidor de desarrollo**
   ```bash
   npm run dev
   # o usando yarn
   yarn dev
   ```

4. **Construir para producción**
   ```bash
   npm run build
   # o usando yarn
   yarn build
   ```

##  Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Construye la aplicación para producción |
| `npm run preview` | Vista previa de la construcción de producción |
| `npm run lint` | Ejecuta ESLint para verificar el código |

##  Limpieza del Código

El proyecto incluye un script de PowerShell para automatizar la limpieza del código:

```powershell
# Ejecutar en modo prueba (sin cambios)
.\cleanup-project.ps1 -DryRun

# Aplicar cambios
.\cleanup-project.ps1
```

El script elimina patrones típicos de código generado y mejora:
- Nombres de variables y funciones
- Organización de imports
- Eliminación de comentarios genéricos
- Optimización de estilos inline

##  Personalización

### Tema y Colores
El sistema utiliza variables CSS personalizables:

```css
:root {
  --primary-color: #FFD600;
  --secondary-color: #c62828;
  --card-bg: #23272b;
  --text-color: #fff;
}
```

### Configuración del Usuario
- **Tamaño de fuente**: Ajustable desde configuración
- **Tema**: Actualmente solo tema oscuro disponible
- **Notificaciones**: Sistema configurable de alertas

##  Funcionalidades Principales

### Dashboard
- **KPIs en tiempo real**: Estadísticas clave del inventario
- **Gráficos interactivos**: Visualización de datos
- **Accesos rápidos**: Navegación eficiente

### Gestión de Equipos
- **CRUD completo**: Crear, leer, actualizar y eliminar equipos
- **Búsqueda avanzada**: Filtros múltiples
- **Historial**: Seguimiento de cambios

### Administración de IP
- **Control de rangos**: Gestión de subredes
- **Estados**: Libre, en uso, reservado
- **Asignaciones**: Vincular IPs a equipos

### Licencias de Software
- **Inventario de licencias**: Seguimiento completo
- **Versiones**: Control de actualizaciones
- **Vencimientos**: Alertas de renovación

##  Autenticación

Sistema de autenticación con:
- **Login seguro**: Validación de credenciales
- **Sesiones persistentes**: Mantener sesión activa
- **Logout seguro**: Limpieza de datos sensibles

##  Próximas Mejoras

- [ ] **API Backend**: Integración con servidor
- [ ] **Base de datos**: Persistencia de datos real
- [ ] **Reportes PDF**: Exportación de informes
- [ ] **Tema claro**: Opción de tema adicional
- [ ] **Multi-idioma**: Soporte i18n
- [ ] **PWA**: Aplicación web progresiva
- [ ] **Tests**: Cobertura de pruebas unitarias

##  Contribución

1. Fork el proyecto
2. Crea tu rama de característica (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: nueva característica increíble'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

##  Convenciones de Código

- **Componentes**: PascalCase (ej: `VersionesView`)
- **Archivos**: PascalCase para componentes, camelCase para utilidades
- **Variables**: camelCase descriptivos
- **Funciones**: Verbos claros (`handleFormSubmit`, `openModal`)
- **CSS**: BEM methodology o clases semánticas

##  Reporte de Bugs

Si encuentras algún bug, por favor:
1. Revisa los issues existentes
2. Crea un nuevo issue con:
   - Descripción clara del problema
   - Pasos para reproducir
   - Capturas de pantalla si es necesario
   - Información del navegador

##  Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

##  Contacto

**Contactos y Cobranzas**
-  Email: desarrollo@contactosycobranzas.com
-  Website: [contactosycobranzas.com](https://contactosycobranzas.com)

---

 **¡No olvides darle una estrella al proyecto si te fue útil!**