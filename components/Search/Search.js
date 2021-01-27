import React, { useState } from 'react'
import { useI18n } from 'next-localization'
import {
    InputGroup,
    Input,
    InputRightElement,
    Button,
    Tooltip,
    useToast
} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'

import GetResults from '../../utils/Handler'

import styles from './Search.module.sass'

export default function Search (props) {
    const { t } = useI18n()
    const toast = useToast()
    const [searchTerm, setSearchTerm] = useState('')
    const [loading, setLoading] = useState(false)

    const search = async value => {
        const include = [],
            exclude = [],
            required = []

        const valueSplit = value.split(' ')
        for (const i in valueSplit) {
            const word = valueSplit[i]
            if (word === '') continue
            if (word.startsWith('-')) {
                exclude.push(word.substring(1))
            } else if (word.startsWith('+')) {
                required.push(word.substring(1))
                include.push(word.substring(1))
            } else {
                include.push(word)
            }
        }

        console.log({
            include,
            exclude,
            required
        })
        setLoading(true)
        const results = await GetResults(include, exclude, required)
        if (results.length === 0) {
            toast({
                title: t('error'),
                description: t('errorTermNoResult'),
                status: 'error'
            })
            props.setResults([])
        } else {
            props.setResults(results)
        }
        setLoading(false)
    }

    const submit = () => {
        const term = searchTerm
        if (term.trim().length < 2) {
            toast({
                title: t('error'),
                description: t('errorTermShort'),
                status: 'error'
            })
        } else {
            search(term)
        }
    }

    const searchChange = e => {
        setSearchTerm(e.target.value)
    }

    const searchKey = e => {
        if (e.key === 'Enter') submit()
    }

    return (
        <div className={styles.searchbox}>
            <InputGroup size='lg'>
                <Input
                    type='text'
                    isDisabled={loading}
                    placeholder={t('searchTerm')}
                    onChange={e => searchChange(e)}
                    onKeyDown={e => searchKey(e)}
                    value={searchTerm}
                />
                <InputRightElement w='4rem'>
                    <Tooltip label={t('search')} aria-label='Tooltip'>
                        <Button
                            isLoading={loading}
                            h='1.75rem'
                            w='3rem'
                            title={t('search')}
                            size='lg'
                            onClick={submit}
                        >
                            <SearchIcon />
                        </Button>
                    </Tooltip>
                </InputRightElement>
            </InputGroup>
        </div>
    )
}
