import { LoginForm } from '@/components/login-form'

export default function Page() {
    return (
        <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-md rounded-2xl shadow-lg p-8 md:p-10">
                {/* Header */}
                <div className="mb-6 text-center">
                    <h1 className="text-3xl font-bold">Welcome Back</h1>
                    <p className="mt-2 text-muted-foreground">Login to your account to continue</p>
                </div>

                {/* Login Form */}
                <LoginForm />

            </div>
        </div>
    )
}
