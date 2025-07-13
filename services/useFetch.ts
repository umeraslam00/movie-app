import { useEffect, useState } from "react"

//The <T> in your useFetch hook is a TypeScript generic. It allows your custom hook to be flexible and work with any type of data that the fetchFunction returns.

const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
    const [data, setData] = useState<T | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)

    const fetchData = async () => {

        try {
            setLoading(true)
            setError(null)

            const result = await fetchFunction()
            setData(result)

        } catch (err) {
            setError(err instanceof Error ? err : new Error('an error occured'))
        } finally {
            setLoading(false)
        }
    }

    const reset = () => {
        setData(null)
        setError(null)
        setLoading(false)
    }

    useEffect(() => {
        if(autoFetch) {
            fetchData()
        }
    }, [])

    return { data, loading, error, fetchData, reset }
}

export default useFetch




