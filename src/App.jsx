import { useEffect, useState } from 'react'
import './index.css'
import { carregarNotas, salvarNotas } from './notesStorage'
import  Sidebar from './components/sidebar.jsx'
import Editor from './components/editor.jsx'

class NotaStructure {
  constructor(title, id, content){
    this.title = title;
    this.id = id;
    this.content = content;
  }
}

function App() {
  const [notas, setNotas] = useState(()=>{
    const notasSalvas = carregarNotas();

    return notasSalvas.length ? notasSalvas : [
      {id: 1, title: "teste", content: "..."}
    ]
  }
  );

  console.log(notas);

  const [notaAtual, trocarNota] = useState(1);
  
  useEffect(()=>{
    salvarNotas(notas)
  }, [notas])

  return (
    <main className='grid grid-cols-11 gap-0 content-box bg-bg'>
      <Sidebar notas={notas} trocarNota={trocarNota} setNotas={setNotas} notaAtual={notaAtual} notaStructure={NotaStructure} />
      <Editor notaAtual={notaAtual} notas={notas} setNotas={setNotas}/>
    </main>
  )

}
export default App