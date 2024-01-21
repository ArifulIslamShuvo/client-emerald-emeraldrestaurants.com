import './Button.css'
import './DefocusedButton/DefocusedButton.css'
import './PrimaryButton/PrimaryButton.css'
import './InvertedButton/InvertedButton.css'

function Button({type, handleClick, btnText, look}) {
  return (
    <button 
        type={type} 
        className={
            `
            btn 
            ${look === 'defocused' ? 'defocusedBtn' : ''}
            ${look === 'primary' ? 'primaryBtn' : ''}
            ${look === 'inverted' ? 'invertedBtn' : ''}
            `
        }
        onClick={handleClick}
    >
        {btnText}
    </button>
  )
}

export default Button