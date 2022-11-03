import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    useEffect(() => {
      setName('');
      setLink('');
    }, [isOpen]); 

    function handleSubmit(e) {
        e.preventDefault();

        onAddPlace({
            name,
            link
        })
    }

    return (
        <PopupWithForm title='Новое место' name='place-edit' buttonText='Создать' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}> 
              <input 
                name="name"
                id="title-input"
                type="text"
                minLength="2"
                maxLength="30" 
                required
                placeholder="Название" 
                className="popup__input popup__input_type_place-title"
                value={name}
                onChange={(e) => {
                    return setName(e.target.value);
                }}
              />
              <span id="title-error" className="title-input-error popup__error"></span>
              <input 
                name="link"
                id="pic-link-input" 
                type="url" 
                required
                placeholder="Ссылка на картинку" 
                className="popup__input popup__input_type_pic-link"
                value={link}
                onChange={(e) => {
                return setLink(e.target.value);
                }}
              />
              <span id="pic-link-error" className="pic-link-input-error popup__error"></span>
            </PopupWithForm>
    )
}

export default AddPlacePopup;