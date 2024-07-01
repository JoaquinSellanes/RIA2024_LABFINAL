
# Proyecto RIA2024_LABFINAL

## Descripción

Este proyecto está dividido en dos partes: un backend desarrollado con Node.js y un frontend desarrollado con Angular. A continuación, se detallan los pasos necesarios para levantar ambos entornos.

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

### 3. Levantar el Servidor

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
ng serve --host panpan.uy
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
