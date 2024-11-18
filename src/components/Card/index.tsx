import React from 'react';

interface CardProps {
  publicId: string;
  width: number;
  height: number;
  alt?: string;
  title: string;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  publicId,
  width,
  height,
  alt,
  title,
  className,
}) => {
  // Cloudinary Configurations, Images are sourced at Cloudinary Server
  const cloudName = 'dbkhw9ib9';
  const optimizedUrl = `https://res.cloudinary.com/${cloudName}/image/upload/c_scale,w_${width},h_${height},q_75,f_webp/${publicId}.webp`;

  return (
    <div className="max-w-[80%] w-full flex flex-col items-center rounded-lg px-4 py-5  transition-shadow duration-300">
      <div
        className={`p-4 bg-white border border-gray-300 rounded ${className}`}
      >
        <img
          src={optimizedUrl}
          alt={alt}
          width={width}
          height={height}
          className="object-cover rounded-md"
          loading="lazy"
        />
      </div>
      <p className="text-center text-sm font-semibold text-gray-800 pt-2">{title}</p>
    </div>
  );
};
