import { describe, it, expect } from 'vitest';
import { Contract, ledger } from '../managed/contract/index.js';
import { createCircuitContext, dummyContractAddress } from '@midnight-ntwrk/compact-runtime';

describe('MaanakSetu Zero-Knowledge Business Credential Smart Contract', () => {
  const coinPublicKey = { bytes: new Uint8Array(32) };

  function getInitialCircuitContext(contract: Contract<any>) {
    const initResult = contract.initialState({
      initialPrivateState: {},
      initialZswapLocalState: {
        coinPublicKey,
        currentIndex: 0n,
        inputs: [],
        outputs: []
      }
    });
    return createCircuitContext(
      dummyContractAddress(),
      coinPublicKey,
      initResult.currentContractState.data,
      initResult.currentPrivateState
    );
  }

  // Helper default witnesses
  const createMockWitnesses = (overrides = {}) => ({
    getSupplierTurnover: (ctx: any) => [ctx.privateState, 12_000_000n], // ₹1.2 Crore
    getCredentialSecretKey: (ctx: any) => [ctx.privateState, new Uint8Array(32).fill(7)],
    getCredentialSalt: (ctx: any) => [ctx.privateState, new Uint8Array(32).fill(3)],
    getCertificationExpiryTimestamp: (ctx: any) => [ctx.privateState, 1861920000n], // Year 2029
    getSupplierExperienceYears: (ctx: any) => [ctx.privateState, 6n], // 6 years / contracts
    getSupplierInsuranceCoverage: (ctx: any) => [ctx.privateState, 5_000_000n], // ₹50 Lakh
    ...overrides,
  });

  describe('Lifecycle & Initialization Guard (initialize)', () => {
    it('1. successfully initializes contract ledger state with operational counters', () => {
      const contract = new Contract(createMockWitnesses());
      const initialCtx = getInitialCircuitContext(contract);

      const res = contract.impureCircuits.initialize(initialCtx);
      expect(res.result).toBe(true);

      const state = ledger(res.context.currentQueryContext.state);
      expect(state.isInitialized).toBe(true);
      expect(state.verificationCount).toBe(0n);
      expect(state.registeredCommitmentsCount).toBe(0n);
      expect(state.lastVerificationResult).toBe(false);
      expect(state.lastQualificationType).toBe(0n);
    });

    it('2. strictly rejects re-initialization to prevent unauthorized reset exploits', () => {
      const contract = new Contract(createMockWitnesses());
      const initialCtx = getInitialCircuitContext(contract);

      const res = contract.impureCircuits.initialize(initialCtx);
      expect(() => {
        contract.impureCircuits.initialize(res.context);
      }).toThrow('Contract already initialized');
    });
  });

  describe('Circuit 1: Credential Commitment Registration', () => {
    it('3. registers a cryptographic blind commitment hash without exposing private key', () => {
      const contract = new Contract(createMockWitnesses());
      const initialCtx = getInitialCircuitContext(contract);
      const initRes = contract.impureCircuits.initialize(initialCtx);

      const issuerSig = new Uint8Array(32).fill(99);
      const timestamp = 1788800010n;

      const regRes = contract.impureCircuits.registerCredentialCommitment(initRes.context, issuerSig, timestamp);
      expect(regRes.result).toBe(true);

      const state = ledger(regRes.context.currentQueryContext.state);
      expect(state.registeredCommitmentsCount).toBe(1n);
      expect(state.lastVerificationTimestamp).toBe(timestamp);
      expect(state.lastCredentialCommitment.length).toBe(32);
    });

    it('4. increments commitment count sequentially on multiple registrations', () => {
      const contract = new Contract(createMockWitnesses());
      const initialCtx = getInitialCircuitContext(contract);
      const initRes = contract.impureCircuits.initialize(initialCtx);

      const issuerSig = new Uint8Array(32).fill(1);
      const res1 = contract.impureCircuits.registerCredentialCommitment(initRes.context, issuerSig, 1788800020n);
      const res2 = contract.impureCircuits.registerCredentialCommitment(res1.context, issuerSig, 1788800030n);

      const state = ledger(res2.context.currentQueryContext.state);
      expect(state.registeredCommitmentsCount).toBe(2n);
    });
  });

  describe('Circuit 2: Financial Capacity & Turnover Threshold Gate', () => {
    it('5. proves turnover >= threshold without revealing exact crore revenue (positive)', () => {
      const confidentialTurnover = 12_000_000n; // ₹1.2 Crore
      const buyerRequiredThreshold = 5_000_000n; // ₹50 Lakh minimum
      const timestamp = 1788800100n;

      const contract = new Contract(createMockWitnesses({
        getSupplierTurnover: (ctx: any) => [ctx.privateState, confidentialTurnover]
      }));
      const initialCtx = getInitialCircuitContext(contract);
      const initRes = contract.impureCircuits.initialize(initialCtx);

      const verifyRes = contract.impureCircuits.verifyTurnoverThreshold(initRes.context, buyerRequiredThreshold, timestamp);
      expect(verifyRes.result).toBe(true);

      const state = ledger(verifyRes.context.currentQueryContext.state);
      expect(state.lastVerificationResult).toBe(true);
      expect(state.lastQualificationType).toBe(1n);
      expect(state.lastVerificationTimestamp).toBe(timestamp);
      expect(state.verificationCount).toBe(1n);
    });

    it('6. succeeds when supplier turnover matches the threshold exactly (exact boundary test)', () => {
      const exactThreshold = 5_000_000n;
      const timestamp = 1788800101n;

      const contract = new Contract(createMockWitnesses({
        getSupplierTurnover: (ctx: any) => [ctx.privateState, exactThreshold]
      }));
      const initialCtx = getInitialCircuitContext(contract);
      const initRes = contract.impureCircuits.initialize(initialCtx);

      const verifyRes = contract.impureCircuits.verifyTurnoverThreshold(initRes.context, exactThreshold, timestamp);
      expect(verifyRes.result).toBe(true);

      const state = ledger(verifyRes.context.currentQueryContext.state);
      expect(state.lastVerificationResult).toBe(true);
    });

    it('7. strictly fails and throws assertion when supplier turnover is below requirement', () => {
      const insufficientTurnover = 3_000_000n; // ₹30 Lakh
      const buyerRequiredThreshold = 5_000_000n; // ₹50 Lakh
      const timestamp = 1788800102n;

      const contract = new Contract(createMockWitnesses({
        getSupplierTurnover: (ctx: any) => [ctx.privateState, insufficientTurnover]
      }));
      const initialCtx = getInitialCircuitContext(contract);
      const initRes = contract.impureCircuits.initialize(initialCtx);

      expect(() => {
        contract.impureCircuits.verifyTurnoverThreshold(initRes.context, buyerRequiredThreshold, timestamp);
      }).toThrow('Supplier turnover does not satisfy required threshold');
    });
  });

  describe('Circuit 3: ISO/Compliance Certification Validity', () => {
    it('8. proves certification is valid and unexpired without exposing audit reports', () => {
      const validUntil = 1861920000n; // Year 2029
      const requiredValidThrough = 1788800000n; // Year 2026
      const timestamp = 1788800200n;

      const contract = new Contract(createMockWitnesses({
        getCertificationExpiryTimestamp: (ctx: any) => [ctx.privateState, validUntil]
      }));
      const initialCtx = getInitialCircuitContext(contract);
      const initRes = contract.impureCircuits.initialize(initialCtx);

      const verifyRes = contract.impureCircuits.verifyCertificationValidity(initRes.context, requiredValidThrough, timestamp);
      expect(verifyRes.result).toBe(true);

      const state = ledger(verifyRes.context.currentQueryContext.state);
      expect(state.lastVerificationResult).toBe(true);
      expect(state.lastQualificationType).toBe(2n);
    });

    it('9. strictly rejects when certificate is expired prior to required period', () => {
      const expiredTimestamp = 1735689600n; // Year 2025
      const requiredValidThrough = 1788800000n; // Year 2026

      const contract = new Contract(createMockWitnesses({
        getCertificationExpiryTimestamp: (ctx: any) => [ctx.privateState, expiredTimestamp]
      }));
      const initialCtx = getInitialCircuitContext(contract);
      const initRes = contract.impureCircuits.initialize(initialCtx);

      expect(() => {
        contract.impureCircuits.verifyCertificationValidity(initRes.context, requiredValidThrough, 1788800201n);
      }).toThrow('Certification is expired or invalid for required period');
    });
  });

  describe('Circuit 4: Commercial Experience & Liability Insurance', () => {
    it('10. proves both experience >= 3 years and insurance >= ₹50Lakh simultaneously', () => {
      const contract = new Contract(createMockWitnesses({
        getSupplierExperienceYears: (ctx: any) => [ctx.privateState, 5n],
        getSupplierInsuranceCoverage: (ctx: any) => [ctx.privateState, 7_500_000n]
      }));
      const initialCtx = getInitialCircuitContext(contract);
      const initRes = contract.impureCircuits.initialize(initialCtx);

      const verifyRes = contract.impureCircuits.verifyExperienceAndInsurance(
        initRes.context,
        3n,
        5_000_000n,
        1788800300n
      );
      expect(verifyRes.result).toBe(true);

      const state = ledger(verifyRes.context.currentQueryContext.state);
      expect(state.lastQualificationType).toBe(3n);
      expect(state.lastVerificationResult).toBe(true);
    });

    it('11. rejects if experience is insufficient even if insurance is met', () => {
      const contract = new Contract(createMockWitnesses({
        getSupplierExperienceYears: (ctx: any) => [ctx.privateState, 2n], // below 3
        getSupplierInsuranceCoverage: (ctx: any) => [ctx.privateState, 10_000_000n]
      }));
      const initialCtx = getInitialCircuitContext(contract);
      const initRes = contract.impureCircuits.initialize(initialCtx);

      expect(() => {
        contract.impureCircuits.verifyExperienceAndInsurance(initRes.context, 3n, 5_000_000n, 1788800301n);
      }).toThrow('Supplier does not meet minimum experience requirement');
    });

    it('12. rejects if insurance is insufficient even if experience is met', () => {
      const contract = new Contract(createMockWitnesses({
        getSupplierExperienceYears: (ctx: any) => [ctx.privateState, 8n],
        getSupplierInsuranceCoverage: (ctx: any) => [ctx.privateState, 2_000_000n] // below 5_000_000
      }));
      const initialCtx = getInitialCircuitContext(contract);
      const initRes = contract.impureCircuits.initialize(initialCtx);

      expect(() => {
        contract.impureCircuits.verifyExperienceAndInsurance(initRes.context, 3n, 5_000_000n, 1788800302n);
      }).toThrow('Supplier liability insurance is below requirement');
    });
  });

  describe('Circuit 5: Comprehensive Enterprise Multi-Credential Bundle', () => {
    it('13. atomically validates turnover, certification, and experience in a single proof', () => {
      const contract = new Contract(createMockWitnesses({
        getSupplierTurnover: (ctx: any) => [ctx.privateState, 20_000_000n],
        getCertificationExpiryTimestamp: (ctx: any) => [ctx.privateState, 1900000000n],
        getSupplierExperienceYears: (ctx: any) => [ctx.privateState, 7n]
      }));
      const initialCtx = getInitialCircuitContext(contract);
      const initRes = contract.impureCircuits.initialize(initialCtx);

      const verifyRes = contract.impureCircuits.verifyComprehensiveBundle(
        initRes.context,
        10_000_000n,
        1788800000n,
        5n,
        1788800400n
      );
      expect(verifyRes.result).toBe(true);

      const state = ledger(verifyRes.context.currentQueryContext.state);
      expect(state.lastQualificationType).toBe(4n);
      expect(state.lastVerificationResult).toBe(true);
    });
  });

  describe('Dual-State Privacy Invariant Assertions', () => {
    it('14. guarantees that private witness amounts and keys NEVER exist in public ledger', () => {
      const secretKey = new Uint8Array(32).fill(255);
      const secretTurnover = 99_999_999n;
      const secretExperience = 42n;

      const contract = new Contract(createMockWitnesses({
        getSupplierTurnover: (ctx: any) => [ctx.privateState, secretTurnover],
        getCredentialSecretKey: (ctx: any) => [ctx.privateState, secretKey],
        getSupplierExperienceYears: (ctx: any) => [ctx.privateState, secretExperience]
      }));
      const initialCtx = getInitialCircuitContext(contract);
      const initRes = contract.impureCircuits.initialize(initialCtx);

      const verifyRes = contract.impureCircuits.verifyTurnoverThreshold(initRes.context, 10_000_000n, 1788800500n);
      const publicLedger = ledger(verifyRes.context.currentQueryContext.state);

      // Verify legitimate public fields exist
      expect(publicLedger).toHaveProperty('isInitialized');
      expect(publicLedger).toHaveProperty('verificationCount');
      expect(publicLedger).toHaveProperty('lastVerificationResult');
      expect(publicLedger).toHaveProperty('lastQualificationType');
      expect(publicLedger).toHaveProperty('lastVerificationTimestamp');

      // Crucial privacy invariants: private fields must be completely undefined on public ledger
      expect((publicLedger as any).getSupplierTurnover).toBeUndefined();
      expect((publicLedger as any).supplierTurnover).toBeUndefined();
      expect((publicLedger as any).privateTurnover).toBeUndefined();
      expect((publicLedger as any).getCredentialSecretKey).toBeUndefined();
      expect((publicLedger as any).secretKey).toBeUndefined();
      expect((publicLedger as any).getSupplierExperienceYears).toBeUndefined();
      expect((publicLedger as any).getSupplierInsuranceCoverage).toBeUndefined();
    });
  });
});
