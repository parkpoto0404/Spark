import React from 'react'
import CostomDorpDown from '../costomDropdown/dorpDown';


// LastEducation 컴포넌트
const Education = ({handleEducation,education}) => {

  
    const educationList = ['대학교', '전문대', '고등학교', '중학교'];

    return (
        <CostomDorpDown 
        title="최종학력을 선택해주세요."
        plaseholder='최종학력을'
        options={educationList}
        onSelect={handleEducation}
        value={education} />
    )
};

export default Education
