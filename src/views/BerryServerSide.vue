<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from "vue";
import { getData } from "../api/CommonApi";
import { useRoute } from "vue-router";
import { useBerryStore } from '../stores/berry'
import moment from 'moment';

export default defineComponent({
  name: "BerryServerSide",
  components: {},
  setup() {
    const route = useRoute();

    const berry = ref([]);
    const uri = ref("https://pokeapi.co/api/v2/berry/");
    const totalRecords = ref(10);
    const rowsPerPage = ref(10);
    const loading = ref(false);

    const storeBerry = useBerryStore()

    const onPage = (event) => {
      let pageEvent = event.page + 1;
      let rowsPerPageEvent = event.rows;

      storeBerry.page = pageEvent;
      rowsPerPage.value = rowsPerPageEvent;
      getApiData(uri.value, pageEvent, rowsPerPageEvent);
    };

    const getApiData = async (
      uriparam: string | null | undefined,
      pageParam: number | null | undefined,
      rowsPerPageParam: number | null | undefined
    ) => {
      loading.value = true;
      let uriOriginal = uriparam || uri.value;
      let offset = pageParam || storeBerry.page;
      let limit = rowsPerPageParam || rowsPerPage.value;
      offset = (offset - 1) * limit;
      let resp = await getData(uriOriginal, {offset, limit});
      if (resp["status"] == 200) {
        totalRecords.value = resp["data"]["count"];
        if (resp["data"]["results"] && resp["data"]["results"].length > 0) {
          berry.value = resp["data"]["results"].sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0) )
          berry.value = berry.value.map((obj, i) => {
            return {
              no : (i+1) + ((storeBerry.page - 1) * limit),
              ...obj
            }
          });
        }
      }

      loading.value = false;
    };

    onMounted(async () => {
      getApiData(uri.value, storeBerry.page, rowsPerPage.value);
    });

    const menu = ref();
    const items = ref([
      {
        label: "Detail",
        type: "detail",
        icon: "pi pi-search",
      },
    ]);

    const curDt = moment(new Date()).format('YYYY-MM-DD');

    return {
      storeBerry,
      curDt,
      loading,
      berry,
      totalRecords,
      uri,
      rowsPerPage,
      onPage,
      getApiData,
      menu,
      items,
    };
  },
  methods: {
    toggle(event, name) {
      this.$refs['menu_' + name].toggle(event);
    },
    onAction(type: string, data : any){
      if(type == 'detail'){
        this.onDetail(data.url)
      }
    },
    onDetail(url){
      const urls = url.split('/')
      const id = urls[6]
      this.$router.push({ name : 'Detail Berry', params : { id : id }})
    }
  },
});
</script>


<template>
  <div class="p-3">
    <div class="p-2">
      <h4 class="font-bold text-xl">{{ $t("berry.data_table.page_title_1") }}</h4>
    </div>
    <div class="p-2 pb-4 mb-10">
      <DataTable
        :value="berry"
        :rowsPerPageOptions="[10, 30, 50]"
        showGridlines
        stripedRows
        lazy
        stateStorage="session" 
        :stateKey="`${curDt}-state-demo-session`"
        paginator
        :first="first"
        :rows="rowsPerPage"
        v-model:filters="filters"
        dataKey="id"
        :totalRecords="totalRecords"
        :loading="loading"
        @page="onPage($event)"
        @sort="onSort($event)"
        @filter="onFilter($event)"
        tableStyle="min-width: 50rem;"
      >
        <template #header>
          <div class="flex flex-row-reverse">
            <!-- <Button
              class="ml-2"
              :label="`${$t('berry.data_table.add')}`"
              icon="pi pi-plus"
              severity="success"
            /> -->

          </div>
        </template>
        <template #paginatorstart>
          <Button
            type="button"
            icon="pi pi-refresh"
            text
            @click="getApiData()"
          />
        </template>
        <template #empty> No berry found. </template>
        <template #loading> Loading berry data. Please wait. </template>
        <Column field="no" header="No" style="width: 10%"></Column>
        <Column field="name" :header="`${$t('berry.data_table.name')}`" style="width: 40%"></Column>
        <Column field="url" header="URL" style="width: 40%"></Column>
        <Column field="aksi" :header="`${$t('berry.data_table.action')}`" style="width: 10%">
          <template #body="slotProps">
            <Button
              :id="slotProps.data.name"
              type="button"
              icon="pi pi-ellipsis-v"
              @click="toggle($event, slotProps.data.name)"
              aria-haspopup="true"
              :aria-controls="`overlay_menu_` + slotProps.data.name"
            />
            <Menu :ref="'menu_' + slotProps.data.name" :id="`overlay_menu_`+ slotProps.data.name" :model="items" :popup="true">
              <template #item="{ item }">
                <div :id="`pointer_`+ slotProps.data.name" class="cursor-pointer p-2" @click="onAction(item.type, slotProps.data)">
                  <span :class="item.icon" />
                  <span class="ml-4 font-mono">{{ item.label }}</span>
                </div>
              </template>
            </Menu>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>


<style>
</style>

<style scoped>
</style>