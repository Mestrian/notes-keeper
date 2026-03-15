import { useState } from "react"
import { createTag } from "../../utils/tagUtils"

function TagsWrapper({ tagsNotaAtual, tagsGlobais, adicionarTag, removerTag }) {
  return (
    <div className="flex items-center flex-wrap gap-1">
      <ExibirTags tagsNota={tagsNotaAtual} removerTag={removerTag} />
      <TagsEditor
        tagsNota={tagsNotaAtual}
        tagsGlobais={tagsGlobais}
        adicionarTag={adicionarTag}
      />
    </div>
  )
}

function TagsEditor({ adicionarTag }) {
  const [tag, setTag] = useState('')
  return (
    <input
      type="text"
      placeholder="add tag"
      className="
        w-20 p-1 inline rounded-md bg-bg
        border-solid border-2 border-roxo
        focus:p-2 focus:bg-bgHover focus:w-25
        focus:outline-none focus:ring-0
        duration-250 ease text-sm text-textPrincipal
      "
      value={tag}
      onChange={(e) => setTag(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          adicionarTag(createTag(tag))
          setTag('')
        }
      }}
    />
  )
}

function ExibirTags({ tagsNota, removerTag }) {
  return (
    <div className="flex flex-wrap gap-2 py-2">
      {tagsNota.map((tag) => (
        <Tag key={tag.id} tagName={tag.name} deletar={() => removerTag(tag.id)} />
      ))}
    </div>
  )
}

function Tag({ tagName, deletar }) {
  return (
    <div className="
      bg-roxo rounded-md px-2 py-1 text-sm
      min-w-0 truncate flex items-center
      hover:scale-105 hover:brightness-105 duration-150 ease
    ">
      {tagName}
      <button
        className="material-symbols-outlined leading-none relative top-px cursor-pointer"
        onClick={deletar}
      >
        close
      </button>
    </div>
  )
}

export default TagsWrapper