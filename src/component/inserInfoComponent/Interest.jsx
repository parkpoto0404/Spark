import React from 'react'



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
        <div style={{ marginTop: '40px' }} className='slide-in'>
            <h2 className='userInfo-title'>취미를 골라주세요.</h2>
            <div className='interest-select'>

                {interestList.map((item) => {
                    return (

                        <button
                            key={item}
                            type='button'
                            className={`interestList-item ${interest.includes(item) ? 'selected' : ''}`}
                            onClick={() => handleInterest(item)}
                        >
                            {item}

                        </button>
                    )
                })}

            </div>
        </div>
    )
}

export default Interest
