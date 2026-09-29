# MaanakSetu — Enterprise Architecture & System Specifications

## 1. System Overview
MaanakSetu is a privacy-preserving business credential and supplier qualification platform architected on the **Midnight Network** (a zero-knowledge privacy blockchain by IOHK).

Traditional corporate and governmental procurement mandates that suppliers submit confidential business documentation—including audited balance sheets, tax compliance statements, cyber security audit records, and liability insurance contracts—to dozens of external procurement departments, creating widespread data leakage vectors and high audit overhead.

MaanakSetu addresses this challenge through a **Three-Actor Trust Model** powered by **Selective Disclosure Zero-Knowledge Proofs**:
1. **Credential Issuers**: Accredited institutions (chartered accountants, certification boards, tax registries) issue verifiable digital attestations.
2. **Suppliers**: Hold credentials in their local **Maanak Business Passport**, retaining private keys and raw documents exclusively in client memory.
3. **Buyers / Enterprise Verifiers**: Publish structured mathematical policies. Suppliers prove compliance locally without disclosing confidential values, and the Midnight Network registers the verified qualification outcome on-chain.

---

## 2. Dual-State Privacy Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                        SUPPLIER CLIENT ENCLAVE                         │
│                                                                        │
│   Private Business Credentials (RAM Only):                             │
│   - Exact Turnover: ₹12,000,000 (₹1.2 Cr)                              │
│   - Secret Key: 0x7a89f...                                             │
│   - Cryptographic Salt: 0x1b2c...                                      │
│                                                                        │
│   Local Prover / Proof Server (Port 6300):                             │
│   - Circuit: verifyTurnoverThreshold(req = ₹5,000,000)                 │
│   - Assertion: 12,000,000 >= 5,000,000 (TRUE)                          │
│   - Generates ZK-SNARK Proof (PLONK / Halo2)                           │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ (Zero-Knowledge Proof Only)
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                       MIDNIGHT BLOCKCHAIN LEDGER                       │
│                                                                        │
│   Public Ledger State:                                                 │
│   - lastVerificationResult: true (QUALIFIED)                           │
│   - lastVerificationTimestamp: 1788800100                             │
│   - lastQualificationType: 1 (Turnover Gate)                           │
│   - lastCredentialCommitment: 0x4f8a... (Blind Hash)                   │
│                                                                        │
│   * Private turnover and supplier documents NEVER enter the ledger *   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Compact Smart Contract Circuits

The contract `maanaksetu.compact` defines five core ZK circuits:

### Circuit 0: `initialize()`
- Guards against re-initialization exploits using `assert(!isInitialized)`.
- Sets initial ledger counters (`verificationCount = 0`, `registeredCommitmentsCount = 0`).

### Circuit 1: `registerCredentialCommitment(issuerSignatureHash, currentTimestamp)`
- Computes cryptographic blind commitment: `persistentHash(secretKey)`.
- Increments commitment registry counter without exposing the secret key.

### Circuit 2: `verifyTurnoverThreshold(minimumTurnoverRequired, currentTimestamp)`
- Asserts: `privateTurnover >= minimumTurnoverRequired`.
- Selectively discloses only: `lastVerificationResult = true` and `lastQualificationType = 1`.

### Circuit 3: `verifyCertificationValidity(minimumValidTimestamp, currentTimestamp)`
- Asserts: `expiryTimestamp >= minimumValidTimestamp`.
- Verifies that compliance certifications (ISO 27001, CMMI) are unexpired.

### Circuit 4: `verifyExperienceAndInsurance(minExperienceYears, minInsuranceCoverage, currentTimestamp)`
- Dual-constraint circuit asserting both minimum completed contracts and commercial liability coverage.

### Circuit 5: `verifyComprehensiveBundle(minTurnover, minValidCertTimestamp, minExperience, currentTimestamp)`
- Atomic 3-way multi-credential bundle proving all three predicates in a single zero-knowledge transaction.
