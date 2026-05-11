# HRI Risk Calculator

A clinical decision support web app that estimates a patient's predicted probability of a Heat-Related Illness (HRI) event using a validated elastic-net penalized logistic regression model (AUC 0.7957).

> **For research and educational use only.** Not intended for clinical diagnosis or treatment decisions.

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [Bun](https://bun.sh/) (used as the package manager and runtime)

Install Bun if you don't have it:

```bash
curl -fsSL https://bun.sh/install | bash
```

---

## Setup

1. **Clone or download the project**, then navigate to the project folder:

```bash
cd sarah_calculator
```

2. **Install dependencies:**

```bash
bun install
```

---

## Running locally

```bash
bun run dev
```

This starts the Vite development server. Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Building for production

```bash
bun run build
```

Output is written to the `dist/` folder. Serve it with any static file host (Netlify, Vercel, GitHub Pages, etc.).

---

## Project structure

```
src/
├── config/
│   └── modelConfig.ts    # Model coefficients — edit this to update the formula
├── pages/
│   └── Calculator.tsx    # Main calculator page
├── styles/
│   └── design.css        # Global design tokens
├── App.tsx
└── main.tsx
```

---

## Updating the model

All coefficients live in `src/config/modelConfig.ts`. You do not need to touch `Calculator.tsx` to change the model.

**To change a coefficient** — edit the value next to the relevant key:

```ts
{ key: "coagulopathy", label: "Coagulopathy", coefficient: 0.492416 },
```

**To add a comorbidity** — append an entry to the `comorbidities` array:

```ts
{ key: "my_condition", label: "My Condition", coefficient: 0.25 },
```

**To remove a comorbidity** — delete its entry from the array.

**To update demographic coefficients** (intercept, age, sex, race, insurance, MAX) — edit the top-level `intercept` and `coefficients` fields.

The calculator reads directly from this config, so any change here is reflected immediately on save.

---

## Model details

| Parameter | Value |
|---|---|
| Model type | Elastic-net logistic regression |
| Penalty | alpha = 0.4, lambda = 0.003093833 |
| Tuning | 10-fold cross-validation, lambda.min |
| Train/validation split | 80% / 20% (seed 123) |
| Validation AUC | 0.7957 (95% CI 0.7783–0.8131) |
| Classification threshold | 0.3142 (Youden index) |
| Sensitivity | 77.6% |
| Specificity | 68.0% |
| NPV | 86.4% |

Reference categories: Male (sex), Black non-Hispanic (race), Private (insurance).
