import { forwardRef } from "react"

const ContextMenu = forwardRef(({ menu, criarNota }, ref) => {
  if (!menu.visible) return null

  return (
    <div
      ref={ref}
      onContextMenu={(e) => e.stopPropagation()} 
      style={{ position: "fixed", top: menu.y, left: menu.x, zIndex: 50 }}
      className="bg-bgSecundario border border-azul rounded-md py-1 min-w-32 shadow-lg"
    >
      <MenuItem label="Nova nota" icon="add" onClick={() => {criarNota()}} />
      <MenuItem label="Nova Pasta" icon="create_new_folder" onClick={() => {}} /> {/* adicionar funcao criarPasta()*/}
    </div>
  )
})

function MenuItem({ label, icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 w-full px-3 py-1.5 text-sm text-textPrincipal hover:bg-bgHover"
    >
      <span className="material-symbols-outlined">{icon}</span>
      {label}
    </button>
  )
}

export default ContextMenu