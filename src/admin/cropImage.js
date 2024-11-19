export const getCroppedImg = (imageSrc, croppedAreaPixels, canvas) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous"; // Поддержка CORS
    image.src = imageSrc;

    image.onload = () => {
      try {
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas context is not available.'));
          return;
        }

        // Устанавливаем размеры canvas
        canvas.width = croppedAreaPixels.width;
        canvas.height = croppedAreaPixels.height;

        // Рисуем изображение
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

        // Создаем Blob
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob); // Возвращаем сам Blob
            } else {
              reject(new Error('Canvas toBlob failed.'));
            }
          },
          'image/jpeg' // Формат
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
