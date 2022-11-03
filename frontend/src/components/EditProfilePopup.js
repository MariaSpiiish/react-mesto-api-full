import { useContext, useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({isOpen, onUpdateUser, onClose}) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]); 

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
  
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  } 

  return (
    <PopupWithForm title='Редактировать профиль' name='profile-edit' buttonText='Сохранить' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}> 
      <input 
        name="name"
        id="name-input"
        type="text"
        minLength="2"
        maxLength="40"
        required
        placeholder="Имя"
        className="popup__input popup__input_type_name"
        onChange={(e) => {
          return setName(e.target.value);
        }}
        value={name}
      />
      <span id="name-error" className="name-input-error popup__error"></span>
      <input 
        name="about"
        id="job-input"
        type="text"
        minLength="2"
        maxLength="200"
        required
        placeholder="О себе"
        className="popup__input popup__input_type_info"
        onChange={(e) => {
          return setDescription(e.target.value);
        }}
        value={description}
      />
      <span id="job-error" className="job-input-error popup__error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;