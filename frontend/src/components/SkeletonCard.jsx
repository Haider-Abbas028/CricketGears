const SkeletonCard = () => {
  return (
    <div className="bg-slate-900 rounded-xl border border-white/10 overflow-hidden p-4 animate-pulse">
      <div className="bg-slate-700 h-48 rounded-lg mb-4"></div>
      <div className="bg-slate-700 h-5 w-3/4 rounded mb-2"></div>
      <div className="bg-slate-700 h-4 w-1/2 rounded mb-3"></div>
      <div className="bg-slate-700 h-10 w-full rounded-lg mb-3"></div>
      <div className="flex justify-between items-center">
        <div className="bg-slate-700 h-8 w-24 rounded-full"></div>
        <div className="bg-slate-700 h-6 w-16 rounded"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
