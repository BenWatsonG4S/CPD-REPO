import { SpeedType } from "./Speed"

export type Licence = {
    DriverName: string,
    DriverAge: number,
    DriverAddress: string,
    MaxSpeedPermission: SpeedType
}