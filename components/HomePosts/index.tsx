'use client'
import { HomePostType } from "@/lib/supabase/queries";
import Link from "next/link";

const HomePosts = ({ posts }: { posts: HomePostType }) => {
    return (
        <div>
            {posts.map(post =>
                <Link key={post.id} className="block rounded-2xl mb-4 border border-sushi p-4 flex" href={`/${post.slug}`}>
                    {post.image && <img className="" src={post.image} alt={post.title} />}
                    <h3 className="font-bold text-2xl">{post.title}</h3>
                    <p className="text-right">posted by {post.author.username}</p>
                </Link>)}
        </div>
    )
}

export default HomePosts