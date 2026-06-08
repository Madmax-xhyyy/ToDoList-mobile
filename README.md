# 📋 To Do List App: Full-Stack Task Management Ecosystem

A minimalist, high-performance task management application engineered to maximize focus and streamline personal workflows. This ecosystem is split into an enterprise-ready backend REST API and a fluid cross-platform mobile application, combining clean design token principles with robust architectural patterns.

---

## ✨ Core Features

* **Workspace-Driven UI:** A focused interface designed around micro-interactions that alerts you when tasks are clear for deep work.
* **Collision-Free Modal Pipeline:** Implements a state-machine queue logic to handle overlapping modals (Details → Forms) sequentially, preventing native UI lockups and preserving animation frame rates.
* **Contextual Validation Guardrails:** Real-time inline input validation that intercepts empty entries before database mutation, dynamically adjusting structural boundaries to avoid layout shifting.
* **Layered Architectural Isolation:** Rigid adherence to decoupling patterns on both layers for maximum predictability and scaling potential.
* **Advanced DevTools Network Stream:** Migrated natively to `expo/fetch` to enable zero-overhead real-time HTTP payload auditing and streaming debugging inside the Expo Network panel.

---

## 🛠️ Technical Stack & Dependencies

### 💻 Frontend (Mobile Application)
Built inside the Expo ecosystem utilizing native-driven libraries for smooth rendering execution and low-overhead client global state.
* **Core Architecture:** React Native (v0.81.5) & React (v19.1.0)
* **Routing Framework:** `expo-router` (~6.0.23) utilizing file-based routing contexts
* **State Management:** `zustand` (^5.0.14) for optimized, non-render-blocking global client storage
* **Data Fetching & Cache:** `@tanstack/react-query` (^5.101.0) for asynchronous server state mutations
* **Networking Engine:** `expo/fetch` (WinterCG-compliant client optimized for network log tracing and data streaming)
* **Animations & Haptics:** `react-native-reanimated` (~4.1.1) & `expo-haptics` (~15.0.8)
* **UI Elements & Tokens:** `@expo/vector-icons` (^15.0.3) for unified design systems

### ⚙️ Backend (REST API)
A strongly typed Node.js REST Engine using Express compiled with modern ECMAScript module patterns (`type: module`).
* **Runtime Compilation Engine:** TypeScript (^6.0.3) executed seamlessly via `tsx` (^4.22.4) watchers
* **Server Framework:** Express (^5.2.1)
* **Database ORM Layer:** Prisma ORM (^7.8.0) paired with PostgreSQL native drivers (`pg` ^8.21.0) and client adapters (`@prisma/adapter-pg`)
* **Schema & Payload Validation:** `joi` (^18.2.1) for strict request sanitization
* **Centralized System Logs:** Stream rotation using `winston` (^3.19.0) and HTTP performance profiling via `morgan` (^1.11.0)

---

## 📂 Structural Blueprint
      ```text
      📦 project-root
      ├── 📂 api/                          # BACKEND ENGINE (Express + Prisma)
      │   ├── 📂 prisma/                   # Database configurations
      │   │   ├── 📂 migrations/           # Incremental SQL migration baselines
      │   │   └── 📄 schema.prisma         # Data models definitions & structural definitions
      │   ├── 📂 src/
      │   │   ├── 📂 controllers/          # HTTP request-response handlers & routing endpoints
      │   │   ├── 📂 repositories/         # Isolated database data abstraction queries
      │   │   ├── 📂 routes/               # Express routing path mapping
      │   │   ├── 📂 services/             # Core business logical pipelines & functional steps
      │   │   ├── 📂 utils/                # Error handling middlewares & logger engines
      │   │   ├── 📄 index.ts              # API Entry Point & middleware attachment
      │   │   └── 📄 prisma.ts             # Prisma Client instance singletons
      │   ├── 📄 combined.log              # Persistent operation streams
      │   └── 📄 error.log                 # Critical system error log captures
      │
      └── 📂 mobile-app/                   # FRONTEND APPLICATION (Expo Native)
          ├── 📂 src/
          │   ├── 📂 app/                  # File-Based Router Tree context
          │   │   └── 📂 todo/             # Task workflow scope paths
          │   │       ├── 📄 _layout.tsx   # Stack Navigator and subview orchestration
          │   │       └── 📄 index.tsx     # Main application dashboard workspace
          │   ├── 📂 components/           # UI Atoms (Modals, TodoItem, Inputs)
          │   ├── 📂 hooks/                # Custom React Query mutation integrations
          │   ├── 📂 lib/                  # Shared core configuration libraries (Axios instances)
          │   ├── 📂 services/             # API network interface operations
          │   ├── 📂 store/                # Zustand global slices
          │   ├── 📂 theme/                # Style tokens matrix (Palette & Typography mappings)
          │   └── 📂 types/                # Strict TypeScript global data definitions
---

## 💻 Local Installation & Workspace Setup

Follow this step-by-step sequence to install dependencies, run your backend, and configure the local network loops.

### 📋 Prerequisites
* **Node.js** (v18 or higher recommended)
* **PostgreSQL Instance** running locally or via Docker
* **Android Studio** (for Android Emulator testing) or **Expo Go** (on a physical mobile device)

---

### 🔧 1. Backend API Setup
1. Navigate into your api directory:
   ```bash
   cd api

2. Install dependencies:
    ```Bash
    npm install

3. Create an .env file in the root of the api/ directory:
    ```Code snippet
    DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/todo_db?schema=public"
    PORT=5000

4. Run your database migrations and generate the Prisma Client:
    ```Bash
    npx prisma migrate dev
    npx prisma generate

5. Start the development server:
    ```Bash
    npm run dev

📱 2. Mobile App Environment Configuration (.env)
Because your mobile application runs inside an isolated Android Virtual Machine layer (or a physical device on your router), it cannot access your computer's server via localhost or 127.0.0.1.

You must bind the app's networking requests to your computer's local network gateway or Virtual Loopback.

1. Navigate to your mobile app directory:
    ```Bash
    cd mobile-app
2. Install dependencies:
    ```Bash
    npm install
3. Create a brand new file named .env in the root of the mobile-app/ directory:
    ```Code snippet
    # FOR EMULATOR DEVELOPMENT: Points directly to your host machine's Express server
    EXPO_PUBLIC_API_URL=[http://10.0.2.2:5000/api](http://10.0.2.2:5000/api)

    # FOR PHYSICAL DEVICE/EXPO GO WI-FI TESTING (Uncomment and replace with your exact Wi-Fi IP):
    # EXPO_PUBLIC_API_URL=[http://192.168.100.7:5000/api](http://192.168.100.7:5000/api)

3. Booting up the Mobile Workspace
Whenever you add or adjust environment configurations inside your .env profile, you must start the Metro Bundler with a deep cache reset:
    ```Bash
    npx expo start -c
- Press a to load the application inside your active Android Emulator.
- Press j in your command terminal window to open the native React Native DevTools system directly inside your web browser.
