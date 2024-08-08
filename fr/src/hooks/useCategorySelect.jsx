


import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import useKellerCall from "./useKellerCall";

function useCategorySelect() {
    const [isOpen, setIsOpen] = useState(false);
    const { getKellerData } = useKellerCall();
    const categories = useSelector((state) => state.keller.categories);
    
    useEffect(() => {
        getKellerData('/categories')
    }, []);

    const toggleDropdown = () => setIsOpen(!isOpen);

    return { isOpen, toggleDropdown, categories };
}

export default useCategorySelect;






