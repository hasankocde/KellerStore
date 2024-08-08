import React from "react";
import { FaPhone, FaEnvelope, FaBirthdayCake } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import '../../index.css';

const UserCard = ({ user, baseUrl, onClick }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        onClick(user);
    };

    return (
        <div className="relative bg-white rounded-lg border-2 mb-10 p-5 flex flex-col items-center shadow-2xl duration-300 hover:shadow-sm cursor-pointer max-w-xs" onClick={handleCardClick}>
            <div className="w-full flex justify-center items-center mb-4">
                {user.avatar ? (
                    <img
                        src={`${baseUrl}${user.avatar.replace(/\\/g, '/')}`}
                        alt="User Avatar"
                        className="h-40 w-40 object-cover rounded-full"
                    />
                ) : (
                    <div className="h-40 w-40 bg-gray-300 flex justify-center items-center rounded-full text-2xl text-gray-700">
                        {user.firstName && user.lastName ? (
                            <>
                                {user.firstName[0]}{user.lastName[0]}
                            </>
                        ) : (
                            <span>NA</span>
                        )}
                    </div>
                )}
            </div>
            <div className="w-full flex flex-col items-center">
                <h1 className="text-xl font-bold">
                    {user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : 'No Name'}
                </h1>
                <div className="mt-2 text-center">
                    {user.dateOfBirth && (
                        <h2 className="text-lg font-semibold"><FaBirthdayCake className="inline mr-2" />{user.dateOfBirth.split('T')[0]}</h2>
                    )}
                    {user.tel && (
                        <h3 className="text-md text-gray-600"><FaPhone className="inline mr-2" />{user.tel}</h3>
                    )}
                    <h4 className="text-md text-gray-600"><FaEnvelope className="inline mr-2" />{user.email}</h4>
                </div>
            </div>
        </div>
    );
};

export default UserCard;
