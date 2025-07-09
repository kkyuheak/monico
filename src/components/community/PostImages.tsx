"use client";

import { useDisableScroll } from "@/hooks/useDisableScroll";
import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface PostImagesProps {
  postData: PostData;
}

const PostImages = ({ postData }: PostImagesProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const handleImageClick = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setCurrentIndex(null);
  };

  useDisableScroll(isOpen);

  return (
    <>
      {/* 이미지 목록 */}
      <ul className="flex gap-2 mt-5 overflow-auto">
        {postData.images.map((image, index) => (
          <li
            key={index}
            className="w-[300px] h-[220px] rounded-[5px] cursor-pointer"
            onClick={() => handleImageClick(index)}
          >
            <Image
              src={image}
              alt={`postImage-${index}`}
              width={300}
              height={220}
              className="w-full h-full object-contain rounded-[5px]"
            />
          </li>
        ))}
      </ul>

      {/* 모달 전체화면 이미지 */}
      {isOpen && currentIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/80 dark:bg-black/80 flex items-center justify-center"
          onClick={closeModal}
        >
          <Image
            src={postData.images[currentIndex]}
            alt={`full-image-${currentIndex}`}
            width={1000}
            height={600}
            className="max-w-[95%] max-h-[95%] object-contain"
          />

          <X
            className="absolute top-5 right-5 cursor-pointer stroke-white"
            size={30}
          />
        </div>
      )}
    </>
  );
};

export default PostImages;
