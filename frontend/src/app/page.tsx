"use client"
import { useEffect, useState } from "react";

export default function Home() {
  const [itemValue, setItemValue] = useState("")
  const [todo_data, setTodoData] = useState<{ id: number, todo_item: string, status: boolean }[]>([])
  const handleData = async () => {
    const data: { data: { id: number, todo_item: string, status: boolean }[], status: string } = await (await fetch("http://localhost:5000/getData")).json()
    if (data.status == "success") {
      setTodoData(data.data)
    }
  }

  const handleSubmit = async () => {
    if (itemValue === "") {
      alert("Please Enter Todo Item...");
      return;
    }


    const response = await fetch("http://localhost:5000/insertData", {
      method: "POST",
      body: JSON.stringify({ item: itemValue, status: false }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    const result = await response.json()
    setItemValue("")
    console.log(result);
    console.log(itemValue)
  }

  useEffect(() => {
    handleData()
  }, [handleSubmit])


  return (
    <div className="flex items-center justify-center mt-10 flex-col">
      <div className="w-120 flex">
        <input name="text" value={itemValue} onChange={(e) => setItemValue(e.target.value)} placeholder="Enter Todo Item" className="flex-1 border border-gray-400 p-2" />
        <button onClick={() => handleSubmit()} className="p-2 bg-green-600 text-white cursor-pointer">Add Item</button>
      </div>

      <div className="w-120 mt-2">
        {
          todo_data.map((data: { id: number, todo_item: string, status: boolean }) => {
            return <div key={data.id} className="flex justify-between items-center mt-1">
              <div>
                <input id="task" type="checkbox" />
                <label htmlFor="task" className="pl-2 text-lg">{data.todo_item}</label>
              </div>
              <div>
                <button className="bg-red-500 p-1 text-white text-sm">Delete</button>
              </div>
            </div>
          })
        }
      </div>
    </div>
  );
}
