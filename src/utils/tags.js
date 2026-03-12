export function createTag(nome){
  const formatedName = nome.trim().toLowerCase()
  return{
    name: formatedName,
    color: "",
    notesPresent: 1,
    id: crypto.randomUUID(),
    }
}