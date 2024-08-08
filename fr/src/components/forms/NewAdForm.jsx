import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import useKellerCall from "../../hooks/useKellerCall";
import NewAdFormButton from "../buttons/NewAdFormButton";
import useCategorySelect from "../../hooks/useCategorySelect";
import ProfileSidebar from "../ProfileSidebar";
import { useLocation, useNavigate } from 'react-router-dom';

const NewAdForm = () => {
  const { postKellerData, putAdData } = useKellerCall();
  const location = useLocation();
  const navigate = useNavigate();

  const [adsData, setAdsData] = useState({
    title: "",
    price: "",
    content: "",
    PLZ: "",
    Street: ""
  });

  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [images, setImages] = useState([]);
  const [imageNames, setImageNames] = useState([]);
  const [removedImages, setRemovedImages] = useState([]); // State to track removed images
  const fileInputRef = useRef(null); // Reference for the file input

  const resetForm = () => {
    setAdsData({
      title: "",
      price: "",
      content: "",
      PLZ: "",
      Street: ""
    });
    setSelectedSubcategory(null);
    setImages([]);
    setImageNames([]);
    setRemovedImages([]); // Reset removed images
  };

  const createAdsData = async () => {
    const formData = new FormData();
    formData.append("title", adsData.title);
    formData.append("price", adsData.price);
    formData.append("content", adsData.content);
    formData.append("PLZ", adsData.PLZ);
    formData.append("Street", adsData.Street);
    formData.append("subcategoryId", selectedSubcategory ? selectedSubcategory._id : null);

    images.forEach((image) => {
      formData.append("images", image);
    });

    removedImages.forEach((image) => {
      formData.append("removeImages", image); // Add removed images to formData
    });

    if (location.state && location.state.ad && location.state.ad._id) {
      // If ad ID exists, update the existing ad
      await putAdData(`ads/${location.state.ad._id}`, formData, true);
    } else {
      // If no ad ID, create a new ad
      await postKellerData("ads", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
    }

    resetForm(); // Reset the form after successful submission
    navigate("/myads"); // Navigate to /myads after successful form submission
  };

  const handleChange = (e) => {
    setAdsData({ ...adsData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(prevImages => [...prevImages, ...files]);
    setImageNames(prevNames => [...prevNames, ...files.map(file => file.name)]);
  };

  const handleRemoveImage = (index) => {
    const removedImage = images[index]; // Get the image to be removed
    setRemovedImages(prevRemoved => [...prevRemoved, removedImage]); // Add the image to removedImages
    setImages(prevImages => prevImages.filter((_, i) => i !== index)); // Remove the image from images array
    setImageNames(prevNames => prevNames.filter((_, i) => i !== index)); // Remove the image name from imageNames array
    fileInputRef.current.value = ""; // Reset the file input
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createAdsData();
  };

  const { isOpen, toggleDropdown, categories } = useCategorySelect();

  const handleSubcategorySelect = (subcategory) => {
    setSelectedSubcategory(subcategory);
    toggleDropdown(); // Close the dropdown menu when a subcategory is selected
  };

  useEffect(() => {
    if (location.state && location.state.ad) {
      const { title, price, content, PLZ, Street, subcategoryId, images } = location.state.ad;
      setAdsData({ title, price, content, PLZ, Street });
      setSelectedSubcategory(subcategoryId);
      setImages(images);
      setImageNames(images.map(img => img.substring(img.lastIndexOf('/') + 1)));
      setRemovedImages([]); // Reset removedImages
    }
  }, [location.state]);

  return (
    <div className="flex flex-col md:flex-row flex-container">
      <div className="sidebar">
        <ProfileSidebar />
      </div>
      <div className="border w-full m-2 bg-light-grey pb-7 rounded-lg flex-grow main-content pl-3" style={{ maxWidth: '15cm', width: '100%' }}>
        <form onSubmit={handleSubmit}>
          <div>
            <h4 className="text-xl w-3/4 mb-5 border-b-2 border-button-blue text-button-blue pl-3">
              Anzeige aufgeben
            </h4>
            <div>
              <div className="">
                <label
                  htmlFor="Title"
                  className="block text-sm font-medium leading-6 text-gray-900 pl-3"
                >
                  Title
                </label>
                <div className="mb-3">
                  <input
                    id="Title"
                    name="title"
                    type="Title"
                    autoComplete="Title"
                    value={adsData.title}
                    onChange={handleChange}
                    className="p-1 block w-3/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="relative group inline-block">
                <button
                  type="button"
                  className="btn bg-button-blue border border-0.5 border-button-blue hover:border-button-orange"
                  onClick={toggleDropdown}
                >
                  Wählen Sie eine Kategorie
                </button>
                {isOpen && (
                  <ul className="absolute z-20 bg-white border rounded-sm transform scale-0 group-hover:scale-100 transition duration-150 ease-in-out origin-top min-w-32">
                    {categories.map((category) => (
                      <li
                        key={category._id}
                        className="rounded-sm relative px-3 py-1 hover:bg-gray-300 transition duration-150 ease-in-out"
                      >
                        <div
                          className="w-full text-left flex items-center outline-none focus:outline-none"
                          onClick={() => handleCategorySelect(category)}
                        >
                          <span className="pr-1 flex-1">{category.categoryName}</span>
                          <span className="mr-auto">
                            <svg
                              className="fill-current h-4 w-4 transition duration-150 ease-in-out"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                            >
                              <path
                                d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                              />
                            </svg>
                          </span>
                        </div>
                        {category.subcategories && (
                          <ul
                            className="bg-white border rounded-sm absolute z-30 top-0 right-0 transition duration-150 ease-in-out origin-top-left min-w-32"
                          >
                            {category.subcategories.map((sub) => (
                              <li
                                key={sub._id}
                                className="px-3 py-1 hover:bg-gray-300 transition duration-150 ease-in-out"
                                onClick={() => handleSubcategorySelect(sub)}
                              >
                                {sub.name}
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="my-4">
                <label htmlFor="selected-subcategory" className="block text-sm font-medium leading-6 text-gray-900 pl-3">
                  Ausgewählte Kategorie
                </label>
                <div className="mb-3">
                  <input
                    id="selected-subcategory"
                    name="selected-subcategory"
                    type="text"
                    value={selectedSubcategory ? selectedSubcategory.name : ''}
                    readOnly
                    className="p-1 block w-3/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <label htmlFor="Preis" className="block text-sm font-medium leading-6 text-gray-900 pl-3">
                Preis
              </label>
              <div className="mb-3">
                <input
                  id="Preis"
                  name="price"
                  type="number"
                  autoComplete="Preis"
                  value={adsData.price}
                  onChange={handleChange}
                  className="p-1 block w-3/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>

              <label htmlFor="Beschreibung" className="block text-sm font-medium leading-6 text-gray-900 pl-3">
                Beschreibung
              </label>
              <div className="mb-3">
                <input
                  id="content"
                  name="content"
                  type="text"
                  autoComplete="content"
                  value={adsData.content}
                  onChange={handleChange}
                  className="p-1 block w-3/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>

              <label htmlFor="images" className="block text-sm font-medium leading-6 text-gray-900 pl-3">
                Bilder
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <div className="block text-sm font-medium leading-6 text-gray-900 pl-3">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Eine Datei hochladen</span>
                      <input
                        id="file-upload"
                        name="images"
                        type="file"
                        multiple
                        ref={fileInputRef} // Reference to the file input
                        onChange={handleImageChange}
                        className="sr-only"
                      />
                    </label>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    PNG, JPG, GIF up to 10MB
                  </p>
                  <ul className="mt-2">
                    {imageNames.map((name, index) => (
                      <li key={index} className="text-sm text-gray-600 flex justify-between items-center">
                        {name}
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="ml-4 text-red-600 hover:text-red-800"
                        >
                          löschen
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div>
                <h4 className="text-xl w-3/4 mb-5 border-b-2 border-button-blue text-button-blue pl-3">
                  Ort
                </h4 >
                <label htmlFor="PLZ" className="mt-3 block text-sm font-medium leading-6 text-gray-900 pl-3">
                  PLZ
                </label>
                <div className="mb-3">
                  <input
                    id="PLZ"
                    name="PLZ"
                    type="text"
                    autoComplete="PLZ"
                    value={adsData.PLZ}
                    onChange={handleChange}
                    className="p-1 block w-3/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <label htmlFor="Street/Nr.(Optional)" className="mt-3 block text-sm font-medium leading-6 text-gray-900 pl-3">
                  Street/Nr.(Optional)
                </label>
                <div className="mb-3">
                  <input
                    id="Street"
                    name="Street"
                    type="text"
                    autoComplete="Street"
                    value={adsData.Street}
                    onChange={handleChange}
                    className="p-1 block w-3/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <NewAdFormButton />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewAdForm;
