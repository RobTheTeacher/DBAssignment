'use client'
import { searchPosts, SearchResultType } from "@/lib/supabase/queries"
import Link from "next/link"
import { SetStateAction, useState } from "react"

const Search = () => {
    const [input, setInput] = useState<string>('')
    const [searchResults, setSearchResults] = useState<SearchResultType | null>(null)

    const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
        setInput(e.target.value)
    }

    const handleClick = async () => {
        const { data, error } = await searchPosts(input)
        if (error) throw new Error
        setSearchResults(data)
    }

    return (
        <div className="relative">
            <div className="border-pacifika border">
                <input onChange={handleChange} placeholder="Search for posts" value={input} />
                <button onClick={handleClick}>Search</button>
            </div>
            {searchResults &&
                <div className="absolute left-0 top-full border-pacifika border p-2 w-full bg-ivory">
                    {searchResults.map((result, index) => 
                        <Link className="block" key={index} href={`/${result.slug}`}>{result.title}</Link>)
                    }
                </div>
            }
        </div>
    )
}

export default Search