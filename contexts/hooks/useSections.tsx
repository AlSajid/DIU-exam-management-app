import { useEffect, useState } from 'react';

const useSections = () => {
    const [sections, setSections] = useState();

    const getSections = () => {
        fetch(`/api/sections`)
            .then((response) => response.json())
            .then((data) => setSections(data));
    }

    useEffect(() => {
        getSections();
    }, []);


    return { sections: sections, getSections }
};

export default useSections;