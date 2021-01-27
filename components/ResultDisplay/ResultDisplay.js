import { Box, SimpleGrid, Button, ButtonGroup, Tooltip } from '@chakra-ui/react'
import { ArrowUpDownIcon, ArrowUpIcon, ArrowDownIcon } from '@chakra-ui/icons'
import { useI18n } from 'next-localization'
import { useState } from 'react'

import { ResultCard } from '../'

export default function ResultDisplay ({ results }) {
    const { t } = useI18n()

    const perPage = 16

    const [currentPage, setPage] = useState(0)
    const [priceSort, setPriceSort] = useState('none')

    const sortResults = [...results]
    switch (priceSort) {
        case 'ascend':
            sortResults.sort((a, b) => a.price - b.price)
            break
        case 'descend':
            sortResults.sort((a, b) => b.price - a.price)
            break
    }

    let pages = (priceSort === 'none' ? results : sortResults).reduce(
        (resultArray, item, index) => {
            const chunkIndex = Math.floor(index / perPage)

            if (!resultArray[chunkIndex]) {
                resultArray[chunkIndex] = []
            }

            resultArray[chunkIndex].push(<ResultCard data={item} />)

            return resultArray
        },
        []
    )

    const buttons = pages.map((_, i) => {
        return (
            <Button
                onClick={() => setPage(i)}
                title={`${t('page')} ${i + 1}`}
                isActive={i === currentPage}
            >
                {i + 1}
            </Button>
        )
    })

    const changeSort = () => {
        switch (priceSort) {
            case 'none':
                setPriceSort('ascend')
                break
            case 'ascend':
                setPriceSort('descend')
                break
            case 'descend':
                setPriceSort('none')
                break
        }
    }

    const changeText = () => {
        return priceSort === 'none'
            ? t('priceAscending')
            : priceSort === 'ascend'
            ? t('priceDescending')
            : t('priceNone')
    }

    return (
        <Box visibility={results.length === 0 ? 'hidden' : 'visible'}>
            <ButtonGroup>
                <Tooltip label={changeText()}>
                    <Button
                        title={changeText()}
                        leftIcon={
                            priceSort === 'none' ? (
                                <ArrowUpDownIcon />
                            ) : priceSort === 'ascend' ? (
                                <ArrowUpIcon />
                            ) : (
                                <ArrowDownIcon />
                            )
                        }
                        onClick={() => changeSort()}
                    >
                        {t('price')}
                    </Button>
                </Tooltip>
                <ButtonGroup marginBottom='15px' isAttached>
                    {buttons}
                </ButtonGroup>
            </ButtonGroup>

            <SimpleGrid columns={4} spacing={5}>
                {pages[currentPage]}
            </SimpleGrid>
        </Box>
    )
}
