import { useState } from 'react'
import { Center, VStack } from '@chakra-ui/react'
import { useI18n } from 'next-localization'

import { Search } from '../components/Search'
import { ResultDisplay } from '../components'

export default function Home () {
    const { t } = useI18n()
    const [results, setResults] = useState([])

    return (
        <Center h='100%'>
            <VStack spacing={20}>
                <Search setResults={setResults} />
                <ResultDisplay results={results} />
            </VStack>
        </Center>
    )
}
