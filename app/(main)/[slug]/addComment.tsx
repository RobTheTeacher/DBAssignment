'use client'

import { AddCommentAction } from "@/actions/add-comment-action"
import { commentSchema } from "@/actions/schemas"
import ErrorMessage from "@/components/ErrorMessage"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

const AddComment = ({postId}: {postId: string}) => {
    const {register, handleSubmit, reset, formState:{errors}} = useForm({
        resolver: zodResolver(commentSchema)
    })

    const {mutate, error} = useMutation({
        mutationFn: AddCommentAction,
        onSuccess: () => reset(),
        onSettled: () => toast("Added comment")
    })

    return (
        <form onSubmit={handleSubmit(values => 
        mutate({commentdata: {content: values.content}, postId})
        )} className="border-sushi border p-4 rounded-2xl mt-8 max-w-md m-auto">
            <label htmlFor="content"></label>
            <textarea className="w-full" {...register("content")} placeholder="Add your comment..." />
            {errors.content && <ErrorMessage error={errors.content.message!} />}
            <button className="button-secondary">Speak your mind</button>
            {error && <ErrorMessage error={error.message} />}
        </form>
    )
}

export default AddComment