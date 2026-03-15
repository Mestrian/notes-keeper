export function pesquisarNotas(todasNotas, buscar) {
  const termoBusca = buscar.toLowerCase()

  return todasNotas.filter(nota => {
    const noTitulo = nota.title.toLowerCase().includes(termoBusca);
    const noConteudo = nota.content.toLowerCase().includes(termoBusca);
    const naTag = nota.tags.some(tag => tag.name.toLowerCase().includes(termoBusca));

    return noTitulo || noConteudo || naTag
  })
}