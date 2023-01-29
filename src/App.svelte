<script>
  import Todos from './components/Todos.svelte'
  import { todos } from './stores.js'
</script>

<!-- Bind the value of todos to be todos so we can reference it. -->
<Todos bind:todos={$todos} />