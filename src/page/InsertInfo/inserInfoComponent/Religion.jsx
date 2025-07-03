import React from 'react'
import CostomDorpDown from './costomDropdown/dorpDown';


const Religion = ({ handleReligion, religion }) => {

    const religionList = [
        "무교",
        "기독교",
        "천주교",
        "불교",
        "원불교",
        "이슬람교",
        "힌두교",
        "유대교",
        "도교",
        "통일교",
        "기타",
    ];


    return (
        <CostomDorpDown 
        title="종교를 선택해주세요."
        plaseholder='종교를'
        options={religionList}
        onSelect={handleReligion}
        value={religion} />
    )
};

export default Religion
