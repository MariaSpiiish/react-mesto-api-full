function InfoToolTip({name, onClose, isOpen, title, icon, iconAlt}) {
    return (
        <div className={isOpen ? `popup popup_type_${name} popup_opened` : `popup popup_type_${name}`}>
            <div className="popup__container">
                <button type="button" className="popup__close-button" onClick={onClose}></button>
                <img src={icon} alt={iconAlt} className="popup__icon"/>
                <h2 className="popup__info">{title}</h2>
            </div>
        </div>
    )
}

export default InfoToolTip;