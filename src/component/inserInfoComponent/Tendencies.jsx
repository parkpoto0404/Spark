import React from 'react'
import SelectableList from '../SelectableList/SelectableList';



const Tendencies = ({ handleTendencies, tendencies }) => {


    const tendenciesList = [
        '결혼의향있음',
        '진지한연애',
        '연애부터',
        '친구부터',
        '다정한스킨십',
        '상대에게맞춰줘요',
        '함께시간보내기',
        '취미공유',
        '표현을잘해요',
        '꼼꼼한계획',
        '집에서놀기',
        '놀이공원가기',
        '산책하기',
        '같이운동하기',
        '같이게임하기',
        '콘서트관람',
        '여행가기',
        '잘모르겠음'
      ];


    return (
        <SelectableList 
        title="연예성향을 골라주세요."
        list={tendenciesList}
        selected={tendencies}
        onToggle={handleTendencies}/>
    )
}

export default Tendencies
