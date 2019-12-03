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

export function getConfigByArgv() {
  const args = process.argv.slice(2)

  if (args.length > 0) {
    const mode = args[0]

    if (mode == 'test') {
      return test
    }

    if (mode == 'prod') {
      return prod
    }
  }

  return dev
}

export function getConfigByEnv() {
  for (let prop in process.env) {
    if (prop.toLowerCase() == 'mode') {
      if (process.env[prop] == 'test') {
        return test
      }
  
      if (process.env[prop] == 'prod') {
        return prod
      }  
    }
  }

  return dev
}
