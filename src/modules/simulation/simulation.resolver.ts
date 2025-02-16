import { createSimulationInput, getSimulationInput, getSimulationOutputs, runSimulation } from "./simulation.service";

export const simulationResolver = {
  getSimulationInput: async ({ id }: { id: number }) => getSimulationInput(id),

  getSimulationOutputs: async () => getSimulationOutputs(),

  createSimulationInput: async (args: any) => createSimulationInput(args),

  runSimulation: async ({ inputId }: { inputId: number }) => runSimulation(inputId),
};
