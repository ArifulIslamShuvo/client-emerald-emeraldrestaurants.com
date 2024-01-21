import Button from '../Button'

function DefocusedButton({type, btnText, handleClick}) {
  return (
    <Button
      type={type}
      look='defocused'
      btnText={btnText}
      handleClick={handleClick}
    />
  )
}

export default DefocusedButton