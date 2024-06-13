import {parse} from "csv-parse/sync"
import {readFile, writeFile} from "fs/promises";
import {join} from "path";
import {Value} from "@sinclair/typebox/value";
import {MonthlyCostSchema} from "../types";
const main = async () => {
    const buffer = await readFile(join(__dirname, "../data/pmsc-costs.csv"), "utf8");
    const results = parse(buffer, {
        columns: ["Date","ElementalMediaConvert","Cognito","S3","SecretsManager","AppSync","Amplify","StepFunctions","XRay","Lambda","KinesisFirehose","CloudFront","KeyManagementService","SNS","CloudWatch","Tax","TotalCosts"],
    });

    const data = results.map((result:Record<string, string>) => {
        return Value.Convert(MonthlyCostSchema, Value.Clean(MonthlyCostSchema, result));
    });

    await writeFile(join(__dirname, "../data/pmsc-costs.json"), JSON.stringify({
        monthlyCosts: data,
        numberOfStudents: 1382,
        numberOfTeachers: 72,
        subjects: 5
    }, null, 4));


    console.log("All done");
};

main().catch((e) => {
    console.log('Something Died');
    console.log(e);
});

