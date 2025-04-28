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
    axios.post('https://bulkmail-backend-tvl9.onrender.com/sendemail',{msg:msg,emailList:emailList})
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
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-gray-800 via-gray-900 to-black">
  {/* Header */}
  <div className="bg-opacity-30 backdrop-blur-lg text-white text-center py-6 shadow-xl mx-4 rounded-xl">
    <h1 className="text-5xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">BulkMail</h1>
    <p className="mt-2 text-lg font-light">Send Emails to Multiple Recipients in a Flash</p>
  </div>

  {/* Info Section */}
  <div className="bg-opacity-40 backdrop-blur-lg text-white text-center py-4 mx-4 rounded-xl shadow-xl">
    <h2 className="text-xl font-semibold">Powering Your Business with Efficient Email Campaigns</h2>
  </div>

  {/* Main Section */}
  <div className="flex-grow flex flex-col items-center justify-center px-4 py-8 gap-6">
    <div className="w-full max-w-3xl bg-opacity-20 backdrop-blur-lg rounded-3xl shadow-xl p-10 flex flex-col items-center gap-8">
      
      <h3 className="text-4xl font-semibold text-white">Compose Your Email</h3>

      {/* Email Textarea Section */}
      <div className="w-full flex flex-col items-center gap-4">
        <textarea 
          value={msg}
          onChange={handlemsg}
          className="w-full h-48 p-6 border-2 border-purple-400 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-600 resize-none backdrop-blur-lg bg-opacity-40 text-white placeholder-gray-300 transition-all duration-300"
          placeholder="Type your email message here..."
        ></textarea>

        <p className="text-white font-light text-sm mt-2">Be concise and clear in your message to make a greater impact!</p>
      </div>

      {/* File Upload Section */}
      <div className="w-full flex flex-col items-center gap-6">
        <label className="w-full flex flex-col items-center justify-center p-8 border-2 border-dashed border-purple-400 rounded-lg cursor-pointer hover:bg-purple-200 transition backdrop-blur-lg bg-opacity-30 hover:bg-opacity-50">
          <input type="file" onChange={handlefile} className="hidden" />
          <span className="text-white font-semibold text-lg">Drag & Drop or Click to Upload CSV</span>
          <span className="text-sm text-purple-200 mt-2">Upload your CSV with email addresses</span>
        </label>
        <p className="text-white text-md">Total Emails: <span className="text-purple-400">{emailList.length}</span></p>
      </div>

      {/* Send Button Section */}
      <div className="flex flex-col items-center gap-6">
        <button 
          onClick={send}
          className="bg-purple-700 hover:bg-purple-800 transition text-white font-semibold py-3 px-8 rounded-full shadow-xl hover:scale-105 transform duration-200 ease-in-out"
        >
          {status ? "Sending..." : "Send Email"}
        </button>
      </div>
    </div>
  </div>

  {/* Footer */}
  <div className="bg-opacity-40 backdrop-blur-lg text-center text-white py-4 mx-4 rounded-xl shadow-xl">
    <p>Secure, Reliable, and Fast Email Delivery</p>
  </div>

  <div className="bg-opacity-40 backdrop-blur-lg text-center text-white py-4 mx-4 rounded-xl shadow-xl">
    <p>© 2025 BulkMail Inc. All rights reserved.</p>
  </div>
</div>


  )
}

export default App