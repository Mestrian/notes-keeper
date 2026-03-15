function SidebarBotoes({setModo, criarNota, modo}) {
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
      <BtnNovaNota criarNota = {criarNota} />
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

function BtnNovaNota({criarNota}) { 
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
        criarNota()
      }}
    >
      add_notes
    </button>
  )

}

export default SidebarBotoes