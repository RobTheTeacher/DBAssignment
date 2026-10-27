'use client'

import { signUpSchema } from "@/actions/schemas"
import { SignUp } from "@/actions/signup-action"
import ErrorMessage from "@/components/ErrorMessage"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

const SignUpForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(signUpSchema)
    })

    const {mutate, error, isPending} = useMutation({
        mutationFn: SignUp
    })
    return (
        <div>
            <form onSubmit={handleSubmit(values => mutate(values))} className="flex flex-col max-w-md m-auto border-sushi border-3 rounded-2xl p-4 text-left mb-4">
                <label htmlFor="username">Enter a Username</label>
                <input className="input" {...register("username")} placeholder="Username ..." />
                {errors.username && <ErrorMessage error={errors.username.message!} />}

                <label htmlFor="email">Enter an email</label>
                <input className="input" {...register("email")} placeholder="email ..." />
                {errors.email && <ErrorMessage error={errors.email.message!} />}

                <label htmlFor="password">Enter a password</label>
                <input className="input" {...register("password")} placeholder="password ..."  />
                {errors.password && <ErrorMessage error={errors.password.message!} />}

                <button>Sign Up!</button>
                {error && <ErrorMessage error={error.message} />}
            </form>
        </div>
    )
}

export default SignUpForm