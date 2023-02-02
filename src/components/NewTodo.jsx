import { EditIcon } from '@chakra-ui/icons'
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Input,
  InputLeftElement,
  InputGroup,
} from '@chakra-ui/react'
import { useRef } from 'react'
import { useTodos } from '../store'

export default function NewTodo() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const ref = useRef()
  const addTodo = useTodos((state) => state.addTodo)

  const handleAddTodo = () => {
    addTodo(ref.current.value)
    onClose()
  }

  return (
    <>
      <Button colorScheme="teal" onClick={onOpen}>
        Add new todo
      </Button>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create new todo</DrawerHeader>

          <DrawerBody>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<EditIcon color="gray.500" />}
              />
              <Input
                placeholder="Type here..."
                ref={ref}
                onKeyDown={(e) => e.key === 'Enter' && handleAddTodo()}
                autoFocus
              />
            </InputGroup>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleAddTodo}>
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
