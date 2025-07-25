import { MongoClient, Db } from 'mongodb';
import { Collection, getCollection } from '../src'; // путь к твоему модулю

// Определяем интерфейс для сущности в коллекции
interface User {
    _id: string;
    name: string;
    age: number;
}

async function main() {
    const client = new MongoClient('mongodb://localhost:27017');
    await client.connect();

    const db: Db = client.db('testdb');

    const usersCollection: Collection<User> = getCollection<User, 'users', Db>(db, 'users');

    await usersCollection.insertOne({ _id: '1', name: 'Alice', age: 30 });

    const user = await usersCollection.findOne({ name: 'Alice' });
    console.log(user);

    await client.close();
}

main().catch(console.error);
