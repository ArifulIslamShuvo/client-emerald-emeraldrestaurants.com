import Button from '../Button'

function InvertedButton({type, btnText, handleClick}) {
  return (
    <Button
      type={type}
      look='inverted'
      btnText={btnText}
      handleClick={handleClick}
    />
  )
}

export default InvertedButton