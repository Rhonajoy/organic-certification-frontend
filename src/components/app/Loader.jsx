const Loader = ({ text = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6">
      <div className="w-12 h-12 border-4 border-green-600 border-dashed rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-600 text-sm">{text}</p>
    </div>
  );
};

export default Loader;
