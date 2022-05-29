import React from 'react'

const Todo = ({todo}) => {
  return (
    <>
    {todo.map(ele=><h4 key={ele.id}>{ele.id+" : "+ele.task}</h4>)}
    </>
  )
}

export default Todo