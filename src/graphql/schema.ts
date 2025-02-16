import { buildSchema } from "graphql";

export const schema = buildSchema(`
    type SimulationInput {
        id: Int!
        chargePoints: Int!
        arrivalProbabilityMultiplier: Float!
        carConsumption: Float!
        chargePowerPerPoint: Float!
        simulationResult: SimulationOutput
    }

    type SimulationOutput {
        id: Int!
        totalEnergyCharged: Float!
        chargingEvents: JSON!
        chargingValuesPerPoint: JSON!
        exemplaryDay: JSON!
    }

    scalar JSON

    type Query {
        getSimulationInput(id: Int!): SimulationInput
        getSimulationOutputs: [SimulationOutput]
        getSimulationOutput(id: Int!): SimulationOutput
    }

    type Mutation {
        createSimulationInput(chargePoints: Int!, arrivalProbabilityMultiplier: Float, carConsumption: Float, chargePowerPerPoint: Float): SimulationInput
        updateSimulationInput(id: Int!, chargePoints: Int, arrivalProbabilityMultiplier: Float, carConsumption: Float, chargePowerPerPoint: Float): SimulationInput
        runSimulation(inputId: Int!): SimulationOutput
        deleteSimulationInput(id: Int!): SimulationInput
    }
`);
