const NUM_CHARGEPOINTS = 20;
const CHARGING_POWER_KW = 11;
const TIME_INTERVALS = 35040;

const ARRIVAL_PROBABILITIES = {
    0: 0.0094, 1: 0.0094, 2: 0.0094, 3: 0.0094, 4: 0.0094, 5: 0.0094, 6: 0.0094,
    7: 0.0094, 8: 0.0283, 9: 0.0283, 10: 0.0566, 11: 0.0566, 12: 0.0566, 13: 0.0755,
    14: 0.0755, 15: 0.0755, 16: 0.1038, 17: 0.1038, 18: 0.1038, 19: 0.0472,
    20: 0.0472, 21: 0.0472, 22: 0.0094, 23: 0.0094
};

const CHARGING_DEMANDS = [
    { km: 0, prob: 34.31 }, { km: 5, prob: 4.90 }, { km: 10, prob: 9.80 },
    { km: 20, prob: 11.76 }, { km: 30, prob: 8.82 }, { km: 50, prob: 11.76 },
    { km: 100, prob: 10.78 }, { km: 200, prob: 4.90 }, { km: 300, prob: 2.94 }
];


function getRandomEV() {
    const hour = Math.floor(Math.random() * 24);
    if (Math.random() < ARRIVAL_PROBABILITIES[hour]) {
        let rand = Math.random();
        let cumulative = 0;
        for (const demand of CHARGING_DEMANDS) {
            cumulative += demand.prob;
            if (rand < cumulative) {
                const energyNeeded = (demand.km / 100) * 18;
                const chargeTime = Math.ceil((energyNeeded / CHARGING_POWER_KW) * 60 / 5);
                return { energyNeeded, chargeTime };
            }
        }
    }
    return null;
}

function normalizeProbabilities(probabilities) {
    const sum = Object.values(probabilities).reduce((a, b) => a + b, 0);
    Object.keys(probabilities).forEach(key => {
        probabilities[key] /= sum;
    });
}

function init() {
    normalizeProbabilities(ARRIVAL_PROBABILITIES);
    const totalDemandProb = CHARGING_DEMANDS.reduce((sum, d) => sum + d.prob, 0);
    CHARGING_DEMANDS.forEach(d => d.prob /= totalDemandProb);
    
    let totalEnergyConsumed = 0;
    let maxPowerDemand = 0;
    let chargingStations = new Array(NUM_CHARGEPOINTS).fill(null);
    
    for (let t = 0; t < TIME_INTERVALS; t++) {
        chargingStations = chargingStations.map(station => (station && station.endTime > t) ? station : null);
        const newEV = getRandomEV();
        if (newEV) {
            for (let i = 0; i < NUM_CHARGEPOINTS; i++) {
                if (!chargingStations[i]) {
                    chargingStations[i] = { endTime: t + newEV.chargeTime, power: CHARGING_POWER_KW };
                    totalEnergyConsumed += newEV.energyNeeded;
                    break;
                }
            }
        }
        
        const currentPower = chargingStations.reduce((sum, station) => station ? sum + station.power : sum, 0);
        maxPowerDemand = Math.max(maxPowerDemand, currentPower);
    }
    
    const theoreticalMaxPower = NUM_CHARGEPOINTS * CHARGING_POWER_KW;
    const concurrencyFactor = maxPowerDemand / theoreticalMaxPower;
    
    console.log(`Total energy consumed: ${totalEnergyConsumed.toFixed(2)} kWh`);
    console.log(`Theoretical max power demand: ${theoreticalMaxPower} kW`);
    console.log(`Actual max power demand: ${maxPowerDemand} kW`);
    console.log(`Concurrency factor: ${(concurrencyFactor * 100).toFixed(2)}%`);    
}

init();