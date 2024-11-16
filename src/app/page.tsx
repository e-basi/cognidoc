import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { LogIn } from "lucide-react";
import Link from "next/link"; // Import Link from next/link

export default async function Home() {
  const { userId } = await auth();
  const isAuth = !!userId;

  return (
    <div className="w-screen min-h-screen bg-gradient-to-tr from-blue-700 via-blue-800 to-gray-900">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center mb-4">
            <h1 className="mr-3 text-5xl font-semibold text-white">Chat with any PDF</h1>
            {isAuth && <UserButton afterSignOutUrl="/" />}
          </div>

          {isAuth ? (
            <div className="flex mt-3">
              <Button className="px-4 py-2 text-lg font-medium">Go to Chats</Button>
            </div>
          ) : (
            <div className="flex mt-4">
              <Link href="/sign-in">
                <Button className="flex items-center px-4 py-2 text-lg font-medium">
                  Login to get Started!
                  <LogIn className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          )}

          <p className="max-w-xl mt-1 text-lg text-gray-200">
            Join millions of students, researchers, and professionals to instantly
            answer questions and understand research with AI.
          </p>

          {isAuth && <h1 className="mt-4">fileUpload</h1>}
        </div>
      </div>
    </div>
  );
}
