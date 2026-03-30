export function gerarPasta() {
  return(
    {
      id: crypto.randomUUID(),
      title: "",
    }
  )
}

export function filtrarNotas(notaID, notas) {
  const pastasFiltradas = notas.filter(n => n.id !== notaID)
  return pastasFiltradas
}