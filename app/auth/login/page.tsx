import Link from "next/link"
import LogInForm from "./form"

const LogInPage = () => {
    return (
        <div className="text-center">
            <h1 className="heading my-4">Log in Page</h1>
            <LogInForm />
            <Link href="/auth/signup">Don't have an account? <span className="text-pacifika font-bold">Sign up here</span></Link>
        </div>
    )
}

export  default LogInPage