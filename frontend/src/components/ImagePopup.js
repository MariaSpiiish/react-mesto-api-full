function ImagePopup({card, onClose}) {
    
    return (
        <div className={card.name ? `popup popup_type_image popup_opened` : `popup popup_type_image`}>
          <div className="popup__image-container">
            <button type="button" className="popup__close-button popup__close-button_type_image" onClick={onClose}></button>
            <img src={card.link} alt={card.name} className="popup__image"/>
            <h2 className="popup__caption">{card.name}</h2>
          </div>
        </div> 
    )
}

export default ImagePopup;