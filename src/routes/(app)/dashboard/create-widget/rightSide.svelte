<script>
  import { widgetData, updateArrayOrder, addElement } from "./dashBoardStore.js"
  import Sortable from "sortablejs/modular/sortable.complete.esm.js?module"
  import ComponentRenderer from "./_components/componentRenderer.svelte"
  import { onMount } from "svelte"
  import Settings from "./_components/settings.svelte"
  import Loading from "$lib/loading.svelte"

  export let widgetName
  export let element = null
  export let userData
  let showSettings = true
  let loading = false
  let foo
  async function handleCreate() {
    loading = true
    try {
      const response = await fetch(
        "http://localhost:3000/dashboard/widget-create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: $widgetData,
            dashboardId: userData.dashboardId,
            name: widgetName,
          }),
        }
      )
      let res = await response.json()
      if (response.ok) {
        loading = false
        goto("/dashboard")
      } else throw Error(res.message)
    } catch (error) {}
  }

  onMount(async () => {
    Sortable.create(foo, {
      group: {
        name: "foo",
        put: true,
        pull: false,
      },
      handle: ".handle",
      animation: 200,
      store: {
        set: function (sortable) {
          var order = sortable.toArray()
          updateArrayOrder(order, element)
        },
      },
    })
  })
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="settings__container">
  <p class="badge title" on:click={() => (showSettings = !showSettings)}>
    Settings
    <span class="material-symbols-outlined eye">
      {showSettings ? "visibility" : "visibility_off"}
    </span>
  </p>

  <div class="settings">
    <Settings {showSettings} {element} />
  </div>
</div>
<span
  style="margin-bottom:0.5em; font-weight:600; {showSettings
    ? 'margin-top: 1em;'
    : 'margin-top: 0;'}">Add element</span
>
<div class="add__element">
  <button
    class="add__element_btn"
    on:click={() => addElement("input", element)}
  >
    <span class="material-symbols-outlined new-element">add</span> Input
  </button>
  <button
    class="add__element_btn"
    on:click={() => addElement("description", element)}
  >
    <span class="material-symbols-outlined new-element">add</span> Description /
    Text
  </button>
  <button
    class="add__element_btn"
    on:click={() => addElement("dropdown", element)}
  >
    <span class="material-symbols-outlined new-element">add</span> Dropdown
  </button>
  <button
    class="add__element_btn"
    on:click={() => addElement("textarea", element)}
  >
    <span class="material-symbols-outlined new-element">add</span> Textarea
  </button>
</div>
<div class="elements" bind:this={foo}>
  {#each $widgetData.data as item, i (item.id)}
    <div class="item" data-id={item.id}>
      <ComponentRenderer {i} {...item} {element} />
    </div>
  {/each}
</div>
<button class="create__btn" on:click={() => handleCreate()}>
  {#if loading}
    <span class="loader"><Loading /></span>
  {:else}
    Create widget
  {/if}
</button>

<style lang="scss">
  .badge {
    position: static;
    margin: 0;
    opacity: 1;
    background: #f3f4f6;
    border: 1px solid #dbdee4;
    padding: 0.2em 0.5em;
    font-weight: 600;
    margin-bottom: 0.5em;
    height: 31.4px;

    &.title {
      display: flex;
      gap: 0.5em;
      cursor: pointer;
      .eye {
        opacity: 0.7;
      }
    }
  }
  .settings__container {
    margin-top: 2em;

    .badge {
      display: flex;
      justify-content: space-between;
    }
  }
  .elements {
    padding-top: 1em;
    display: flex;
    flex-wrap: wrap;
  }
  .add__element {
    display: flex;
    gap: 1em;
  }
  .add__element_btn {
    all: unset;
    opacity: 0.5;
    display: flex;
    background-color: #f3f4f6cb;
    width: fit-content;
    padding: 0.2em 0.5em;
    transition: opacity 200ms ease-in-out;
    font-size: 14px;
    cursor: pointer;
    &:hover {
      opacity: 1;
    }
  }
  .item {
    display: flex;
    flex-direction: column;
    width: 100%;
    border: 1px solid #dbdee4;
    //box-shadow: 5px 4px 3px -1px #f3f3f3, -5px 2px 3px -1px #f3f3f3;
    border-top: none;
    &:first-child {
      border-top: 1px solid #dbdee4;
    }
  }
  .settings {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 1em;
  }
  // .show {
  //   display: block;
  // }
  // .hide {
  //   display: none;
  // }
  .create__btn {
    all: unset;
    cursor: pointer;
    background-color: #c2ebd1;
    font-weight: 600;
    padding: 0.5em;
    margin-top: 1em;
    transition: background-color 200ms ease-in-out;
    align-self: flex-end;
  }
  .loader {
    display: flex;
    height: 25px;
    width: 115px;
    justify-content: center;
    align-items: center;
  }
</style>
