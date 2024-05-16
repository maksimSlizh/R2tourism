export const validateInputString = (str: string) : boolean => {
  const regex = /^[a-zA-Z0-9@._-]*$/
  return typeof str === 'string' && regex.test(str)
}
