import { useEffect, useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.value = '';
    }, [isOpen])

    function handleSubmit(e) {
        e.preventDefault();
      
        onUpdateAvatar({
          avatar: inputRef.current.value,
        });

        onClose();
        inputRef.current.value = '';
      } 
    
    return (
        <PopupWithForm title='Обновить аватар' name='avatar' buttonText='Сохранить' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <input 
                name="avatar"
                id="avatar-link-input" 
                type="url" 
                required
                placeholder="https://somewebsite.com/someimage.jpg" 
                className="popup__input popup__input_type_pic-link"
                ref={inputRef}
            />
            <span id="avatar-link-error" className="avatar-link-input-error popup__error"></span>
        </PopupWithForm>
    )
} 

export default EditAvatarPopup;