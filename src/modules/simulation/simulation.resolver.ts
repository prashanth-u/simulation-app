import { createSimulationInput, getSimulationInput, getSimulationOutputs, runSimulation, getSimulationOutput, updateSimulationInput, deleteSimulationInput } from "./simulation.service";
export const simulationResolver = {
  getSimulationInput: async ({ id }: { id: number }) => getSimulationInput(id),

  updateSimulationInput: async ({ id, chargePoints, arrivalProbabilityMultiplier, carConsumption, chargePowerPerPoint }: { id: number, chargePoints?: number, arrivalProbabilityMultiplier?: number, carConsumption?: number, chargePowerPerPoint?: number }) => {
    const data = {
      chargePoints,
      arrivalProbabilityMultiplier,
      carConsumption,
      chargePowerPerPoint
    };
    return updateSimulationInput(id, data);
  },

  deleteSimulationInput: async ({ id }: { id: number }) => deleteSimulationInput(id),

  getSimulationOutput: async ({ id }: { id: number }) => getSimulationOutput(id),

  getSimulationOutputs: async () => getSimulationOutputs(),

  createSimulationInput: async (args: any) => createSimulationInput(args),

  runSimulation: async ({ inputId }: { inputId: number }) => runSimulation(inputId),
};