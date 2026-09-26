import React, { useEffect, useState } from 'react';

interface PageLoaderProps {
  children: React.ReactNode;
}

const PageLoader: React.FC<PageLoaderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-50 bg-[#070b14] flex flex-col items-center justify-center text-white transition-opacity duration-500">
          <div className="relative w-16 h-16 flex items-center justify-center mb-4">
            <div className="absolute inset-0 rounded-full border-2 border-blue-500/20 border-t-blue-500 animate-spin" />
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white text-xs font-mono font-bold">
              VS
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gradient tracking-tight">
            VYZA SHIVA KUMAR REDDY
          </h1>
          <p className="text-xs text-cyan-400 font-mono mt-2 tracking-widest uppercase">AI/ML • MLOps • AWS DEVOPS</p>
        </div>
      )}

      <div className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {children}
      </div>
    </>
  );
};

export default PageLoader;