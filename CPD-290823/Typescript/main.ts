export {}

class Employee {

    employeeName: string;

    constructor(name: string) {
        this.employeeName = name;
    }

    greet() {
        console.log(`Good Morning ${this.employeeName}`);
    }
}

class Manager extends Employee {
    constructor(managerName: string){
        super(managerName); // passes to the super class
    }
    delegateWork() {
        console.log(`Manager delegating tasks`);
    }
}

let m1 = new Manager('Bruce')
m1.greet();
m1.delegateWork()

// outputs:
//
// Good Morning Bruce
// Manager delegating tasks