import { useEffect, useState } from 'react'
import './index.css'
import { carregar, salvar } from './storage.js'
import Editor from './components/editor/editor.jsx'
import SidebarBotoes from './components/sidebar/sidebarBotoes.jsx'
import SidebarArquivos from './components/sidebar/sidebarFiles.jsx'
import { filtrarNotas, gerarNota } from './utils/noteUtils.js'
import { removerTagPorId, adicionarTag } from './utils/tagUtils.js'


function App() {
  const [notas, setNotas] = useState(()=>{
    const notasSalvas = carregar("notas");

    return notasSalvas.length ? notasSalvas : [
      {id: 1, title: "Bem Vindo!", content: "markup language mais ou menos disponivel", tags: []}
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

  function criarNota(){
    const novaNota = gerarNota()

    setNotas(prevNotas => [...prevNotas, novaNota])
    trocarNota(novaNota.id);

  }

  function deletarNota(id){
    const novasNotas = filtrarNotas(id, notas);
    setNotas(novasNotas)

    if(id === notaAtual){
      trocarNota(novasNotas.length > 0 ? novasNotas[0].id : null)
    }

  }

  function criarTag(novaTag) {
    setNotas(notas.map(n =>
      n.id === notaAtual
        ? { ...n, tags: adicionarTag(n.tags, novaTag) }
        : n
    ))
    setTags(prev => adicionarTag(prev, novaTag))
  }

  function removerTag(idTag) {
    setNotas(notas.map(n =>
      n.id === notaAtual
        ? { ...n, tags: removerTagPorId(n.tags, idTag) }
        : n
    ))
  }


  return (
    <main className='flex content-box bg-bg'>

      <SidebarBotoes criarNota={criarNota} setModo = {setModo} 
       modo={modoFoco}/>

      <SidebarArquivos notas={notas} trocarNota={trocarNota}  
      notaAtual={notaAtual} modoFoco={modoFoco} deletarNota={deletarNota}/>
      
      <Editor notaAtual={notaAtual} notas={notas} setNotas={setNotas} 
      modoFoco={modoFoco} tagsGlobais = {tagsGlobais} 
      adicionarTag = {criarTag} removerTag={removerTag} />
    
    </main>
  )

}



export default App