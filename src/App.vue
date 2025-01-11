<script setup>
import { reactive, ref, onMounted } from 'vue';
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net-dt';
 
DataTable.use(DataTablesCore);

const datatable = ref(null); // Table reference

const ajax = reactive({
  url:'https://jsonplaceholder.typicode.com/comments?postId=1',
  data:(data)=>{
    console.log('---->>>',data)
    const order = data.order;
    if (order.length) {
    const columns = data.columns[order[0].column];

    if (columns.orderable && columns.data) {
      data.OrderBy = columns.data;
      data.OrderDir = order[0].dir.toUpperCase();
      return {
        OrderBy:columns.data,
        OrderDir:order[0].dir
      }
    }
  }
  },
  dataSrc:(dataSrc)=>{
    return dataSrc
  }
})

const columns = reactive([
  { data: 'id', title: 'Id', },
  { data: 'name', title: 'Name',render:'#name' },
  { data: 'email', title: 'Email', },
  { data: 'phone', title: 'Phone', },

]);

const options = reactive({
  info: true,
  searching: true,
  paging: true,
  reload: true,
  processing : true,
  serverSide : true,
  debug : true,
})

onMounted(async () => {

});

</script>

<template>
  <div class="p-6">
    <div class="container-table">
      <DataTable
        ref="datatable"
        :columns="columns"
        :options="options"
        :ajax="ajax"
        class="display nowrap" width="100%"
      >
     <template #name="{rowData}">
      <span>{{ rowData.name }}</span>
      <span>{{ rowData.username }}</span>
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
