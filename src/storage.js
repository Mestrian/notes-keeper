export function salvar(id, conteudo){
  localStorage.setItem(id, JSON.stringify(conteudo));
}

export function carregar(id) {
  const carregar = localStorage.getItem(id);

  return carregar ? JSON.parse(carregar) : []; 
}