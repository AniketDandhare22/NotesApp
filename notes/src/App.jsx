import { useState } from "react";

function App() {
  const[title,setTitle]  =  useState('');
  const[detail,setDetail]  =  useState('');
  const[editIndex,setEditIndex]  =  useState(null);
  const[task,setTask]  =  useState([]);
  const submitForm = (e) =>{
      e.preventDefault()
      if(title==='' && detail==='') return;
      if(editIndex !== null) {
        const updatedTask = [...task];
        updatedTask[editIndex] = { title, detail };
        setTask(updatedTask);
        setEditIndex(null);
      } 
      else{
        const NewTask = [...task]
        NewTask.push({title,detail});
        setTask(NewTask);
      }
      setTitle('');
      setDetail('')
  }

  const handleEdit = (id) =>{
    const copy = [...task]
    setEditIndex(id);
    setDetail(copy[id].detail);
    setTitle(copy[id].title);

  }

  const handleDelete = (id)=>{
    const deleteNode = [...task];
    deleteNode.splice(id,1);
    setTask(deleteNode);
  }
  return (
      <div className="bg-black text-white h-screen  lg:flex ">
          <form onSubmit={(e)=>{submitForm(e)}} className="lg:w-1/2 p-10 gap-4 items-start flex-col">
            <p className="font-bold text-4xl mb-5"> Add Notes</p>
            <input type="text" 
                  value={title}
                  placeholder="Title - Topic "
                  className=" rounded-lg border-2 pl-5 p-2 m-2 text-2xl font-bold w-full"
                  onChange={(e)=>{
                    setTitle(e.target.value)
                  }}
            />
            <textarea type="text" 
                  value={detail}
                  placeholder="Type your Content ......"
                  className=" rounded-lg border-2 p-3 pl-5 m-2 h-30 w-full"
                  onChange={(e)=>{
                    setDetail(e.target.value)
                  }}
            />
               <button className={`p-2 m-2 text-black rounded-xl text-xl font-bold w-full
                    ${editIndex !== null 
                      ? "bg-green-400 active:bg-green-600 text-white hover:bg-green-900  active:scale-97" 
                      : "bg-white active:bg-gray-400 active:scale-97"
                    }`}>{editIndex !== null ? "Update Note" : "Add Note"}</button>
            </form>
        <div className=" lg:w-1/2 p-10 lg:border-l-2">
          <p className="font-bold text-4xl"> Notes</p>
          <div className="flex flex-wrap gap-6 mt-7 h-[95%] overflow-auto custom-scroll">
                {task.map(function(e,idx){
                     return <div className="flex justify-between flex-col  h-60 w-50 rounded-xl relative text-black p-4 pt-10 overflow-hidden bg-[url('https://static.vecteezy.com/system/resources/previews/037/152/677/non_2x/sticky-note-paper-background-free-png.png')] bg-cover ">
                      <div className="flex flex-col h-[85%]">
                        <p className="flex font-bold text-2xl justify-center">{e.title}</p>
                        <div  className="flex flex-col wrap-break-word overflow-auto custom-scroll">
                          <p className="text-gray-700">{e.detail}</p>
                        </div>
                      </div>
                      <div className="flex justify-center">
                        <button className="bg-blue-500 active:scale-96 pl-2 pr-2 mr-2 w-full active:bg-blue-800 rounded text-white font-bold" onClick={()=>{handleEdit(idx)}}>Edit</button>
                        <button className="bg-red-500 active:scale-96 pl-2 pr-2 w-full active:bg-red-800 rounded text-white font-bold" onClick={()=>handleDelete(idx)}>Delete</button>
                      </div>
                  </div>
                })}
          </div>
        </div>
      </div>
  )
}

export default App