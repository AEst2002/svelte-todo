<!-- #Component - This is another reusable component! It's a little special in that it uses
      a few other reusable components and acts as a 'master' component, where it's the only thing
      rendered in App.js in order to keep the file clean. -->
<script>
  import FilterButton from './FilterButton.svelte'
  import Todo from './Todo.svelte'

  // #Properties - The todos prop lets us pass in what todos we want the app to start with, used in App.js
  // #Reactive - Whenever this array is updated, the DOM gets updated to display the correct number 
  //             of todos, one for each in this array.
  export let todos = []
  
  let newTodoName = ''
  // Use of reactive statements ($:) that run as a result of the todos array changing, since they rely on it.
  $: newTodoId = totalTodos ? Math.max(...todos.map(t => t.id)) + 1 : 1

  $: totalTodos = todos.length
  $: completedTodos = todos.filter(todo => todo.completed).length

  function removeTodo(todo) {
    todos = todos.filter(t => t.id !== todo.id)
  }

  function addTodo() {
    todos = [...todos, { id: newTodoId, name: newTodoName, completed: false }]
    newTodoName = ''
  }

  function updateTodo(todo) {
    const i = todos.findIndex(t => t.id === todo.id)
    todos[i] = { ...todos[i], ...todo }
  }

  let filter = 'all'
  const filterTodos = (filter, todos) => 
    filter === 'active' ? todos.filter(t => !t.completed) :
    filter === 'completed' ? todos.filter(t => t.completed) : 
    todos

</script>

<!-- Todos.svelte -->
<div class="todoapp stack-large">

  <!-- NewTodo -->
  <form on:submit|preventDefault={addTodo}>
    <h2 class="label-wrapper">
      <label for="todo-0" class="label__lg">
        Alright, whatcha got?
      </label>
    </h2>
    <input bind:value={newTodoName} type="text" id="todo-0" autocomplete="off" class="input input__lg" />
    <button type="submit" disabled="" class="btn btn__primary btn__lg">
      Add
    </button>
  </form>

  <!-- Filter -->
  <FilterButton bind:filter />

  <!-- TodosStatus -->
  <h2 id="list-heading">{completedTodos} out of {totalTodos} items completed{completedTodos === totalTodos ? '! Yay!' : ''}</h2>

  <!-- Todos -->
  <ul role="list" class="todo-list stack-large" aria-labelledby="list-heading">
  <!-- #ControlFlow - The #each statement iterates through the list of (possibly filtered) todos and 
                      renders a Todo component for each.  -->
  {#each filterTodos(filter, todos) as todo (todo.id)}
    <li class="todo">
      <!-- #EventHandler - Listen for update or remove events from inside the Todo component and call functions accordingly. -->
      <Todo {todo}
        on:update={e => updateTodo(e.detail)}
        on:remove={e => removeTodo(e.detail)}
      />
    </li>
  <!-- #ControlFlow - Interesting use of :else condition where if there's nothing to iterate through, we can choose to render something else! -->
  {:else}
    <li>So... nothing to do?</li>
  {/each}
  </ul>

  <hr />
</div>