import { SmallCloseIcon } from '@chakra-ui/icons'
import {
  Button,
  Checkbox,
  HStack,
  IconButton,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useFilter, useTodos } from '../store'

function Todo({ id, title, completed }) {
  const { toggleTodo, delTodo } = useTodos()

  return (
    <HStack spacing={4} justifyContent="space-between">
      <HStack spacing={2} w="md">
        <Checkbox isChecked={completed} onChange={() => toggleTodo(id)} />
        <Text>{title}</Text>
      </HStack>
      <IconButton
        aria-label="Search database"
        icon={<SmallCloseIcon />}
        onClick={() => delTodo(id)}
      />
    </HStack>
  )
}

export default function TodoList() {
  const filter = useFilter((state) => state.filter)
  const todos = useTodos((state) => {
    switch (filter) {
      case 'completed':
        return state.todos.filter((todo) => todo.completed)
      case 'uncompleted':
        return state.todos.filter((todo) => !todo.completed)
      default:
        return state.todos
    }
  })

  return (
    <Stack minH="300px">
      {todos.map((todo) => (
        <Todo key={todo.id} {...todo} />
      ))}
    </Stack>
  )
}
