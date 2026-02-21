import { useState } from "react"

function Sidebar({trocarNota, notas, setNotas, notaAtual, notaStructure}) {

  const [busca, setBusca] = useState(undefined);

  const notasExibidas = busca ? notas.filter(n => n.title?.toLowerCase().includes(busca.toLowerCase())) : notas;

  return (
    <div 
      className='min-h-screen col-span-1
      p-2
      bg-bgSecundario
      text-textPrincipal
      flex
      flex-col
      '
    >
      <PesquisarNotas notas={notas} setBusca={setBusca} busca={busca}/>
      {
        notasExibidas.map((nota) => (
          <Miniatura nota={nota} trocarNota={trocarNota} key={nota.id} notas={notas} setNotas = {setNotas} notaAtual = {notaAtual}/>
        ))
      }
      <BtnNovaNota setNotas={setNotas} trocarNota={trocarNota} notas={notas} notaStructure ={notaStructure} />
    </div>
  )
}

function PesquisarNotas({setBusca}) {

  return(
    <input type="text" placeholder="Pesquisar"
      className="
      rounded-md
      focus: outline-none
      focus: ring-0
      "
      onChange={
        (e) => setBusca(e.target.value)
      }
    />
  )

}



function Miniatura({ nota, trocarNota, notas, setNotas, notaAtual}) {

  return (
    <div className=
     {` flex items-center
      w-full
      rounded-md
      justify-between
      py-1
      cursor-pointer
      hover:bg-bgHover
      ${nota.id === notaAtual ? "bg-bgHover" : " "}`
    }
    >
      <button 
        className='text-left flex-1 truncate min-w-0 cursor-pointer'
        onClick={()=> trocarNota(nota.id)}
      >
        {nota.title ? nota.title : 'Nota Sem Titulo'}  
      </button> 

      <DeletarNota nota={nota} notas={notas} setNotas = {setNotas} key={nota.id} trocarNota = {trocarNota} notaAtual = {notaAtual}/>
    </div>
  )
}

function DeletarNota({nota, notas, setNotas, trocarNota, notaAtual}) {

  function deletarNota(nota, notas) {
   const newNotas = notas.filter(n => n.id !== nota.id)
   setNotas(newNotas)

    if(nota.id === notaAtual) {
      if (newNotas.length>0) {
        trocarNota(newNotas[0].id);
      } else {
        trocarNota(null);
      }
    }
  }

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
      () => deletarNota(nota, notas)
    }
    > 
     <span className='material-symbols-outlined leading-none relative top-px cursor-pointer'>delete</span>
    </button>
  )

}

function BtnNovaNota({setNotas, trocarNota, notas, notaStructure}) { 
  return(
    <button 
      className="
      bg-roxo 
      text-textPrincipal text-sm 
      rounded-xs
      p-1.5
      mt-1.5
      self-center
      "
      onClick={() => {
        const novoId = notas.length > 0 ?
        notas[notas.length - 1].id + 1 : 1

        const novaNota = new notaStructure("", novoId, " ");

        setNotas(prevNotas => [...prevNotas, novaNota]);
        trocarNota(novaNota.id);
      }}
    >
      Nova Nota
    </button>
  )

}

export default Sidebar