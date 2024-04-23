(() => {
  'use strict'

  let scrolling = false

  const scroll = (element: HTMLElement, dir: string): void => {
    if (scrolling) {
      return
    }
    scrolling = true

    const inner = element.parentElement?.querySelector('.slide-inner') as HTMLElement
    const step = inner.offsetWidth
    let left = 0
    if (dir === 'left') {
      left = inner.scrollLeft - step
    } else {
      left = Math.min(inner.scrollWidth - inner.clientWidth, inner.scrollLeft + step)
    }
    if (left <= 0) {
      scrolling = false
      return
    }

    inner.scroll({
      left
    })
    const checker = setInterval(() => {
      if (left === inner.scrollLeft) {
        scrolling = false
        clearInterval(checker)
      }
    }, 50)
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll<HTMLElement>('.slide-control-left').forEach(element => {
      element.addEventListener('click', () => {
        scroll(element, 'left')
      })
    })
    document.querySelectorAll<HTMLElement>('.slide-control-right').forEach(element => {
      element.addEventListener('click', () => {
        scroll(element, 'right')
      })
    })

    const els = document.querySelectorAll<HTMLElement>('.slide-inner')
    els.forEach(el => {
      let startX = 0
      el.addEventListener('touchstart', (e: TouchEvent) => {
        startX = e.touches[0].clientX
      }, { passive: true })
      el.addEventListener('touchend', (e: TouchEvent) => {
        scroll(el, e.changedTouches[0].clientX > startX ? 'left' : 'right')
      }, { passive: true })
    })
  })
})()
