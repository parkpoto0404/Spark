import React from 'react'
import SelectableList from './SelectableList/SelectableList';



const Character = ({ handleCharacter, character }) => {


    const characterList = [
        '웃음이많아요',
        '예의가발라요',
        '긍정적인마인드',
        '솔직해요',
        '다정해요',
        '배려심이깊어요',
        '털털해요',
        '동물을좋아해요',
        '섬세해요',
        '수줍어요',
        '활발해요',
        '성실해요',
        '조용해요',
        '강아지상',
        '고양이상',
        '웃는게예뻐요',
        '비율이좋아요',
        '하얀피부',
        '큰눈',
        '타투',
        '섹시해요'
      ];


    return (
        <SelectableList 
        title="나의 매력을 어필해보세요."
        list={characterList}
        selected={character}
        onToggle={handleCharacter}/>
    )
}

export default Character
