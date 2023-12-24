import React, { useState, useEffect } from 'react';
import styles from './gallery.css';
import imagesData from '../../../data/gallery.tattoo.json';

const GalleryPage = () => {


  const images = imagesData.map((imageInfo, index) => ({
    id: index + 1,
    src: `/assets/gallery-tatto/${index + 1}.jpg`,
    caption: `Description of tattoo # ${index + 1}`,
  }));

 const [currentImage, setCurrentImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openImage = (index) => {
    setCurrentImage(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCurrentImage(null);
    setIsModalOpen(false);
  };

  const goToPrevious = () => {
    setCurrentImage((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentImage((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="fs-2 m-4">Tattoo Gallery</h1>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
      {images.map((image, index) => (
          <div key={index} className="col">
            <img
              src={image.src}
              alt={`Image ${image.id}`}
              className="img img-fluid"
              style={{ cursor: 'pointer' }}
              onClick={() => openImage(index)}
            />
          </div>
        ))}
      </div>

      {isModalOpen && (
        <>
          <div className="overlay" onClick={closeModal}></div>
          <div className="modal" tabIndex="-1" style={{ display: 'block' }}>
            <div className="modal-dialog modal-lg h-100" role="document">
              <div className="modal-content d-flex flex-row justify-content-center align-items-center h-100">
                <button type="button" className="custom-btn-scrol" onClick={goToPrevious}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M19 12H6M12 5l-7 7 7 7"/>
                  </svg>
                </button>

                <div className="modal-body d-flex flex-column justify-content-center align-items-center">
                  
                  <button type="button" className="custom-btn-close" onClick={closeModal}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M18 6L6 18M6 6l12 12"/>
                    </svg>
                  </button>

                  <img
                    onClick={goToNext}
                    src={images[currentImage].src}
                    alt={`Image ${images[currentImage].id}`}
                    className="img img-fluid"
                  />
                </div>

                <button type="button" className="custom-btn-scrol" onClick={goToNext}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M5 12h13M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default GalleryPage;