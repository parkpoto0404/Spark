const AlertModal = ({ message, onCancel }) => {
    return (
      <div className='alertmodal-overlay' >
        <div className='alert-modal' >
          <p style={{marginBottom: '50px'}}>{message}</p>
          <div className='aler-tmodal-btns ' >
            <button className='alert-modal-cancelBtn' onClick={onCancel} >확인</button>
          </div>
        </div>
      </div>
    );
  };
  
  
export default AlertModal

