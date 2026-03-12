import {useState} from "react";
import { createTag } from "../../utils/tags";


function TagsWrapper({tagsNotaAtual, tagsGlobais, editarTagsNotaAtual, setTags, atualizarNota}) {
  return(
    <div className="
      flex
      items-center
      flex-wrap
      gap-1  
      ">

      <ExibirTags tagsNota={tagsNotaAtual} setTagsNotas = {editarTagsNotaAtual} 
      tagsGlobais={tagsGlobais} setTagsGlobais= {setTags}/> 

      <TagsEditor tagsNota = {tagsNotaAtual} tagsGlobais = {tagsGlobais}
      setTagsNota = {editarTagsNotaAtual} setTagsGlobais = {setTags} 
      atualizarNota = {atualizarNota}/>

    </div>
  )
}

function TagsEditor({tagsNota, tagsGlobais, setTagsNota, setTagsGlobais, atualizarNota }){

  const [tag, setTag] = useState('');

  return(
    <input 
    type="text" 
    placeholder="add tag" 
    className="
      w-20
      p-1
      inline 
      rounded-md
      bg-bg
      border-solid
      border-2
      border-roxo
      focus:p-2
      focus:bg-bgHover
      focus:w-25  
      focus:outline-none
      focus:ring-0
      duration-250
      ease
      text-sm
      text-textPrincipal
    "
    value={tag}
    onChange={(e)=> {
      setTag(e.target.value);
    }}
    onKeyDown={(e) => {
      if(e.key === "Enter") {
        const novaTag = createTag(tag)
        addTagToNote(novaTag, tagsNota, setTagsNota, atualizarNota);
        addTagGlobal(novaTag, tagsGlobais, setTagsGlobais);
        setTag('');
      }
    }}
    />
  )
}

function ExibirTags({tagsNota, setTagsNotas, tagsGlobais, setTagsGlobais}) {

  return(
    <div className = "flex flex-wrap gap-2 py-2">
    {
      tagsNota.map((tag) => (
        <Tag key={tag.id} tagName={tag.name} deletar={() => deletarTag(setTagsNotas, 
          tag.id, tagsGlobais, setTagsGlobais)} />
      ))
    }
    </div>
  )
}

function Tag({tagName, deletar}) {

  return(
    <div className="
    bg-roxo
    rounded-md
    px-2 py-1
    text-sm
    min-w-0
    truncate
    flex
    items-center
    ">
      {tagName}

      <button 
      className="
        material-symbols-outlined 
        leading-none 
        relative top-px 
        cursor-pointer"
      onClick={deletar}
        > 
        close
      </button>

    </div>
  )

}

function addTagToNote(tag, tagsNota, setTagsNota, atualizarNota) {
 const existe = tagsNota.some(t => t.name === tag.name)

 if(existe === true) {
  return; 
 }else {
  const novasTags = [...tagsNota, tag]
  setTagsNota(novasTags)
  atualizarNota("tags", novasTags)
 }
}

function addTagGlobal(tag, tagsGlobais, setTagsGlobais) {
  const existe = tagsGlobais.some(t => t.name === tag.name);

  if(existe) {
    return;
  } else {
    const novasTagsGlobais = [...tagsGlobais, tag]
    setTagsGlobais(novasTagsGlobais)
  }

}

function deletarTag (setTagsNota, idTag, tagsGlobais, setTagsGlobais) {
  setTagsNota(prevTags => prevTags.filter(t => t.id !== idTag));

  const tagGlobal = tagsGlobais.filter(t => t.id === idTag);

  if(tagGlobal.id < 1) {
    setTagsGlobais(prevTags => prevTags.filter(t=> t.id !== idTag))
  }
  
}

export default TagsWrapper