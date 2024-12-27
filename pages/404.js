import Footer from "@/components/interfaceComponents/Footer";
import NavBarInterface from "@/components/interfaceComponents/Nav-bar-interface";
import Link from "next/link";

export default function Error() {
  return (
    <>
      <NavBarInterface />
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center text-black">
          <h1 className="text-4xl md:text-7xl lg:text-9xl font-bold ">404</h1>
          <h2 className="mt-4 text-lg md:text-xl lg:text-2xl ">Page Not Found</h2>
          <p className="mt-2 text-sm md:text-base lg:text-lg ">
            Oops! The page you are looking for does not exist.
          </p>
          <Link
            href="/"
            className="mt-6 text-sm md:text-base lg:text-lg inline-block rounded-md  border-2 border-black bg-white px-4 py-2 text-black font-semibold hover:bg-black hover:text-white transition-all  duration-300"
          >
            Go Back Home
          </Link>
        </div>
      </div>
      <Footer className="!mt-0" />
    </>
  );
}