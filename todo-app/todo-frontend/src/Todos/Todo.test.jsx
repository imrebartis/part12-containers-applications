import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { vi, describe, it, expect } from 'vitest'
import Todo from './Todo'

describe('Todo Component', () => {
  const todo = { id: 1, text: 'Test Todo', done: false }
  const deleteTodo = vi.fn()
  const completeTodo = vi.fn()

  it('renders todo text', () => {
    render(<Todo todo={todo} onClickDelete={deleteTodo} onClickComplete={completeTodo} />)
    expect(screen.getByText('Test Todo')).toBeInTheDocument()
  })
})
