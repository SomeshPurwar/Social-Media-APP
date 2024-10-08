import React from 'react';
import { useSelector } from 'react-redux';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

const Carousel = ({ images = [], id }) => {
    const isActive = (index) => (index === 0 ? 'active' : '');

    const theme= useSelector((state) => state.theme);

    return (
        <div id={`image${id}`} className="carousel slide" data-bs-ride="carousel">
            <ol className="carousel-indicators" style={{ zIndex: 1 }}>
                {images.map((img, index) => (
                    <li
                        key={index}
                        data-bs-target={`#image${id}`}
                        data-bs-slide-to={index}
                        className={isActive(index)}
                    />
                ))}
            </ol>

            <div className="carousel-inner">
                {images.map((img, index) => {
                    if (!img || !img.url) return null; // Handle undefined or null image objects
                    
                    return (
                        <div key={index} className={`carousel-item ${isActive(index)}`}>
                            {img.url.match(/video/i) ? (
                                <video
                                    controls
                                    src={img.url}
                                    className="d-block w-100"
                                    alt="video content"
                                    style={{ filter: theme ? 'invert(1)' : 'invert(0)' }}
                                />
                            ) : (
                                <img
                                    src={img.url}
                                    className="d-block w-100"
                                    alt="carousel content"
                                    style={{ filter: theme ? 'invert(1)' : 'invert(0)' }}
                                />
                            )}
                        </div>
                    );
                })}
            </div>

            {images.length > 1 && (
                <>
                    <a
                        className="carousel-control-prev"
                        href={`#image${id}`}
                        role="button"
                        data-bs-slide="prev"
                        style={{ width: '5%' }}
                    >
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </a>

                    <a
                        className="carousel-control-next"
                        href={`#image${id}`}
                        role="button"
                        data-bs-slide="next"
                        style={{ width: '5%' }}
                    >
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </a>
                </>
            )}
        </div>
    );
};

export default Carousel;
