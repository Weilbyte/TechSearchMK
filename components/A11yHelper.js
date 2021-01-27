import { useEffect } from 'react'

export default function A11yHelper () {
    useEffect(() => {
        document.addEventListener('click', e => {
            document.querySelectorAll('.moused').forEach(element => {
                element.classList.remove('moused')
            })
            if (
                e.target.tagName === 'SPAN' &&
                e.target.parentElement.tagName === 'BUTTON'
            ) {
                e.target.parentElement.classList.add('moused')
            } else {
                e.target.classList.add('moused')
            }
        })
    }, [])

    return null
}
