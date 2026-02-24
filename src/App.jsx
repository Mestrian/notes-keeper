import { useEffect, useState } from 'react'
import './index.css'
import { carregarNotas, salvarNotas } from './notesStorage'
import Editor from './components/editor.jsx'
import SidebarBotoes from './components/sidebar/sidebarBotoes.jsx'
import SidebarArquivos from './components/sidebar/sidebarFiles.jsx'


function App() {

  const [notas, setNotas] = useState(()=>{
    const notasSalvas = carregarNotas();

    return notasSalvas.length ? notasSalvas : [
      {id: 1, title: "Bem Vindo!", content: "transformar essa parte em um tutorial"}
    ]
  }
  );

  const [notaAtual, trocarNota] = useState(1);
  const [modoFoco, setModo] = useState(false);
  
  useEffect(()=>{
    salvarNotas(notas)
  }, [notas])

  return (
    <main className='flex content-box bg-bg'>
      <SidebarBotoes setNotas = {setNotas} setModo = {setModo} trocarNota={trocarNota}/>
      <SidebarArquivos notas={notas} trocarNota={trocarNota} setNotas={setNotas} notaAtual={notaAtual} modoFoco={modoFoco}/>
      <Editor notaAtual={notaAtual} notas={notas} setNotas={setNotas} modoFoco={modoFoco} />
    </main>
  )

}

export default App