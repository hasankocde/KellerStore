import React from "react";
import { FaLocationPin, FaTag, FaMessage } from "react-icons/fa6";
import { MdFavorite } from "react-icons/md";
import { IoEyeSharp } from "react-icons/io5";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../../index.css';

const DetailCard = ({
  ad,
  isFavorite,
  handleFavoriteToggle,
  favoriteCount,
  viewCount,
  currentUser,
  ownerId,
  setMessageModalVisible,
  navigate,
  setDeleteModalVisible
}) => {

  const carouselImageStyle = {
    width: "calc(100% - 6mm)",
    height: "calc(300px + 2mm)",
    objectFit: "cover",
    padding: "0 3mm 3mm 3mm",
    marginTop: "-2mm"
  };

  return (
    <div className="w-full m-5 bg-white rounded-lg flex flex-col items-center pt-3 pb-3">
      <div className="w-full mb-4">
        <Carousel showThumbs={false} dynamicHeight={true} infiniteLoop={true} className="w-full max-w-full max-h-full m-auto">
          {ad.images.map((image, index) => (
            <div key={index} className="image-container">
              <img
                src={`${import.meta.env.VITE_BASE_URL}${image}`}
                alt={`img-${index}`}
                style={carouselImageStyle}
              />
            </div>
          ))}
        </Carousel>
      </div>
      <div className="text-center w-full font-semibold">
        <h3 className="text-center text-xl font-bold text-gray-900 mt-2">{ad.title}</h3>
        <h2 className="text-lg font-semibold">-{ad.categoryId.categoryName}-</h2>
        <h3 className="text-sm text-gray-600 ">{ad.subcategoryId.name}</h3>


        <div className="flex justify-center items-center mt-2 mb-3 gap-0">
          <FaLocationPin size={25} />
          <h2 className="text-lg">{ad.location}</h2>
        </div>

        <div className="flex justify-evenly px-24 py-3 w-full">

          <div className="flex items-center gap-3">
            <div className="favorite-badge">
              <div className="border-2 border-view-green p-2 rounded-full bg-view-green text-white">
                <IoEyeSharp size={25} />
              </div>
              <span className="count">{viewCount}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="favorite-badge">
              <button
                className={`border-2 p-2 rounded-full ${isFavorite ? 'bg-red-500 text-white' : 'bg-like-yellow text-white'}`}
                onClick={handleFavoriteToggle}
              >
                <MdFavorite size={25} />
              </button>
              <span className="count">{favoriteCount}</span>
            </div>
          </div>
        </div>

        <div className="button-group w-full mb-4 mt-2">
          <button
            className="bg-button-blue text-white p-3 rounded shadow-lg shadow-button-blue hover:bg-blue-700 active:bg-blue-500 transition duration-150"
          >
            <div className="flex justify-around items-center">
              <div className="text-2xl font-bold">
                <p>{ad.price} €</p>
              </div>
              <div className="text-indigo-500">
                <FaTag size={30} />
              </div>
            </div>
          </button>
          {currentUser !== ownerId._id ? (
            <button
              className="bg-view-green text-white p-3 rounded shadow-lg shadow-button-blue hover:bg-view-green-dark active:bg-view-green-light transition duration-150 center"
              onClick={() => setMessageModalVisible(true)}
            >
              <div className="flex justify-around items-center">
                <div className="text-2xl">
                  <p>Nachricht</p>
                </div>
                <div className="text-green-200">
                  <FaMessage size={30} />
                </div>
              </div>
            </button>
          ) : (
            <button
              className="bg-view-green text-white p-3 rounded shadow-lg shadow-button-blue hover:bg-view-green-dark active:bg-view-green-light transition duration-150 center"
              onClick={() => navigate('/newad', { state: { ad } })}
            >
              <div className="flex justify-around items-center">
                <div className="text-2xl">
                  <p>Anz. Edit</p>
                </div>
              </div>
            </button>
          )}
          {currentUser === ownerId._id && (
            <button
              className="bg-red-600 text-white p-3 rounded shadow-lg shadow-button-blue hover:bg-red-800 active:bg-red-400 transition duration-150"
              onClick={() => setDeleteModalVisible(true)}
            >
              <div className="flex justify-around items-center">
                <div className="text-2xl">
                  <p>Anz. Löschen</p>
                </div>
              </div>
            </button>
          )}
        </div>
        <div className="w-full mb-6 bg-white px-6 py-4 rounded-b-lg border border-green-500 bg-yellow-100 max-w-full overflow-hidden"> {/* Updated BESCHREIBUNG section */}
          <div>
            <h4 className="m-5 text-left w-2/4 border-b-2 border-button-blue text-button-blue">
              BESCHREIBUNG
            </h4>
          </div>
          <div className="m-6">
            <p className="text-left">
              {ad.content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailCard;
