'use client'
import { useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'

import { LogIn } from "@/actions/login-action"
import { logInSchema } from '@/actions/schemas'
import ErrorMessage from '@/components/ErrorMessage'
import { useMutation } from '@tanstack/react-query'

const LogInForm = () => {
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: zodResolver(logInSchema)
    })

    const {mutate, error, isPending} = useMutation({
        mutationFn: LogIn
    })

    return (
    <div>
        <form onSubmit={handleSubmit((values) => mutate(values))} className="flex flex-col max-w-md m-auto border-sushi border-3 rounded-2xl p-4 text-left mb-4">
            <label htmlFor="email">Enter an email</label>
            <input className="input" {...register("email")} placeholder="email ..." />
            {errors.email && <ErrorMessage error={errors.email.message!} />}

            <label htmlFor="password">Enter a password</label>
            <input className="input" {...register("password")} placeholder="password ..." type="password" />
            {errors.password && <ErrorMessage error={errors.password.message!} />}
            
            <button>{isPending ? "Logging in" : "Log In!"}</button>
            {error && <ErrorMessage error={error.message}/>}
         </form>
        </div>
    )
}

export default LogInForm