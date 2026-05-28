const ErrorPage = ({ searchParams }) => {
  const { message } = searchParams;

  return (
    <section className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-bold text-red-500">Error</h1>
      <p className="text-2xl mt-4">{message || "Something went wrong"}</p>
    </section>
  );
};

export default ErrorPage;
