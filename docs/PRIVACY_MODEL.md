# MaanakSetu — Privacy Model & Threat Invariant Analysis

## 1. What an Observer Learns vs. What Remains Confidential

| Data Field | Observer Visibility | Storage Enclave | Privacy Mechanism |
|---|---|---|---|
| **Exact Annual Revenue (₹ INR)** | ❌ Hidden | Client RAM / Local Vault | Zero-Knowledge Range Predicate (`turnover >= threshold`) |
| **Balance Sheet Details & Banking** | ❌ Hidden | Client Encrypted Storage | Off-Chain Attestation Signature |
| **Confidential Client Contracts** | ❌ Hidden | Client RAM | Private Witness |
| **Audit Non-Conformity Notes** | ❌ Hidden | Client RAM | Private Witness |
| **Cryptographic Salt & Nonce** | ❌ Hidden | Client Enclave | Ephemeral Private Input |
| **Qualification Decision (PASS/FAIL)** | ✅ Public | Midnight On-Chain Ledger | Selective Disclosure (`lastVerificationResult = true`) |
| **Verification Timestamp** | ✅ Public | Midnight On-Chain Ledger | Block Timestamp Settlement |
| **Policy Requirement Identifier** | ✅ Public | Midnight On-Chain Ledger | `lastQualificationType` Identifier |
| **Credential Blind Commitment Hash** | ✅ Public | Midnight On-Chain Ledger | `persistentHash(secretKey)` (SHA-256 One-Way Pre-image) |

---

## 2. Threat Models & Mitigations

### 2.1 Replay Attacks
- **Threat:** An adversary intercepts a previously verified ZK proof and attempts to submit it under a different supplier identity or for a different tender requirement.
- **Mitigation:** Circuits enforce specific requirement parameters (`minimumTurnoverRequired`, `minimumValidTimestamp`) directly inside the arithmetic constraint system. Proofs synthesized for a ₹50 Lakh threshold cannot be re-used to satisfy a ₹1 Crore requirement.

### 2.2 Re-Initialization Exploits
- **Threat:** A malicious actor invokes the contract initialization circuit post-deployment to reset the verification registry.
- **Mitigation:** The `isInitialized` Boolean ledger cell enforces strict one-time execution via `assert(!isInitialized, "Contract already initialized")`. Subsequent attempts throw a fatal assertion error.

### 2.3 Pre-Image / Rainbow Table Attacks
- **Threat:** An adversary attempts to brute-force private credential hashes by calculating rainbow tables across common turnover amounts.
- **Mitigation:** All credential commitments combine private secret keys with cryptographically high-entropy 256-bit salts (`persistentHash<Vector<2, Bytes<32>>>([secretKey, salt])`), rendering rainbow table inversion computationally infeasible.

### 2.4 Unshielded Token & Address Privacy
- **Principle:** On Midnight, unshielded addresses (`mn_addr_...`) handle public faucet and registration transactions, while shielded operations utilize DUST tokens to prevent transaction linkage on public explorers.
