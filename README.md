# Learning Tracker App

Track what you’re learning (courses, topics, skills) and your progress over time.

## Project Struture

```

src/
 ├─ components/
 │   ├─ Header.jsx
 │   ├─ LearningCard.jsx
 │   ├─ ProgressBar.jsx
 │   └─ Modal.jsx
 │
 ├─ pages/
 │   ├─ Home.jsx
 │   └─ AddLearning.jsx
 │
 ├─ hooks/
 │   └─ useLocalStorage.js
 │
 ├─ data/
 │   └─ categories.js
 │
 ├─ App.jsx
 └─ main.jsx
 ```

## Technology

*   **Language**: [ReactJs](https:://react.dev)
*   **Build Tool**: [Vite](https://vitejs.dev/)

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

Make sure you have Node.js and npm installed on your system. You can download them from the official Node.js website: [nodejs.org](https://nodejs.org/)

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/learning-tracker-web.git
    cd learning-tracker-web
    ```
    (Note: Replace `https://github.com/your-username/learning-tracker-web.git` with the actual repository URL if available, otherwise, this is a placeholder.)

2.  Install the project dependencies:
    ```bash
    npm install
    ```

### Running the Development Server

To start the development server, run:

```bash
npm run dev
```

This will typically open the application in your browser at `http://localhost:5173`.

### Building for Production

To build the application for production, run:

```bash
npm run build
```

This will create a `dist` folder with the optimized production build.

### Linting

To run the linter and check for code style issues, use:

```bash
npm run lint
```