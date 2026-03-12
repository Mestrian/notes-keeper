export function salvar(id, conteudo){
  localStorage.setItem(id, JSON.stringify(conteudo));
}

export function carregar(id) {
  const salvo = localStorage.getItem(id);

  return salvo ? JSON.parse(salvo) : []; 
}