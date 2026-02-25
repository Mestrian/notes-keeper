import CodeMirror from "@uiw/react-codemirror"
import { markdown } from "@codemirror/lang-markdown"
import {meuTema} from "../utils/utils";
import { EditorView } from "@codemirror/view"
import { useRef, useEffect} from "react";



function Editor({notaAtual, notas, setNotas}) {

  const nota = notas.find(n => n.id === notaAtual)

  if(!nota) return null; 

  function atualizarNota(campo, valor){
    setNotas(
      notas.map(  //.map cria um novo array
        n => n.id === notaAtual ? {...n, [campo]: valor} : n //caso a nota q ele esta criando tenha o msmo id da selecionada, ele vai trocar o valor de um campo dela
      )
    )
  }
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

export default Editor;