import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-blue-700 via-blue-800 to-gray-900">
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <SignIn path="/sign-in" routing="path" />
      </div>
    </div>
  );
}
