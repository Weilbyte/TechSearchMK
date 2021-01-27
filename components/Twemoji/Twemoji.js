import twemoji from 'twemoji'

import styles from './Twemoji.module.sass'

export default function Twemoji ({ emoji }) {
    return (
        <span
            className={styles.icon}
            dangerouslySetInnerHTML={{
                __html: twemoji.parse(emoji, {
                    folder: 'svg',
                    ext: '.svg'
                })
            }}
        />
    )
}
