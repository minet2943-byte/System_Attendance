# System Attendance

## GitHub Pages deployment

This project deploys through [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml). In the repository on GitHub, open **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions**. Do not choose **Deploy from a branch**: that publishes the source `index.html`, which references `/src/main.jsx` and produces a blank site.

Push to `main`, then wait for the **Deploy GitHub Pages** workflow to finish. The site is published at `https://minet2943-byte.github.io/System_Attendance/`.

The deployed frontend needs a public HTTPS API. Set `VITE_API_URL` under **Settings → Secrets and variables → Actions → Variables** to the API's public URL, for example `https://api.example.com/api`. GitHub Pages cannot access `http://localhost:8080/api` on your computer.

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
