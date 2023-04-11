(() => {
    'use strict'

    const scroll = (element) => {
        const inner = element.parentElement.querySelector('.slide-inner')
        const step = inner.offsetWidth
        let left = 0
        if (element.classList.contains('slide-control-left')) {
           left = inner.scrollLeft - step
        } else {
           left = inner.scrollLeft + step
        }
        inner.scroll({
            left: left,
            behavior: 'smooth'
        })
    }
    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('.slide-control-left').forEach(element => {
            element.addEventListener('click', () => {
                scroll(element)
            })
        })
        document.querySelectorAll('.slide-control-right').forEach(element => {
            element.addEventListener('click', () => {
                scroll(element)
            })
        })
    })
})()
