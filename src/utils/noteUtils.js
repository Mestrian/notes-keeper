export function gerarNota() {
  return {
    id: crypto.randomUUID(),
    title: "",
    content: "",
    tags: [],
    folder: null,
    created: Date.now()
  } 
}

export function filtrarNotas(notaID, notas) {
  const notasFiltradas = notas.filter(n => n.id !== notaID)
  return notasFiltradas
}