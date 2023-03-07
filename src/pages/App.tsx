import { Card, CardProps } from '../Components/Card'
import { useState, useEffect } from 'react'

interface ProfileResponse {
  name: string
  avatar_url: string
}

interface User {
  name: string
  avatar: string
}

export default function App() {
  const [studentName, setStudentName] = useState('')
  const [student, setStudent] = useState<CardProps[]>([])
  const [user, setUser] = useState<User>({} as User)

  function handleAddUser() {
    const newUser = {
      name: studentName,
      time: new Date().toLocaleTimeString('pt-br', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    }
    setStudent(prevState => [...prevState, newUser])
  }

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`https://api.github.com/users/KaykyFernandes`)
      const data = await response.json() as ProfileResponse
    
        setUser({
          name: data.name,
          avatar: data.avatar_url
        })      
    }
    fetchData()
  }, [])

  return (
    <div className="mt-10 flex justify-center items-center flex-col gap-4">
      <header className='flex items-center justify-between w-2/3'>
        <h1 className="text-xl">Lista de Presença</h1>

        <div className='flex items-center gap-1'>
          <strong>{user.name}</strong>
          <img className='w-10 rounded-3xl' src={user.avatar} alt="" />
        </div>
        </header>
    
    <input 
    className="bg-gray-100 w-2/3 h-14 pl-6 outline-0 rounded-md " 
    type="text" 
    placeholder="Digite o Nome..."
    onChange={e => setStudentName(e.target.value)} />
    <button className="bg-indigo-700 text-white text-lg w-2/3 h-14 rounded-md transition hover:bg-indigo-600" onClick={handleAddUser}>Adicionar</button>

    {
    student.map(user => 
      <Card 
        key={user.time}
        name={user.name} 
        time={user.time} />
      )
    }
    </div>
  )
}


