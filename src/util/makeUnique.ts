export const makeUnique = (items: string[]) => {
  const newList = []
  items.forEach(v=>newList.includes(v)?void 0:newList.push(v))
  return newList
}