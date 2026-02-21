export function salvarNotas(notas){
  localStorage.setItem("notas", JSON.stringify(notas));
}

export function carregarNotas(){
  const notasSalvas = localStorage.getItem("notas");

  return notasSalvas ? JSON.parse(notasSalvas) : [];
}