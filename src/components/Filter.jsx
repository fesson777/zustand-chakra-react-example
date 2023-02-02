import { Button, Stack } from '@chakra-ui/react'
import { CheckCircleIcon, TimeIcon } from '@chakra-ui/icons'
import { useFilter } from '../store'

export default function Filter() {
  const { filter, setFilter } = useFilter()

  return (
    <Stack spacing={2} direction="row" mt="8">
      <Button isDisabled={filter === 'all'} onClick={() => setFilter('all')}>
        All
      </Button>
      <Button
        isDisabled={filter === 'uncompleted'}
        onClick={() => setFilter('uncompleted')}
        leftIcon={<TimeIcon />}
      >
        Not completed
      </Button>
      <Button
        isDisabled={filter === 'completed'}
        onClick={() => setFilter('completed')}
        leftIcon={<CheckCircleIcon />}
      >
        Completed
      </Button>
    </Stack>
  )
}
