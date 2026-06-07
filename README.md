# 📋 To Do List App: Full-Stack Task Management Ecosystem

A minimalist, high-performance task management application engineered to maximize focus and streamline personal workflows. This ecosystem is split into an enterprise-ready backend REST API and a fluid cross-platform mobile application, combining clean design token principles with robust architectural patterns.

---

## ✨ Core Features

* **Workspace-Driven UI:** A focused interface designed around micro-interactions that alerts you when tasks are clear for deep work.
* **Collision-Free Modal Pipeline:** Implements a state-machine queue logic to handle overlapping modals (Details $\rightarrow$ Forms) sequentially, preventing native UI lockups and preserving animation frame rates.
* **Contextual Validation Guardrails:** Real-time inline input validation that intercepts empty entries before database mutation, dynamically adjusting structural boundaries to avoid layout shifting.
* **Layered Architectural Isolation:** Rigid adherence to decoupling patterns on both layers for maximum predictability and scaling potential.

---

## 🛠️ Technical Stack & Dependencies

### 💻 Frontend (Mobile Application)
Built inside the **Expo** ecosystem utilizing native-driven libraries for smooth rendering execution and low-overhead client global state.

* **Core Architecture:** React Native (`v0.81.5`) & React (`v19.1.0`)
* **Routing Framework:** `expo-router` (`~6.0.23`) utilizing file-based routing contexts
* **State Management:** `zustand` (`^5.0.14`) for optimized, non-render-blocking global client storage
* **Data Fetching & Cache:** `@tanstack/react-query` (`^5.101.0`) & `axios` (`^1.17.0`) for asynchronous server mutations
* **Animations & Haptics:** `react-native-reanimated` (`~4.1.1`) & `expo-haptics` (`~15.0.8`)
* **UI Elements & Tokens:** `@expo/vector-icons` (`^15.0.3`) for unified design systems

### ⚙️ Backend (REST API)
A strongly typed **Node.js REST Engine** using Express compiled with modern ECMAScript module patterns (`type: module`).

* **Runtime Compilation Engine:** TypeScript (`^6.0.3`) executed seamlessly via `tsx` (`^4.22.4`) watchers
* **Server Framework:** Express (`^5.2.1`)
* **Database ORM Layer:** Prisma ORM (`^7.8.0`) paired with PostgreSQL native drivers (`pg ^8.21.0`) and client adapters (`@prisma/adapter-pg`)
* **Schema & Payload Validation:** `joi` (`^18.2.1`) for strict request sanitization
* **Centralized System Logs:** Stream rotation using `winston` (`^3.19.0`) and HTTP performance profiling via `morgan` (`^1.11.0`)

---

## 📂 Structural Blueprint

The workspace is cleanly divided into decoupled codebases, maximizing separate testing and single-responsibility principles.

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
