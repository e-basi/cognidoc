import { Button } from "@/components/ui/button";
import { UserButton} from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { Link, LogIn } from "lucide-react";

export default async function Home() {
  const { userId, redirectToSignIn  } = await auth();
  const isAuth = !!userId;
  
  // Redirect to sign-in if not authenticated
  if (!isAuth) {
    return redirectToSignIn();
  }

  return (
    <div className="w-screen min-h-screen bg-gradient-to-tr from-blue-700 via-blue-800 to-gray-900">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center mb-4">
            <h1 className="mr-3 text-5xl font-semibold text-white">Chat with any PDF</h1>
            <UserButton afterSignOutUrl="/" />
          </div>

          {isAuth && (
            <div className="flex mt-3">
              <Button className="px-4 py-2 text-lg font-medium">
                Go to Chats
              </Button>
            </div>
          )}
  
          <p className="max-w-xl mt-1 text-lg text-gray-200">
            Join millions of students, researchers, and professionals to instantly
            answer questions and understand research with AI.
          </p>


          <div className="flex mt-4">
            {isAuth ? ( <h1> fileUpload </h1> ):(
              <link href="/sign-in">
                 <Button>  Login to get Started! </Button>
                    <LogIn className="w-4 h-4 m1-2" />
                  </link>
                  )}
            </div>

  
        </div>
      </div>
    </div>
  );
}  