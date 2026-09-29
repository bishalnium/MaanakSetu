import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export type Witnesses<PS> = {
  getSupplierTurnover(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, bigint];
  getCredentialSecretKey(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, Uint8Array];
  getCertificationExpiryTimestamp(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, bigint];
  getSupplierExperienceYears(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, bigint];
  getSupplierInsuranceCoverage(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, bigint];
}

export type ImpureCircuits<PS> = {
  initialize(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, boolean>;
  registerCredentialCommitment(context: __compactRuntime.CircuitContext<PS>,
                               issuerSignatureHash_0: Uint8Array,
                               currentTimestamp_0: bigint): __compactRuntime.CircuitResults<PS, boolean>;
  verifyTurnoverThreshold(context: __compactRuntime.CircuitContext<PS>,
                          minimumTurnoverRequired_0: bigint,
                          currentTimestamp_0: bigint): __compactRuntime.CircuitResults<PS, boolean>;
  verifyCertificationValidity(context: __compactRuntime.CircuitContext<PS>,
                              minimumValidTimestamp_0: bigint,
                              currentTimestamp_0: bigint): __compactRuntime.CircuitResults<PS, boolean>;
  verifyExperienceAndInsurance(context: __compactRuntime.CircuitContext<PS>,
                               minExperienceYears_0: bigint,
                               minInsuranceCoverage_0: bigint,
                               currentTimestamp_0: bigint): __compactRuntime.CircuitResults<PS, boolean>;
  verifyComprehensiveBundle(context: __compactRuntime.CircuitContext<PS>,
                            minTurnover_0: bigint,
                            minValidCertTimestamp_0: bigint,
                            minExperience_0: bigint,
                            currentTimestamp_0: bigint): __compactRuntime.CircuitResults<PS, boolean>;
}

export type ProvableCircuits<PS> = {
  initialize(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, boolean>;
  registerCredentialCommitment(context: __compactRuntime.CircuitContext<PS>,
                               issuerSignatureHash_0: Uint8Array,
                               currentTimestamp_0: bigint): __compactRuntime.CircuitResults<PS, boolean>;
  verifyTurnoverThreshold(context: __compactRuntime.CircuitContext<PS>,
                          minimumTurnoverRequired_0: bigint,
                          currentTimestamp_0: bigint): __compactRuntime.CircuitResults<PS, boolean>;
  verifyCertificationValidity(context: __compactRuntime.CircuitContext<PS>,
                              minimumValidTimestamp_0: bigint,
                              currentTimestamp_0: bigint): __compactRuntime.CircuitResults<PS, boolean>;
  verifyExperienceAndInsurance(context: __compactRuntime.CircuitContext<PS>,
                               minExperienceYears_0: bigint,
                               minInsuranceCoverage_0: bigint,
                               currentTimestamp_0: bigint): __compactRuntime.CircuitResults<PS, boolean>;
  verifyComprehensiveBundle(context: __compactRuntime.CircuitContext<PS>,
                            minTurnover_0: bigint,
                            minValidCertTimestamp_0: bigint,
                            minExperience_0: bigint,
                            currentTimestamp_0: bigint): __compactRuntime.CircuitResults<PS, boolean>;
}

export type PureCircuits = {
}

export type Circuits<PS> = {
  initialize(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, boolean>;
  registerCredentialCommitment(context: __compactRuntime.CircuitContext<PS>,
                               issuerSignatureHash_0: Uint8Array,
                               currentTimestamp_0: bigint): __compactRuntime.CircuitResults<PS, boolean>;
  verifyTurnoverThreshold(context: __compactRuntime.CircuitContext<PS>,
                          minimumTurnoverRequired_0: bigint,
                          currentTimestamp_0: bigint): __compactRuntime.CircuitResults<PS, boolean>;
  verifyCertificationValidity(context: __compactRuntime.CircuitContext<PS>,
                              minimumValidTimestamp_0: bigint,
                              currentTimestamp_0: bigint): __compactRuntime.CircuitResults<PS, boolean>;
  verifyExperienceAndInsurance(context: __compactRuntime.CircuitContext<PS>,
                               minExperienceYears_0: bigint,
                               minInsuranceCoverage_0: bigint,
                               currentTimestamp_0: bigint): __compactRuntime.CircuitResults<PS, boolean>;
  verifyComprehensiveBundle(context: __compactRuntime.CircuitContext<PS>,
                            minTurnover_0: bigint,
                            minValidCertTimestamp_0: bigint,
                            minExperience_0: bigint,
                            currentTimestamp_0: bigint): __compactRuntime.CircuitResults<PS, boolean>;
}

export type Ledger = {
  readonly isInitialized: boolean;
  readonly verificationCount: bigint;
  readonly registeredCommitmentsCount: bigint;
  readonly lastVerificationResult: boolean;
  readonly lastVerificationTimestamp: bigint;
  readonly lastQualificationType: bigint;
  readonly lastCredentialCommitment: Uint8Array;
}

export type ContractReferenceLocations = any;

export declare const contractReferenceLocations : ContractReferenceLocations;

export declare class Contract<PS = any, W extends Witnesses<PS> = Witnesses<PS>> {
  witnesses: W;
  circuits: Circuits<PS>;
  impureCircuits: ImpureCircuits<PS>;
  provableCircuits: ProvableCircuits<PS>;
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<PS>): __compactRuntime.ConstructorResult<PS>;
}

export declare function ledger(state: __compactRuntime.StateValue | __compactRuntime.ChargedState): Ledger;
export declare const pureCircuits: PureCircuits;
