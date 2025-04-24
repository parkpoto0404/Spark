import React from 'react'

const BirthDay = ({ handleBirthday, birthday }) => {

    return (

        <div style={{ marginTop: '40px' }} className='slide-in'>
            <h2 className='userInfo-title'>생년월일을 알려주세요.</h2>
            <div className='inputs-container'>
                <input
                    type="text"
                    className='inputs'
                    placeholder='ex) 19900101 '
                    value={birthday}
                    onChange={handleBirthday}
                />
            </div>
        </div>
    )
}

export default BirthDay
