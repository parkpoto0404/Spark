import React from 'react'
import CostomDorpDown from '../costomDropdown/dorpDown';

const Smock = ({ handleSmock, smock }) => {

    const smockList = [
        "자주",
        "가끔",
        "안함"
    ];


    return (
        <CostomDorpDown 
        title="흡연여부를 선택해주세요."
        plaseholder='흡연여부를'
        styleValue='Smock'
        options={smockList}
        onSelect={handleSmock}
        value={smock} />
    );
};

export default Smock
