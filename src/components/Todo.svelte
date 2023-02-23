<!-- #Component - This is a reusable component! It gets used in Todos.svelte  -->
<script>
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  // #Properties - Using this prop, the Todos component can give each todo a value that
  //         gets used throughout this component.
  // #Reactive - Updating different parts of this variable (like todo.completed) would cause the DOM
  //             to update as well (e.g. checking/unchecking the checkbox if changing todo.completed)
  export let todo

  let editing = false

  // Holds temp value of todo's name while editing, used to replace todo.name if saved, resets to
  // todo.name's original value otherwise.
  // #Reactive - If you were to update this name variable in the DOM, say, using the 
  //              edit functionality, the input field reflects your proposed change. (see line 63)
  let name = todo.name

  // Utility for updating todo, uses spread to copy values of original values and replace any
  // changed values denoted by fields in updatedTodo. Dispatches update event (see Todos.js)
  function update(updatedTodo) {
    todo = { ...todo, ...updatedTodo }
    dispatch('update', todo)
  }

  // Change name to original value and disable editing.
  function onCancel() {
    name = todo.name
    editing = false 
  }

  // Update the todo name and disable editing.
  function onSave() {
    update({ name: name })
    editing = false
  }

  // Dispatch removal event for deletion (see Todos.svelte)
  function onRemove() {
    dispatch('remove', todo)
  }

  // Set editing to true (e.g. if Edit button pressed)
  function onEdit() {
    editing = true
  }

  // Use update function to change completed field of current todo.
  function onToggle() {
    update({ completed: !todo.completed})
    console.log('HELLO')
  }

</script>

<div class="stack-small">
  <!-- #ControlFlow - Render different elements depending on whether the user is editing. (Conditional rendering) -->
{#if editing}
  <!-- #EventHandler - Call different functions depending on whether user clicks Save, presses ESC, or cancels using the Cancel button. -->
  <form on:submit|preventDefault={onSave} class="stack-small" on:keydown={e => e.key === 'Escape' && onCancel()}>
    <div class="form-group">
      <label for="todo-{todo.id}" class="todo-label">New name for '{todo.name}'</label>
      <!-- Input reflects changes to name variable mentioned earlier. -->
      <input bind:value={name} type="text" id="todo-{todo.id}" autoComplete="off" class="todo-text" />
    </div>
    <div class="btn-group">
      <button class="btn todo-cancel" on:click={onCancel} type="button">
        Cancel<span class="visually-hidden">renaming {todo.name}</span>
        </button>
      <button class="btn btn__primary todo-edit" type="submit" disabled={!name}>
        Save<span class="visually-hidden">new name for {todo.name}</span>
      </button>
    </div>
  </form>
{:else}
  <!-- Display checkboxes and names for todos if you're not editing. -->
  <div class="c-cb">
    <!-- #EventHandler - Update the todo's completion metadata when a click event occurs on its checkbox. -->
    <input type="checkbox" id="todo-{todo.id}"
      on:click={onToggle} checked={todo.completed}
    >
    <label for="todo-{todo.id}" class="todo-label">{todo.name}</label>
  </div>
  <div class="btn-group">
    <!-- #EventHandler Enable editing mode when clicking the edit button by assigning the onEdit function to the click event. -->
    <button type="button" class="btn" on:click={onEdit}>
      Edit<span class="visually-hidden"> {todo.name}</span>
    </button>
    <!-- #EventHandler Seen above in the onRemove function, use a click event to trigger the dispatch of a removal event to another function! -->
    <button type="button" class="btn btn__danger" on:click={onRemove}>
      Delete<span class="visually-hidden"> {todo.name}</span>
    </button>
  </div>
{/if}
</div>
