import React, {useState, useEffect}  from 'react'
import useJsonFetch from './hooks/useJsonFetch'

export default function App() {
  const [items] = useJsonFetch(process.env.REACT_APP_ITEMS_URL)
  const [data, setData] = useState([]) // БД
  const [draggedTask, setDraggedTask] = useState({})

  useEffect(() => {
    if(items.length > 0) {
      setData(items)
    }
  }, [items])

  const handleOnDrag = (event, todo) => { // элемент, который тянут
    event.preventDefault()
    setDraggedTask(todo)
  }

  const handleOnDragOver = (event) => {
    event.preventDefault();
  }

  const handleOnDrop = (event, todo) => { // элемент, рядом с которым падает первый (тот, который тянут)
    event.preventDefault()
    const newArr = data.filter(task => task.id !== draggedTask.id)
    if(todo === undefined) {
      newArr.splice(0, 0, draggedTask)
    } else {
      newArr.splice(todo.id-1, 0, draggedTask)
    }
    setData(newArr)
    setDraggedTask({})
    console.log(todo)
  }

  return (
    <table className="table table-dark">
      <thead>
        <tr draggable onDrop={e => handleOnDrop(e)} onDragOver={e => handleOnDragOver(e)}>
          <th>№ п/п</th>
          <th>ФИО</th>
          <th>Задача</th>
          <th>Дата</th>
        </tr>
      </thead>

      <tbody>
        {data.length > 0 && data.map(o => (
          <tr key={o.id} draggable onDrag={(e) => handleOnDrag(e, o)} onDrop={e => handleOnDrop(e, o)} onDragOver={e => handleOnDragOver(e)}>
            <th scope="row">{o.npp}</th>
            <td>{o.user}</td>
            <td>{o.task}</td>
            <td>{o.date}</td>
          </tr>
        ))}

      </tbody>
    </table>
  );
}
