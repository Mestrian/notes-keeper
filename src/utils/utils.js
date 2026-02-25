import { EditorView, lineNumbers } from "@codemirror/view"

export function gerarNota() {
  return {
    id: crypto.randomUUID(),
    title: "",
    content: "",
    created: Date.now()
  } 
}

export const meuTema = EditorView.theme({
  "&": {
    backgroundColor: "#1e1f24",
    color: "#e6e6e6",
    height: "100%"
  },
  ".cm-content": {
    fontSize: "1.125rem",
    caretColor: "#e6e6e6"
  },
  ".cm-scroller": {
    backgroundColor: "#1e1f24"
  },
  ".cm-gutters": {
    display: "none"
  },
  "&.cm-focused": {
    outline: "none"
  }
}, { dark: true })