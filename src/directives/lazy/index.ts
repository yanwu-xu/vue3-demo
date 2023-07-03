import defaultImageUrl from '@/assets/images/noAuth.png' // 未加载 完成 图片时的默认图片

const lazy = {
  name: 'lazy',
  install(vue) {
    vue.directive(lazy.name, {
      mounted(el, binding) {
        const options = {
          root: null,
          rootMargin: '0px',
          threshold: 0.1,
        }
        const observer = new IntersectionObserver((entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const defaultImage = new Image()
              defaultImage.src = defaultImageUrl
              defaultImage.onload = () => {
                el.src = binding.value
              }
              observer.unobserve(el)
            }
          })
        }, options)
        // 页面挂载后，开启观察
        observer.observe(el)
      }
    })
  }
}

export default lazy

