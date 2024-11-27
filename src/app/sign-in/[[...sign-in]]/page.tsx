import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-white via-white to-white dark:from-blue-700 dark:via-blue-800 dark:to-gray-900">
      <div className="p-6 bg-white dark:bg-gray-800 dark:text-white rounded-lg shadow-lg">
        <SignIn path="/sign-in" routing="path" />
      </div>
    </div>

  );
}
