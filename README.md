# Keploy DevRel Candidate Assignment: Go + MongoDB Quickstart Tutorial

A modern, single-page, static documentation website built with **Next.js** and **MDX** that guides developers through running Keploy on a Go application (**Gin + MongoDB URL Shortener**) to record and replay integration tests with zero code changes.

![Keploy DevRel Banner](https://raw.githubusercontent.com/keploy/keploy/main/docs/static/img/keploy-banner.png)

---

## 🎯 Assignment Objective & Core Tasks

This project fulfills the **Keploy DevRel Candidate Assignment** requirements:

1. **Learn & Run**: Successfully explore and understand Keploy's Go quickstart (`samples-go/gin-mongo`), running `keploy record` and `keploy test` against a Gin HTTP service with MongoDB.
2. **Document**: Author a beginner-friendly tutorial written in a clear, developer-to-developer voice. The tutorial explains the **"why"** behind the steps—demystifying how Keploy leverages eBPF and network proxies to eliminate manual mock boilerplate and fragile test databases.
3. **Build & Publish**: Deliver the tutorial as a polished documentation site using Next.js (App Router), MDX, and Tailwind CSS, featuring rich interactive components, dark/light theme switching, and ready-to-deploy static export.

---

## 🚀 Live Demo & Deliverables

- **Live Documentation Website**: Deployed on Vercel *(see [deploy-guide.md](./deploy-guide.md) for deployment steps)*
- **GitHub Repository**: Public source code repository containing all MDX content, Next.js configuration, and custom interactive React components.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Static Site Generation)
- **Content Format**: [MDX](https://mdxjs.com/) via `@next/mdx` (React components seamlessly embedded in Markdown)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with `@tailwindcss/typography`
- **UI Components & Icons**: [Lucide React](https://lucide.dev/)
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes) (Dark mode default with persistent Light mode toggle)

---

## ✨ Interactive MDX Components (Bonus Points)

To make the tutorial engaging and informative for new developers, the MDX content directly embeds custom React components:

1. **Interactive Architecture Visualizer (`<ArchitectureDiagram />`)**:
   - Toggle between **Record Phase** (ingress HTTP interception + egress MongoDB wire capture into YAML) and **Test Phase** (replaying HTTP requests with virtual database mocks).
   - Clickable system nodes explaining how eBPF hooks into the Linux kernel and socket layer without modifying Go code.
2. **Generated Artifact Explorer (`<MockInspector />`)**:
   - Side-by-side inspection of generated `tests/test-1.yaml` (HTTP request/response contracts) and `mocks/mock-1.yaml` (MongoDB BSON wire protocol packets).
   - Explanatory tooltips on fields such as `noise` filtering, query filters, and status codes.
3. **Test Replay Simulator (`<TestReplaySimulator />`)**:
   - An interactive terminal runner allowing readers to click **"Run keploy test"** to watch live test playback, database mock substitution, and code coverage metrics.
   - Includes a **"Simulate Regression"** toggle showing how Keploy highlights visual diffs when breaking code changes are introduced.
4. **Interactive Step Progress (`<StepTracker />`)**:
   - A checklist allowing readers to track their hands-on progress through the quickstart steps.
5. **Multi-Variant Callouts (`<Callout />`)**:
   - Styled alerts for `info`, `tip`, `warning`, and `aha!` moments (e.g. why `--build-delay` is needed in Docker, graceful shutdown handling).
6. **Active Scroll-Spy Table of Contents (`<TableOfContents />`)**:
   - Sticky outline tracking active sections and displaying estimated reading time.
7. **Dark / Light Mode Switcher (`<ThemeToggle />`)**:
   - Smooth theme switcher adhering to developer preferences.
8. **DevRel Reader Feedback Widget (`<FeedbackWidget />`)**:
   - Feedback collection component to gather reader sentiment on tutorial clarity.

---

## 🏃 Getting Started Locally

### 1. Prerequisites
- **Node.js**: v18.17+ or v20+ (tested on Node v24.16.0)
- **npm**: v9+ or v10+

### 2. Install Dependencies
```bash
git clone <your-repo-url>
cd keploy
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
```
Generates an optimized static production build with zero warnings or errors.

---

## 🚢 Deployment to Vercel

This repository is optimized for one-click deployment on [Vercel](https://vercel.com/):

1. Push this repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: complete Keploy DevRel documentation website with Next.js and MDX"
   git remote add origin https://github.com/<your-username>/keploy-go-tutorial.git
   git push -u origin main
   ```
2. Go to [Vercel Dashboard](https://vercel.com/new).
3. Import your GitHub repository.
4. Vercel automatically detects Next.js settings. Click **Deploy**.
5. Your live URL will be active immediately (e.g., `https://keploy-go-tutorial.vercel.app`).

See [deploy-guide.md](./deploy-guide.md) for full details.

---

## 📝 Candidate DevRel Reflections: Why This Quickstart Matters

In writing this documentation, three key principles guided the voice and structure:

1. **Empathy for the Developer**: Most Go developers are frustrated by writing repetitive mock structs with `mockgen`. Showing them that Keploy requires *zero code changes* is the biggest selling point.
2. **Explaining the "Why", Not Just "Copy-Paste"**: Explaining how eBPF packet interception works demystifies the technology. Instead of treating Keploy like a black box, developers understand that it intercepts TCP sockets to capture wire protocol packets.
3. **Addressing Real-World Edge Cases**: Covering gotchas like container startup delays (`--build-delay`), graceful shutdown requirements, and dynamic field noise filtering (`noise`) gives developers the confidence to adopt Keploy on real production codebases.
