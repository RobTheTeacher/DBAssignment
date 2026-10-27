import Link from "next/link"

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <header className="flex justify-between p-4 border-b-4 border-sushi">
                <Link href="/" className="button">Robbit</Link>
            </header>
            {children}
        </>
    )
}

export default AuthLayout