import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Card from './Card';
import Header from './Header';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete, cards, ownerEmail}) {
  const currentUser = useContext(CurrentUserContext);
  const history = useHistory();
    
    return (
      <>
        <Header 
          ownerEmail={ownerEmail} 
          redirect={() => {
            localStorage.removeItem('token');
            history.push("/sign-in");
          }}
          buttonText="Выйти"
        />
        
        <main className="content">
            <section className="profile">
              <div className="profile__avatar">
                <button type="button" className="profile__avatar-edit-button" onClick={onEditAvatar }></button>
                <img className="profile__avatar-pic" src={currentUser.avatar} alt='Аватар пользователя'/>
              </div>
              <div className="profile__info">
                <h1 className="profile__title">{currentUser.name}</h1>
                <button className="button profile__edit-button opacity" onClick={onEditProfile}></button>
                <p className="profile__subtitle">{currentUser.about}</p>
              </div>
              <button type="button" className="profile__add-button opacity" onClick={onAddPlace}></button>
            </section>

            <section className="photo-grid">
              <ul className="photo-grid__items">
                {cards.map((card) => (
                  <Card 
                    key={card._id}
                    _id={card._id}
                    link={card.link} 
                    name={card.name} 
                    likes={card.likes}
                    owner={card.owner}
                    onCardClick={onCardClick}
                    onCardLike={onCardLike}
                    onCardDelete={onCardDelete}
                    
                  />
                ))}
              </ul>
            </section>

        </main>
      </>  
    );
}

export default Main;