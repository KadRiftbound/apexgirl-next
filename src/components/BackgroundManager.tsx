'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function BackgroundManager() {
  const pathname = usePathname();

  useEffect(() => {
    // Remove all bg classes
    document.body.classList.remove('bg-home', 'bg-database', 'bg-tierlist', 'bg-guides', 'bg-tools');

    // Add the appropriate class based on pathname
    if (pathname === '/' || pathname.match(/^\/[a-z]{2}\/?$/)) {
      document.body.classList.add('bg-home');
    } else if (pathname.includes('/database')) {
      document.body.classList.add('bg-database');
    } else if (pathname.includes('/tierlist')) {
      document.body.classList.add('bg-tierlist');
    } else if (pathname.includes('/guides')) {
      document.body.classList.add('bg-guides');
    } else if (pathname.includes('/tools')) {
      document.body.classList.add('bg-tools');
    } else {
      document.body.classList.add('bg-home');
    }
  }, [pathname]);

  return null;
}
