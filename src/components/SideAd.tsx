import React from 'react';

export function SideAd() {
  return (
    <div className="hidden lg:block w-1/3 p-4 space-y-16">
      <div className="rounded-lg overflow-hidden shadow-lg bg-gray-100 dark:bg-gray-800">
        <video
          src="src/videos/sari1.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-auto object-cover"
        />
        <div className="p-4 text-center">
          <p className="text-sm text-muted-foreground">Your dream home, visualized.</p>
        </div>
      </div>
      <div className="rounded-lg overflow-hidden shadow-lg bg-gray-100 dark:bg-gray-800">
        <video
          src="src/videos/sari2.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-auto object-cover"
        />
        <div className="p-4 text-center">
          <p className="text-sm text-muted-foreground">Innovation in every detail.</p>
        </div>
      </div>
    </div>
  );
}
