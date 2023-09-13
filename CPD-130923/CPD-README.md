# CPD (Sept 13 2023)
 
1. Learn More TypeScript
2. Goover current project pages

## 1. Learn More TypeScript

### TypeScript Coding Standards ([Link To Source](https://dev.azure.com/Go4Schools/Development%20Training%20Portal/_wiki/wikis/Developer-Training-Portal.wiki/2953/TypeScript-Coding-standards-(Oct-2022)))

-  You can use either type or interface for your desired practice. Type is more suitible to define the shape of something.
-  Be explicit with `private` `protected` `readonly` keywords.

- Use Linting in visual studio by enabling it and installing the following packages:

    | Package | Github | Rules |
    |--|--|--|
    | [eslint-config-airbnb-base](https://www.npmjs.com/package/eslint-config-airbnb-base) | https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base/rules | https://airbnb.io/javascript/ |
    | [eslint-config-airbnb-typescript](https://www.npmjs.com/package/eslint-config-airbnb-typescript) | https://github.com/iamturns/eslint-config-airbnb-typescript/blob/master/lib/shared.js |  |
    | [@typescript-eslint/eslint-plugin](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin) | https://github.com/typescript-eslint/typescript-eslint | https://typescript-eslint.io/rules/ |

- Enabling Eslint:
  
    - Run ```npx eslint --init```

#### Go4Schools Coding Standards Ruleset

- Add all the rules from [Link to Source](https://dev.azure.com/Go4Schools/Development%20Training%20Portal/_wiki/wikis/Developer-Training-Portal.wiki/2953/TypeScript-Coding-standards-(Oct-2022)?anchor=go-4-schools-ruleset) to the ```.eslintrc.json``` file.


#### File Structure

- One thing per file:
  
  - Class
  - Type
  - Etc

#### In the Project Solution

- Grunt handles the Building and Minification
  
  - Conversion of TS -> JS

#### Add TypeScript support with NuGet

- Install the package [Microsoft.TypeScript.MSBuild](https://www.nuget.org/packages/Microsoft.TypeScript.MSBuild)

### TypeScript Handbook ([Link To Souce](https://dev.azure.com/Go4Schools/Development%20Training%20Portal/_wiki/wikis/Developer-Training-Portal.wiki/2953/TypeScript-Coding-standards-(Oct-2022)))

#### TypeScript for Java/C# Programmers

- Offers better code completion, detection of errors and clearer communication between parts of a program.
- TypeScript supports many common patterns such as implementing interfaces, inheritance, and static methods.

#### Classes in TS

- Using the `private` keyword to protect the name property from being set outside the class.

    ```ts
    class Greeter {
        private name: string = "world";
    
        constructor(otherName?: string) 
        {
            if (otherName !== undefined) 
            {
                this.name = otherName;
            }
        }
    }
    const g = new Greeter();
    // g.name = "not allowed"; # due to the protection level
    ```

- Constructors (Normal Signature)

    ```ts
    class Point {
        x: number;
        y: number;
        
        // Normal signature with defaults
        constructor(x = 0, y = 0) {
            this.x = x;
            this.y = y;
        }
    }
    ```

- Construct (Overload Signature)

    ```ts
    class Point {
        // Overloads
        constructor(x: number, y: string);
        constructor(s: string);
        constructor(xs: any, y?: any) {
        // TBD
        }
    }

    const item1: Point = new Point(1, "string1"); // valid signature
    const item2: Point = new Point("string2"); // valid signature
    ```

- Super Calls (Error)

    ```ts
    class Base {
        k = 4;
    }
    
    class Derived extends Base {
        constructor() {
            // Prints a wrong value in ES5; throws exception in ES6
            console.log(this.k);
            // 'super' must be called before accessing 'this' in the constructor of a derived class.
            super();
        }
    }
    ```

- Super Calls (Working)

    ```ts
    class Base {
        k = 4;
    }
    
    class Derived extends Base {
        constructor() {
            super();
            console.log(this.k);
        }
    }
    ```

- Methods
  
    ```ts
    class Point {
        x = 10;
        y = 10;
    
        scale(n: number): void {
        this.x *= n;
        this.y *= n;
        }
    }

    let item1: Point = new Point();
    console.log(`${item1.x}, ${item1.y}`) // output: 10, 10
    item1.scale(10)
    console.log(`${item1.x}, ${item1.y}`) // output: 100, 100
    ```

- Class Heritage and Interfaces

    - Classes that implement an interface incorrectly as seen below will be alterted with a syntax error.
    - In the example below, 'Ball' does not implement the 'ping' Property and instead implements pong, this causes a syntax error.
    <br><br>

    ```ts
    interface Pingable {
        ping(): void;
    }
    
    class Sonar implements Pingable {
        ping() {
        console.log("ping!");
        }
    }
    
    class Ball implements Pingable {
    //   Class 'Ball' incorrectly implements interface 'Pingable'.
    //   Property 'ping' is missing in type 'Ball' but required in type 'Pingable'.
        pong() {
        console.log("pong!");
        }
    }
    ```

- Class Extentions

    ```ts
    class Animal {
        move() {
        console.log("Moving along!");
        }
    }
    
    class Dog extends Animal {
        woof(times: number) {
        for (let i = 0; i < times; i++) {
            console.log("woof!");
        }
        }
    }
    
    const d = new Dog();
    // Base class method
    d.move();
    // Derived class method
    d.woof(3);

    // Output: 
    //    Moving along!
    //    woof!
    //    woof!
    //    woof!   
    ```

    - Dog extends the animal class, giving it functionality from the `move` function and extends it with the `woof` function.


- Overriding Methods in Classes

    ```ts
    class Base {
    greet() {
        console.log("Hello, world!");
    }
    }
    
    class Derived extends Base {
    greet(name?: string) {
        if (name === undefined) {
        super.greet();
        } else {
        console.log(`Hello, ${name.toUpperCase()}`);
        }
    }
    }
    
    const d = new Derived();
    d.greet();
    d.greet("reader");

    // Output:
    //  Hello, world!
    //  Hello, READER
    ```

    - By re-defining the `greet` method, in the subclass, the Derived class will always run this instead of the one inherited. To run the inherited method, you need to use the `super` object.

#### Member Visibility

-  There are 3 main tags you can apply to members of a class to add different levels of visibility to them and who is able to access them.

- PUBLIC:

    ```ts
    class Greeter {
    public greet() {  // You dont actually need to put 'public' as it is the default
        console.log("hi!");
    }
    }
    const g = new Greeter();
    g.greet();
    ```

- PROTECTED:

    ```ts
    class Greeter {
    public greet() {
        console.log("Hello, " + this.getName());
    }
    protected getName() {
        return "hi";
    }
    }
    
    class SpecialGreeter extends Greeter {
    public howdy() {
        // OK to access protected member here
        console.log("Howdy, " + this.getName());
    }
    }
    const g = new SpecialGreeter();
    g.greet(); // OK
    g.getName(); // THIS DOES NOT WORK 

    // Syntax Error:
    //  Property 'getName' is protected and only accessible within class 'Greeter' and its subclasses.

    ```

- PRIVATE:

    ```ts
    class Base {
    private x = 0;
    }
    class Derived extends Base {
    Class 'Derived' incorrectly extends base class 'Base'.
    Property 'x' is private in type 'Base' but not in type 'Derived'.
    x = 1; // THIS DOES NOT WORK
    }

    // Syntax Error:
    //  Class 'Derived' incorrectly extends base class 'Base'. 
    //  Property 'x' is private in type 'Base' but not in type 'Derived'.

    ```

- BREAKING PRIVATE:

    ```ts
    class MySafe {
    private secretKey = 12345;
    }
    
    const s = new MySafe();
    
    // Not allowed during type checking
    console.log(s.secretKey);
    // Syntax Error:  
    //  Property 'secretKey' is private and only accessible within class 'MySafe'.
    
    // OK
    console.log(s["secretKey"]);
    ```

    - Square brackets can be used to access this 'soft private' member.

- HARD PRIVATE:

    ```ts
    class Dog {
        #barkAmount = 0;
        personality = "happy";
    
        constructor() {}

        bark() {
            console.log(`Barking with an amount of ${this.#barkAmount}`)
        }
    }

    let dog1: Dog = new Dog();
    dog1.bark();
    // Output: 
    //  Barking with an amount of 0

    console.log(dog1["#barkAmount"])
    // Syntax Error:
    //  Element implicitly has an 'any' type because expression of type 
    //  '"#barkAmount"' can't be used to index type 'Dog'.
    //  Property '#barkAmount' does not exist on type 'Dog'.
    ```

    - The member `#barkAmount` is fully private to the `Dog` class.

#### Generic Classes

- Example 1:
  
    ```ts
    class Box<Type> {
        contents: Type;
        constructor(value: Type) {
        this.contents = value;
        console.log(this.contents);
        }
    }
    
    const a = new Box(true);
    const b = new Box("hello!");
    const c = new Box(12345);
    const d = new Box(["String1",1234,true,false,{"dictItem":123}])

    // Output:
    //  true
    //  hello!
    //  12345
    //  [ 'String1', 1234, true, false, { dictItem: 123 } ]
    ```

- This class accepts any type as its input with no syntax errors, dynamic like JS.

#### Arrow Functions

-  We use arrow functions when the values for `this` is lost in a certain context.

    ```ts
    class MyClass {
        name = "MyClass";
        getName = () => {
        return this.name;
        };
    }
    const c = new MyClass();
    const g = c.getName;
    // Prints "MyClass" instead of crashing
    console.log(g());
    ```

- The trade-offs are that. The `this` value is guaranteed to be correct at runtime.
- Will use more memory, each class instance will have its own copy of the function.
- You cant use `super.getName` in a derived class.

#### Parameter Properties

- TypeScript allows the constructor to turn its parameters directly into class properties with the same names and values.

- These are called parameter properties and are created by prefixing a constructor argument with a visibility modifier.

    ```ts
    class Params {
        constructor(
        public readonly x: number,
        protected y: number,
        private z: number
        ) {
        // No body necessary
        }
    }
    const a = new Params(1, 2, 3);
    console.log(a.x); // This Works
                
    console.log(a.z);
    // Syntax Error:
    //  Property 'z' is private and only accessible within class 'Params'.
    ```
