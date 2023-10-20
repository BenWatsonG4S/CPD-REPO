import { SpeedType } from "./Speed"
import { Licence } from "./Licence"

export default class Driver{

    public driversLicence: Licence

    constructor(private driverName: string, private driverAge: number, private driverAddress: string){

        let classifiedSpeed: SpeedType;

        if (driverAge < 16){
            classifiedSpeed = SpeedType.Superslow;
        }
        else if (driverAge >= 16 && driverAge < 18){
            classifiedSpeed = SpeedType.Slow;
        }
        else if (driverAge >= 18 && driverAge < 20){
            classifiedSpeed = SpeedType.Fast;
        }
        else if (driverAge >= 20 && driverAge < 40){
            classifiedSpeed = SpeedType.Superfast;
        }
        else if (driverAge >= 40 && driverAge < 60){
            classifiedSpeed = SpeedType.Fast;
        }
        else if (driverAge >= 60 && driverAge < 80){
            classifiedSpeed = SpeedType.Slow;
        }
        else {
            classifiedSpeed = SpeedType.Superslow;
        }
        
        this.driversLicence = {DriverName: driverName, DriverAge: driverAge, DriverAddress: driverAddress, MaxSpeedPermission: classifiedSpeed};
    }

    showLicence(): void {
        console.log("Drivers Licence for: "+this.driversLicence.DriverName);
        console.log()
        console.log("Age: "+this.driversLicence.DriverAge);
        console.log("Address: "+this.driverAddress);
        console.log("Max Permitted Speed: "+SpeedType[this.driversLicence.MaxSpeedPermission]);
    }
}