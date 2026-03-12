import { useEffect, useState } from 'react'
import './index.css'
import { carregar, salvar } from './storage.js'
import Editor from './components/editor/editor.jsx'
import SidebarBotoes from './components/sidebar/sidebarBotoes.jsx'
import SidebarArquivos from './components/sidebar/sidebarFiles.jsx'


function App() {
  const [notas, setNotas] = useState(()=>{
    const notasSalvas = carregar("notas");

    return notasSalvas.length ? notasSalvas : [
      {id: 1, title: "Bem Vindo!", content: "markup language mais ou menos disponivel"}
    ]
  }
  );

  const notaInicial = notas.length > 0 ? notas[0].id : null;

  const [notaAtual, trocarNota] = useState(notaInicial);

  const [modoFoco, setModo] = useState(false);

  const [tagsGlobais, setTags] = useState(()=> {
    const tagsSalvas = carregar("tags");
    return tagsSalvas.length ? tagsSalvas : []
  })
  
  useEffect(()=>{
    salvar("notas",notas)
  }, [notas])

  return (
    <main className='flex content-box bg-bg'>

      <SidebarBotoes setNotas = {setNotas} setModo = {setModo} 
      trocarNota={trocarNota} modo={modoFoco}/>

      <SidebarArquivos notas={notas} trocarNota={trocarNota} setNotas={setNotas} 
      notaAtual={notaAtual} modoFoco={modoFoco}/>
      
      <Editor notaAtual={notaAtual} notas={notas} setNotas={setNotas} 
      modoFoco={modoFoco} tagsGlobais = {tagsGlobais} setTags = {setTags} />
    
    </main>
  )

}

export default App