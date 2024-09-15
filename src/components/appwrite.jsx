import { Client, Account } from "appwrite";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('66e14a8f0032ab8396df');

const account = new Account(client);

export { account, client };