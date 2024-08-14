export const removeClass = (elementsArray:Array<Element>, className:string, startTime:number, increment:number) => {
  let counter = 0
  for (const element of elementsArray) {
    setTimeout(() => {
      element.classList.remove(className);
    }, startTime + increment * counter)
    counter++;
  }
}