<script lang="ts">
    export let data
  
    let loadedData = []
    $:console.log(loadedData);
    async function loadData() {
      const { data: result } = await data.supabase.from('posts').select('*').limit(20)
      loadedData = result
    }
  
    $: if (data.session) {
      loadData()
    }
  </script>
  
  {#if data.session}
  <p>{JSON.stringify(loadedData)}</p>
  {:else}
  <p>nothing to see</p>
  {/if}