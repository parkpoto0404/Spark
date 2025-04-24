import React from 'react'
import CostomDorpDown from '../costomDropdown/dorpDown';



const MBTI = ({handleMBTI,mbti}) => {

  
    const mbtiList = [
        "ISTJ", "ISFJ", "INFJ", "INTJ",
        "ISTP", "ISFP", "INFP", "INTP",
        "ESTP", "ESFP", "ENFP", "ENTP",
        "ESTJ", "ESFJ", "ENFJ", "ENTJ"
    ];

    return (
        <CostomDorpDown 
        title="MBTI를 선택해주세요."
        plaseholder='MBTI를'
        options={mbtiList}
        onSelect={handleMBTI}
        value={mbti} />
    )
};

export default MBTI
