import {gerarNota} from '../../utils/utils.js'


function SidebarBotoes({setModo, trocarNota, setNotas}) {
  return (
    <div className="
      border-r-azul
      border-r-solid 
      border-r-2
      w-16
      min-h-screen
      flex
      flex-col
      items-center
    ">
      <BotaoModoFoco setModo = {setModo}/>
      <BtnNovaNota trocarNota={trocarNota} setNotas={setNotas} />
    </div>
  )
}

function BotaoModoFoco({setModo}) {

 return (
  <button
      onClick={
        () => setModo(prev => !prev)
      }
    >
      "V"
    </button>
  )

}

function BtnNovaNota({setNotas, trocarNota}) { 
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
        const novaNota = gerarNota();

        setNotas(prevNotas => [...prevNotas, novaNota]);
        trocarNota(novaNota.id);
      }}
    >
      +
    </button>
  )

}

export default SidebarBotoes