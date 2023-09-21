// number类型

const a: number = 100
//string类型

const b: string = '你好'
//数组类型

const c: string[] = ['你好', 'world']

const d: Array<string> = ['你好', '世界']
//布尔类型

const e: boolean = true
//null和undefined类型

const f: null = null

const g: undefined = undefined
//object类型
const h: object = {
  name: 'mike',
  age: 18
}
//Symbol类型
const s1: symbol = Symbol('title')
const s2: symbol = Symbol('title')
const person: object = {
  [s1]: '程序员',
  [s2]: '老师'
}
// 函数类型
// 通常不需要写函数返回值类型,return的值会进行类型推断
function j(num1: number, num2: number): number {
  return num1 + num2
}
// 函数接收对象作为参数
function p(p: { x: number; y: number }) {
  console.log(p.x)
}
p({ x: 10, y: 10 })
//可选类型
function foo(p: { x: number; y: number; z?: number }) {
  console.log(p.x)
}
foo({ x: 10, y: 10 })
// any类型
//unknown类型，用于描述不确定的类型，在unknown类型的值上做任何事情都是不合法的
// void类型：通常用来指定一个函数没有返回值的，那么他的返回值类型就是void，不会强制函数一定不能返回内容
// never类型：永远不会发生的值的类型，当一个函数死循环或者异常时不会返回东西时可用
// 元组tuple类型,数组建议存放相同类型的元素，不同类型的元素推荐放在对象或元组中，在函数返回值中用的最多
const tInfo: [number, string] = [100, 'coder']
const tInfo2: (number | string)[] = [100, 'coder']
// 联合类型 number|string ,可以是其中的任一类型
// 拿到联合类型中的任一类型，可以进行类型缩小，以便调用这种类型的方法
function printId(id: number | string) {
  if (typeof id === 'string') {
    console.log(id.toUpperCase())
  } else {
    console.log(id)
  }
}
// 类型别名，例如：给对象类型取个别名
type Point = {
  x: number
  y: string
}
// 接口声明， 对象还有另一种声明方式是用接口来声明
interface Joint {
  x: number
  y: string
}
// 区别：如果定义非对象类型，推荐type，如果是对象类型，他们是有区别的
// interface可以重复对某个接口定义属性和方法，type定义的是别名，不能重复
// 交叉类型： 需要满足多个类型，在开发中通常对对象类型进行交叉
// 类型断言as
// 非空类型断言! 可以确定某个标识符是有值的，跳过检测
//字面量类型
//类型缩小type narrowing
//常见的类型保护有 typeof 平等缩小（===，！==），instanceof，in等等
// typescript的函数类型 (number1:number,number2:number) => void
//接收两个参数的函数，参数类型都是string，并且该函数是没有返回值的，所以是void
// 调用签名(call Signatures) , 函数类型表达式并不支持声明属性
// 如果我们想描述一个带有属性的函数，可以在对象类型中写一个调用签名
interface ICallFn {
  n: string
  (num1: number, num2: number): void
}
function fn(callFn: ICallFn) {
  console.log(callFn.n)
  callFn(10, 20)
}
// 构造签名，在调用签名的前面加一个new关键词
// 参数的可选类型是指定类型和undefined的联合类型
// 剩余参数(...arg:number[]),将不定数量的参数放入数组中
//ts面向对象，类的使用
class Person {
  name: string
  age: number
  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }
  running() {
    console.log(this.name)
  }
  eating() {
    console.log(this.age)
  }
}
// 类的继承
class Students extends Person {
  sno: number
  constructor(name: string, age: number, sno: number) {
    super(name, age)
    this.sno = sno
  }
  studying() {
    console.log(this.sno)
  }
}
// 类的成员修饰符:public,private,protected,默认public
// private:修饰仅在同一类可见，私有的属性和方法，protected:修饰仅在类自身和子类中可见，受保护的属性和方法
class Person1 {
  private name: string
  age: number
  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }
  running() {
    console.log(this.name)
  }
  eating() {
    console.log(this.age)
  }
}
class Person2 {
  protected name: string
  age: number
  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }
  running() {
    console.log(this.name)
  }
  eating() {
    console.log(this.age)
  }
}
// 只读属性readonly，只能读不能修改
//getter 和 setter，私有属性不能直接访问，所以要使用这两个
class Person3 {
  private _name: string
  set name(newName) {
    this._name = newName
  }
  get name() {
    return this._name
  }
  constructor(name: string) {
    this.name = name
  }
}
const p3 = new Person3('why')
p3.name = 'coder'
console.log(p3.name)
// 参数属性 语法糖写法
class Person4 {
  constructor(public name: string, private _age: number) {}
  set age(newAge) {
    this._age = newAge
  }
  get age() {
    return this._age
  }
}
// 类本身也可以作为一种数据类型
// 索引签名 有的时候，你不能提前知道一个类型里所有属性的名字，但你知道这些值的特征，这种情况下可以用索引签名来描述可能的值
interface ICollection {
  [index: number]: any
}
// 接口继承(支持多继承)
interface Person {
  name: string
  eating: () => void
}
interface Animal {
  running: () => void
}
interface Students extends Person, Animal {
  sno: number
}
// 接口的实现
interface ISwim {
  swimming: () => void
}
interface IRun {
  running: () => void
}
class Per implements ISwim, IRun {
  swimming() {
    console.log('swimming')
  }
  running() {
    console.log('running')
  }
}
// 严格字面量检测
interface IPerson {
  name: string
  eating: () => void
}
// const pp: IPerson = {
//   name: 'why',
//   age:18,
//   eating: function () {}
// } 报错
const obj = {
  name: 'why',
  age: 18,
  eating: function () {}
}
const pp: IPerson = obj
//typescript的枚举类型 ,常量可以是数字，字符串类型,枚举类型默认是有值的，如果给LEFT = 100，这时候会从100递增
// 当然，也可以赋字符串
enum Direction {
  LEFT = 0,
  RIGHT = 1,
  TOP = 2,
  BUTTOM = 3
}
// 泛型实现类型参数化,在函数中捕获到参数的类型，并同时使用它来作为返回值的类型
function func<T>(arg: T): T {
  return arg
}
// 可以传入多个类型
function funct<T, E>(a1: T, a2: E) {}
// 泛型接口
interface IFoo<T> {
  initialValue: T
  valueList: T[]
  handleValue: (value: T) => void
}
const fo: IFoo<number> = {
  initialValue: 0,
  valueList: [0, 1, 2],
  handleValue: (value) => {
    console.log(value)
  }
}
// 泛型类
class Point1<T> {
  x: T
  y: T
  constructor(x: T, y: T) {
    this.x = x
    this.y = y
  }
}
const i = new Point1(10, 20)
const i1 = new Point1<number>(10, 20)
const i2: Point1<number> = new Point1(10, 20)
// 泛型约束
interface ILength {
  length: number
}
function getLength<T extends ILength>(arg: T) {
  return arg.length
} //只要是拥有length属性的都可以作为参数类型（字符串，数组，或者对象等）
// declear声明模块，语法：declear module '模块名'{}
