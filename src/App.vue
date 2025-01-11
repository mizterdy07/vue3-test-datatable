<script setup>
import { reactive, ref, onMounted } from 'vue';
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net-dt';
 
DataTable.use(DataTablesCore);

const datatable = ref(null); // Table reference

const columns = reactive([
  { data: 'userId', title: 'UserId', },
  { data: 'id', title: 'id', },
  { data: 'body', title: 'Body' },
  { data: null, title: 'Title',render:'#title' },

]);

onMounted(() => {

});
</script>

<template>
  <div class="p-6">
    <div class="rounded-md bg-white p-4 shadow-sm">
      <DataTable
        ref="datatable"
        :columns="columns"
        ajax="https://jsonplaceholder.typicode.com/posts?_start=0&_limit=3"
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
