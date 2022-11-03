import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useContext } from 'react';

function Card(props) {
    const currentUser = useContext(CurrentUserContext);
    
        // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = props.owner === currentUser._id;
    const cardDeleteButtonClassName = (
    `card__trash opacity ${isOwn && 'card__trash_active'}`
    ); 

        // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = props.likes.some(i => i === currentUser._id);
    const cardLikeButtonClassName = (
        `card__like opacity ${isLiked && 'card__like_active'}`
    ); 

    const handleCardClick = () => {
        props.onCardClick(props);
    }

    const handleLikeClick = () => {
        props.onCardLike(props);
    }

    const handleCardDelete = () => {
        props.onCardDelete(props);
    }

    return (
        <li className="card">
            <img 
                src={props.link} 
                alt={props.name} 
                className="card__image" 
                onClick={handleCardClick}
            />
            <button type="button" className={cardDeleteButtonClassName} onClick={handleCardDelete}></button>
            <div className="card__caption">
                <h2 className="card__title">{props.name}</h2>
                <div className="card__like-area">
                <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                <span className="card__like-count">{props.likes.length}</span>
                </div>
            </div>
        </li>
    )
}

export default Card;