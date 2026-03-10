import CodeMirror from "@uiw/react-codemirror"
import { markdown } from "@codemirror/lang-markdown"
import {meuTema} from "../../utils/utils";
import { EditorView } from "@codemirror/view"
import { useRef, useEffect, useState} from "react";
import { createTag } from "../../utils/tags";
import { salvar } from "../../storage";



function Editor({notaAtual, notas, setNotas, tagsGlobais, setTags}) {

  const nota = notas.find(n => n.id === notaAtual)

  if(!nota) return null; 

  function atualizarNota(campo, valor){
    setNotas(
      notas.map(  //.map cria um novo array
        n => n.id === notaAtual ? {...n, [campo]: valor} : n //caso a nota q ele esta criando tenha o msmo id da selecionada, ele vai trocar o valor de um campo dela
      )
    )
  }

  const [tagsNotaAtual, editarTagsNotaAtual] = useState(nota.tags || [{name: "teste", id: 1}]);

  useEffect(() => {
    editarTagsNotaAtual(nota.tags || [])
  }, [notaAtual]) 


  
  const editorRef = useRef(null);
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.focus()

      const length = editorRef.current.state.doc.length
      editorRef.current.dispatch({
        selection: { anchor: length }
      })
    }
  }, [notaAtual])


  return (
    <div className={`
      flex-1
      flex 
      justify-center
      h-screen
      bg-bg
      `}>
        <div className='
        w-full
        max-w-3xl
        px-8
        py-16
        flex
        flex-col'>
          <input  //titulo
          type="text" 
          className=' resize-none
          bg-bg
          text-textPrincipal text-center text-3xl
          focus:outline-none
          focus:ring-0
          px-3
          mb-4'

          placeholder='Nota Sem Titulo'
          value={nota.title ? nota.title : ""}
          onChange={(e)=> {
            atualizarNota('title', e.target.value)
          }}
        />

        <TagsEditor tagsNota = {tagsNotaAtual} tagsGlobais = {tagsGlobais}
        setTagsNota = {editarTagsNotaAtual} setTagsGlobais = {setTags} 
        atualizarNota = {atualizarNota}/>

        <ExibirTags tagsNota={tagsNotaAtual}/>

        <CodeMirror //conteudo
          basicSetup={{ 
            lineNumbers: false,
            foldGutter: false,
            highlightActiveLine: false
          }}
          onCreateEditor={(view) => {
            editorRef.current = view
          }}
          autoFocus
          extensions={[markdown(), meuTema, EditorView.lineWrapping]}
          value= {nota.content || ""}
          theme={meuTema}
          onChange={(value)=> {
            atualizarNota('content', value)
          }}
          
        />      
        </div>

    </div>
  )

}

function TagsEditor({tagsNota, tagsGlobais, setTagsNota, setTagsGlobais, atualizarNota }){

  const [tag, setTag] = useState('');

  return(
    <input type="text" 
    className="bg-red-950"
    placeholder="Add Tags" 
    value={tag}
    onChange={(e)=> {
      setTag(e.target.value);
    }}
    onKeyDown={(e) => {
      if(e.key === "Enter") {
        const novaTag = createTag(tag)
        addTagToNote(novaTag, tagsNota, setTagsNota, atualizarNota);
        addTagGlobal(novaTag, tagsGlobais, setTagsGlobais);
        setTag('');
      }
    }}
    />
  )
}

function ExibirTags({tagsNota}) {

  return(
    <>
    {
      tagsNota.map(tag => (
        <div key={tag.id}>
          {tag.name}
        </div>
      ))
    }
    </>
  )

}


function addTagToNote(tag, tagsNota, setTagsNota, atualizarNota) {
 const existe = tagsNota.some(t => t.name === tag.name)

 if(existe === true) {
  return; 
 }else {
  const novasTags = [...tagsNota, tag]
  setTagsNota(novasTags)
  atualizarNota("tags", novasTags)
 }
}


function addTagGlobal(tag, tagsGlobais, setTagsGlobais) {
  const existe = tagsGlobais.some(t => t.name === tag.name);

  if(existe) {
    return;
  } else {
    const novasTagsGlobais = [...tagsGlobais, tag]
    setTagsGlobais(novasTagsGlobais)
  }

}


export default Editor;