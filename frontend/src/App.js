import React, {useState, useEffect}  from 'react'
import useJsonFetch from './hooks/useJsonFetch'

export default function App() {
  
  const [items] = useJsonFetch(process.env.REACT_APP_ITEMS_URL)
  const [data, setData] = useState([])
  const [draggedTask, setDraggedTask] = useState({})

  useEffect(() => {
    if(items.length > 0) {
      setData(items)
    }
  }, [items])

  const handleOnDrag = (event, todo) => {
    event.preventDefault();
    setDraggedTask(todo)
  }



  return (
    <table className="table table-dark">
      <thead>
        <tr>
          <th>№ п/п</th>
          <th>ФИО</th>
          <th>Задача</th>
          <th>Дата</th>
        </tr>
      </thead>

      <tbody>
        {data.length > 0 && data.map(o => (
          <tr key={o.id} draggable onDrag={(e) => handleOnDrag(e, o)}>
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
