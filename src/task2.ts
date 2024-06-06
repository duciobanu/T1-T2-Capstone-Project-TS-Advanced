// 1. Create an enum that would fit as argument for the given function:

enum AnimalType {
  Dog = 0,
  Cat = 1,
  Bird = 2,
  Fish = 3,
}
function makeAnimalSound(type: AnimalType) {
  switch (type) {
    case 0:
      console.log('Woof!');
      break;
    case 1:
      console.log('Meow!');
      break;
    case 2:
      console.log('Chirp!');
      break;
    case 3:
      console.log('Blub!');
      break;
    default:
      console.log('Unknown animal type');
      break;
  }
}

makeAnimalSound(AnimalType.Cat);
makeAnimalSound(AnimalType.Dog);
makeAnimalSound(AnimalType.Bird);
makeAnimalSound(AnimalType.Fish);

// 2. Add a type that would cover the structure of the given object:
type Pet = {
  name: string;
  age: number;
  type: AnimalType;
}
function getPetDescription(pet: Pet) {
  const animal = AnimalType[pet.type];
  return `${pet.name} is a ${animal.toLowerCase()} that is ${pet.age} years old.`;
}

const myPet = {
  name: 'Fluffy',
  age: 5,
  type: AnimalType.Cat,
};

console.log(getPetDescription(myPet));

// 3. Add an interface that would cover the structure of the given object(reuse the type from the previous task):
interface PetOwner {
  name: string;
  age: number;
  pets: Pet[];
}
function getPetOwnerDescription(owner: PetOwner) {
  const pets = owner.pets.map((pet) => {
    const animal = AnimalType[pet.type];
    return `${pet.name} the ${animal.toLowerCase()}`;
  });
  return `${owner.name} is ${owner.age} years old and has ${pets.length} pets: ${pets.join(' and ')}.`;
}

const myPetOwner = {
  name: 'John Doe',
  age: 30,
  pets: [
    {
      name: 'Fluffy',
      age: 5,
      type: AnimalType.Cat,
    },
    {
      name: 'Spot',
      age: 3,
      type: AnimalType.Dog,
    },
  ],
};

console.log(getPetOwnerDescription(myPetOwner));

// 4. Create a generic function that would make the following code compile:
function mapPetNames<T extends { name: string }>(pets: T[]): string[] {
  return pets.map((pet) => pet.name);
}
const myPets = [
  { name: 'Max', age: 3, type: AnimalType.Dog },
  { name: 'Fluffy', age: 1, type: AnimalType.Cat },
  { name: 'Tweety', age: 2, type: AnimalType.Bird },
];

const petNames = mapPetNames(myPets);
console.log(petNames); // ['Max', 'Fluffy', 'Tweety']
/* ******************************************************************************************************************************** */
function print<T>(arg: T) {
  console.log(arg);
}

print('hello');
print(42);
print(true);
/* ******************************************************************************************************************************** */
function firstElement<T>(arr: T[]) {
  return arr[0];
}

const numbers = [1, 2, 3, 4, 5];
const firstNumber = firstElement(numbers); // firstNumber is of type number
console.log(firstNumber)

const strings = ['apple', 'banana', 'orange'];
const firstString = firstElement(strings); // firstString is of type string
console.log(firstString)
/* ******************************************************************************************************************************** */
interface Pair<T, U> {
  first: T;
  second: U;
}

function createPair<T, U>(first: T, second: U): Pair<T, U> {
  return { first, second };
}

let pair1 = createPair('one', 1);
console.log(pair1);
let pair2 = createPair(() => { }, []);
console.log(pair2);
let pair3 = createPair(true, { x: 1 });
console.log(pair3);

// 5. Create a decorator '@log' that would print given message:
function log(target: any, name: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(`Calling ${name} with arguments: [${args.join(', ')}]`);
    const result = originalMethod.apply(this, args);
    console.log(`Result: ${result}`);
    return result;
  };

  return descriptor;
}

class MyClass {
  @log
  myMethod(arg1: number, arg2: number): number {
    return arg1 + arg2;
  }
}

const myObj = new MyClass();
myObj.myMethod(2, 3);
// Result:
// Calling myMethod with arguments: [2, 3]
// Result: 5


// 6. Create a mixin that will add the ability to play, pause, and stop a video, as well as to show its duration and current playback time.
/*
  -Create a TypeScript mixin named Playable that will add the functionality to a video class:
    -duration
    -currentTime
    -play()
    -pause()
    -stop()
    -getDuration()
    -getCurrentTime()
  -Create instances of each video class and test their Playable functionality by calling the methods and displaying their properties.
  */

type Constructor<T = {}> = new (...args: any[]) => T;

function Playable<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    duration: number = 0;
    currentTime: number = 0;
    title: any;

    play() {
      console.log(`Playing ${this.title}`);
    }

    pause() {
      console.log(`Paused ${this.title}`);
    }

    stop() {
      console.log(`Stopped ${this.title}`);
      this.currentTime = 0;
    }

    getDuration() {
      return this.duration;
    }

    getCurrentTime() {
      return this.currentTime;
    }
  };
}

class RegularVideo {
  title: string;
  url: string;

  constructor(title: string, url: string) {
    this.title = title;
    this.url = url;
  }
}

class PremiumVideo {
  title: string;
  url: string;

  constructor(title: string, url: string) {
    this.title = title;
    this.url = url;
  }
}

class LiveVideo {
  title: string;
  url: string;

  constructor(title: string, url: string) {
    this.title = title;
    this.url = url;
  }
}

const PlayableRegularVideo = Playable(RegularVideo);
const PlayablePremiumVideo = Playable(PremiumVideo);
const PlayableLiveVideo = Playable(LiveVideo);

const regularVideo = new PlayableRegularVideo('Regular Video', 'http://example.com/regular');
const premiumVideo = new PlayablePremiumVideo('Premium Video', 'http://example.com/premium');
const liveVideo = new PlayableLiveVideo('Live Video', 'http://example.com/live');

regularVideo.duration = 120;
regularVideo.play();
regularVideo.pause();
regularVideo.stop();
console.log(`Duration: ${regularVideo.getDuration()} seconds`);
console.log(`Current Time: ${regularVideo.getCurrentTime()} seconds`);

premiumVideo.duration = 240;
premiumVideo.play();
premiumVideo.pause();
premiumVideo.stop();
console.log(`Duration: ${premiumVideo.getDuration()} seconds`);
console.log(`Current Time: ${premiumVideo.getCurrentTime()} seconds`);

liveVideo.duration = 360;
liveVideo.play();
liveVideo.pause();
liveVideo.stop();
console.log(`Duration: ${liveVideo.getDuration()} seconds`);
console.log(`Current Time: ${liveVideo.getCurrentTime()} seconds`);

// 7. Apply typescript utility types to the given type:
/*
    -Create a new type from the given one
        -where all the properties are optional
        -where all the properties are required
        -where all the properties are readonly
        -with only properties specified: name, age, isStudent, hobbies
        -with the specified properties omited: job, phoneNumbers, birthday
        -union type where values are given type's keys
    -
  */
type MyType = {
	name: string,
	age: number,
	isStudent: boolean,
	hobbies: string[],
	address: {
		street: string,
		city: string,
		country: string,
	},
	email?: string,
	job?: {
		title: string,
		company: string,
		salary: number,
	},
	phoneNumbers: Map<string, string>,
	birthday: Date,
};

type MyTypeOptional = Partial<MyType>;
type MyTypeRequired = Required<MyType>;
type MyTypeReadonly = Readonly<MyType>;
type MyTypePick = Pick<MyType, 'name' | 'age' | 'isStudent' | 'hobbies'>;
type MyTypeOmit = Omit<MyType, 'job' | 'phoneNumbers' | 'birthday'>;
type MyTypeKeys = keyof MyType;


