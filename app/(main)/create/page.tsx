'use client'
import { CreatePost } from "@/actions/create-post-action"
import { postSchema } from "@/actions/schemas"
import ErrorMessage from "@/components/ErrorMessage"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import z from "zod"

const CreatePostPage = () => {
    const postImageSchema = postSchema.omit({ image: true })
          .extend({image: z.unknown().transform(value => { return value as FileList }).optional()})

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(postImageSchema)
    })

    const { mutate, error } = useMutation({
        mutationFn: CreatePost
    })

    return (
        <div className="w-lg mx-auto">
            <h1 className="heading">Create a Post</h1>
            <form onSubmit={handleSubmit(values => {
                const imageForm = new FormData()
                if (values.image) imageForm.append('image', values.image[0])

                mutate({
                    title: values.title,
                    content: values.content,
                    image: imageForm
                })
            })}
                className="flex flex-col w-full m-auto border-sushi  border-3 rounded-2xl p-4 text-left mb-4">
                <label htmlFor="title">Add a title</label>
                <input className="input" {...register("title")} ></input>
                {errors.title && <ErrorMessage error={errors.title.message!} />}

                <label htmlFor="content">Add some content (optional)</label>
                <textarea className="input" {...register("content")}></textarea>

                <label htmlFor="image">Add an Image (optional)</label>
                <input className="input" type="file" {...register("image")} />
                {errors.image && <ErrorMessage error={errors.image.message!} />}

                <button className="button mt-4">Create Post</button>
                {error && <ErrorMessage error={error.message} />}
            </form>
        </div>
    )
}

export default CreatePostPage