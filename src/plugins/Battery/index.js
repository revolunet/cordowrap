
export default class Battery {
    constructor(cordoWrap) {
        this.level = null;
        if (cordoWrap.isCordova) {
            window.addEventListener("batterystatus", this.onBatteryStatus, false);
            window.addEventListener("batterycritical", this.onBatteryCritical, false);
            window.addEventListener("batterylow", this.onBatteryLow, false);
        }
    }
    onBatteryStatus(info) {
        this.level = info.level;
        console.Log('Battery.STATUS', arguments);
    }
    onBatteryCritical(info) {
        console.Log('Battery.CRITICAL', arguments);
    }
    onBatteryLow(info) {
        console.Log('Battery.LOW', arguments);
    }
}
