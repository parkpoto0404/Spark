import React from 'react'
import CostomDorpDown from './costomDropdown/dorpDown';


const Job = ({ handleJob, job }) => {
    
    const jobList = [
        "학생",
        "회사원",
        "자영업",
        "전문직",
        "공무원",
        "프리랜서",
        "무직",
        "서비스직",
        "교육직",
        "의료직",
        "예술/문화/디자인",
        "개발자/IT",
        "운전/운송",
        "생산/기술직",
        "군인",
        "기타"
    ];



    return (
        <CostomDorpDown 
        title="직업을 선택해주세요."
        plaseholder='직업을'
        styleValue='Job'
        options={jobList}
        onSelect={handleJob}
        value={job} />
    )
}

export default Job
