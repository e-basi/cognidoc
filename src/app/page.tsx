import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { LogIn } from "lucide-react";
import TypingAnimation from "@/components/magicui/typing-animation";
import Link from "next/link";

export default async function Home() {
  const { userId } = await auth();
  const isAuth = !!userId;

  return (
    <div className="w-screen min-h-screen relative transition-all duration-300">
      {/* Gradient Background for Dark and Light Modes */}
      <div className="bg-gradient-to-tr from-white via-white to-white dark:from-blue-900 dark:via-blue-700 dark:to-gray-900 absolute inset-0"></div>

      {/* User Button */}
      {isAuth && (
        <div className="absolute top-4 right-4 z-50">
          <UserButton afterSignOutUrl="/" />
        </div>
      )}

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center">
          {/* Banner Section */}
          <div className="relative flex flex-col items-center justify-start px-4 pt-32 sm:px-6 sm:pt-24 md:pt-32 lg:px-8">
            <a
              href="/features/pdf-ai"
              className="flex items-center space-x-2 rounded-full px-2 py-1 ring-1 whitespace-pre dark:bg-white dark:ring-gray-200 bg-blue-200 ring-accent"
            >
              <div
  className="w-fit rounded-full px-2 py-0.5 text-center text-xs font-bold sm:text-sm 
             bg-white text-blue-900 dark:bg-blue-900 dark:text-white"
>
  📄 CogniDoc
</div>

              <p className="text-xs font-medium sm:text-sm text-blue-950 dark:text-blue-400">
                Turn PDFs into conversations
              </p>

              <svg
                width="12"
                height="12"
                className="ml-1 text-blue-950 dark:text-blue-400"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.78141 5.33312L5.20541 1.75712L6.14808 0.814453L11.3334 5.99979L6.14808 11.1851L5.20541 10.2425L8.78141 6.66645H0.666748V5.33312H8.78141Z"
                  fill="currentColor"
                ></path>
              </svg>

            </a>

            {/* Animated Heading */}
            <div className="flex flex-col space-y-4 overflow-hidden pt-8">
              <TypingAnimation
                className="text-center text-4xl font-medium leading-tight sm:text-5xl md:text-6xl text-primary dark:text-gray-100"
                text="Turn PDFs into AI conversations."
              />
              <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-500 dark:text-gray-100 sm:text-xl sm:leading-7">
                Unlock answers, insights, and understanding in an instant. Let
                our AI transform your questions into clarity, and your
                curiosity into breakthroughs.
              </p>
            </div>

            {/* Call-to-Action Buttons */}
            {isAuth ? (
              <div className="flex mt-3 space-x-3">
                <Button className="px-4 py-2 text-lg font-medium">
                  Go to Chats
                </Button>
              </div>
            ) : (
              <div className="flex mt-4">
  <Link href="/sign-in">
    <Button
      className="flex items-center px-4 py-2 text-lg font-medium 
                 bg-blue-700 text-white hover:bg-blue-600 focus:bg-blue-600 
                 dark:bg-blue-900 dark:text-white dark:hover:bg-blue-800 transition-colors"
    >
      Login to get Started!
      <LogIn className="w-4 h-4 ml-2" />
    </Button>
  </Link>
</div>

            )}
          </div>

          {/* Additional Information */}
          <p className="mx-auto max-w-xl text-lg leading-7 text-gray-500 dark:text-gray-200 sm:text-xl sm:leading-9">
            Transform how you interact with your documents using cutting-edge AI
            technology.
          </p>

          {/* File Upload (Auth Only) */}
          {isAuth && <h1 className="mt-4">fileUpload</h1>}
        </div>
      </div>
    </div>
  );
}
