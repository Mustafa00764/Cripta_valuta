export const getCroppedImg = (imageSrc, croppedAreaPixels, canvas) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous"; // Указываем поддержку CORS
    image.src = imageSrc; // Добавляем уникальный параметр, чтобы обойти кеш

    image.onload = () => {
      try {
        const ctx = canvas.getContext('2d');

        // Устанавливаем размеры canvas на основе обрезанной области
        canvas.width = croppedAreaPixels.width;
        canvas.height = croppedAreaPixels.height;

        ctx.drawImage(
          image,
          croppedAreaPixels.x,
          croppedAreaPixels.y,
          croppedAreaPixels.width,
          croppedAreaPixels.height,
          0,
          0,
          croppedAreaPixels.width,
          croppedAreaPixels.height
        );

        // Пробуем создать Blob из canvas
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              resolve(url); // Возвращаем URL для Blob
            } else {
              reject(new Error('Canvas toBlob failed.'));
            }
          },
          'image/jpeg'
        );
      } catch (error) {
        reject(new Error(`Canvas processing error: ${error.message}`));
      }
    };

    image.onerror = () => {
      reject(new Error('Failed to load image. Ensure the source allows CORS.'));
    };
  });
};
