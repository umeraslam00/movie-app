import { Client, Databases, Query } from 'react-native-appwrite';

const Database_ID= process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!
const Collection_ID= process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!

const client = new Client()
.setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
.setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)

const database = new Databases(client)

//track the searches made by a user.
export const updateSearchCount = async(query: string, movie: Movie) => {
    console.log('🟡 updateSearchCount called with:', query, movie)

    // Check if a record of that search already exists.
    // if a document is found, increament the SearchCount field.
    // if no document is found, create a new document in Appwrite and set the SearchCount field to 1.

    const result = await database.listDocuments(Database_ID, Collection_ID, [
        Query.equal('searchTerm', query),
    ])

    console.log(result)



}