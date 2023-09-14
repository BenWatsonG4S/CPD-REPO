import Driver from './Driver';
import { Car } from './Car';
import { SpeedType } from './Speed';

class F1Car implements Car {

    public speedClass: SpeedType = SpeedType.Superfast;

    constructor(public carName: string, public driver: Driver){
    }
    drive(): void {
        if (this.canDriveCarClass()){
            console.log("Driver: "+this.driver.driversLicence.DriverName + " is driving the " + this.carName)
        }
        else {
            console.log("Driver: "+this.driver.driversLicence.DriverName + " cannot drive the " + this.carName + 
            " as they are not classified to drive this speed type of '"+ SpeedType[this.speedClass] + "'");
        }
    }
    park(): void {
        if (this.canDriveCarClass()){
            console.log("Driver: "+this.driver.driversLicence.DriverName + " is parking the " + this.carName)
        }
        else {
            console.log("Driver: "+this.driver.driversLicence.DriverName + " cannot park the " + this.carName + 
            " as they are not classified to drive this speed type of '"+ SpeedType[this.speedClass] + "'");
        }
    }
    canDriveCarClass(): boolean {
        if (this.driver.driversLicence.MaxSpeedPermission <= this.speedClass) {
            return true
        }
        else {
            return false
        }
    }
}


let driver1: Driver = new Driver("Lewis Hamilton",38,"Monaco");
driver1.showLicence();

let oldMan: Driver = new Driver("John Smith",86,"Oxford");
oldMan.showLicence();

let f1Car1 = new F1Car("W13",driver1);
f1Car1.drive();
f1Car1.park();

let f1Car2 = new F1Car("W13", oldMan);
f1Car2.drive();
f1Car2.park();
