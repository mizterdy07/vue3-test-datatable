<script setup>
import { reactive, ref, onMounted } from 'vue';
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net-dt';
 
DataTable.use(DataTablesCore);

const datatable = ref(null); // Table reference

const ajax = reactive({
  url:'https://demo1api.kottrasala.com//api/room/list',
  method:'POST',
  beforeSend:(xhr)=> {
  xhr.setRequestHeader(
    "Authorization",
    `Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJjOTNiMmIwMi0xNDJmLTQ2MTItYjIwYy1mNGYyNDQ3ZjI3YmIiLCJ1c24iOiJPQ1NBRE1JTiIsImxnbiI6Im9jc2FkbWluIiwiZGlkIjoiZDdkNTAxNGYtMzY4MS00NDdjLWI1YzAtZTZkNDkyNjZiM2QwIiwiY2lkIjoiNTQxZmM5NjUtYmM1Ny00ODkyLWJkYTktZTJjN2M3YTJjZGQ2IiwibzpuIjoiMCIsIm86ZiI6Ik9DUyIsIm86bCI6IkFkbWluIiwibzpnIjoiTWFsZSIsIm86dCI6IlN5c0FkbWluIiwibzpyIjoiIiwibzpkIjoiMCIsIm86aSI6Imh0dHBzOi8vZGVtbzF3ZWIua290dHJhc2FsYS5jb20vVXBsb2Fkcy9JbWFnZXMvVXNlci9PQ1NBRE1JTjIwMjQwODA4MTExNzIwLnBuZyIsIm86cCI6IiIsImE6dCI6IltdIiwibmJmIjoxNzM2NzMxNzY1LCJleHAiOjE3MzY3MzUzNjUsImlzcyI6Imh0dHBzOi8vd3d3Lm9jc29sdXRpb24ubmV0IiwiYXVkIjoiQWxsIHJlZ2lzdGVyZWQgY3VzdG9tZXJzIn0.36HJSUfLXytAldXH2TLJxCJqlNfy62HDjMTPSraZEVU`
  )
  xhr.setRequestHeader("oc_device_id", 'd7d5014f-3681-447c-b5c0-e6d49266b3d0');
  xhr.setRequestHeader("oc_database", 'RTK');
},

  data:(data)=>{
    console.log('-->>',data)
    const order = data.order;

    if (order.length) {
      const columns = data.columns[order[0].column];
  
      if (columns.orderable && columns.data) {
        data.OrderBy = columns.data;
        data.OrderDir = order[0].dir.toUpperCase();
      }
    }
  
    data.Search =  "";
  
    data.Pages = 1;
    data.Records = data.length;  
    delete data.search;

    return {
      Pages:data.Pages,
      Records:data.Records,
      OrderBy:data.OrderBy,
      OrderDir:data.OrderDir
    };

  },
  dataSrc:(data)=>{
    console.log('===>>',data)
    if (data[0]?.RecordCount) data.recordsTotal = data[0].RecordCount;

    if (data[0]?.RecordCounts) data.recordsTotal = data[0].RecordCounts;

    if (data[0]?.TotalRecord) data.recordsTotal = data[0].TotalRecord;

    if (data.total) data.recordsTotal = data.total;

    if (!data.recordsTotal) data.recordsTotal = data.length;

    data.recordsFiltered = data.recordsTotal;
    return data
  }
})

const columns = reactive( [
  { title:'Room Code',data: 'Id',className: 'min-width',render: '#roomCode',},
  { title:'Name',data: 'Name', className: 'min-width' },
  { title:'English Name',data: 'EnglishName', className: 'min-width' },
  { title:'Description',data: 'Description', },
  { title:'Status',data: 'Status', className: 'min-width',render: '#status' },
  { title:'Created By',data: 'UserCreate', className: 'min-width' },
  { title:'Updated By'  ,data: 'UserUpdate', className: 'min-width',},
  { title:'Action',data: null, className: 'min-width', render:'#action'},
]);

const options = reactive({
  info: true,
  searching: true,
  paging: false,
  reload: true,
  processing : true,
  serverSide : true,
  debug : true,
  lengthMenu: [10, 25, 50, 100],
})

onMounted(async () => {

});

function fnTblClick(data){
console.log('------>>>',data)
}

</script>

<template>
  <div class="p-6">
    <div class="container-table">
      <DataTable ref="datatable" :columns="columns" :options="options" :ajax="ajax" class="display nowrap" width="100%">
      <template #roomCode="{rowData}">
       {{ rowData.Id }} • {{ rowData.Code }} <i class="ri-earth-fill" :class="[rowData.IsGlobal=== true?'':'hidden']"></i>
      </template>
      <template #status="{cellData}">
        <label class="label" :class="[cellData=='1'?' label-success':'label-danger']">
          {{cellData =="1"?'Enable':'Disable'}}
        </label>
      </template>
      <template #action="{rowData}">
        <div class="v2-btnIcon-container">
          <button class ="v2-btnIcon green icon-update" data-toggle="tooltip" title="Update" @click="fnTblClick(rowData)" ><i class="ri-pencil-fill"></i> </button>
          <button class ="v2-btnIcon red icon-delete" data-toggle="tooltip" title="Delete" @click="fnTblClick(rowData)"><i class="ri-delete-bin-6-line"></i> </button>
        </div>
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
.hidden{
  display: none;
}

.v2-btnIcon-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4.5px;
}

.v2-btnIcon {
    border: 1px solid #189c9b;
    outline: 0 !important;
    color: #189c9b;
    background: #fff;
    box-sizing: border-box;
    border-radius: 4px;
    height: 25px;
    width: 25px;
    transition: .3s ease-in-out;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.v2-btnIcon.green {
    color: #4caf50;
    border-color: #4caf50;
}

.v2-btnIcon.red {
    color: #f44336;
    border-color: #f44336;
}

.label {
    display: inline;
    padding: 3px 5px;
    font-size: 74%;
    font-weight: 700;
    line-height: 1;
    color: #fff;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: .25em;
}

.label-success {
    background-color: #009688;
}
</style>
