import Link from "next/link"
import SignUpForm from "./form"

const SignUpPage = () => {
    return (
        <div className="text-center">
            <h1 className="heading my-4">Sign Up to Robbit!</h1>
            <SignUpForm />
            <Link href="/auth/login">Already have an account? <span className="text-pacifika font-bold">Log In here</span></Link>
        </div>
    )
}

export  default SignUpPage