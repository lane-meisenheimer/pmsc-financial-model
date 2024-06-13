import {Type, Static} from "@sinclair/typebox";

export const MonthlyCostSchema = Type.Object({
    ElementalMediaConvert: Type.Number(),
    Cognito: Type.Number(),
    Date: Type.String(),
    S3: Type.Number(),
    SecretsManager: Type.Number(),
    AppSync:Type.Number(),
    Amplify: Type.Number(),
    StepFunctions: Type.Number(),
    XRay: Type.Number(),
    Lambda: Type.Number(),
    KinesisFirehose: Type.Number(),
    TotalCosts: Type.Number(),
});

export type MonthlyCost = Static<typeof MonthlyCostSchema>;
