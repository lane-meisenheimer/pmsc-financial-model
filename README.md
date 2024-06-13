
# financial-model
## Introduction
The PMSC financial model allows you to generate projected expenses for PMSC based on the previous
expenses from the 2023-2024 school year.  

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
In order to re-reun the simulation and recreate **data/simulated-averages.json** and **data/simulated-years.json** u
update the values in **bin/simulateCosts.ts** and run the following command.

`npx ts-node bin/simulateCosts.ts -c <number of subject> -m <min students> -x <max students>`

### Example

`npx ts-node ./bin/simulateCosts.ts -m 1000 -x 10000 -c 6`
