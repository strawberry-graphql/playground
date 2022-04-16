<template>
  <div ref="el" />
</template>

<script setup>
import { EditorState, basicSetup } from "@codemirror/basic-setup"
import { EditorView, keymap } from "@codemirror/view"
import { indentUnit } from "@codemirror/language"
import { indentWithTab } from "@codemirror/commands"
import { python } from "@codemirror/lang-python"
import { json } from "@codemirror/lang-json"
import { debounce } from '../utils/debounce'

const el = ref()

const props = defineProps(['value', 'indent', 'readonly', 'mode'])
const emit = defineEmits(['update:value'])

const updateValue = debounce((doc) => {
  const value = doc.toString()
  emit('update:value', value)
}, 200)

let editor

onMounted(() => {
  const extensions = [
    basicSetup,
    keymap.of([indentWithTab]),
    EditorView.lineWrapping,
    EditorView.updateListener.of((v) => {
      if (v.docChanged) {
        updateValue(v.state.doc)
      }
    }),
  ]

  const modes = {
    python,
    json
  }
  const mode = modes[props.mode]
  if (mode) {
    extensions.push(mode())
  }

  if (props.indent) {
    extensions.push(
      indentUnit.of(Array(props.indent).fill(' ').join('')),
    )
  }

  if (props.readonly) {
    extensions.push(
      EditorView.editable.of(false),
    )
  }

  editor = new EditorView({
    parent: el.value,
    state: EditorState.create({
      doc: props.value,
      extensions,
    }),
  })

  watch(toRef(props, 'value'), (value) => {
    value = value || ''
    if (editor.state.doc.length === value.length || editor.state.doc.toString() === value) {
      return
    }

    editor.dispatch({
      changes: { from: 0, to: editor.state.doc.length, insert: value }
    })
  })
})

onUnmounted(() => {
  editor.destroy()
})
</script>

<style>
.cm-editor, .cm-scroller {
  height: 100%;
  outline: 0 !important;
}
</style>
