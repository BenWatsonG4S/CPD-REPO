import Driver from "./Driver"
import { SpeedType } from "./Speed"

export interface Car {
    carName: string,
    speedClass: SpeedType,
    driver: Driver

    drive(): void;
    park(): void;
    canDriveCarClass(): boolean;
}