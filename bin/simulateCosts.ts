import {writeFile} from "fs/promises";
import {join} from "path";
import simulatePMSCCosts from "../lib/simulatePMSCCosts";

const main = async () => {
    let studentCount = 1000;
    const subjectsWithFinancialLiteracy = 6;
    const averageCosts = [];
    const simulatedYearsByCount = [];
    while (studentCount <= 10000) {
        const {averageMonthlyCost, simulatedMonthlyCosts} = simulatePMSCCosts({
            numberOfStudents: studentCount,
            numberOfTeachers: studentCount / 10,
            numberOfSubjects: subjectsWithFinancialLiteracy
        });

        averageCosts.push({students: studentCount, cost: averageMonthlyCost});
        simulatedYearsByCount.push({students: studentCount, monthlyCosts: simulatedMonthlyCosts});

        studentCount += 1000;
    }

    await writeFile(join(__dirname, '../data/simulated-averages.json'), JSON.stringify(averageCosts, null, 2));
    await writeFile(join(__dirname, '../data/simulated-years.json'), JSON.stringify(simulatedYearsByCount, null, 2));

    console.log("All done");
};

main().catch((e) => {
    console.log('Something Died');
    console.log(e);
});
