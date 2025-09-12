import { SignUpForm } from '@/components/sign-up-form'

export default function Page() {
    return (
        <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-md rounded-2xl shadow-lg p-8 md:p-10">
                {/* Header */}
                <div className="mb-6 text-center">
                    <h1 className="text-3xl font-bold">Create Your Account</h1>
                    <p className="mt-2 text-muted-foreground">
                        Sign up to get started and access all features
                    </p>
                </div>

                {/* Sign Up Form */}
                <SignUpForm />
            </div>
        </div>
    )
}
