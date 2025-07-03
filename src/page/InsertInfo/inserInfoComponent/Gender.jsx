import React from 'react'

const Gender = ({ handleGender, gender }) => {
    return (
        <div style={{ marginTop: '40px' }} className='slide-in'>
            <h2 className='userInfo-title'>성별</h2>
            <div className='gender-select'>
                <button
                    type='button'
                    className={`gender-f ${gender === 'F' ? 'selected' : ''}`}
                    onClick={() => handleGender('F')}
                >
                    여자
                </button>
                <button
                    type='button'
                    className={`gender-m ${gender === 'M' ? 'selected' : ''}`}
                    onClick={() => handleGender('M')}
                >
                    남자
                </button>
            </div>
        </div>
    );
};

export default Gender
