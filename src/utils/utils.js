export function gerarNota() {
  return {
    id: crypto.randomUUID(),
    title: "",
    content: "",
    created: Date.now()
  } 
}

