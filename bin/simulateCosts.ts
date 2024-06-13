import {writeFile} from "fs/promises";
import {join} from "path";
import simulatePMSCCosts from "../lib/simulatePMSCCosts";
import commandLineArgs, {OptionDefinition} from "command-line-args";
import commandLineUsage from 'command-line-usage'

const optionDefinitions:OptionDefinition[] = [
    { name: 'min-students', alias: 'm', type: Number, defaultValue: 1000 },
    { name: 'max-students', alias: 'x', type: Number, defaultValue: 10000 },
    { name: 'subject-count', alias: 'c', type: Number, defaultValue: 5 },
    {name: 'help', alias: 'h', type: Boolean, defaultValue: false},
];

const options = commandLineArgs(optionDefinitions)

const sections = [
    {
        header: 'PMSC Financial Model Simulator',
        content: 'Generates simulate data based on the 2023-2024 school year costs.'
    },
    {
        header: 'Options',
        optionList: [
            {
                name: 'min-students',
                typeLabel: '{underline number} ',
                alias: 'm',
                description: 'The {bold minimum} number of students to start the simulation.\n'
            },
            {
                name: 'max-students',
                typeLabel: '{underline number} ',
                alias: 'x',
                description: 'The {bold maximum} number of students to start the simulation.\n'
            },
            {
                name: 'subject-count',
                typeLabel: '{underline number} ',
                alias: 'c',
                description: 'The number of subjects which the simulation should use {bold Note that the default amount is 5}.\n'
            },
            {
                name: 'help',
                alias: 'h',
                description: 'Print this usage guide.'
            }
        ]
    }
]
const usage = commandLineUsage(sections)

const main = async () => {
    if(options["help"]) {
        console.log(usage);
        return;
    }

    let studentCount = options["min-students"];

    const averageCosts = [];
    const simulatedYearsByCount = [];
    while (studentCount <= options["max-students"]) {
        const {averageMonthlyCost, simulatedMonthlyCosts} = simulatePMSCCosts({
            numberOfStudents: studentCount,
            numberOfTeachers: studentCount / 10,
            numberOfSubjects: options["subject-count"]
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
