import React from 'react';

const SelectableList = ({ title, list, selected, onToggle }) => {
  return (
    <div style={{ marginTop: '40px' }} className='slide-in'>
      <h2 className='userInfo-title'>{title}</h2>
      <div className='infoList-select'>
        {list.map((item) => (
          <button
            key={item}
            type='button'
            className={`infoList-item ${selected.includes(item) ? 'selected' : ''}`}
            onClick={() => onToggle(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelectableList;