<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from "vue";
import { getData } from "../api/CommonApi";
import { useRoute } from "vue-router";
import { useBerryStore } from "../stores/berry";
import moment from "moment";

export default defineComponent({
  name: "BerryFullData",
  components: {},
  setup() {
    const route = useRoute();

    const berry = ref([]);
    const berryTemp = ref([]);
    const uri = ref("https://pokeapi.co/api/v2/berry/");
    const totalRecords = ref(10);
    const rowsPerPage = ref(10);
    const loading = ref(false);

    const storeBerry = useBerryStore();

    const onPage = (event) => {
      let pageEvent = event.page + 1;
      let rowsPerPageEvent = event.rows;

      storeBerry.page = pageEvent;
      rowsPerPage.value = rowsPerPageEvent;
    };

    const getFullDataBerry = async () => {
      let resp = await getData(uri.value, { offset: 0, limit: 100 });
      if (resp["status"] == 200) {
        berryTemp.value = resp["data"]["results"].sort((a, b) =>
          a.name > b.name ? 1 : b.name > a.name ? -1 : 0
        );
      }
    };

    const onFilter = () => {
      if(storeBerry.filterName !== ''){
        berry.value = berryTemp.value.filter(obj => obj.name.toLowerCase().includes(storeBerry.filterName.toLocaleLowerCase())).map((obj, i) => {
          return {
            no : i + 1,
            ...obj
          }
        }) 
      }else{
        berry.value = berryTemp.value.map((obj, i) => {
          return {
            no : i + 1,
            ...obj
          }
        })
      }
    }

    onMounted(async () => {
      await getFullDataBerry();
      onFilter()
    });

    const menu = ref();
    const items = ref([
      {
        label: "Detail",
        type: "detail",
        icon: "pi pi-search",
      },
    ]);

    const curDt = moment(new Date()).format("YYYY-MM-DD");

    return {
      storeBerry,
      curDt,
      loading,
      berry,
      totalRecords,
      uri,
      rowsPerPage,
      onPage,
      onFilter,
      menu,
      items,
    };
  },
  methods: {
    toggle(event, name) {
      this.$refs["menu_" + name].toggle(event);
    },
    onAction(type: string, data: any) {
      if (type == "detail") {
        this.onDetail(data.url);
      }
    },
    onDetail(url) {
      const urls = url.split("/");
      const id = urls[6];
      this.$router.push({ name: "Detail Berry", params: { id: id } });
    },
  },
});
</script>


<template>
  <div class="p-3">
    <div class="p-2">
      <h4 class="font-bold text-xl">{{ $t("berry.data_table.page_title_2") }}</h4>
    </div>
    <div class="p-2 pb-4 mb-10">
      <DataTable
        :value="berry"
        :rowsPerPageOptions="[10, 30, 50]"
        stateStorage="session"
        :stateKey="`${curDt}-state-demo-session`"
        paginator
        :rows="rowsPerPage"
        filterDisplay="menu"
        dataKey="name"
        :globalFilterFields="['name']"
        tableStyle="min-width: 50rem"
      >
        <template #header>
          <div class="flex justify-between">
            <IconField>
              <InputIcon>
                <i class="pi pi-search mr-3" />
              </InputIcon>
              <InputText
                v-model="storeBerry.filterName"
                placeholder="Name Search"
                @input="onFilter"
              />
            </IconField>

            <!-- <Button
              class="ml-2"
              :label="`${$t('berry.data_table.add')}`"
              icon="pi pi-plus"
              severity="success"
            /> -->

          </div>
        </template>
        <template #empty> {{$t('berry.data_table.empty')}} </template>
        <template #loading> {{$t('berry.data_table.loading')}} </template>
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
            <Menu
              :ref="'menu_' + slotProps.data.name"
              :id="`overlay_menu_` + slotProps.data.name"
              :model="items"
              :popup="true"
            >
              <template #item="{ item }">
                <div
                  :id="`pointer_` + slotProps.data.name"
                  class="cursor-pointer p-2"
                  @click="onAction(item.type, slotProps.data)"
                >
                  <span :class="item.icon" />
                  <span class="ml-4 font-mono">{{ $t(`berry.data_table.${item.type}`) }}</span>
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