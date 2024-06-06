// 1. Cover the following code with types

function addNumbers(a: number, b: number): number {
  return a + b;
}

function multiplyNumbers(a: number, b: number): number {
  return a * b;
}

function findLargest(numbers: number[]): number {
  let largest = -Infinity;

  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] > largest) {
      largest = numbers[i];
    }
  }

  return largest;
}

function getLetterCount(str: string): { [key: string]: number } {
  let letterCount: { [key: string]: number } = {};

  for (let i = 0; i < str.length; i++) {
    let letter = str[i].toLowerCase();
    if (letterCount[letter]) {
      letterCount[letter]++;
    } else {
      letterCount[letter] = 1;
    }
  }

  return letterCount;
}

const myNumber: number = 42;
const myString: string = "Hello, TypeScript!";
const myBoolean: boolean = true;
const myArray: number[] = [1, 2, 3, 4, 5];
const myObject: { name: string; age: number } = { name: "John Doe", age: 30 };

let myAny: number | string | { name: string; age: number } = 42;
myAny = "Hello, TypeScript!";
myAny = { name: "Jane Doe", age: 25 };

console.log(addNumbers(5, 3));
console.log(multiplyNumbers(4, 2));
console.log(findLargest([1, 5, 3, 9, 2]));
console.log(getLetterCount("Hello, TypeScript!"));
console.log(myNumber, myString, myBoolean, myArray, myObject, myAny);

/* ******************************************************************************************************************************** */

function linearSearch(array: number[], target: number): number;
function linearSearch(array: string[], target: string): number;
function linearSearch(
  array: (number | string)[],
  target: number | string
): number {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === target) {
      return i;
    }
  }
  return -1;
}

function binarySearch(array: number[], target: number): number;
function binarySearch(array: string[], target: string): number;
function binarySearch(
  array: (number | string)[],
  target: number | string
): number {

  array.sort((a, b) => (a < b ? -1 : 1));

  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (array[mid] === target) {
      return mid;
    } else if (array[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}

class TreeNode<T> {
  value: T;
  children: TreeNode<T>[];

  constructor(value: T) {
    this.value = value;
    this.children = [];
  }

  addChild(node: TreeNode<T>): void {
    this.children.push(node);
  }
}

function depthFirstSearch<T>(root: TreeNode<T>, target: T): TreeNode<T> | null {
  let stack: TreeNode<T>[] = [root];

  while (stack.length > 0) {
    let node = stack.pop();
    if (node === undefined) continue;
    if (node.value === target) {
      return node;
    }
    for (let i = node.children.length - 1; i >= 0; i--) {
      stack.push(node.children[i]);
    }
  }

  return null;
}

let root = new TreeNode(1);
let child1 = new TreeNode(2);
let child2 = new TreeNode(3);
let grandchild1 = new TreeNode(4);
let grandchild2 = new TreeNode(5);

const array1 = [1, 2, 3, 4, 5];
const array2 = ["a", "b", "c", "d"];
console.log(linearSearch(array1, 3));
console.log(linearSearch(array2, "c"));

const sortedArray1 = [1, 2, 3, 4, 5];
const sortedArray2 = ["a", "b", "c", "d"];
console.log(binarySearch(sortedArray1, 3));
console.log(binarySearch(sortedArray2, "c"));

root.addChild(child1);
root.addChild(child2);
child1.addChild(grandchild1);
child2.addChild(grandchild2);

console.log(depthFirstSearch(root, 5));

// 2. Cover the following code with types. Each class should implement an interface

interface BurgerInterface {
  patty: string;
  cheese: string;
  sauce: string;
  toppings: string[];
}

class BurgerBuilder {
  private burger: BurgerInterface;

  constructor() {
    this.burger = {} as BurgerInterface;
  }

  addPatty(type: string): this {
    this.burger.patty = type;
    return this;
  }

  addCheese(type: string): this {
    this.burger.cheese = type;
    return this;
  }

  addSauce(type: string): this {
    this.burger.sauce = type;
    return this;
  }

  addToppings(toppings: string[]): this {
    this.burger.toppings = toppings;
    return this;
  }

  build(): Burger {
    return new Burger(this.burger);
  }
}

class Burger implements BurgerInterface {
  public patty: string;
  public cheese: string;
  public sauce: string;
  public toppings: string[];

  constructor(burger: BurgerInterface) {
    this.patty = burger.patty;
    this.cheese = burger.cheese;
    this.sauce = burger.sauce;
    this.toppings = burger.toppings;
  }

  describe(): string {
    let description = `Burger with ${this.patty} patty, `;
    if (this.cheese) {
      description += `${this.cheese} cheese, `;
    }
    if (this.sauce) {
      description += `${this.sauce} sauce, `;
    }
    if (this.toppings) {
      description += `${this.toppings.join(", ")} toppings`;
    }
    return description;
  }
}

let burger = new BurgerBuilder()
  .addPatty("beef")
  .addCheese("cheddar")
  .addSauce("ketchup")
  .addToppings(["lettuce", "tomato"])
  .build();
console.log(burger.describe());

/* ******************************************************************************************************************************** */

interface PersonInterface {
  name: string;
  age: number;
  introduce(): void;
  celebrateBirthday(): void;
}

class Person implements PersonInterface {
  name: string;
  age: number;


  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  introduce() {
    console.log(`Hi, my name is ${this.name} and I'm ${this.age} years old.`);
  }

  celebrateBirthday() {
    this.age++;
    console.log(`Happy birthday, ${this.name}! You are now ${this.age} years old.`);
  }
}

const person: PersonInterface = new Person("Dumitru", 35);
person.introduce();
person.celebrateBirthday();

/* ******************************************************************************************************************************** */

interface BankAccountInterface {
  owner: string;
  balance: number;
  deposit(amount: number): void;
  withdraw(amount: number): void;
}

class BankAccount implements BankAccountInterface {
  owner: string;
  balance: number;

  constructor(owner: string, balance: number) {
    this.owner = owner;
    this.balance = balance;
  }

  deposit(amount: number) {
    this.balance += amount;
    console.log(`${amount} deposited. Current balance is ${this.balance}.`);
  }

  withdraw(amount: number) {
    if (amount > this.balance) {
      console.log(`Insufficient funds. Current balance is ${this.balance}.`);
    } else {
      this.balance -= amount;
      console.log(`${amount} withdrawn. Current balance is ${this.balance}.`);
    }
  }
}

const account: BankAccountInterface = new BankAccount("Dumitru", 350000);
account.deposit(200000);
account.withdraw(150000);

/* ******************************************************************************************************************************** */

interface ShapeInterface {
  area(): number;
  perimeter(): number;
}

class Rectangle implements ShapeInterface {
  width: number;
  height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  area(): number {
    return this.width * this.height;
  }

  perimeter(): number {
    return 2 * (this.width + this.height);
  }
}

const rect: ShapeInterface = new Rectangle(5, 10);
console.log(`Area: ${rect.area()}`);
console.log(`Perimeter: ${rect.perimeter()}`);

/* ******************************************************************************************************************************** */

interface TasksInterface {
  addTask(task: string): void;
  removeTask(task: string): void;
}

class TodoList implements TasksInterface {
  tasks: string[];

  constructor(task: string[]) {
    this.tasks = [];
  }

  addTask(task: string) {
    this.tasks.push(task);
    console.log(`Task "${task}" added. Total tasks: ${this.tasks.length}.`);
  }

  removeTask(task: string) {
    let index = this.tasks.indexOf(task);
    if (index === -1) {
      console.log(`Task "${task}" not found.`);
    } else {
      this.tasks.splice(index, 1);
      console.log(`Task "${task}" removed. Total tasks: ${this.tasks.length}.`);
    }
  }
}

const todoList: TasksInterface = new TodoList([]);
todoList.addTask("Buy milk");
todoList.addTask("Buy eggs");
todoList.addTask("Buy bread");
todoList.removeTask("Buy eggs");


/* ******************************************************************************************************************************** */

interface Book {
  id: number;
  title: string;
  author: string;
  publishedYear: number;
}

interface BookCollection {
  books: Book[];
  fetchData(): Promise<void>;
  logBooks(): void;
  findBookById(id: number): Book | undefined;
  addBook(book: Book): void;
  removeBookById(id: number): void;
}

class BookCollection implements BookCollection {
  books: Book[] = [];

  async fetchData(): Promise<void> {
    const response = await fetch('https://my-book-api.com/books');
    const data = await response.json();
    this.books = data.map((book: Book) => ({ id: book.id, title: book.title, author: book.author, publishedYear: book.publishedYear }));
  }

  logBooks() {
    console.log(this.books);
  }

  findBookById(id: number): Book | undefined {
    return this.books.find((book) => book.id === id);
  }

  addBook(book: Book) {
    this.books.push(book);
  }

  removeBookById(id: number) {
    this.books = this.books.filter((book) => book.id !== id);
  }
}