import { Button } from "@/components/ui/button";
import { UserButton, auth } from "@clerk/nextjs";

export default async function Home() {
  const { userId } = await auth();
  const isAuth = !!userId;

  return (
    <div className="w-screen min-h-screen bg-gradient-to-tr from-blue-700 via-blue-800 to-gray-900">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center mb-4">
            <h1 className="mr-3 text-5xl font-semibold text-white">Chat with any PDF</h1>
            <UserButton afterSignOutUrl="/" />
          </div>

          <p className="max-w-xl mt-1 text-lg text-gray-200">
            Join millions of students, researchers, and professionals to instantly
            answer questions and understand research with AI.
          </p>

          {isAuth && (
            <div className="mt-4">
              <Button className="px-4 py-2 text-lg font-medium" href="/chats">
                Go to Chats
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
