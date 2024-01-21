import Button from '../Button'

function PrimaryButton({type, btnText, handleClick}) {
  return (
    <Button
      type={type}
      look='primary'
      btnText={btnText}
      handleClick={handleClick}
    />
  )
}

export default PrimaryButton