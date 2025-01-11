<script setup>
import { reactive, ref, onMounted } from 'vue';
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net-dt';
 
DataTable.use(DataTablesCore);

const datatable = ref(null); // Table reference

const tableData = ref([]);

const columns = reactive([
  { data: 'userId', title: 'UserId', },
  { data: 'id', title: 'id', },
  { data: null, title: 'Title',render:'#title' },

]);

const options = reactive({
  info: true,
  searching: true,
  paging: true,
  reload: true,
})

onMounted(async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts?_start=0&_limit=3');
  const data = await response.json();
  tableData.value = data; // Assign the fetched data to tableData
});

function sortData(direct){
  if(direct === "DESC"){
    tableData.value = tableData.value.sort((a,b)=>b.id-a.id)
  }else if(direct ==="ASC"){
    tableData.value = tableData.value.sort((a,b)=>a.id-b.id)

  }
}
</script>

<template>
  <div class="p-6">
    <div class="group-btn">
      <button @click="sortData('DESC')">Sort DESC</button>
      <button @click="sortData('ASC')">Sort ASC</button>
    </div>
    <div class="container-table">
      <DataTable
        ref="datatable"
        :columns="columns"
        :options="options"
        :data="tableData"
        class="display nowrap" width="100%"
      >
     <template #title="{rowData}">
      <span>{{ rowData.id }}</span>
      <span>{{ rowData.title }}</span>
    </template>
      </DataTable>
    </div>

  </div>
</template>

<style>
.group-btn{
  display: flex;
  align-items: center;
  gap: 6px;
}

</style>
