export function gerarNota() {
  return {
    id: crypto.randomUUID(),
    title: "",
    content: "",
    tags: [],
    created: Date.now()
  } 
}

export function filtrarNotas(notaID, notas) {
  const novasNotas = notas.filter(n => n.id !== notaID)
  return novasNotas
}