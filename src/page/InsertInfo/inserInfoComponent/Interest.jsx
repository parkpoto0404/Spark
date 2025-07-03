import React from 'react'
import SelectableList from './SelectableList/SelectableList'



const Interest = ({ handleInterest, interest }) => {


    const interestList = [
        '영화',
        '드라마',
        '유튜브',
        '음악듣기',
        '맛집투어',
        '카페가기',
        '노래방',
        '게임',
        '요리',
        '쇼핑',
        '호캉스',
        '애니',
        '악기연주',
        '댄스',
        '여행',
        '등산',
        '캠핑',
        '낚시',
        '독서',
        '글쓰기',
        '봉사활동'
    ]


    return (
        <SelectableList 
        title="취미를 골라주세요."
        list={interestList}
        selected={interest}
        onToggle={handleInterest}/>
    )
}

export default Interest
