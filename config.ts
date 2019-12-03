export const dev = {
}

export const test = merge(dev, {
})

export const prod = merge(dev, {
})

export function merge(...objects: any[]) {
  const isObject = (obj: any) => obj && typeof obj === 'object'
  
  return objects.reduce((previous, current) => {
    Object.keys(current).forEach(key => {
      const previousValue = previous[key]
      const currentValue = current[key]
      
      if (Array.isArray(previousValue) && Array.isArray(currentValue)) {
        previous[key] = previousValue.concat(...currentValue)
      }
      else if (isObject(previousValue) && isObject(currentValue)) {
        previous[key] = merge(previousValue, currentValue)
      }
      else {
        previous[key] = currentValue
      }
    })
    
    return previous
  }, {})
}