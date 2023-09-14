"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Driver_1 = require("./Driver");
var Speed_1 = require("./Speed");
var F1Car = /** @class */ (function () {
    function F1Car(carName, driver) {
        this.carName = carName;
        this.driver = driver;
        this.speedClass = Speed_1.SpeedType.Superfast;
    }
    F1Car.prototype.drive = function () {
        if (this.canDriveCarClass()) {
            console.log("Driver: " + this.driver.driversLicence.DriverName + " is driving the " + this.carName);
        }
        else {
            console.log("Driver: " + this.driver.driversLicence.DriverName + " cannot drive the " + this.carName +
                " as they are not classified to drive this speed type of '" + Speed_1.SpeedType[this.speedClass] + "'");
        }
    };
    F1Car.prototype.park = function () {
        if (this.canDriveCarClass()) {
            console.log("Driver: " + this.driver.driversLicence.DriverName + " is parking the " + this.carName);
        }
        else {
            console.log("Driver: " + this.driver.driversLicence.DriverName + " cannot park the " + this.carName +
                " as they are not classified to drive this speed type of '" + Speed_1.SpeedType[this.speedClass] + "'");
        }
    };
    F1Car.prototype.canDriveCarClass = function () {
        if (this.driver.driversLicence.MaxSpeedPermission <= this.speedClass) {
            return true;
        }
        else {
            return false;
        }
    };
    return F1Car;
}());
console.log();
var driver1 = new Driver_1.default("Lewis Hamilton", 38, "Monaco");
driver1.showLicence();
console.log();
var oldMan = new Driver_1.default("John Smith", 86, "Oxford");
oldMan.showLicence();
console.log();
var f1Car1 = new F1Car("W13", driver1);
f1Car1.drive();
f1Car1.park();
console.log();
var f1Car2 = new F1Car("W13", oldMan);
f1Car2.drive();
f1Car2.park();
