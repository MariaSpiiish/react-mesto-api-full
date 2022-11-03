import InfoToolTip from "./InfoToolTip";
import successIcon from "../images/tick-icon.svg";
import failureIcon from "../images/cross-icon.svg";

function RegistrationResult({isSuccessful, onClose, isOpen}) {
    if(isSuccessful) {
        return (
            <InfoToolTip 
                name='tool-tip'
                onClose={onClose}
                isOpen={isOpen}
                title='Вы успешно зарегистрировались!'
                icon={successIcon}
                iconAlt='Галочка'
            />
        )
    } else {
        return (
            <InfoToolTip 
                name='tool-tip'
                onClose={onClose}
                isOpen={isOpen}
                title='Что-то пошло не так! Попробуйте ещё раз.'
                icon={failureIcon}
                iconAlt='Крестик'
            />
        )
    }
}

export default RegistrationResult;