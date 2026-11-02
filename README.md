# PokeDex: Despliegue en Azure for Students

Proyecto individual de despliegue de la aplicación **PokeDex** (Angular 14) para la compañía Pueblo Paleta Inc., usando **Microsoft Azure (cuenta Azure for Students)** y el servicio **Azure App Service**.

- **Repositorio:** https://github.com/EzequielPalencia/pokedex
- **Aplicación desplegada:** `https://[COMPLETAR: Dominio predeterminado de tu App Service]`
- **Documentación del despliegue:** ver [Despliegue.md](Despliegue.md)

---

## 1. Plataforma elegida y justificación

Se eligió **Azure for Students** porque:

- Se obtiene con el correo institucional, sin tarjeta de crédito.
- Incluye **100 US$ de crédito** durante 12 meses.
- Ofrece **Azure App Service**, que permite publicar una aplicación web con HTTPS automático y despliegue continuo desde GitHub.
- Permite configurar encabezados de seguridad mediante un archivo `web.config` (servidor IIS en Windows).

> Nota: se intentó primero **Azure Static Web Apps**, pero la suscripción de estudiante no habilitaba la opción en las regiones permitidas. Por eso se usó **App Service**.

---

## 2. Requisitos previos

| Requisito | Detalle |
|---|---|
| Correo institucional | El de la universidad, con acceso a su bandeja |
| Cuenta de GitHub | Para el repositorio y el despliegue continuo |
| Navegador actualizado | Edge, Chrome o Firefox |
| Teléfono | Para la verificación por SMS, si Azure la solicita |

---

## 3. Creación de la cuenta Azure for Students (paso a paso)

### Paso 1. Entrar a la página de Azure for Students

1. Abrir en el navegador: **https://azure.microsoft.com/free/students**
2. Pulsar **Activar ahora** (*Start free*).

![Página de Azure for Students](docs/img/01-azure-students.png)

### Paso 2. Iniciar sesión con la cuenta Microsoft

1. Iniciar sesión con una cuenta Microsoft o crear una nueva.
2. Usar preferiblemente el **correo institucional** para facilitar la verificación.

![Inicio de sesión](docs/img/02-inicio-sesion.png)

### Paso 3. Verificar la condición de estudiante

1. Escribir el **correo institucional** cuando se solicite.
2. Microsoft envía un **enlace o código de verificación** a ese correo.
3. Abrir el correo, confirmar el enlace y volver al formulario.

![Verificación de estudiante](docs/img/03-verificacion-estudiante.png)

### Paso 4. Completar el perfil

1. Completar nombre, país y datos de contacto.
2. Aceptar el acuerdo de suscripción y las condiciones.
3. Si se solicita, verificar el teléfono con un código SMS.

![Datos del perfil](docs/img/04-perfil.png)

### Paso 5. Acceder al portal de Azure

1. Entrar a **https://portal.azure.com**.
2. Comprobar que existe la suscripción **Azure for Students** en el servicio **Suscripciones**.

![Suscripción Azure for Students](docs/img/05-suscripcion.png)

### Paso 6. Comprobar el crédito disponible

En el portal se busca **Education** y se abre **Información general**. Allí se verifica:

| Dato | Valor observado |
|---|---|
| Créditos disponibles | **100 US$ de 100 US$** |
| Días hasta que expire el crédito | **339** (expira el 01/10/2027) |
| Costos de octubre | **0,00 US$** |

![Crédito de Azure for Students](docs/img/06-creditos-education.png)

---

## 4. Configuración inicial en Azure

### 4.1 Grupo de recursos

Se creó el grupo de recursos **`rg-pokedex-venezuela-prod`**, que agrupa todos los recursos del proyecto. Así se pueden eliminar todos juntos al terminar para no gastar crédito.

### 4.2 Recursos creados

En la página principal del portal se observan los recursos generados para el proyecto:

| Recurso | Tipo | Descripción |
|---|---|---|
| `app-pokedex-caracas-prod-edpo` | App Service | La aplicación web PokeDex |
| `ASP-rgpokedexvenezuelaprod-839c` | Plan de App Service | Plan de hospedaje asociado |

![Recursos en el portal de Azure](docs/img/07-recursos.png)

### 4.3 Datos de la aplicación web

Según la página **Introducción** del App Service:

| Parámetro | Valor |
|---|---|
| Nombre | `app-pokedex-caracas-prod-edpo` |
| Grupo de recursos | `rg-pokedex-venezuela-prod` |
| Estado | En ejecución |
| Ubicación | West US 3 |
| Suscripción | Azure for Students |
| Sistema operativo | **Windows** |
| Modelo de publicación | Código |
| Pila en tiempo de ejecución | Node ~22 |
| Plan de App Service | `ASP-rgpokedexvenezuelaprod-839c` |
| Proyecto GitHub | https://github.com/EzequielPalencia/pokedex |

![Introducción del App Service](docs/img/08-app-service-introduccion.png)

> La pila Node ~22 no influye en el funcionamiento: la aplicación se compila en GitHub Actions y en Azure solo se sirven archivos estáticos con IIS.

### 4.4 Ajustes de seguridad del App Service

En el portal: App Service → **Configuración** → **Configuración general**:

| Ajuste | Valor |
|---|---|
| Solo HTTPS (*HTTPS Only*) | **Activado** |
| Versión mínima de TLS | **1.2** |

![Configuración de HTTPS y TLS](docs/img/09-https-tls.png)

### 4.5 Control de costos (buena práctica)

1. Verificar en **Administración de costos + facturación** que el consumo sea 0,00 US$.
2. Usar el plan de precios más bajo disponible. `[COMPLETAR: plan usado, por ejemplo F1 o B1]`
3. Al finalizar la evaluación, eliminar el grupo de recursos si ya no se necesita.

---

## 5. Conexión con GitHub

Durante la creación del App Service, en la pestaña **Implementación**, se activó el despliegue continuo desde GitHub:

1. Se autorizó la cuenta de GitHub.
2. Se seleccionó el repositorio `EzequielPalencia/pokedex` y la rama `main`.
3. Azure creó automáticamente un workflow en `.github/workflows/` y los secretos de autenticación en el repositorio.

El detalle de cómo se corrigió ese workflow y se desplegó la aplicación está en [Despliegue.md](Despliegue.md).

---



La aplicación quedó publicada en:

**``**

(Se obtiene en el portal: App Service → **Introducción** → **Dominio predeterminado**.)

![Aplicación funcionando](docs/img/10-app-funcionando.png)

---

## 7. Estructura de la documentación

| Archivo | Contenido |
|---|---|
| `README.md` | Creación de la cuenta y configuración inicial en la nube (este documento) |
| `Despliegue.md` | Proceso técnico de despliegue y seguridad de la aplicación |