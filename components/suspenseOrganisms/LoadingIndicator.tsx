const LoadingIndicator = ({ text = "Loading" }: { text?: string }) => {
  return (
    <div className="flex justify-center items-center h-[80vh] ">
      <div className="">
        <div className="flex items-center justify-center space-x-2 ">
          <div
            className="w-4 h-4 bg-gray-500 rounded-full animate-bounce"
            style={{ animationDelay: "200ms" }}
          ></div>
          <div
            className="w-4 h-4 bg-gray-500 rounded-full animate-bounce"
            style={{ animationDelay: "400ms" }}
          ></div>
          <div
            className="w-4 h-4 bg-gray-500 rounded-full animate-bounce"
            style={{ animationDelay: "600ms" }}
          ></div>
        </div>
        <h3 className="text-lg text-slate-600 animate-pulse font-semibold mt-2">
          {text}
        </h3>
      </div>
    </div>
  );
};

export default LoadingIndicator;
