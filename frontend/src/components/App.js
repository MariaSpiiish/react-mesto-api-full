import { useEffect, useState } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import { getUserInfo, patchUserInfo, patchUserAvatar, getCards, postNewCard, deleteCard, setCardLike } from '../utils/Api';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import RegistrationResult from './RegistrationResult';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { auth } from '../utils/Auth';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isRegistrationSuccessful, setIsRegistrationSuccessful] = useState(false);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({name: '', about: '', avatar: ''});
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory();
  const [ownerEmail, setOwnerEmail] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    const checkToken = () => {
        const token = localStorage.getItem('token');
        if(token) {
          auth.getToken(token)
            .then((res) => {
              const {email} = res;
              setOwnerEmail(email);
              setIsLoggedIn(true);
              history.push("/react-mesto-auth");
            })
            .catch((err) => {
              console.log(`Что-то не так с токеном: ${err}`);
            });
        }
    }
    checkToken();
  }, [history]);
      
  useEffect(() => {
    if(isLoggedIn) {
      Promise.all([getUserInfo(token), getCards(token)])
        .then(([user, data]) => {
          setCurrentUser(user);
          setCards(data);
          history.push("/react-mesto-auth");
        })
        .catch((err) => {
          console.log(`Ошибка загрузки пользователя и карточек ${err}`);
        });
    }
  }, [isLoggedIn, history, token]);

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoPopupOpen(false);
    setSelectedCard({});
  }

  const handleRegistration = (data) => {
    auth.register(data.email, data.password)
        .then((res) => {
            if(res) {
              handleRegistrationResult(true);
              history.push("/sign-in");
            }
        })
        .catch((err) => {
          handleRegistrationResult(false)
          console.log(`Ошибка в регистрации пользователя: ${err}`);
        });
  }

  const handleRegistrationResult = (result) => {
    setIsRegistrationSuccessful(result);
    setIsInfoPopupOpen(true);
  }

  const handleLogin = (data) => {
    auth.authorize(data.email, data.password)
      .then((res) => {
          if (res.token){
              localStorage.setItem('token', res.token);
              setIsLoggedIn(true);
              setOwnerEmail(data.email);
              history.push("/react-mesto-auth");
          }
      })
      .catch((err) => {
        handleRegistrationResult(false)
        console.log(`Пользователь не найден: ${err}`);
      });
  }

  const handleUpdateUser = (currentUser) => {
    patchUserInfo(currentUser)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка в обновлении данных пользователя: ${err}`);
      });
  }

  const handleUpdateAvatar = (currentUser) => {
    patchUserAvatar(currentUser)
      .then((userAvatar) => {
        setCurrentUser(userAvatar)
      })
      .catch((err) => {
        console.log(`Ошибка в обновлении аватара пользователя: ${err}`);
      });
  }

  const handleAddPlace = (card) => {
    postNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]); 
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка в обновлении новой карточки: ${err}`);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    
    setCardLike(card._id, (!isLiked ? 'PUT' : 'DELETE'))
      .then((newCard) => {
        setCards(stateCards => {
          return stateCards.map((c) => (
            c._id === card._id ? newCard : c
          ))
        })
      })
      .catch((err) => {
        console.log(`Ошибка в постановке лайка: ${err}`);
      });
  }

  function handleCardDelete(card) {
    deleteCard(card, card._id)
      .then(() => {
        setCards(stateCards => stateCards.filter((c) => {
          return c._id !== card._id
        }))
      })
      .catch((err) => {
        console.log(`Ошибка в удалении карточки: ${err}`);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
        <div className="page-container">
          <div className="page">
            
            <Switch>
              <ProtectedRoute 
                  onEditAvatar={setIsEditAvatarPopupOpen} 
                  onEditProfile={setIsEditProfilePopupOpen} 
                  onAddPlace={setIsAddPlacePopupOpen} 
                  onCardClick={setSelectedCard} 
                  onCardLike={handleCardLike} 
                  onCardDelete={handleCardDelete}
                  cards={cards}
                  ownerEmail={ownerEmail} 
                  path="/react-mesto-auth"
                  loggedIn={isLoggedIn}
                  component={Main}
              />

              <Route path="/sign-in">
                <Header redirect={() => history.push("/sign-up")} buttonText="Регистрация" />
                <Login onLogin={handleLogin}/>
              </Route>

              <Route path="/sign-up">
                <Header redirect={() => history.push("/sign-in")} buttonText="Войти" />
                <Register onRegister={handleRegistration}/>
              </Route>

              <Route exact path="/">
                {isLoggedIn ? <Redirect to="/react-mesto-auth" /> : <Redirect to="/sign-in" />}
              </Route>
            
            </Switch>
            <Footer />

            <RegistrationResult isOpen={isInfoPopupOpen} onClose={closeAllPopups} isSuccessful={isRegistrationSuccessful}/>
            <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/> 
            <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace} />

            <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
            
          </div>
        </div>
    </CurrentUserContext.Provider>  
  );
}

export default App;
