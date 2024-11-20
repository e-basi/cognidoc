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
    <div className="w-screen min-h-screen bg-gradient-to-tr from-blue-900 via-blue-700 to-gray-900 relative">
      {/* Position UserButton at the top-right corner */}
      {isAuth && (
        <div className="absolute top-4 right-4 z-50">
          <UserButton afterSignOutUrl="/" />
        </div>
      )}

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center">
        <div className="relative flex w-full flex-col items-center justify-start px-4 pt-32 sm:px-6 sm:pt-24 md:pt-32 lg:px-8">
  <a
    href="/features/pdf-ai"
    className="flex w-auto items-center space-x-2 rounded-full bg-primary/20 px-2 py-1 ring-1 ring-accent whitespace-pre"
    style={{ backgroundColor: "white", opacity: 1, willChange: 'auto', transform: 'none' }}
  >
    <div className="w-fit rounded-full bg-accent px-2 py-0.5 text-center text-xs font-bold text-primary sm:text-sm" style={{
      backgroundColor: "navy", // Navy blue background
      color: "white", // White font color
    }}>
      📄 CogniDoc
    </div>
    <p className="text-xs font-medium text-primary sm:text-sm">Turn PDFs into conversations</p>
    <svg
      width="12"
      height="12"
      className="ml-1"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.78141 5.33312L5.20541 1.75712L6.14808 0.814453L11.3334 5.99979L6.14808 11.1851L5.20541 10.2425L8.78141 6.66645H0.666748V5.33312H8.78141Z"
        fill="hsl(var(--primary))"
      ></path>
    </svg>
  </a>
  <div className="flex w-full max-w-2xl flex-col space-y-4 overflow-hidden pt-8">
    {/* Use TypingAnimation for the animated text */}
    <TypingAnimation
      className="text-center text-4xl font-medium leading-tight text-gray-100 sm:text-5xl md:text-6xl"
      text="Turn PDFs into AI conversations."
    />
     <p
  className="mx-auto max-w-3xl text-center text-lg leading-relaxed text-gray-100 sm:text-xl sm:leading-7"
  style={{
    margin: "0 auto", // Ensures it is horizontally centered
    textAlign: "center", // Centers text within the paragraph
    lineHeight: "1.5", // Adjust line spacing for readability
    opacity: 1,
    willChange: "auto",
  }}
>
  Unlock answers, insights, and understanding in an instant. Let our AI transform your questions into clarity, and your curiosity into breakthroughs.
</p>


  </div>

  {isAuth ? (
            <div className="flex mt-3 space-x-3">
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
</div>
          <p
      className="mx-auto max-w-xl text-center text-lg leading-7 text-gray-200 sm:text-xl sm:leading-9 text-balance"
      style={{ opacity: 1, willChange: 'auto', transform: 'none' }}
    >
      Transform how you interact with your documents using cutting-edge AI technology.
      
    </p>

          {isAuth && <h1 className="mt-4">fileUpload</h1>}
        </div>
      </div>
    </div>
  );
}

