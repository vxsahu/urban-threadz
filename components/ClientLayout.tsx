'use client'

import React, { useEffect, useState } from 'react';
import Preloader from './ui/Preloader';
import { usePathname } from 'next/navigation';

const ClientLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      {loading && <Preloader />}
      <div style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.3s' }}>{children}</div>
    </>
  );
};

export default ClientLayout; 