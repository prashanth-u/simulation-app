-- CreateTable
CREATE TABLE "SimulationInput" (
    "id" SERIAL NOT NULL,
    "chargePoints" INTEGER NOT NULL,
    "arrivalProbabilityMultiplier" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    "carConsumption" DOUBLE PRECISION NOT NULL DEFAULT 18.0,
    "chargePowerPerPoint" DOUBLE PRECISION NOT NULL DEFAULT 11.0,
    "arrivingCars" INTEGER NOT NULL,

    CONSTRAINT "SimulationInput_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SimulationOutput" (
    "id" SERIAL NOT NULL,
    "simulationInputId" INTEGER NOT NULL,
    "totalEnergyCharged" DOUBLE PRECISION NOT NULL,
    "chargingEvents" JSONB NOT NULL,
    "chargingValuesPerPoint" JSONB NOT NULL,
    "exemplaryDay" JSONB NOT NULL,

    CONSTRAINT "SimulationOutput_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SimulationOutput_simulationInputId_key" ON "SimulationOutput"("simulationInputId");

-- AddForeignKey
ALTER TABLE "SimulationOutput" ADD CONSTRAINT "SimulationOutput_simulationInputId_fkey" FOREIGN KEY ("simulationInputId") REFERENCES "SimulationInput"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
