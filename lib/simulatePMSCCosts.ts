import {Type, Static} from "@sinclair/typebox";
import pmscActualCosts from "../data/pmsc-costs.json";
import {MonthlyCost} from "../types";

const inputSchema = Type.Object({
    numberOfSubjects: Type.Number(),
    numberOfStudents: Type.Number(),
    numberOfTeachers: Type.Number()
});

export default function simulatePMSCCosts(input: Static<typeof inputSchema>) {
    const userAdjustmentFactor = (input.numberOfStudents + input.numberOfTeachers) / (pmscActualCosts.numberOfTeachers + pmscActualCosts.numberOfStudents)
    const subjectCostAdjustmentFactor = input.numberOfSubjects / pmscActualCosts.subjects;

    const averageMonthlyCost: Omit<MonthlyCost, "Date"> = {
        Amplify: 0,
        AppSync: 0,
        Cognito: 0,
        ElementalMediaConvert: 0,
        KinesisFirehose: 0,
        Lambda: 0,
        TotalCosts: 0,
        S3: 0,
        SecretsManager: 0,
        XRay: 0,
        StepFunctions: 0
    };

    const simulatedMonthlyCosts = pmscActualCosts.monthlyCosts.map((cost: MonthlyCost) => {
        let key:keyof MonthlyCost;
        const monthlyCost = {
            ...cost
        };

        for(key in cost) {
            if(key === "Date") {
                continue;
            }

            const updatedCost = cost[key] * userAdjustmentFactor * subjectCostAdjustmentFactor;

            averageMonthlyCost[key] += updatedCost / pmscActualCosts.monthlyCosts.length;
            monthlyCost[key] = updatedCost;
        }

        return monthlyCost;
    });

    return {
        averageMonthlyCost,
        simulatedMonthlyCosts,
        userAdjustmentFactor,
        subjectCostAdjustmentFactor,
    }
}
