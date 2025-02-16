import prisma from "../../config/prisma";
import { SimulationInputData } from "./simulation.model";

export const createSimulationInput = async (data: SimulationInputData) => {
  return prisma.simulationInput.create({ data });
};

export const getSimulationInput = async (id: number) => {
  return prisma.simulationInput.findUnique({
    where: { id },
    include: { simulationResult: true },
  });
};

export const getSimulationOutputs = async () => {
  return prisma.simulationOutput.findMany();
};

export const runSimulation = async (inputId: number) => {
  const input = await prisma.simulationInput.findUnique({ where: { id: Number(inputId) } });
  if (!input) throw new Error("Simulation input not found!");

  // MOCK LOGIC
  // This is the total energy charged simulation
  const totalEnergyCharged = input.chargePoints * input.chargePowerPerPoint * Math.random() * 2;
  // number of charging events over different time periods.
  const chargingEvents = { year: 5000, month: 400, week: 100, day: 20 };
  const chargingValuesPerPoint = Array.from({ length: input.chargePoints }, (_, i) => ({
    [`chargepoint_${i + 1}`]: Math.random() * 15,
  }));
  // Here we are simulating hourly charging values for a single day
  const exemplaryDay = Array.from({ length: 24 }, (_, i) => ({ [`hour_${i}`]: Math.random() * 50 }));

  return prisma.simulationOutput.create({
    data: {
      simulationInputId: Number(inputId),
      totalEnergyCharged,
      chargingEvents,
      chargingValuesPerPoint,
      exemplaryDay,
    },
  });
};
