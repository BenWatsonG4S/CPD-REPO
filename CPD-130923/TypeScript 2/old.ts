// interface SuperLicence {
//   name: string,
//   points: number,
//   uniqueId: number,
// }

// type SuperLicence2 = {
//   name: string,
//   points: number,
//   uniqueId: number,
// }

// abstract class Car {

//   private sL: SuperLicence;
//   private sL2: SuperLicence2;

//   constructor(public name: string, public colour: string, public speed: SpeedType){
//     this.sL = {name: this.name, points: 0, uniqueId: Date.now()}
//     this.sL2 = {name: this.name, points: 0, uniqueId: Date.now()}
//     }

//   drive(): void {
//     console.log("A " + this.colour + " " + this.name + " is driving " + SpeedType[this.speed]);
//   }

//   getLicence(): void {
//     console.log("The Licence for the following car has the following information:");
//     console.log("----------------------------------------------------------------");
//     console.log("ID: " + this.sL.uniqueId);
//     console.log("NAME: " + this.sL.name);
//     console.log("POINTS: " + this.sL.points);
//   }

//   getLicence2(): void {
//     console.log("The Licence for the following car has the following information:");
//     console.log("----------------------------------------------------------------");
//     console.log("ID: " + this.sL.uniqueId);
//     console.log("NAME: " + this.sL.name);
//     console.log("POINTS: " + this.sL.points);
//   }

// };

// class F1Car extends Car {
//   constructor(colourInput: string){
//     super("Formula One Car",colourInput,SpeedType.Superfast)
//   }
// }

// class RallyCar extends Car {
//   constructor(colourInput: string){
//     super("Rally Car",colourInput,SpeedType.Fast)
//   }
// }

// class GoKart extends Car {
//   constructor(colourInput: string){
//     super("Go Kart",colourInput,SpeedType.Slow)
//   }
// }

// class PeddleCar extends Car {
//   constructor(colourInput: string){
//     super("Peddle Car",colourInput,SpeedType.Superslow)
//   }
// }


// const newF1Car: Car = new F1Car("Red");
// const newRally: Car = new RallyCar("Green");
// const newGoKart: Car = new GoKart("Blue");
// const newPeddleCar: Car = new PeddleCar("Orange");

// newF1Car.drive();
// newF1Car.getLicence();
// newF1Car.getLicence2();
// // newRally.drive();
// // newGoKart.drive();
// // newPeddleCar.drive();