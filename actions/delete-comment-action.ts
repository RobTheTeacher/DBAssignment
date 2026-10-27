'use server'

import { createClient } from "@/lib/supabase/serverClient"
import { revalidatePath } from "next/cache"

export const DeleteCommentAction = async(commentId: string) => {
    const supabase = await createClient()

    const {data, error} = await supabase.from("Comments").delete().eq("id", commentId)

    revalidatePath("/")
}