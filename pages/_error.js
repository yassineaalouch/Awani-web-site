import Link from 'next/link';
import React from 'react';

function Error({ statusCode }) {
  return (
    <div className="flex h-screen items-center justify-center ">
      <div className="text-center text-black">
        <h1 className="text-9xl font-bold">{statusCode}</h1>
        <h2 className="mt-4 text-2xl ">
          {statusCode === 404
            ? 'Page Not Found'
            : 'Something went wrong on our end.'}
        </h2>
        <p className="mt-2 text-lg ">
          {statusCode === 500
            ? 'An internal server error occurred.'
            : 'Please check the URL and try again.'}
        </p>
        <Link
          href="/"
          className="mt-6 inline-block border-2 border-black rounded-md bg-white px-4 py-2 text-black font-semibold hover:bg-black hover:text-white transition-all  duration-300"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
