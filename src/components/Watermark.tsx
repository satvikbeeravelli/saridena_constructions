import React from 'react';

export function Watermark() {
  return (
    <div
      className="fixed inset-0 pointer-events-none opacity-5 dark:opacity-10 z-0"
      style={{
        backgroundImage: 'url("src/photos/saridena_logo.png")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'contain',
      }}
    />
  );
}
