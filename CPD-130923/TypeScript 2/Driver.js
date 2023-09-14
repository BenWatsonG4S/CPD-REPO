"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Speed_1 = require("./Speed");
var Driver = /** @class */ (function () {
    function Driver(driverName, driverAge, driverAddress) {
        this.driverName = driverName;
        this.driverAge = driverAge;
        this.driverAddress = driverAddress;
        var classifiedSpeed;
        if (driverAge < 16) {
            classifiedSpeed = Speed_1.SpeedType.Superslow;
        }
        else if (driverAge >= 16 && driverAge < 18) {
            classifiedSpeed = Speed_1.SpeedType.Slow;
        }
        else if (driverAge >= 18 && driverAge < 20) {
            classifiedSpeed = Speed_1.SpeedType.Fast;
        }
        else if (driverAge >= 20 && driverAge < 40) {
            classifiedSpeed = Speed_1.SpeedType.Superfast;
        }
        else if (driverAge >= 40 && driverAge < 60) {
            classifiedSpeed = Speed_1.SpeedType.Fast;
        }
        else if (driverAge >= 60 && driverAge < 80) {
            classifiedSpeed = Speed_1.SpeedType.Slow;
        }
        else {
            classifiedSpeed = Speed_1.SpeedType.Superslow;
        }
        this.driversLicence = { DriverName: driverName, DriverAge: driverAge, DriverAddress: driverAddress, MaxSpeedPermission: classifiedSpeed };
    }
    Driver.prototype.showLicence = function () {
        console.log("Drivers Licence for: " + this.driversLicence.DriverName);
        console.log();
        console.log("Age: " + this.driversLicence.DriverAge);
        console.log("Address: " + this.driverAddress);
        console.log("Max Permitted Speed: " + Speed_1.SpeedType[this.driversLicence.MaxSpeedPermission]);
    };
    return Driver;
}());
exports.default = Driver;
