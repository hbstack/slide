(() => {
  'use strict'

  const scroll = (element: HTMLElement, dir: string): void => {
    const inner = element.parentElement?.querySelector('.slide-inner') as HTMLElement
    const step = inner.offsetWidth
    let left = 0
    if (dir === 'left') {
      left = inner.scrollLeft - step
    } else {
      left = inner.scrollLeft + step
    }
    inner.scroll({
      left,
      behavior: 'smooth'
    })
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
