
# financial-model
## Introduction
The PMSC financial model allows you to generate projected expenses for PMSC based on the previous
expenses from the 2023-2024 school year.  

### Data
The simulated data is stored in two files: **data/simulated-averages.json** and **data/simulated-years.json**

#### simulated-averages.json 
Contains a series of data with students as the independent variable, and a set of costs as the dependent variable.
```json
[
  {
    "students": 1000,
    "cost": {
      "Amplify": 0.2120906503988996,
      "AppSync": 0.7750847231306741,
      "Cognito": 6.361898211829436,
      "ElementalMediaConvert": 13.940168017056395,
      "KinesisFirehose": 0.0018599471884456673,
      "Lambda": 0.003051322118294361,
      "TotalCosts": 29.061959164440164,
      "S3": 5.017182592547456,
      "SecretsManager": 2.6375807723026137,
      "XRay": 0.03904497936726273,
      "StepFunctions": 0.0739951856946355
    }
  },
  ...
]
```

#### simulated-years.json
Contains a series of data with students as the independent variable, and a time series of costs as the dependent variable.
```json
[
  {
    "students": 2000,
    "monthlyCosts": [
      {
        "Date": "2023-08-01",
        "ElementalMediaConvert": 288.6246761133425,
        "Cognito": 0.10894085281980743,
        "S3": 11.256339869628611,
        "SecretsManager": 5.598279532258597,
        "AppSync": 0.1855117469050894,
        "Amplify": -2.5237964236588722e-8,
        "StepFunctions": 0,
        "XRay": 0,
        "Lambda": 0,
        "KinesisFirehose": 0,
        "TotalCosts": 305.77377078627234
      },
      ...
    ]
  },
  ...
]
```

The simulation will adjust based on *student count*, *teacher count*, and *the number of subjects*.
> Note that the default number of subjects in the PMSC base curriculum is **5**:
> 1. Life Dream
> 2. Self Awareness
> 3. Cognitive Construction
> 4. Interpersonal Relationships
> 5. Coping

The baseline simulation commited to the repository was run with the following parameters

| Parameter          | Value  |
|--------------------|--------|
| Min Students       | 1,000  |
| Max Students       | 10,000 |
| Number of Subjects | 6      |

## Simulation
In order to re-reun the simulation and recreate **data/simulated-averages.json** and **data/simulated-years.json**
update the values in **bin/simulateCosts.ts** and run the following command.

`npx ts-node bin/simulateCosts.ts -c <number of subject> -m <min students> -x <max students>`

### Example

`npx ts-node ./bin/simulateCosts.ts -m 1000 -x 10000 -c 6`
