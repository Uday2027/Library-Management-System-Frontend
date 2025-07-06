# 📚 Library Management System Frontend

Welcome to the **Library Management System** frontend — a modern, responsive web application built with **React**, **TypeScript**, and **Vite**.

🔗 **Live Demo:** [https://library-management-system-lemon-phi.vercel.app/](https://library-management-system-lemon-phi.vercel.app/)
🔗 **GitHub Repo:** [https://github.com/Uday2027/Library-Management-System-Frontend](https://github.com/Uday2027/Library-Management-System-Frontend)

---

## 🚀 Project Overview

This project is part of a full-stack Library Management System. It allows users to:

- 📖 View a list of books
- ➕ Add new books
- 📚 Borrow books and manage borrow records
- 📊 View a borrow summary

The frontend is built with:

- ✅ **React + TypeScript**
- ⚡ **Vite** for lightning-fast builds
- 🎯 **ESLint** + recommended configurations
- 🎨 Fully responsive and user-friendly UI

---

## 🛠️ Getting Started

### Clone the repo

```bash
git clone https://github.com/Uday2027/Library-Management-System-Frontend.git
cd Library-Management-System-Frontend
```

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm run dev
```

The app will be running at [http://localhost:5173](http://localhost:5173)

---

## 📦 Tech Stack

- **React** – UI Library
- **TypeScript** – Type safety
- **Vite** – Build tool
- **Redux Toolkit Query (RTK Query)** – Data fetching
- **Tailwind CSS** – Styling
- **React Router** – Routing

---

## 📏 Linting Setup

This project supports advanced ESLint configurations for better code quality.

To enable type-aware lint rules, consider expanding your ESLint setup:

```js
export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
]);
```

### Optional Plugins:

Install React-specific lint plugins:

```js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config([
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      reactX.configs["recommended-typescript"],
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
]);
```

---

## 👤 Author

**Zubayer Hossain Uday**
🔗 [Uday2027](https://github.com/Uday2027)
