const HomeModal = ({ message, onConfirm, onCancel }) => {
    return (
      <div className='modal-overlay' >
        <div className='modal' >
          <p>{message}</p>
          <div className='modal-btns' >
            <button className='modal-confirmBtn' onClick={onConfirm}>확인</button>
            <button className='modal-cancelBtn' onClick={onCancel} >취소</button>
          </div>
        </div>
      </div>
    );
  };
  
  
export default HomeModal

