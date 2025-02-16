export interface SimulationInputData {
    chargePoints: number;
    arrivalProbabilityMultiplier?: number;
    carConsumption?: number;
    chargePowerPerPoint?: number;
  }
  
  export interface SimulationOutputData {
    totalEnergyCharged: number;
    chargingEvents: object;
    chargingValuesPerPoint: object;
    exemplaryDay: object;
  }
  