import { Text } from '@chakra-ui/react'
import { useTodos } from '../store'

export default function TotalTodos() {
  const count = useTodos((state) => state.todos.length)

  return <Text fontWeight="bold">Total: {count}</Text>
}
