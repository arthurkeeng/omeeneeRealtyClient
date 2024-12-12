import './list.scss'
import Card from"../card/Card"
import {listData} from"../../lib/dummydata"
import { useLoaderData } from 'react-router-dom'

function List({data}){
  // const data = useLoaderData()
 
  return (
    <div className='list'>
      {data.map(item=>(
        <Card key={item.id} item={item}/>
      ))}
    </div>
  )
}

export default List