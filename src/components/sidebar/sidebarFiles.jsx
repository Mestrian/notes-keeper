import { useState } from 'react'

function SidebarArquivos({trocarNota, notas, setNotas, notaAtual, modoFoco}) {

  const [busca, setBusca] = useState("");

  const notasExibidas = busca ? notas.filter(n => n.title?.toLowerCase().includes(busca.toLowerCase())) : notas;

  function deletarNota(notaId) {
    const novasNotas = notas.filter(n => n.id !== notaId)
    setNotas(novasNotas)

    if(notaId === notaAtual) {
      if(novasNotas.length > 0) {
        trocarNota(novasNotas[0].id)
      }else {
        trocarNota(null);
      }
    }
  }


  return (
    <div 
      className={`
        min-h-screen 
        ${modoFoco? "w-0" : "w-50"}
        p-2
        bg-bgSecundario
        text-textPrincipal
        flex flex-col
        ${modoFoco ? "opacity-0 pointer-events-none" : ""}
        transition-all
        duration-300
        ease-in-out
      `
      }
    >
      <PesquisarNotas setBusca={setBusca}/>
      {
        notasExibidas.map((nota) => (
          <Miniatura nota={nota} trocarNota={trocarNota} key={nota.id} deletar={() => deletarNota(nota.id)} notaAtual={notaAtual} />
        ))
      }
    </div>
  )
}

function PesquisarNotas({setBusca}) {

  return(
    <input type="text" placeholder="Pesquisar"
      className="
      rounded-md
      focus:outline-none
      focus:ring-0
      "
      onChange={
        (e) => setBusca(e.target.value)
      }
    />
  )

}

function Miniatura({ nota, trocarNota, notaAtual, deletar}) {

  return (
    <div className=
     {` flex items-center
      w-full
      rounded-md
      justify-between
      py-1
      cursor-pointer
      hover:bg-bgHover
      ${nota.id === notaAtual ? "bg-bgHover" : ""}`
    }
    >
      <button 
        className='text-left flex-1 truncate min-w-0 cursor-pointer'
        onClick={()=> trocarNota(nota.id)}
      >
        {nota.title ? nota.title : 'Nota Sem Titulo'}  
      </button> 

      <DeletarNota deletar={deletar}/>
    </div>
  )
}

function DeletarNota({deletar}) {

  return(
    <button className='
      flex 
      items-center 
      justify-center 
      h-6
      w-6
      shrink-0
      hover:text-red-500
    '
    onClick={
      () => deletar()
    }
    > 
     <span className='material-symbols-outlined leading-none relative top-px cursor-pointer'>delete</span>
    </button>
  )

}

export default SidebarArquivos