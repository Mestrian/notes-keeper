import {gerarNota} from '../../utils/utils.js'


function SidebarBotoes({setModo, trocarNota, setNotas, modo}) {
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
      <BotaoModoFoco setModo = {setModo} modo={modo}/>
      <BtnNovaNota trocarNota={trocarNota} setNotas={setNotas} />
    </div>
  )
}

function BotaoModoFoco({setModo, modo}) {

 return (
  <button
    className='material-symbols-outlined cursor-pointer mt-2 text-textSecundario'
    style={{fontSize: "34px"}}
    onClick={
      () => setModo(prev => !prev)
    }
  >
    {
      modo ? "left_panel_open" : "left_panel_close" 
    }
    </button>
  )

}

function BtnNovaNota({setNotas, trocarNota}) { 
  return(
    <button 
      className="
      text-textSecundario
      self-center
      mt-2.5
      material-symbols-outlined
      cursor-pointer
      "

      style={{fontSize: "34px"}}
      onClick={() => {
        const novaNota = gerarNota();

        setNotas(prevNotas => [...prevNotas, novaNota]);
        trocarNota(novaNota.id);
      }}
    >
      add_notes
    </button>
  )

}

export default SidebarBotoes