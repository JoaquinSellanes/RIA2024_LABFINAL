
# Proyecto RIA2024_LABFINAL

## Descripción

Este proyecto está dividido en dos partes: un backend desarrollado con Node.js y un frontend desarrollado con Angular. A continuación, se detallan los pasos necesarios para levantar ambos entornos.

## Funcionalidades implementadas

### Sin Rol
- Registro: Permite registrar a un nuevo Cliente. Pide "email", "password" y "telefono".
- Inicio de sesión: Permite al usuario (sea Cliente, Panadero o Admin) autenticarse recibiendo un token para la autorización dentro del sistema.
### Compartido entre roles (Se repite entre los roles del sistema)
- Tienda: Lista los productos disponibles del sistema, permite filtrar por precio, nombre e inclusive limpiar de forma fácil los filtros.
- Carrito: Contamos con un carrito de compras
    - Listar productos
    - Agregar productos
    - Eliminar el producto de la lista
    - Modificar la cantidad del producto
    - Seleccionar la fecha de entrega
    - Comprar (Realiza el pedido)
- Cambiar de tema: Una forma accesible de adaptar el sistema a el gusto del usuario, eligiendo alguno de los 5 temas pudiendo ser algunos claros y otros oscuros.
### Usuario (Cliente)
- Mis pedidos
    - Lista pedidos
    - Filtros por rango de fecha, pudiendo ser por la fecha de entrega (que ingresa el usuario), o por la fecha de pedido (cuando se realizó)
    - Ver el detalle del pedido
    - Limpiar los filtros

- Cuenta
    - Muestra el correo del cliente
    - Muestra los pedidos pendientes, en preparación, listos para recoger y una estadistica simple

### Panadero
- Pedidos
    - Filtros de "Todos", "Pendiente", "En Preparación" y "Listo Para Recoger"
    - Ordenación de datos según "Fecha de pedido ascendente", "Fecha de pedido descendente", "Fecha de entrega ascendente" y "Fecha de entrega descendente"
    - Botón de cambio de estado rápido según el estado actual del pedido
    - Calculo de insumos necesarios
        - Muestra al final de la página la cantidad total de los insumos que se necesitan para todos los pedidos filtrados
        - Exportación de los datos anteriores a un excel para mejor gestión
    - Botón para acceder a los detalles de cada pedido
    - Detalles de pedido
        - Información completa del pedido, de los productos que contiene, de los insumos totales de dicho pedido
        - Cambio de estado. Permite cambiar entre "Pendiente", "En preparación" y "Listo para recoger"
### Administrador (Admin)
- Dashboard
    - Botones en el centro de la pantalla para ser más accesibles
    - Estadisticas y graficas con fines administrativos
- Productos
    - Listado de productos del sistema (activos o inactivo)
    - Filtros según su estado (activo o inactivo)
    - Botón para activar o desactivar el producto del sistema
    - Creación de nuevos productos
    - Consulta rápida del producto (dandole clic a la imagen)
    - Modificación del producto
- Insumos
    - Lista todos los insumos del sistema
    - Activar o desactivar el insumo de forma fácil
    - Creación de nuevos insumos
- Usuarios
    - Listado de todos los usuarios del sistema
    - Filtro según rol
    - Cambio de rol de forma accesible por un simple botón
    - Baja del usuario de forma fácil
- Informes
    - Informe de usuarios
    - Informe de insumos
    - Informe de insumos necesarios para todos los pedidos que se encuentran pendientes
    - Informe de productos
    - Informe de pedidos
- Pedidos
    - Listado de todos los pedidos del sistema
    - Filtros de estado, rango de fechas de entrega y por correo del cliente
    - Cambio de estado de forma accesible
    - Calculo de insumos necesarios para todos los pedidos filtrados
    - Exportación de los datos anteriores a un excel para mejor gestión

## Prerrequisitos

- Node.js (>= 14.x)
- Angular CLI (>= 12.x)

---

## Instrucciones para el Backend

### 1. Clonar el Repositorio

```bash
git clone https://github.com/JoaquinSellanes/RIA2024_LABFINAL.git
cd RIA2024_LABFINAL/backend
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Generar .env
Dentro de la carpeta del Back-end se encontrará un .env.example que deberás copiar y dejarle el nombre de ".env" (sin las comillas) para que el servidor tenga las variables de entorno correspondientes.

```bash
cp .env.example .env
```

### 4. Levantar el Servidor

```bash
npm run start
```

---

## Instrucciones para el Frontend

### 1. Entrar a la carpeta del Frontend

A la misma altura que el directorio del Backend se encuentra el del Frontend:

```bash
cd ../frontend
```

### 2. Instalar Dependencias

```bash
npm install -g @angular/cli
npm install
```

### 3. Agregar un dominio al host local (Opcional)

Para poder acceder a la aplicación Angular desde el dominio `panpan.uy` en tu máquina local, puedes agregar una entrada en el archivo `hosts`.

En sistemas basados en Unix (Linux, macOS), abre una terminal y ejecuta:

```bash
sudo nano /etc/hosts
```

En Windows, abre un editor de texto (como el Bloc de notas) con permisos de administrador y edita el archivo ubicado en `C:\Windows\System32\drivers\etc\hosts`.

Añade la siguiente línea al final del archivo:

```plaintext
127.0.0.1 panpan.uy
```

Guarda los cambios y cierra el archivo. Ahora, podrás acceder a la aplicación Angular desde `http://panpan.uy:4200`.


### 4. Levantar la Aplicación

```bash
ng serve --port 80 --host panpan.uy
```

En caso de no tener el dominio agregado en los hosts ejecuta:

```bash
ng serve
```

---

## Estructura del Proyecto

```plaintext
RIA2024_LABFINAL/
├── backend/
│   ├── src/
│   ├── package.json
│   └── ...
├── frontend/
│   ├── src/
│   ├── angular.json
│   ├── package.json
│   └── ...
└── README.md
```

---

## Notas Adicionales

- Asegúrate de tener configuradas las variables de entorno necesarias tanto para el backend como para el frontend.

---

## Contacto

Para cualquier duda o consulta, puedes contactar a través de [Ezequiel Blandin](jorge.blandin@estudiantes.utec.edu.uy) o [Joaquin Sellanes](joaquin.sellanes@estudiantes.utec.edu.uy).
