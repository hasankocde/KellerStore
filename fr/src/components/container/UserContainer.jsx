import React, { useState, useEffect } from 'react';
import useKellerCall from "../../hooks/useKellerCall";
import { toastErrorNotify, toastSuccessNotify } from '../../helper/ToastNotify';

const UserContainer = () => {
    const { getUserData, putUserData } = useKellerCall();
    const [user, setUser] = useState({
        avatar: '',
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        tel: '',
        email: ''
    });

    const [userId, setUserId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        const data = await getUserData();
        if (data) {
            setUser(data);
            setUserId(data._id);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setUser((prevUser) => ({
            ...prevUser,
            avatar: file,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (const key in user) {
            if (user[key] && key !== 'email') { // Prevent appending email to the formData
                formData.append(key, user[key]);
            }
        }
        if (!formData.has('_id')) {
            formData.append('_id', userId); // Append ID if not already present
        }
        try {
            const updateUser = await putUserData(`users/${userId}`, formData, true);
            if (updateUser) {
                setUser(updateUser);
                toastSuccessNotify("User updated successfully");
                setIsEditing(false);
                fetchUserData(); // Refetch user data to update state
            } else {
                toastErrorNotify("Failed to update user");
            }
        } catch (error) {
            toastErrorNotify("Failed to update user");
            console.error(error);
        }
    };

    const baseUrl = import.meta.env.VITE_BASE_URL;

    return (
        <div className="px-16 pt-3">
            <h1 className="text-xl border-b-2 border-button-blue text-button-blue uppercase">BENUTZERINFORMATIONEN</h1>
            <form onSubmit={handleSubmit}>
                <div className="my-5">
                    <label className="block">
                        Avatar:
                        {user.avatar && typeof user.avatar === 'string' && (
                            <img
                                src={`${baseUrl}${user.avatar.replace(/\\/g, '/')}`} // Correctly handle backslashes
                                alt="User Avatar"
                                className="my-3 h-24 w-24 object-cover rounded-full"
                            />
                        )}
                        <input
                            type="file"
                            name="avatar"
                            id="avatar"
                            onChange={handleFileChange}
                            disabled={!isEditing}
                            className="ml-2 border rounded px-2 py-1 w-full"
                        />
                    </label>
                </div>
                <div className="my-5">
                    <label className="block">
                        Vorname:
                        <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            value={user.firstName || ''}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="ml-2 border rounded px-2 py-1 w-full"
                        />
                    </label>
                </div>
                <div className="my-5">
                    <label className="block">
                        Nachname:
                        <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            value={user.lastName || ''}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="ml-2 border rounded px-2 py-1 w-full"
                        />
                    </label>
                </div>
                <div className="my-5">
                    <label className="block">
                        Geburtsdatum:
                        <input
                            type="date"
                            name="dateOfBirth"
                            id="dateOfBirth"
                            value={user.dateOfBirth ? user.dateOfBirth.split('T')[0] : ''}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="ml-2 border rounded px-2 py-1 w-full"
                        />
                    </label>
                </div>
                <div className="my-5">
                    <label className="block">
                        Telefon:
                        <input
                            type="text"
                            name="tel"
                            id="tel"
                            value={user.tel || ''}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="ml-2 border rounded px-2 py-1 w-full"
                        />
                    </label>
                </div>
                <div className="my-5">
                    <label className="block">
                        Email:
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={user.email || ''}
                            onChange={handleChange}
                            disabled={true} // Email field is always disabled
                            className="ml-2 border rounded px-2 py-1 w-full"
                        />
                    </label>
                </div>
                {!isEditing && (
                  <div className="my-5">
                    <button
                      type="button"
                      className="bg-button-blue text-white py-2 px-4 rounded w-full"
                      onClick={() => setIsEditing(true)}
                    >
                      Informationsaktualisierung
                    </button>
                  </div>
                )}
                {isEditing && (
                  <div className="my-5">
                    <button
                      type="submit"
                      className="bg-button-blue text-white py-2 px-4 rounded w-full"
                    >
                      Jetzt aktualisieren
                    </button>
                  </div>
                )}
            </form>
        </div>
    );
};

export default UserContainer;
