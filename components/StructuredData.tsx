'use client';

import Script from 'next/script';

interface StructuredDataProps {
  data: any;
}

export default function StructuredData({ data }: StructuredDataProps) {
  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}
