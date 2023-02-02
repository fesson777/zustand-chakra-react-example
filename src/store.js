import { nanoid } from 'nanoid'
import { create } from 'zustand'
import { persist, devtools, createJSONStorage } from 'zustand/middleware'
import produce from 'immer'

export const useTodos = create(
  devtools(
    persist(
      (set, get) => ({
        todos: [
          { id: 1, title: 'Learn JS', completed: true },
          { id: 2, title: 'Learn React', completed: false },
        ],
        loading: false,
        error: null,
        // addTodo: (title) => set(state => {
        //   const newTodo = { id: nanoid(), title, completed: false }

        //   return { todos: [...state.todos, newTodo] }
        // })
        // addTodo: (title) => set(state => ({ todos: [...state.todos, { id: nanoid(), title, completed: false }] }))
        addTodo: (title) => {
          const newTodo = { id: nanoid(), title, completed: false }

          set(
            produce((state) => {
              state.todos = [...get().todos, newTodo]
            })
          )
        },
        delTodo: (id) => {
          set({ todos: [...get().todos].filter((todo) => todo.id !== id) })
        },
        toggleTodo: (todoId) =>
          set({
            todos: get().todos.map((todo) =>
              todoId === todo.id
                ? { ...todo, completed: !todo.completed }
                : todo
            ),
          }),
        fetchTodos: async () => {
          set(
            produce((state) => {
              state.loading = true
            })
          )

          try {
            const res = await fetch(
              'https://jsonplaceholder.typicode.com/todos?_limit=10'
            )

            if (!res.ok) throw new Error('Failed to fetch! Try again.')

            set({ todos: await res.json(), error: null })
          } catch (error) {
            set({ error: error.message })
          } finally {
            set({ loading: false })
          }
        },
      }),
      {
        name: 'todo-storage', // unique name
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
)

export const useFilter = create((set) => ({
  filter: 'all',
  setFilter: (value) => set({ filter: value }),
}))

// counter store  (different set state)

// export const useSome = create((set) => ({
//   count: 0,
//   add: () => set(produce((state) => {state.count++})), // with immer
//   del: () => set((state) => ({ count: state.count - 1 })), //without immer
// }))

// const { count, add, del } = useSome()
// <div>
// <Text>{count}</Text>
//       <Button onClick={add}>+</Button>
//       <Button onClick={del}>-</Button>
// </div>
