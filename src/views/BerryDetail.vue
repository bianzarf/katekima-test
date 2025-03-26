<script lang="ts">
import { defineComponent, ref, reactive, onMounted, watch } from "vue";
import { getData } from "../api/CommonApi";
import { useRoute } from "vue-router";
import { useBerryStore } from '../stores/berry'

export default defineComponent({
  name: "DetailBerry",
  components: {},
  setup() {
    const route = useRoute();
    const id = ref<number>(parseInt(route.params.id.toString() || '0'));
    const berries = ref([]);
    const berriesMap = ref([]);
    const berryDetail = ref(null);
    const uri = ref("https://pokeapi.co/api/v2/berry");
    const uriTable = ref("https://pokeapi.co/api/v2/berry");
    const loading = ref(false);

    const storeBerry = useBerryStore()

    const getDetail = async () => {
      loading.value = true;
      storeBerry.selected = '';
      let resp = await getData(`${uri.value}/${id.value}/`, {});
      if (resp["status"] == 200) {
        berryDetail.value = resp["data"];
        storeBerry.selected = berryDetail.value.name 
      }

      loading.value = false;
    };

    const getFullDataBerry = async () => {
      let resp = await getData(uriTable.value, { offset: 0, limit: 100 });
      if (resp["status"] == 200) {
        berries.value = resp["data"]["results"];
      }
    };

    onMounted(async () => {
      loading.value = true;
      await getFullDataBerry();
      await getDetail();
      loading.value = false;
    });

    return {
      storeBerry,
      id,
      berries,
      berriesMap,
      loading,
      uri,
      berryDetail,
      getDetail,
    };
  },
  methods: {
    onType(event) {
      if (this.berries.length > 0) {
        if (!event.query.trim().length) {
          this.berriesMap = this.berries.map((obj) => obj.name);
        } else {
          this.berriesMap = this.berries
            .filter((berry) => {
              return berry.name
                .toLowerCase()
                .startsWith(event.query.toLowerCase());
            })
            .map((obj) => obj.name);
        }
      }
    },
    async onChange() {
      if (this.storeBerry.selected) {
        let findObj = this.berries.find(
          (obj) => obj.name.toLowerCase() == this.storeBerry.selected.toLowerCase()
        );
        if (findObj) {
          const urls = findObj.url.split("/");
          const idSelected = urls[6];
          this.id = parseInt(idSelected);
          await this.getDetail();
        }
      }
    },
    async onNext() {
      let findIndex = this.berries.findIndex(
        (obj) => obj.name.toLowerCase() == this.berryDetail.name.toLowerCase()
      );
      if (findIndex !== null) {
        let idx;
        if (findIndex == this.berries.length - 1) idx = 0;
        else idx = findIndex + 1;
        let obj = this.berries[idx];
        const urls = obj.url.split("/");
        const idSelected = urls[6];
        this.id = parseInt(idSelected);
        this.storeBerry.selected = this.berries[idx].name;
        await this.getDetail();
      }
    },
  },
});
</script>


<template>
  <div class="p-3">
    <Loading
      :active="loading"
      :can-cancel="false"
      :is-full-page="true"
    ></Loading>

    <div class="p-2">
      <h4 class="font-bold text-xl">{{ $t("berry.detail.page_title") }}</h4>
    </div>

    <div class="p-1 mb-2">
      <AutoComplete
        v-model="storeBerry.selected"
        dropdown
        inputId="Select Berry"
        :suggestions="berriesMap"
        @complete="onType"
        @change="onChange"
        forceSelection
      />

      <Button
        class="ml-2"
        label="Pindah"
        icon="pi pi-arrow-right"
        severity="secondary"
        @click="onNext()"
      />
    </div>

    <div class="p-2 pb-4 mb-10">
      <table id="name" class="mb-4">
        <tbody>
          <tr>
            <td width="10%">Name</td>
            <td width="2%">:</td>
            <td width="60%">{{ berryDetail ? berryDetail.name : "" }}</td>
          </tr>
          <tr>
            <td>Size</td>
            <td>:</td>
            <td>{{ berryDetail ? berryDetail.size : "" }}</td>
          </tr>
          <tr>
            <td>Smoothness</td>
            <td>:</td>
            <td>{{ berryDetail ? berryDetail.smoothness : "" }}</td>
          </tr>
          <tr>
            <td>Soil Dryness</td>
            <td>:</td>
            <td>{{ berryDetail ? berryDetail.soil_dryness : "" }}</td>
          </tr>
          <tr>
            <td>Max Harvest</td>
            <td>:</td>
            <td>{{ berryDetail ? berryDetail.max_harvest : "" }}</td>
          </tr>
          <tr>
            <td>Growth Time</td>
            <td>:</td>
            <td>{{ berryDetail ? berryDetail.growth_time : "" }}</td>
          </tr>
          <tr>
            <td>Natural Gift Power</td>
            <td>:</td>
            <td>{{ berryDetail ? berryDetail.natural_gift_power : "" }}</td>
          </tr>
        </tbody>
      </table>

      <table id="natural_gift_type" class="mb-4">
        <thead>
          <tr>
            <th width="10%" class="text-left">Natural Gift Type</th>
            <th width="2%"></th>
            <th width="60%"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Name</td>
            <td>:</td>
            <td>{{ berryDetail ? berryDetail.natural_gift_type.name : "" }}</td>
          </tr>
          <tr>
            <td>URL</td>
            <td>:</td>
            <td>
              <a
                class="underline text-darkblue-200"
                :href="`${
                  berryDetail ? berryDetail.natural_gift_type.url : '#'
                }`"
                >{{ berryDetail ? berryDetail.natural_gift_type.url : "" }}</a
              >
            </td>
          </tr>
        </tbody>
      </table>

      <table id="firmness" class="mb-4">
        <thead>
          <tr>
            <th width="34%" class="text-left">Firmness</th>
            <th width="5%"></th>
            <th width="65%"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Name</td>
            <td>:</td>
            <td>{{ berryDetail ? berryDetail.firmness.name : "" }}</td>
          </tr>
          <tr>
            <td>URL</td>
            <td>:</td>
            <td>
              <a
                class="underline text-darkblue-200"
                :href="`${berryDetail ? berryDetail.firmness.url : '#'}`"
                >{{ berryDetail ? berryDetail.firmness.url : "" }}</a
              >
            </td>
          </tr>
        </tbody>
      </table>

      <table id="item" class="mb-4">
        <thead>
          <tr>
            <th width="38%" class="text-left">Item</th>
            <th width="5%"></th>
            <th width="65%"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Name</td>
            <td>:</td>
            <td>{{ berryDetail ? berryDetail.item.name : "" }}</td>
          </tr>
          <tr>
            <td>URL</td>
            <td>:</td>
            <td>
              <a
                class="underline text-darkblue-200"
                :href="`${berryDetail ? berryDetail.item.url : '#'}`"
                >{{ berryDetail ? berryDetail.item.url : "" }}</a
              >
            </td>
          </tr>
        </tbody>
      </table>

      <table id="flavors" class="mb-4">
        <thead>
          <tr>
            <th width="38%" class="text-left">Flavors</th>
            <th width="5%"></th>
            <th width="65%"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="berryDetail">
            <DataTable
              :value="berryDetail.flavors"
              showGridlines
              tableStyle="min-width: 50rem"
            >
              <Column field="flavor.name" header="Name"></Column>
              <Column field="flavor.url" header="URL">
                <template #body="slotProps">
                  <a
                    class="underline text-darkblue-200"
                    :href="slotProps.data.flavor.url"
                    >{{ slotProps.data.flavor.url }}</a
                  >
                </template>
              </Column>
              <Column field="potency" header="Potency"></Column>
            </DataTable>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<style>
</style>

<style scoped>
</style>