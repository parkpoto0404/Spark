import React, { useEffect, useState } from "react";


// 하드코드로 구현되었던 공통된 로직을 하나의 로직으로 컴퍼넌트 추상화
const CostomDorpDown = ({ title, plaseholder, options, onSelect, value, styleValue }) => {


    const [isOpen, setIsOpen] = useState(false); // 드롭다운용
    const [selected, setSelected] = useState(`${plaseholder} 선택해주세요`); // 선택된 항목


    const toggleDropdown = (e) => {
        e.stopPropagation(); // 드롭다운 자체 클릭 이벤트는 전파되지 않도록
        setIsOpen(true);
    }

    const handleSelect = (value, e) => {
        e.stopPropagation(); // 버블링 방지
        setIsOpen(false);
        onSelect(value); // 부모태그에 전달!!

    }

    // education prop과 로컬 상태 동기화
    useEffect(() => {
        if (value) {
            setSelected(value);
        }
    }, [value]);



    useEffect(() => {
        const closeDropdown = () => {
            setIsOpen(false);
        };

        window.addEventListener('click', closeDropdown);
        return () => {
            window.removeEventListener('click', closeDropdown);
        };
    }, []);


    return (
        <div style={styleValue === 'Address' || styleValue === 'Smock' || styleValue === 'Tall' || styleValue === 'Job'
            ? {
                marginTop: '150px',
                position: 'absolute',
                width: '100% ',
                top: '265px '
            } : { marginTop: '40px' }} className='slide-in'>
            <h2 className='userInfo-title'> {title}</h2>
            <div className='dropdown-container'>
                <div name="" id="" className='dropdown-select' onClick={toggleDropdown}>

                    <span>{selected}</span>


                </div>
                <ul className="dropdown-options" >
                    {isOpen === true && options.map((option, index) => {
                        return (
                            <li key={index} onClick={(e) => handleSelect(option, e)}>
                                {option}
                            </li>
                        )
                    })}

                </ul>
            </div>
        </div>
    );
}

export default CostomDorpDown
