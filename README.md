# mongodb-typesafe-driver

Type-safe MongoDB driver for Node.js with improved developer experience using TypeScript.

## ✨ Features

- Fully type-safe operations for MongoDB collections
- Strongly typed `find`, `insert`, `update`, `aggregate`, etc.
- Inference for schemas and documents
- Minimal and dependency-free

## 📦 Installation

```bash
npm install mongodb-typesafe-driver
```

Requires mongodb v5 as a peer dependency:

```bash
npm install mongodb
```

# Why ?

MongoDb not support type safe, see details:

https://www.mongodb.com/docs/drivers/node/current/fundamentals/typescript/#type-safety-and-dot-notation

# Goal

To improve mongodb types to make queries type safe.<br />

Not use code, only types. <br />

![alt text](./images/ex1.png?raw=true)<br />
![alt text](./images/ex2.png?raw=true)<br />
![alt text](./images/ex3.png?raw=true)<br />
![alt text](./images/ex4.png?raw=true)<br />
![alt text](./images/ex5.png?raw=true)<br />
![alt text](./images/ex6.png?raw=true)<br />

# Support nested? Yes!

![alt text](./images/ex7.png?raw=true)<br />
![alt text](./images/ex8.png?raw=true)<br />

# How it use?

Just use Collection type from this repository instead original Collection mongodb type.

See examples.ts for details.
