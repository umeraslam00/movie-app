import { Client, Databases, ID, Query } from 'react-native-appwrite';

const Database_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!
const Collection_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!

const client = new Client()
    .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)

const database = new Databases(client)

//track the searches made by a user.
export const updateSearchCount = async (query: string, movie: Movie) => {

    // Check if a record of that search already exists.
    // if a document is found, increament the SearchCount field.
    // if no document is found, create a new document in Appwrite and set the SearchCount field to 1.

    try {
        const result = await database.listDocuments(Database_ID, Collection_ID, [
            Query.equal('searchTerm', query),
        ])

        if (result.documents.length > 0) {
            const existingMovie = result.documents[0];

            await database.updateDocument(Database_ID, Collection_ID, existingMovie.$id, {
                count: existingMovie.count + 1
            })
        } else {
            await database.createDocument(Database_ID, Collection_ID, ID.unique(), {
                title: movie.title,
                searchTerm: query,
                movie_id: movie.id,
                count: 1,
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            })

        }

    } catch(error) {
        console.log(error)
        throw error
    }



}

export const getTrendingMovies = async (): Promise<TrendingMovie[] | undefined> => {
    try {
        const result = await database.listDocuments(Database_ID, Collection_ID, [
            Query.limit(5),
            Query.orderDesc('count')
        ])

        return result.documents as unknown as TrendingMovie[]
        
    } catch (error) {
        console.log(error)
        return undefined
    }
}