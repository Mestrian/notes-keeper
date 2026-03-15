export function createTag(nome){
  const formatedName = nome.trim().toLowerCase()
  return{
    name: formatedName,
    color: "",
    notesPresent: 1,
    id: crypto.randomUUID(),
    }
}

export function removerTagPorId(tags, id){
  return tags.filter(t => t.id !== id)
}

export function adicionarTag(tags, novaTag) {
  if(tags.some(t => t.name === novaTag.name)) return tags
  return [...tags, novaTag]
}
