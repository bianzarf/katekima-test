<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from "vue";
import { getData } from "../api/CommonApi";
import { useRoute } from "vue-router";
import { useProductStore } from "../stores/product";
import moment from "moment";

export default defineComponent({
  name: "ProductFullData",
  components: {},
  setup() {
    const route = useRoute();

    const product = ref([]);
    const productsTemp = ref([]);
    const uri = ref("https://fakestoreapi.com/products");
    const totalRecords = ref(10);
    const rowsPerPage = ref(10);
    const loading = ref(false);

    const storeProduct = useProductStore();

    const onPage = (event) => {
      let pageEvent = event.page + 1;
      let rowsPerPageEvent = event.rows;

      storeProduct.page = pageEvent;
      rowsPerPage.value = rowsPerPageEvent;
    };

    const getFullDataProduct = async () => {
      loading.value = true;
      let resp = await getData(uri.value, {});
      if (resp["status"] == 200) {
        productsTemp.value = resp["data"].sort((a, b) => a.id - b.id);
      }
      loading.value = false;
    };

    const onFilter = () => {
      if (storeProduct.filterTitle !== "") {
        product.value = productsTemp.value
          .filter((obj) =>
            obj.title
              .toLowerCase()
              .includes(storeProduct.filterTitle.toLocaleLowerCase())
          )
          .map((obj, i) => {
            return {
              no: i + 1,
              ...obj,
            };
          });
      } else {
        product.value = productsTemp.value.map((obj, i) => {
          return {
            no: i + 1,
            ...obj,
          };
        });
      }
    };

    onMounted(async () => {
      await getFullDataProduct();
      onFilter();
    });

    const menu = ref();
    const items = ref([
      {
        label: "Edit",
        type: "edit",
        icon: "pi pi-pencil",
      },
      {
        label: "Delete",
        type: "delete",
        icon: "pi pi-pencil",
      },
    ]);

    const curDt = moment(new Date()).format("YYYY-MM-DD");

    return {
      storeProduct,
      curDt,
      loading,
      product,
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
    toggle(event, id) {
      this.$refs["menu_" + id].toggle(event);
    },
    onAction(type: string, data: any) {
      if (type == "edit") {
        this.onEdit(data.id);
      }
    },
    onEdit(id) {
      this.$router.push({ name: "Edit Table Product", params: { id: id } });
    },
    doAdd(){
      this.$router.push({ name : 'Add Table Product' })
    }
  },
});
</script>


<template>
  <div class="p-3">
    <div class="p-2">
      <h4 class="font-bold text-xl">
        {{ $t("product.data_table.page_title_1") }}
      </h4>
    </div>
    <div class="p-2 pb-4 mb-10">
      <DataTable
        :value="product"
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
                v-model="storeProduct.filterTitle"
                placeholder="Title Search"
                @input="onFilter"
              />
            </IconField>

            <Button
              class="ml-2"
              :label="`${$t('product.data_table.add')}`"
              @click="doAdd()"
              icon="pi pi-plus"
              severity="success"
            />
          </div>
        </template>
        <template #empty> {{ $t("product.data_table.empty") }} </template>
        <template #loading> {{ $t("product.data_table.loading") }} </template>
        <Column field="no" header="No" style="width: 10%"></Column>
        <Column
          field="title"
          :header="`${$t('product.data_table.title')}`"
          style="width: 20%"
        >
          <template #body="slotProps">
            <div class="content-between text-center">
              <Image
                :src="slotProps.data.image"
                alt="Image"
                width="80"
                preview
              />
              <p>{{ slotProps.data.title }}</p>
            </div>
          </template>
        </Column>
        <Column
          field="price"
          :header="`${$t('product.data_table.price')}`"
          style="width: 10%"
        >
          <template #body="slotProps"> ${{ slotProps.data.price }} </template>
        </Column>
        <Column
          field="description"
          :header="`${$t('product.data_table.description')}`"
          style="width: 40%"
        ></Column>
        <Column
          field="category"
          :header="`${$t('product.data_table.category')}`"
          style="width: 20%"
        ></Column>
        <Column
          field="rating"
          :header="`${$t('product.data_table.rating')}`"
          style="width: 10%"
        >
          <template #body="slotProps">
            {{slotProps.data.rating.rate}}/{{slotProps.data.rating.count}} 
          </template>
        </Column>
        <Column
          field="aksi"
          :header="`${$t('product.data_table.action')}`"
          style="width: 10%"
        >
          <template #body="slotProps">
            <Button
              :id="slotProps.data.id"
              type="button"
              icon="pi pi-ellipsis-v"
              @click="toggle($event, slotProps.data.id)"
              aria-haspopup="true"
              :aria-controls="`overlay_menu_` + slotProps.data.id"
            />
            <Menu
              :ref="'menu_' + slotProps.data.id"
              :id="`overlay_menu_` + slotProps.data.id"
              :model="items"
              :popup="true"
            >
              <template #item="{ item }">
                <div
                  :id="`pointer_` + slotProps.data.id"
                  class="cursor-pointer p-2"
                  @click="onAction(item.type, slotProps.data)"
                >
                  <span :class="item.icon" />
                  <span class="ml-4 font-mono">{{
                    $t(`product.data_table.${item.type}`)
                  }}</span>
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