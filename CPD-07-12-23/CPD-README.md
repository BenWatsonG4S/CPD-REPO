# CPD (Dec 07 2023)
 
# Vue.js

#### What is an ES Module?
- A standard format for scripting language modules used in JavaScript
- These modules are a way to structure JavaScript code into reusable parts.

#### Import Maps:
- The browser is taught where to locate `vue` by using Import Maps.

- Example:
  ```html
    <script type="importmap">
    {
        "imports": {
        "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js"
        }
    }
    </script>

    <div id="app">{{ message }}</div>

    <script type="module">
    import { createApp } from 'vue'

    createApp({
        data() {
        return {
            message: 'Hello Vue!'
        }
        }
    }).mount('#app')
    </script>
  ```

#### Single-File Component (SFC)
- This is a reusable, self-contained block of code, that encapsulates HTML, CSS AND JavaScript that belong together, written inside a `.vue` file.

#### Declarative Rendering
- This is a core feature of Vue.

- Using a template syntax that extends the HTML, we can describe **how the HTML should look** like **based on JavaScript state**.
  - When the state changes, the HTML updates automatically.

- We can declare a reactive state using the `data` component option, which should be a function that returns an object:
    ```js
    export default {
        data() {
            return {
            message: 'Hello World!'
            }
        }
    }
    ```
- The `message` property will be made availiable in the template.
- This is how we can render dynamic text based on the value of `message`, using the mustasches syntax:
    ```html
    <h1>{{ message }}</h1>
    ```

- The conent inside the mustaches is not limited to just identifiers or paths, we can use any valid JavaScript expression:
    ```js
    <h1>{{ message.split('').reverse().join('') }}</h1>
    ```

#### Attribute Bindings
- In Vue, mustaches are only used for text interpolation.

- To bind an attribute to a dynamic value, we use the `v-bind` directive.

- Example:
    ```html
    <div v-bind:id="dynamicId"></div>
    ```

- A Vue directive is a **special attribute** that starts with a `v-` prefix.
  - They are part of Vue's template syntax.

- The other part after the colon (`:id`) is the "argument" of the directive. 
  - Here the element's `id` will by synced with the `dynamicId` property of the component's state.

- Since this is quite a frequently used directive, it has a dedicated shorthand syntax:
  ```html
  <div :id="dynamicId"></div>
  ```

- Challange:
    
    *"Now, try to add a dynamic class binding to the `<h1>`, using the titleClass data property as its value. If it's bound correctly, the text should turn red."*

    Code:

    ```html
    <script>
    export default {
    data() {
        return {
        titleClass: 'title'
        }
    }
    }
    </script>

    <template>
    <h1 :class="titleClass">Make me red</h1> <!-- add dynamic class binding here -->
    </template>

    <style>
    .title {
    color: red;
    }
    </style>
    ```

#### Event Listeners
- We can listen to DOM events using the `v-on` directive:
    ```html
    <button v-on:click="increment">{{count}}</button>
    ```

- This also has a shorthand:
    ```html
    <button @click="increment">{{ count }}</button>
    ```

    - Here increment references to a function.


- Incremented is declared using the `methods` option:
  
    ```js
    export default {
        data() {
            return {
            count: 0
            }
        },
        methods: {
            increment() {
            // update component state
            this.count++
            }
        }
    }
    ```
    - Inside a method, we can access the component instance using `this`.

    - Event handlers can also use inline expressions, and can simplify common tasks with modifiers.

#### Form Bindings

- Using `v-bind` and `v-on` together, we can create two-way bindings on form input elements:

- Example:

    ```html
    <input :value="text" @input="onInput">
    ```

    ```js
    methods: {
    onInput(e) {
        // a v-on handler receives the native DOM event
        // as the argument.
        this.text = e.target.value
    }
    }
    ```

    By typing in the box. the OnInput method will be triggered and the text will be updated. This would change dynamically:

    ```html
    <p>{{ text }}</p>
    ```

    To simplify things, Vue in fact provides a directive, `v-model` which is essentially does what is in the method defined above.

    ```html
    <input v-model="text">
    ```

    - `v-model` automatically syncs the `<input>`'s value with the bound state, we no longer need an event handler for that.

    - `v-model` works not only for text inputs, but also on other types, such as checkboxes, radio buttons, and select dropdowns.

#### Conditional Rendering

-  We can use the `v-if` directive to conditionally render and element:
  
    ```html
    <h1 v-if="awesome">Vue is awesome!</h1>
    ```

- This `<h1>` will only be rendered if the value of awesome is truthy. If it changes to a falsey value, it will be removed from the DOM.

- We can also use `v-else` and `v-else-if` to denote other branches of the condition.
  
    ```html
    <h1 v-if="awesome">Vue is awesome!</h1>
    <h1 v-else>Oh no 😢</h1>
    ```

- This will be based on a set value for `awesome` in the data object:

    ```js
    data() {
        return {
        awesome: true,
        }
    },
    ```

#### List Rendering

- We can use the `v-for` directive to render a list of elements based on a source array:

- Example:
    ```html
    <ul>
    <li v-for="todo in todos" :key="todo.id">
        {{ todo.text }}
    </li>
    </ul>
    ```
    - In here, `todo` becomes a local variable representing an array element.
    - It is only accessible inside the `v-for` element.

- We are giving each todo object a unique `id`, and binding it as the special `key` attribute for each list item.

    - The `key` allows Vue to accuratly move each list item (`<li>`) to match the position of the corresponding object in the array.

- Ways to update the list:
    1. Call mutating methods on the source array:
   
        ```js
        this.todos.push(newTodo)
        ```
    2. Replace the array with a new one:
        ```js
        this.todos = this.todos.filter(/* ... */)
        ```

#### Computed Property

- The computed property can be used to declare a property that is reactively computed from other properties uising the `computed` option.

- Example:

    ```html
    <script>
    let id = 0

    export default {
    data() {
        return {
        newTodo: '',
        hideCompleted: false,
        todos: [
            { id: id++, text: 'Learn HTML', done: true },
            { id: id++, text: 'Learn JavaScript', done: true },
            { id: id++, text: 'Learn Vue', done: false }
        ]
        }
    },
    computed: {
        filteredTodos() {
        return this.hideCompleted
            ? this.todos.filter((t) => !t.done)
            : this.todos
        }
    },
    methods: {
        addTodo() {
        this.todos.push({ id: id++, text: this.newTodo, done: false })
        this.newTodo = ''
        },
        removeTodo(todo) {
        this.todos = this.todos.filter((t) => t !== todo)
        }
    }
    }
    </script>

    <template>
    <form @submit.prevent="addTodo">
        <input v-model="newTodo">
        <button>Add Todo</button>
    </form>
    <ul>
        <li v-for="todo in filteredTodos" :key="todo.id">
        <input type="checkbox" v-model="todo.done">
        <span :class="{ done: todo.done }">{{ todo.text }}</span>
        <button @click="removeTodo(todo)">X</button>
        </li>
    </ul>
    <button @click="hideCompleted = !hideCompleted">
        {{ hideCompleted ? 'Show all' : 'Hide completed' }}
    </button>
    </template>

    <style>
    .done {
    text-decoration: line-through;
    }
    </style>
    ```

#### Lifecycle and Template Refs

- In some cases we may want to manually work with the DOM.
  
- We can request a **template ref** (reference to an element in the template) - using the special attribute `ref`:
  
    ```html
    <p ref="pElementRef">hello</p>
    ```

    - Now the element will be exposed on `this.$refs` as `this.$refs.pElementRef`. However you can only axxess it after the component is **mounted**.

- To run the code after mount, we can use the mounted option:
  
    ```js
    export default {
        mounted() {
            this.$refs.pElementRef.textContent = 'mounted!'
        }
    }
    ```

- This is called a **lifecycle hook** - allows us to register a callback to be called at certain times of the component's lifecycle.
  - Other hooks are called `created` and `updated`.

#### Watchers

- Sometimes we may need to perform "side effects" reactively.

- For example, logging a number to the console when it changes. We can achieve this with watchers:

    ```js
    export default {
        data() {
            return {
            count: 0
            }
        },
        watch: {
            count(newCount) {
            // yes, console.log() is a side effect
            console.log(`new count is: ${newCount}`)
            }
        }
    }   
    ```

- Here we are using the `watch` option to watch changes to the `count` property. The watch callback is called when `count` changes, and **recieves the new value** as the argument.

#### Components

- So far we have only been working with a single component. Real vue applications are typically created with nested components.

- A **parent component** can render another component in its template as a **child component**. To use a child component, we need to first import it.

- Here is how we can do that:
  
    ```js
    import ChildComp from './ChildComp.vue'

    export default {
        components: {
            ChildComp
        }
    }
    ```

    - We also need to register the component using the `components` option.

- Then we can use it in the template as:

    ```html
    <ChildComp />
    ```

#### Props

- A child component can accept input from the parent via **props**. First it needs to declare the props it accepts:

    ```js
    // in child component
    export default {
        props: {
            msg: String
        }
    }
    ```

- Once it has been declared, the `msg` prop is exposed on `this` and can be used in the child component's template.

- The parent can pass the prop to the child just like attributes. To pass a dynamic value, we can also use the `v-bind` syntax:

    ```html
    <ChildComp :msg="greeting" />
    ```

#### Emits

- In addition to recieving probs, a child component can also emit events to the parent:
  
    ```js
    export default {
        // declare emitted events
        emits: ['response'],
        created() {
            // emit with argument
            this.$emit('response', 'hello from child')
        }
    }
    ```

- The first argument to `this.$emit()` is the event name. Any additional arguments are passed on to the event listener.

- The parent can listen to child-emmited events using `v-on` - here the handler recieves the extra argument from the child emmit call and assigns it to local state:

    ```html
    <ChildComp @response="(msg) => childMsg = msg" />
    ```

#### Slots

- In addition to passing data via props, the parent component can also pass down template fragments to the child iva slots:

    ```html
    <ChildComp>
    This is some slot content!
    </ChildComp>
    ```

- In the child component, it can render the slot content from the parent using the `<slot>` element as outlet:

    ```html
    <!-- in child template -->
    <slot/>
    ```

- Content inside the `<slot>` outlet will be treated as "fallback" content: it will be displayed if the parent did not pass down any slot conent.

# Vue Router

- Creating a Single-page Application with Vue + Vue Router feels natural. With Vue.js, we are already composing our application with components.

- When adding Vue Router to the mix, all we need to do is map our components to the routes and let Vue Router know where to render them.

- Here is a basic example:
  
    ```html
    <script src="https://unpkg.com/vue@3"></script>
    <script src="https://unpkg.com/vue-router@4"></script>

    <div id="app">
        <h1>Hello App!</h1>
        <p>
            <!-- use the router-link component for navigation. -->
            <!-- specify the link by passing the `to` prop. -->
            <!-- `<router-link>` will render an `<a>` tag with the correct `href` attribute -->
            <router-link to="/">Go to Home</router-link>
            <router-link to="/about">Go to About</router-link>
        </p>
        <!-- route outlet -->
        <!-- component matched by the route will render here -->
        <router-view></router-view>
    </div>
    ```