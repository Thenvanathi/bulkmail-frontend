import axios from 'axios';
import React, { useState } from 'react';
import * as XLSX from 'xlsx';

function App() {
  
  const [msg,setmsg]= useState("")
  const [status,setstatus]= useState(false)
  const [emailList,setemailList]= useState([])
  

  function handlemsg(event){
    setmsg(event.target.value)
  }

  function handlefile(event){
    const file = event.target.files[0]
    console.log(file)

    const reader = new FileReader()
    reader.onload=function(event){
        const data = event.target.result
        console.log(data)

        const workbook = XLSX.read(data, {type: "binary"})
        console.log(workbook)

        const sheetName = workbook.SheetNames[0];
        console.log(sheetName);

        const worksheet = workbook.Sheets[sheetName];
        console.log(worksheet);

        const emailList= XLSX.utils.sheet_to_json(worksheet, {header:"A"})
        console.log(emailList)
        const totalEmail = emailList.map(function(item) { return item.A }) 
        console.log(totalEmail)
        setemailList(totalEmail)
    }

    reader.readAsBinaryString(file);
  }

  function send(){
    setstatus(true)
    axios.post("https://bulkmail-backend-tvl9.onrender.com/sendemail",{msg:msg,emailList:emailList})
    .then(function(data){
      if(data.data === true){
        alert("Email Sent Successfully")
        setstatus(false)
      }
      else{
        alert("Email Sending Failed")
      }
    })
  }
  return (
    <div className="">
      <div className="bg-blue-950 text-white text-center">
        <h1 className="text-2xl font-medium px-5 py-3">BulkMail</h1>
      </div>

      <div className="bg-blue-800 text-white text-center">
        <h1 className="font-medium px-5 py-3">We Can Help Your Business With Sending Multiple Emails At Once</h1>
      </div>

      <div className="bg-blue-600 text-white text-center">
        <h1 className="font-medium px-5 py-3">Drag And Drop</h1>
      </div>

      <div className="bg-blue-400 flex flex-col items-center text-black px-5 py-3 ">
        <textarea  value={msg} onChange={handlemsg} className="w-[80%] h-32 outline px-2 border border-black rounded-md bg-white"placeholder="Enter The Email Text............"></textarea>
        <div>
      <input type="file" onChange={handlefile} className="file:bg-white file:text-black file:border file:border-gray-300 file:px-4 file:py-2 file:rounded file:mr-4
             border-4 border-white border-dashed py-4 px-4 mt-5 mb-5"/>
    </div>

    <p>Total Emails In The File : {emailList.length}</p>

    <button onClick={send} className="bg-blue-950 py-2 px-2 text-white font-medium rounded-md w-fit mt-2">{status?"Sending.........":"Send"}</button>
  
      </div>

      <div className="bg-blue-300 text-white text-center p-8">
        
      </div>

      <div className="bg-blue-200 text-white text-center p-8">
        
      </div>

    </div>
  )
}

export default App