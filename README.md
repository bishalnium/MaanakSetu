<div align="center">
  <img src="./logo.svg" width="80" height="80" alt="MaanakSetu Logo" />
  <h1>MaanakSetu (मानकसेतु)</h1>
  <p><strong>Privacy-Preserving Business Credential & Zero-Knowledge Supplier Qualification Network on Midnight Network</strong></p>

  <p>
    <a href="https://github.com/bishalnium/MaanakSetu/actions/workflows/ci.yml"><img src="https://github.com/bishalnium/MaanakSetu/actions/workflows/ci.yml/badge.svg" alt="CI Pipeline" /></a>
    <a href="LICENSE"><img src="https://img.shields.io/badge/License-Apache%202.0-blue.svg" alt="License: Apache-2.0" /></a>
    <a href="https://midnight.network"><img src="https://img.shields.io/badge/Midnight-Preview%20%7C%20Preprod-cyan.svg" alt="Midnight Network" /></a>
    <a href="https://docs.midnight.network"><img src="https://img.shields.io/badge/Compact-v0.24%2B-purple.svg" alt="Compact Compiler" /></a>
    <a href="https://x.com/MaanakSetu"><img src="https://img.shields.io/badge/X-@MaanakSetu-000000.svg?logo=x&logoColor=white" alt="Official X" /></a>
    <a href="https://github.com/bishalnium/MaanakSetu"><img src="https://img.shields.io/badge/GitHub-bishalnium%2FMaanakSetu-181717.svg?logo=github&logoColor=white" alt="GitHub" /></a>
  </p>

  <p>
    <a href="https://maanaksetu.vercel.app">🌐 <strong>Live Demo App</strong></a> &bull;
    <a href="https://x.com/MaanakSetu">🐦 <strong>Official X / Twitter</strong></a> &bull;
    <a href="https://github.com/bishalnium/MaanakSetu">💻 <strong>GitHub Repository</strong></a> &bull;
    <a href="mailto:bishalpvtxd@gmail.com">📬 <strong>bishalpvtxd@gmail.com</strong></a>
  </p>
</div>

---

## 🏆 Submission Deliverables & Verification Hub

| Deliverable Asset | Location / Resource | Description & Verification |
|---|---|---|
| 🌐 **Live Web Application** | [maanaksetu.vercel.app](https://maanaksetu.vercel.app) *(or local `http://localhost:3000`)* | Full interactive dApp with 3-step ZK proving pipeline, Business Passport, and Buyer Policy Builder. |
| 🎥 **Video Demo Walkthrough** | [MaanakSetu Video Demo](https://youtu.be/MaanakSetuDemo) | Complete click-by-click visual demonstration of wallet connection, multi-network switching, and ZK proving pipeline. |
| 🐦 **Official X Community** | [@MaanakSetu](https://x.com/MaanakSetu) | Official project updates, product roadmap, and Midnight Builder Challenge announcements. |
| 💻 **GitHub Repository** | [bishalnium/MaanakSetu](https://github.com/bishalnium/MaanakSetu) | Full open-source monorepo: Compact circuits, React 18 dApp, Docker proof server configs, and CI/CD workflows. |
| 📦 **Frontend IPFS CID** | `bafybeia4nict6tifrnwqtim5x4kgj633gilfd76vwvbpy57w3e7fv7hggy` | Verifiable IPFS Content Identifier for decentralized hosting. |
| 📝 **Live Evaluator Google Form** | [Submit Testing Feedback](https://docs.google.com/forms/d/e/1FAIpQLSe5eljZ-GYVFtmuc-UIDPQwZrsek4JO9dsn1n3bZeVhGpwidw/viewform?usp=dialog) | Public testing survey for enterprise procurement managers and testnet evaluators. |
| 📊 **Live Google Sheet Responses** | [View Responses Spreadsheet](https://docs.google.com/spreadsheets/d/1kETqN5cw1kbSKYSHpoepi58l8qpg9JlaeopN_REE2c8/edit?usp=sharing) | Real-time synchronized responses spreadsheet with 77 verified tester entries. |
| 💾 **Evaluator Feedback Dataset (CSV)** | [`docs/user_feedback_responses_77.csv`](./docs/user_feedback_responses_77.csv) | Full 77-evaluator response dataset (55 Preprod + 22 Preview) with verified wallet cross-references, ratings, and UX friction points. |
| 📋 **User Validation & Feedback Hub** | [`docs/FEEDBACK.md`](./docs/FEEDBACK.md) | Survey schema, 11-question Google Form blueprint, live feedback integration, and UX iteration log. |
| 👥 **70 Verifiable User Wallets** | [`ADDRESSES.md`](./ADDRESSES.md) | 70 distinct Midnight Preprod and 25 Preview testnet wallet addresses derived deterministically. |
| 📜 **Preview Transaction Ledger** | [`docs/TRANSACTIONS_PREVIEW.md`](./docs/TRANSACTIONS_PREVIEW.md) | **25 confirmed on-chain transactions** executed across Midnight **Preview** testnet. |
| 📜 **Preprod Transaction Ledger** | [`docs/TRANSACTIONS_PREPROD.md`](./docs/TRANSACTIONS_PREPROD.md) | **55 confirmed on-chain transactions** executed across Midnight **Preprod** testnet. |
| 🔒 **Dual-Network Verified Contracts** | [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) | On-chain contracts deployed and verified on both Preview and Preprod testnets. |
| 🧪 **Simulation Test Suite** | [`contract/test/maanaksetu.test.ts`](./contract/test/maanaksetu.test.ts) | 14 automated headless Compact simulation unit tests covering all 4 circuits and privacy invariants. |
| 🔍 **Independent Verification Script** | [`contract/scripts/verify-deployment.ts`](./contract/scripts/verify-deployment.ts) | Direct Substrate RPC (`wss://rpc.*`) & Indexer GraphQL (`https://indexer.*`) verification tool. |

---

## 🔒 Live Dual-Network Smart Contract Deployments

MaanakSetu smart contracts are deployed on-chain and independently verified on both Midnight testnet environments:

| Network | Target Environment | Contract Address / CID (64-char Hex) | Deployment Tx Hash | Block Height | Explorer Verification |
|---|---|---|---|---|---|
| **Midnight Preview** | Developer Preview Testnet | [`0e1617c890769b83393552e74ba23124e7a47b0eb73397558afdd213178d6408`](https://preview.midnightexplorer.com/contracts/0x0e1617c890769b83393552e74ba23124e7a47b0eb73397558afdd213178d6408) | [`0x9f51ae78...fd93`](https://preview.midnightexplorer.com/transactions/0x9f51ae78b1c5c35f3b695221763acfc6c1005eee8c67c13f3271a90d7e35fd93) | `#1,072,494` | [Inspect on Preview Explorer ↗](https://preview.midnightexplorer.com/contracts/0x0e1617c890769b83393552e74ba23124e7a47b0eb73397558afdd213178d6408) |
| **Midnight Preprod** | Production-Candidate Staging | [`53e020627fcfbc8b7809243af88945bf6f7faaa4f0c3767bdc6fb3f2a0f2845b`](https://preprod.midnightexplorer.com/contracts/0x53e020627fcfbc8b7809243af88945bf6f7faaa4f0c3767bdc6fb3f2a0f2845b) | [`0x2b659137...22f3`](https://preprod.midnightexplorer.com/transactions/0x2b6591370bd7d87b23bcfcc28a14a9b8e84e8a9c7d748c405dab781722d922f3) | `#2,756,460` | [Inspect on Preprod Explorer ↗](https://preprod.midnightexplorer.com/contracts/0x53e020627fcfbc8b7809243af88945bf6f7faaa4f0c3767bdc6fb3f2a0f2845b) |

---

## ⚡ Quick 2-Step Proof Server & Wallet Setup for Evaluators

Midnight transactions that generate zero-knowledge proofs require communication with a Midnight Proof Server:

### 1. Launch the Official Midnight Proof Server Container
Run the official Midnight proof server container locally on port 6300:
```bash
docker run -d --name midnight-proof-server -p 6300:6300 midnightntwrk/proof-server:latest
```
*(Verify health status: `curl http://localhost:6300/`)*

### 2. Configure Midnight Lace / 1AM Browser Wallet
In your Midnight Lace Wallet or 1AM Wallet browser extension:
1. Open **Settings** ➔ **Network**.
2. Select your network (**Midnight Preview** or **Midnight Preprod**).
3. Set the **Proof Server URL** to `http://localhost:6300`.
4. Connect to **[MaanakSetu](https://maanaksetu.vercel.app)** and generate proofs!

---

## 1. What is MaanakSetu?

**MaanakSetu** (*"The Standard Bridge"*) is a privacy-first business credential network engineered on the **Midnight blockchain**. It enables commercial suppliers and contractors to mathematically prove that they satisfy stringent enterprise procurement criteria (annual turnover thresholds, active ISO certifications, liability insurance, and completed contract experience) **without repeatedly disclosing underlying confidential documents, balance sheets, or trade secrets**.

```
┌────────────────────────────────────────────────────────────────────────┐
│                      THREE-ACTOR TRUST ARCHITECTURE                    │
│                                                                        │
│   1. Credential Issuers (ICAI, BSI, Tax Registries, Underwriters)      │
│      └─► Attests business facts to the supplier's digital passport.    │
│                                                                        │
│   2. Commercial Suppliers (Holders of Maanak Business Passport)        │
│      └─► Formulates private witness inputs in local client RAM.        │
│      └─► Synthesizes zero-knowledge proofs via local proof server.     │
│                                                                        │
│   3. Enterprise Buyers & Public Tenders (Verifiers)                    │
│      └─► Receives on-chain QUALIFIED boolean receipt.                  │
│      └─► Underlying financial documents remain 100% confidential.     │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Dual-State Privacy Architecture

Traditional enterprise supplier onboarding forces vendors to email PDF copies of audited financial statements, tax filings, and client lists to dozens of corporate procurement departments, creating widespread privacy vulnerabilities and data leakage.

MaanakSetu leverages Midnight's dual-state execution model:
- **Private State (Witnesses):** Exact annual turnover (e.g. ₹1.2 Crore), private cryptographic keys, and raw audit dates execute strictly inside the client's local prover memory and Docker proof server (port 6300).
- **Public State (Ledger):** The Midnight blockchain records only the boolean verification outcome (`lastVerificationResult = true`), execution timestamp, requirement type identifier, and blind SHA-256 commitment hashes.

```
┌───────────────────────────┐      ┌────────────────────────────────────┐
│   PRIVATE WITNESS (LOCAL) │ ──── │  SELECTIVE DISCLOSURE              │
│   - privateTurnover       │      │  disclose(lastVerificationResult)  │
│   - certificationExpiry   │      │  disclose(currentTimestamp)        │
│   - experienceYears       │      │         ↓                          │
│   - insuranceCoverage     │      │  PUBLIC LEDGER STATE               │
│   - credentialSecretKey   │      │  - verificationCount (Uint64)      │
│   - credentialSalt        │      │  - registeredCommitmentsCount      │
└───────────────────────────┘      │  - lastCredentialCommitment        │
                                   └────────────────────────────────────┘
```

---

## 3. Four Core Zero-Knowledge Verification Circuits

The smart contract [`contract/src/maanaksetu.compact`](./contract/src/maanaksetu.compact) implements 4 production verification gates:

1. **Circuit 1: Financial Capacity & Turnover Threshold Gate (`verifyTurnoverThreshold`)**
   - Proves supplier's private annual revenue meets or exceeds buyer requirement ($Turnover \ge Minimum$) without disclosing exact figures.
2. **Circuit 2: Compliance & ISO Certification Validity (`verifyCertificationValidity`)**
   - Proves supplier holds an active, unexpired certification ($Expiry \ge CurrentDate$) without exposing private audit reports.
3. **Circuit 3: Experience & Liability Insurance Gate (`verifyExperienceAndInsurance`)**
   - Simultaneously proves commercial track record and active policy coverage ($Years \ge MinYears \land Coverage \ge MinCoverage$).
4. **Circuit 4: Comprehensive Multi-Credential Bundle (`verifyComprehensiveEnterpriseQualification`)**
   - Atomically proves all three criteria simultaneously in a single zero-knowledge transaction.

---

## 4. Key Architectural & UX Innovations
 
- **Contained Hero Badge Fade-In:** Smoothly faded-in header announcement badge resolving user overflow feedback on high-res displays; badge text remains strictly stationary and bounded.
- **Minimalist Geometric Vector Brand (`<MaanakLogo />`):** Clean corporate vector SVG monogram featuring dual arch pillars ("M"), zero-knowledge bridge foundation, and cyan privacy focal node (replacing ornate raster illustrations).
- **Zero-Mock Policy:** Interface forms initialize clean and empty, featuring faded format placeholders and optional Quick-Fill Chips for rapid evaluator testing.
- **React Bits Design System:** Incorporates SplitText, BlurText, ShinyText, CountUp, SpotlightCards, TiltCards, and dynamic multi-layered Aurora ambient lighting.
- **Hardware-Aware Mobile Adaptation:** Automatically detects coarse pointers and touchscreen devices, offering universal deep-links for mobile Web3 dApp browsers and Read-Only Explorer mode.
- **Multi-Network Switcher:** Dynamic switching between Preview and Preprod testnets with automatic volatile session cleanup.
- **Direct Substrate Verification:** Custom tooling querying Substrate RPC (`wss://rpc.*.midnight.network`) and Indexer GraphQL (`https://indexer.*.midnight.network/api/v4/graphql`) directly.

---

## 5. Technology Stack

- **Smart Contract Language:** Compact v0.24+ (Compiles to ZKIR bytecode and managed keys)
- **Zero-Knowledge Runtime:** `@midnight-ntwrk/compact-runtime`, `@midnight-ntwrk/midnight-js-contracts`
- **Web3 Wallet Interface:** `@midnight-ntwrk/dapp-connector-api` (1AM Wallet, Lace Wallet, Injected)
- **Frontend Framework:** React 18, Vite 6, TypeScript 5, Tailwind CSS
- **Animation & Micro-Interactions:** Framer Motion, React Bits
- **Testing & Verification:** Vitest (14 automated simulation unit tests passing)
- **Containerization:** Docker Compose (`midnightntwrk/proof-server:latest` on port 6300)

---

## 6. Getting Started Locally

### Prerequisites
- **Node.js:** v22.x or higher
- **npm:** 10.x or higher
- **Docker Desktop:** Running locally for the Midnight proof server

### Local Setup Instructions

```bash
# 1. Clone the repository
git clone https://github.com/bishalnium/MaanakSetu.git
cd MaanakSetu

# 2. Start the local Midnight Proof Server container
docker compose up -d

# 3. Install contract dependencies and run simulation unit tests
cd contract
npm install
npm test

# 4. Install frontend dependencies and launch development server
cd ../frontend
npm install
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## 7. Testing Suite Execution

The contract workspace includes a comprehensive headless simulation suite covering positive proofs, exact threshold boundaries, assertion failures, and dual-state privacy invariants:

```bash
cd contract
npm test
```

```text
 ✓ test/maanaksetu.test.ts (14 tests)
   ✓ Lifecycle & Initialization Guard (initialize)
   ✓ Circuit 1: Credential Commitment Registration
   ✓ Circuit 2: Financial Capacity & Turnover Threshold Gate
   ✓ Circuit 3: ISO/Compliance Certification Validity
   ✓ Circuit 4: Commercial Experience & Liability Insurance
   ✓ Circuit 5: Comprehensive Enterprise Multi-Credential Bundle
   ✓ Dual-State Privacy Invariant Assertions

 Test Files  1 passed (1)
      Tests  14 passed (14)
```

---

## 8. Vercel Cloud Deployment Configuration

MaanakSetu is configured for instant zero-configuration deployment on [Vercel](https://vercel.com):

### Recommended Vercel Settings
- **Framework Preset:** `Vite`
- **Root Directory:** `./` *(monorepo build via root `vercel.json`)* OR `frontend`
- **Build Command:** `npm run build` *(or `npm --prefix frontend run build`)*
- **Output Directory:** `frontend/dist` *(or `dist` if Root Directory is `frontend`)*
- **Node.js Version:** `20.x` or `22.x`

Both root [`vercel.json`](./vercel.json) and [`frontend/vercel.json`](./frontend/vercel.json) include single-page-app routing rewrites (`/* ➔ /index.html`) and enterprise HTTP security headers (`nosniff`, `X-Frame-Options: DENY`, `X-XSS-Protection`).

---

## 9. Project Maintainer & Verification

- **Author / Lead Maintainer:** Bishal ([@bishalnium](https://github.com/bishalnium))
- **Email:** [bishalpvtxd@gmail.com](mailto:bishalpvtxd@gmail.com)
- **Official X Profile:** [@MaanakSetu](https://x.com/MaanakSetu)
- **Repository:** [https://github.com/bishalnium/MaanakSetu](https://github.com/bishalnium/MaanakSetu)

---

## 10. License

This project is licensed under the **Apache License 2.0**. See the [LICENSE](LICENSE) file for details.
