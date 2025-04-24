import React from 'react'
import CostomDorpDown from '../costomDropdown/dorpDown';


const Tall = ({ handleTall, tall }) => {

    const tallList = [
        "140 - 145",
        "145 - 150",
        "150 - 155",
        "155 - 160",
        "165 - 170",
        "170 - 175",
        "175 - 180",
        "185 - 190",
    ];

  

    return (
        <CostomDorpDown 
        title="키를 선택해주세요."
        plaseholder='키를'
        styleValue='Tall'
        options={tallList}
        onSelect={handleTall}
        value={tall} />
    )
}

export default Tall
