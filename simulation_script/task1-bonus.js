/*
    The concurrency factor keeps decreasing when a new charging point is added.
    Since the concurrency factor is best when it is between 35-55%:
    After running multiple times, 6-10 charging point is suitable.

    Also for the bonus problem: MINUTES_PER_TICK can be adjusted in the code.
*/

const CHARGING_POWER_KW = 11;
const MINUTES_PER_TICK = 15;

const ARRIVAL_PROBABILITIES = {
    0: 0.0094, 1: 0.0094, 2: 0.0094, 3: 0.0094, 4: 0.0094, 5: 0.0094, 6: 0.0094,
    7: 0.0094, 8: 0.0283, 9: 0.0283, 10: 0.0566, 11: 0.0566, 12: 0.0566,
    13: 0.0755, 14: 0.0755, 15: 0.0755, 16: 0.1038, 17: 0.1038, 18: 0.1038,
    19: 0.0472, 20: 0.0472, 21: 0.0472, 22: 0.0094, 23: 0.0094
};

const CHARGING_DEMANDS = [
    { km: 0, prob: 0.3431 }, { km: 5, prob: 0.0490 }, { km: 10, prob: 0.0980 },
    { km: 20, prob: 0.1176 }, { km: 30, prob: 0.0882 }, { km: 50, prob: 0.1176 },
    { km: 100, prob: 0.1078 }, { km: 200, prob: 0.0490 }, { km: 300, prob: 0.0294 }
];

function getRandomEV(hour) {
    if (Math.random() < ARRIVAL_PROBABILITIES[hour]) {
        const rand = Math.random();
        let cumulative = 0;
        for (const demand of CHARGING_DEMANDS) {
            cumulative += demand.prob;
            if (rand < cumulative) {
                const energyNeeded = (demand.km / 100) * 18;
                const chargeTime = Math.ceil((energyNeeded / CHARGING_POWER_KW) * 60 / MINUTES_PER_TICK);
                return { energyNeeded, chargeTime };
            }
        }
    }
    return null;
}

function init() {

    for (let chargePoints = 1; chargePoints <= 30; chargePoints++) {
        let totalEnergyConsumed = 0;
        let maxPowerDemand = 0;
        let chargingStations = new Array(chargePoints).fill(null);
    
        for (let t = 0; t < 24 * (60 / MINUTES_PER_TICK); t++) {
            const hour = Math.floor(t / (60 / MINUTES_PER_TICK));
            chargingStations = chargingStations.map(station => (station && station.endTime > t) ? station : null);
            const newEV = getRandomEV(hour);
            if (newEV) {
                for (let i = 0; i < chargePoints; i++) {
                    if (!chargingStations[i]) {
                        chargingStations[i] = { endTime: t + newEV.chargeTime, power: CHARGING_POWER_KW };
                        totalEnergyConsumed += newEV.energyNeeded;
                        break;
                    }
                }
            }
            const currentPower = chargingStations.reduce((sum, station) => sum + (station ? station.power : 0), 0);
            maxPowerDemand = Math.max(maxPowerDemand, currentPower);
        }
    
        const theoreticalMaxPower = chargePoints * CHARGING_POWER_KW;
        const concurrencyFactor = maxPowerDemand / theoreticalMaxPower;
    
        console.log(`Charge Points: ${chargePoints}, Concurrency Factor: ${(concurrencyFactor * 100).toFixed(2)}%`);
    }
}
 
init();
