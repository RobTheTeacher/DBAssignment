import HomePosts from "@/components/HomePosts";
import { getHomePosts } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/serverClient";

export const revalidate = 600;
export default async function Home() {
  const supabase = await createClient()
  const { data, error } = await getHomePosts(supabase)
  return (
    <div className="m-4">
      <h1 className="heading">Welcome to Robbit!</h1>
      {data && <HomePosts posts={data} />}
    </div>
  )
}