export function createTag(nome){
  const formatedName = nome.trim().toLowerCase()
  return{
    name: formatedName,
    color: "",
    id: crypto.randomUUID(),
    }
  
}