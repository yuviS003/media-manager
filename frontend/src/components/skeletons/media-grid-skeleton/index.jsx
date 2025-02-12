const MediaGridSkeleton = () => {
  return (
    <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {[...Array(12)].map((_, index) => (
        <div
          key={index}
          className="w-full h-[300px] border rounded-lg bg-gray-200 animate-pulse"
        />
      ))}
    </div>
  );
};

export default MediaGridSkeleton;
