
import { SignIn as ClerkSignIn } from "@clerk/clerk-react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const SignIn = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Sign In | SHOP.CO</title>
        <meta name="description" content="Sign in to your SHOP.CO account to manage your orders, profile, and more." />
      </Helmet>
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Welcome Back</h1>
            <p className="mt-2 text-gray-600">Sign in to continue to your account</p>
          </div>
          <div className="mt-8">
            <ClerkSignIn 
              appearance={{
                elements: {
                  rootBox: "mx-auto",
                  card: "shadow-none",
                  headerTitle: "hidden",
                  headerSubtitle: "hidden",
                  socialButtonsBlockButton: "rounded-md border border-gray-300 bg-white text-gray-800 hover:bg-gray-50",
                  formButtonPrimary: "bg-black hover:bg-gray-800",
                  footerActionLink: "text-black hover:text-gray-800",
                }
              }}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignIn;
