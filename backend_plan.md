# Kazez Antenna: Standalone Website (React Frontend + Dedicated Laravel Backend)

Deep-dive product analysis from `Mountx` and complete implementation plan for a 100% standalone website in `c:\xampp\htdocs\kazez`.

---

## 1. Complete Product Understanding (From MountX Inspection)

Following a direct audit of the `Mountx` database (`mount7`), models, controllers (`Helpers.php`, `ProductController.php`), and views (`kazez.blade.php`), here is the full picture of the **Kazez** product ecosystem:

### The Core Product
- **Product Nature**: A heavy-duty, motorized, remote-controlled radio antenna actuator with wireless remote activation. It enables off-roaders and desert drivers to raise/lower high-frequency radio antennas on the fly from inside the cabin.
- **Two Core SKUs / Editions in MountX**:
  1. **`KAZEZ` (ID 9)**: *KAZEZ Antenna Motor Black* (Black Chrome finish, forged aerospace alloys).
  2. **`KAZEZ-SLVR` (ID 8)**: *KAZEZ Antenna Motor Silver* (Silver Chrome finish, multi-stage electroplated).
- **Engineering Specs**:
  - Aerospace-grade chrome-plated housing resisting desert heat, coastal humidity, and sandstorms.
  - IP67 dust/water ingress protection.
  - Ultra-high torque internal gearing to hold heavy radio whips at highway speeds (140+ km/h) without wobble or vibration flutter.

### The Critical "Bracket Dependency" (Hard Rule in MountX)
In MountX's core cart engine (`Helpers.php` line 395), an antenna motor **cannot function or install without a vehicle-specific mounting bracket**:
`$requiresAntennaBracket = $hasAntennaMotor && !$hasAntennaBracket;`

MountX manufactures **14 specific brackets engineered exclusively for Kazez** (`...-KAZ` SKUs):
- **Toyota**: Land Cruiser LC300 (`THA-LC300-RRB-SLVR-KAZ`), Land Cruiser GR (`THA-AMB-LCGR-KAZ`), Land Cruiser 2000–2025 (`THA-AMB-LC25-KAZ`), Land Cruiser 2021 (`NW-FT-021-KAZ`).
- **Nissan**: Nissan Patrol 2024 Roof Rail Bracket (`THA-NP24-RRB-SLVR-KAZ`).
- **Lexus**: LX600 (`THA-LX600-RRB-SLVR-KAZ`), LX570 Black (`THA-LX570-RRB-BLK-KAZ`), LX570 Silver (`THA-LX570-RRB-SLVR-KAZ`).
- **GWM Tank**: Tank 500 (`THA-GWM500-RRB-SLVR-KAZ`), Tank 700 (`THA-GWM700-RRB-BLK-KAZ`).
- **Jetour**: Jetour T2 Roof Rail (`THA-JETT2-RRB-BLK-KAZ`), Jetour T2 Clamp (`THA-RRB-JETT2-RRB-KAZ`).
- **BYD**: Leopard 5 (`THA-AMB-BYD5-KAZ`).
- **Universal**: Universal Clamp Bracket (`THA-UVSL-AB-KAZ`) for custom bullbars, rollcages, and roof racks.

### Media Assets Verified
- **Hero Video**: `C:\xampp\htdocs\Mountx\public\assets\user\video\kazez-video-2.mp4`
- **Product WebP Imagery**: Complete 6-angle image sets for both Black and Silver editions stored in `Mountx\storage\app\public\product\`.

---

## 2. Standalone Architecture: React Frontend + Separate Laravel Backend

As requested, the new website will have its **own dedicated Laravel backend** completely independent of MountX.

```
c:\xampp\htdocs\kazez/
│
├── frontend/                     # React (Vite) Single Page Application
│   ├── public/
│   │   └── assets/               # Migrated local videos & webp images
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx        # Glassmorphic nav with active anchors
│   │   │   ├── Hero.jsx          # Video hero with scale/fade parallax
│   │   │   ├── Marquee.jsx       # Continuous ticker
│   │   │   ├── Showcase.jsx      # Interactive gallery, colorway switcher (Black/Silver)
│   │   │   ├── StatsBar.jsx      # Stock & rating metrics
│   │   │   ├── SpecsPanels.jsx   # 01 Construction & 02 Performance split panes
│   │   │   ├── BracketFinder.jsx # Interactive vehicle compatibility selector
│   │   │   ├── OrderModal.jsx    # WhatsApp checkout & customer lead capture
│   │   │   └── Footer.jsx
│   │   ├── hooks/
│   │   │   ├── useScrollReveal.js
│   │   │   └── useVideoParallax.js
│   │   └── services/api.js       # Axios client targeting the separate Laravel API
│   └── package.json
│
└── backend/                      # Dedicated Standalone Laravel API
    ├── app/
    │   ├── Http/Controllers/Api/
    │   │   ├── ProductController.php  # Serves Kazez Black/Silver data, gallery & stock
    │   │   ├── BracketController.php  # Serves vehicle list & bracket compatibility
    │   │   └── OrderController.php    # Stores orders & generates WhatsApp links
    │   └── Models/
    │       ├── Product.php
    │       ├── Bracket.php
    │       └── Order.php
    ├── database/
    │   ├── migrations/
    │   │   ├── create_products_table.php
    │   │   ├── create_brackets_table.php
    │   │   └── create_orders_table.php
    │   └── seeders/
    │       ├── KazezProductSeeder.php # Seeds Black (KAZEZ) & Silver (KAZEZ-SLVR)
    │       └── BracketSeeder.php      # Seeds all 14 vehicle brackets discovered in MountX
    └── routes/api.php
```

---

## 3. Step-by-Step Implementation Plan

### Step 1: Asset Extraction
- Copy `kazez-video-2.mp4` and high-res product photos from `Mountx` into `c:\xampp\htdocs\kazez\frontend\public\assets\`.

### Step 2: Separate Laravel Backend Setup (`kazez/backend`)
- Initialize a fresh, clean Laravel application in `c:\xampp\htdocs\kazez\backend` using PHP 8.2 and Composer.
- Configure dedicated database (e.g. `kazez_db` on MySQL or SQLite for turnkey portability).
- Run migrations for `products`, `brackets`, and `orders`.
- Run seeders using the **exact real data from MountX**:
  - `KAZEZ` (Black Edition) and `KAZEZ-SLVR` (Silver Edition).
  - The 14 vehicle brackets (Toyota LC300/LC200/GR, Nissan Patrol, Lexus LX600/570, Tank, Jetour, BYD).
- Expose REST API:
  - `GET /api/v1/kazez`: Returns both editions, pricing, specifications, and gallery photos.
  - `GET /api/v1/brackets/vehicles`: Returns vehicle makes/models for the interactive dropdown.
  - `GET /api/v1/brackets/check?make=...&model=...`: Returns bracket availability and SKU.
  - `POST /api/v1/orders`: Logs customer order and outputs formatted WhatsApp order URL.

### Step 3: React Frontend Setup (`kazez/frontend`)
- Scaffold Vite + React app with Syne + DM Sans typography.
- Port luxury dark/light automotive design system.
- Build components:
  - **Hero**: HTML5 video with parallax, live price chip, stock badge.
  - **Showcase**: Dynamic switch between Black Chrome (`KAZEZ`) and Silver Chrome (`KAZEZ-SLVR`), reactive image preloader, and quantity selector.
  - **Interactive Bracket Finder**: Live vehicle dropdown (Make -> Model -> Year) connected to Laravel backend to tell the user their exact required bracket.
  - **Order System**: Seamless WhatsApp ordering with lead capture in the separate Laravel backend.
  - **Specs & Notice**: 01 Construction, 02 Performance, Bracket Mandatory Notice, and Doha contact cards.

---

## 4. Verification Plan

### Backend Verification:
- Start Laravel backend (`php artisan serve --port=8000`).
- Test API endpoints using curl/PowerShell:
  - `GET http://localhost:8000/api/v1/kazez` -> Returns Black & Silver editions with 200 OK.
  - `GET http://localhost:8000/api/v1/brackets/vehicles` -> Returns vehicle list.
  - `POST http://localhost:8000/api/v1/orders` -> Persists order record and returns WhatsApp message URL.

### Frontend Verification:
- Start Vite dev server (`npm run dev`).
- Test hero video playback, parallax scroll, and responsive layouts across viewports.
- Test edition toggle (Black vs. Silver), gallery switching, and bracket compatibility finder.
- Test order submission flow.
