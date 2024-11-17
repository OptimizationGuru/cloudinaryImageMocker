import React from 'react';

interface CardProps {
  publicId: string;
  width: number;
  height: number;
  alt: string;
  title: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  publicId,
  width,
  height,
  alt,
  title,
}) => {
  const cloudName = 'dbkhw9ib9';
  const optimizedUrl = `https://res.cloudinary.com/${cloudName}/image/upload/c_scale,w_${width},h_${height},q_75,f_webp/${publicId}.webp`;

  return (
    <div className="max-w-[95%]  w-full flex flex-col items-center bg-white shadow-lg rounded-lg p-4 hover:shadow-2xl transition-shadow duration-300">
      <div className="w-full h-full flex justify-center mb-4">
        <img
          src={optimizedUrl}
          alt={alt}
          width={width}
          height={height}
          className="object-cover rounded-md"
          loading='lazy'
        />
      </div>
      <p className="text-center text-sm font-semibold text-gray-800">{title}</p>
    </div>
  );
};
