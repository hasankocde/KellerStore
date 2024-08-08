import React, { useState, useEffect } from "react";
import { FaLocationPin } from "react-icons/fa6";
import { MdFavorite } from "react-icons/md";
import { IoEyeSharp } from "react-icons/io5";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useNavigate } from "react-router-dom";
import useKellerCall from "../../hooks/useKellerCall";
import '../../index.css'; 



const CommonCard = ({ ad, baseUrl }) => {
    const {
        images = [],
        _id,
        ownerId,
        title = "No Title",
        categoryId = { categoryName: "No Category" },
        subcategoryId = { name: "No Subcategory" },
        PLZ = "No PLZ",
        location = "Konum Yok",
        price = "No Price",
        favoriteCount: initialFavoriteCount = 0,
        isSold = false,
        isReserved = false,
        countOfVisitors = 0,
       
    } = ad || {};
    
    const navigate = useNavigate();
    const [favoriteCount, setFavoriteCount] = useState(initialFavoriteCount);

    const { getFavoriteCount } = useKellerCall();

    useEffect(() => {
        if (_id) {
            const fetchFavoriteCount = async () => {
                const count = await getFavoriteCount(_id);
                setFavoriteCount(count);
            };

            fetchFavoriteCount();
        }
    }, [_id]);

    const handleCardClick = () => {
        if (_id) {
            navigate('/detail', { state: { ad } });
        } else {
            console.error("Ad ID is undefined");
        }
    };

    // Additional logging to debug the ad object
    // console.log("CommonCard received ad:", ad);
    // console.log("Ad ID:", _id);

    return (
        <div className={`relative bg-white rounded-lg border-2 mb-5 p-3 flex flex-col items-center shadow-2xl duration-300 hover:shadow-sm ${isSold || isReserved ? 'cursor-default' : 'cursor-pointer'} max-w-xs`}>
            {(isSold || isReserved) && (
                <div className="absolute inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
                    <span className="text-white text-2xl">
                        {isSold ? "Verkauft" : "Reserviert"}
                    </span>
                </div>
            )}
            {images.length > 0 ? (
                <Carousel showThumbs={false} dynamicHeight={true} infiniteLoop={true} className="w-full h-40 mb-1 mt-0 cursor-default">
                    {images.map((image, index) => (
                        <div key={index}>
                            <img
                                src={`${baseUrl}${image}`}
                                alt={`img-${index}`}
                                className="w-full h-40 object-cover pointer-events-none"
                            />
                        </div>
                    ))}
                </Carousel>
            ) : (
                <div className="w-full h-40 mb-4 flex items-center justify-center bg-gray-200">
                    <span className="text-gray-500">Keine Bilder verfügbar</span>
                </div>
            )}
            <div onClick={handleCardClick} className="w-full flex flex-col items-center cursor-pointer">
                <div className="text-center cursor-pointer">
                    <h1 className="text-xl font-bold">{title}</h1>
                    <div className="mt-0">
                        <h2 className="text-lg font-semibold">-{categoryId.categoryName}-</h2>
                        <h3 className="text-sm text-gray-600 ">{subcategoryId.name}</h3>
                    </div>
                    <div className="flex justify-center items-center mt-0 gap-0">
                        <FaLocationPin size={18} />
                        <h4 className="text-sm font-bold">{location}</h4>
                    </div>
                </div>
                <div className="flex justify-around px-5 py-2 w-full">
                    <div className="flex items-center gap-3">
                        <div className="favorite-badge">
                            <div className="border-2 border-view-green p-1.5 rounded-full bg-view-green text-white">
                                <IoEyeSharp size={20} />
                            </div>
                            <span className="count">{countOfVisitors}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="favorite-badge">
                            <div className="border-2 border-like-yellow p-1.5 rounded-full bg-like-yellow text-white">
                                <MdFavorite size={20} />
                            </div>
                            <span className="count">{favoriteCount}</span>
                        </div>
                    </div>
                </div>
                <div className="w-full flex justify-center items-center mt-0 px-4">
                    <div className="py-1 bg-button-blue shadow-lg shadow-button-blue rounded-md w-1/2 text-center">
                        <p className="text-white text-lg font-bold">{price} €</p>
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default CommonCard;
