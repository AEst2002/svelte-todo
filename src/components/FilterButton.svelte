<!-- #Component This is a reusable component! It gets used in Todos.svelte -->
<script>
  // #Properties - This filter prop gets exported so the parent (Todos) can tell this component what to filter by.
  export let filter = 'all'
</script>

<div class="filters btn-group stack-exception">
  <!-- Denote whether the button should be shaded or not based on the value of the filter variable. Repeated on lines 13, 18. -->
  <!-- #EventHandler Change the value of filter if a click event occurs on any of the buttons. -->
  <button class="btn toggle-btn" class:btn__primary={filter === 'all'} aria-pressed={filter === 'all'} on:click={()=> filter = 'all'} >
    <span class="visually-hidden">Show</span>
    <span>All</span>
    <span class="visually-hidden">tasks</span>
  </button>
  <button class="btn toggle-btn" class:btn__primary={filter === 'active'} aria-pressed={filter === 'active'} on:click={()=> filter = 'active'} >
    <span class="visually-hidden">Show</span>
    <span>Active</span>
    <span class="visually-hidden">tasks</span>
  </button>
  <button class="btn toggle-btn" class:btn__primary={filter === 'completed'} aria-pressed={filter === 'completed'} on:click={()=> filter = 'completed'} >
    <span class="visually-hidden">Show</span>
    <span>Completed</span>
    <span class="visually-hidden">tasks</span>
  </button>
</div>