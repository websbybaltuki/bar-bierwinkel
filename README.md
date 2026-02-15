# Bierwinkel Website (React + Vite)

Sitio para Bierwinkel Elche con:
- Navegacion superior: Inicio, Nuestra Historia, Menu, Visitanos/Contacto.
- Todo el contenido (eventos, Instagram, contacto) dentro de Inicio al hacer scroll.
- Pagina Menu con selector Comida / Bebida (cervezas incluidas en Bebida).
- Idioma principal espanol + ingles, frances y aleman.
- Build listo para Hostinger (`dist`).

## 1) Trabajar en local

1. Instala Node.js 18+.
2. Instala dependencias:
   ```bash
   npm install
   ```
3. Copia variables:
   ```bash
   copy .env.example .env
   ```
4. Arranca en desarrollo:
   ```bash
   npm run dev
   ```
   Si PowerShell bloquea `npm.ps1`:
   ```bash
   cmd /c npm run dev
   ```

## 2) Build para produccion

```bash
npm run build
```
Si PowerShell bloquea `npm.ps1`:
```bash
cmd /c npm run build
```

Se genera la carpeta `dist`.

## 3) Subida a Hostinger

1. Abre `public_html` (o carpeta del dominio).
2. Borra contenido anterior si aplica.
3. Sube todo el contenido de `dist`.

## 4) Instagram automatico con Elfsight (ultimas publicaciones)

1. Crea widget `Instagram Feed` en Elfsight.
2. Configura el perfil de Instagram (por ejemplo `bierwinkel_elche`) y limita a 6 posts.
3. Copia el `App ID` del widget.
4. Pegalo en `.env`:
   ```env
   VITE_INSTAGRAM_WIDGET_ID=tu_app_id
   ```
5. Ejecuta build y vuelve a subir `dist`.

Si no hay App ID configurado, la web muestra fallback del perfil embebido.

## 5) Personalizar contenido

- Textos e idiomas: `src/i18n/translations.js`
- Productos y precios: `src/data/menuData.js`
- Datos de negocio en `.env`:
  - `VITE_RESERVATION_PHONE`
  - `VITE_WHATSAPP_URL`
  - `VITE_MAP_EMBED_URL`
  - `VITE_INSTAGRAM_PROFILE`
  - `VITE_INSTAGRAM_WIDGET_ID`

## Scripts

- `npm run dev`
- `npm run build`
- `npm run preview`
