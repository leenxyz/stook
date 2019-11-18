/**
 * check form field is touched
 * @param touched touched Object
 * @param name form field name
 */
export function isTouched(touched: any, name: string) {
  if (touched[name]) return !!touched[name]
  return false
}
