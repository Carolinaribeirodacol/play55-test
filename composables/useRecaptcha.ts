export function useRecaptcha() {
  const siteKey = '6LfTVC8rAAAAAISI8s59lF0JcXMq_XfgsHsepO5U'

  const loadScript = () => {
    return new Promise<void>((resolve) => {
      if (!process.client) return resolve()
      if (window.grecaptcha) return resolve()

      const script = document.createElement('script')
      script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`
      script.async = true
      script.defer = true
      script.onload = () => resolve()
      document.head.appendChild(script)
    })
  }

  const executeRecaptcha = async (action: string): Promise<string> => {
    await loadScript()

    return new Promise((resolve) => {
      if (!process.client) return resolve('')
      window.grecaptcha.ready(() => {
        window.grecaptcha.execute(siteKey, { action }).then(resolve)
      })
    })
  }

  return { executeRecaptcha }
}
