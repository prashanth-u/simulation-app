import { buildSchema } from "graphql";

export const schema = buildSchema(`
    type SimulationInput {
        id: Int!
        chargePoints: Int!
        arrivalProbabilityMultiplier: Float!
        carConsumption: Float!
        chargePowerPerPoint: Float!
        arrivingCars: Int!
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
    }

    type Mutation {
        createSimulationInput(chargePoints: Int!, arrivalProbabilityMultiplier: Float, carConsumption: Float, chargePowerPerPoint: Float, arrivingCars: Int!): SimulationInput
        runSimulation(inputId: Int!): SimulationOutput
    }
`);
