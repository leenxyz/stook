/**
 * check form is valid
 * @param errors errors object
 */
export function checkValid(errors: any = {}) {
  let errorString = ''
  function getErrrorString(errors: any = {}) {
    Object.keys(errors).forEach(key => {
      if (typeof errors[key] === 'object') {
        getErrrorString(errors[key])
      } else {
        errorString += errors[key]
      }
    })
  }
  getErrrorString(errors)
  return !errorString.length
}
