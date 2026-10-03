# Testing Go & MongoDB with Keploy: Zero-Code Mocks

A clean, developer-focused tutorial and static documentation site built with **Next.js** and **MDX** for the **Keploy DevRel Candidate Assignment**.

It documents hands-on experience running Keploy on the official **Gin + MongoDB URL shortener** quickstart, focusing on the real friction of Go integration testing, eBPF packet capture, deterministic mock replay without running MongoDB, and practical gotchas.

---

## 🎯 What's Inside

- **Crisp, Authentic Voice**: Zero generic buzzwords. Written as an engineer's field notes on running the quickstart.
- **Why Keploy Matters for Go**: Contrasting manual `mockgen`/`testify` boilerplate and slow Testcontainers with eBPF/proxy socket interception.
- **Hands-on Steps**:
  1. Setting up the Gin + MongoDB app.
  2. Recording live traffic with `keploy record`.
  3. Deconstructing the generated `test-1.yaml` (HTTP contract) and `mock-1.yaml` (MongoDB BSON wire mock).
  4. Running tests in complete isolation with `keploy test` (with MongoDB offline).
  5. Observing contract regressions when business logic changes.
- **Key Gotchas**:
  - Why `--build-delay` prevents premature container hooks.
  - Why Go servers need graceful shutdown (`SIGTERM`/`SIGINT`) to flush mock buffers.
  - How Keploy ignores non-deterministic fields with `noise` filtering.
- **Clean Interactive Components**:
  - `<ArchitectureFlow />`: Minimal sequence diagram showing traffic flow in Record vs Test modes.
  - `<YamlViewer />`: Side-by-side comparison of the real captured HTTP contract and MongoDB wire mock.
  - `<Callout />`: Minimal editorial alerts for tips and gotchas.
  - `<TableOfContents />`: Active scroll-spy outline.
  - `<ThemeToggle />`: Minimal Light/Dark switcher.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router, Static Export)
- **Content**: MDX (`@next/mdx`)
- **Styling**: Tailwind CSS (Minimal zinc / obsidian palette with terracotta accent)
- **Theme**: `next-themes` (Dark mode default with persistent Light mode toggle)

---

## 🏃 Running Locally

```bash
git clone <repo-url>
cd keploy
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Build for production:
```bash
npm run build
```

---

## 🚢 GitHub & Vercel Deployment

Refer to [`deploy-guide.md`](./deploy-guide.md) for quick instructions on pushing to your public GitHub repository and deploying live to Vercel in 2 minutes.
