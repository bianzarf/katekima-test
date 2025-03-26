<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from "vue";
import { getData, postData, putData } from "../api/CommonApi";
import { Form } from "@primevue/forms";
import { useProductStore } from "../stores/product";
import { useToast } from "primevue/usetoast";
import { useI18n } from "vue-i18n";
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
  name: "FormProduct",
  components: { Form },
  setup() {
    const toast = useToast();
    const { t } = useI18n({ useScope: "global" });
    const uri = ref("https://fakestoreapi.com/products");
    const route = useRoute();
    const id = ref<number>(null);
    const isEdit = ref(false);
    const storeProduct = useProductStore();
    const router = useRouter()


    const initialValues = ref({
      id: 0,
      title: "",
      price: "",
      description: "",
      category: "",
      image: "",
    });

    const resolver = ({ values }) => {
      const errors = { title: [], price: [], category: [], image : [], description : [] };
      
      if (!initialValues.value.title) {
        errors.title = [{ message: "Title is required." }];
      }
      if (!initialValues.value.price) {
        errors.price = [{ message: "Price is required." }];
      }
      if (!initialValues.value.category) {
        errors.category = [{ message: "Category is required." }];
      }
      if (!initialValues.value.image) {
        errors.image = [{ message: "Image URL is required." }];
      }
      if (!initialValues.value.description) {
        errors.description = [{ message: "Description is required." }];
      }

      return {
        values, 
        errors,
      };
    };

    const getDetail = async () => {
      let resp = await getData(uri.value + `/${id.value}`, {})
      if(resp['status'] == 200){
        let data = resp['data']
        initialValues.value = data;
      }
    }

    const onFormSubmit = async ({ valid, values }) => {
      if(valid){
        if(!isEdit.value){
          let resp = await postData(uri.value, initialValues.value)
          if(resp['status'] == 200){
            toast.add({ severity: 'success', summary: t('message.success'), detail: t('message.success_add'), life: 3000 });
            router.push({name : 'Data Table Product'})
          }else{
            toast.add({ severity: 'Error', summary: t('message.error'), detail: t('message.error_add'), life: 3000 });
          }
        }else{
          let resp = await putData(uri.value + `/${id.value}`, values)
          if(resp['status'] == 200){
            toast.add({ severity: 'success', summary: t('message.success'), detail: t('message.success_edit'), life: 3000 });
            router.push({name : 'Data Table Product'})
          }else{
            toast.add({ severity: 'Error', summary: t('message.error'), detail: t('message.error_edit'), life: 3000 });
          }
        }
      }
    };

    onMounted(async () => {
      if(route.params.id){
        isEdit.value = true;
        id.value = parseInt(route.params.id.toString())
        await getDetail()
      }
    });


    return {
      initialValues,
      isEdit,
      resolver,
      onFormSubmit,
      getDetail
    };
  },
  methods: {},
});
</script>


<template>
  <div class="p-3">
    <div class="p-2">
      <h4 class="font-bold text-xl">
        {{ $t(`product.form.page_title_${isEdit ? "edit" : "add"}`) }}
      </h4>
    </div>

    <div class="p-2">
      <Form
        ref="formRef"
        v-slot="$form"
        :initialValues="initialValues"
        :resolver="resolver"
        @submit="onFormSubmit"
      >
        <div class="w-full sm:w-120">
          <div class="p-2">
            <InputText
              name="id"
              v-model="initialValues['id']"
              type="text"
              fluid
              hidden
            />
          </div>
          <div class="p-2">
            <label>{{ $t("product.data_table.title") }}</label>
            <InputText
              v-model="initialValues['title']"
              name="title"
              type="text"
              :placeholder="`${$t('product.data_table.title')}`"
              fluid
            />
            <Message
              v-if="$form.title?.invalid"
              severity="error"
              size="small"
              variant="simple"
            >
              {{ $form.title.error?.message }}
            </Message>
          </div>
          <div class="p-2">
            <label>{{ $t("product.data_table.price") }}</label>
            <InputText
              v-model="initialValues['price']"
              name="price"
              type="number"
              :placeholder="`${$t('product.data_table.price')}`"
              fluid
            />
            <Message
              v-if="$form.price?.invalid"
              severity="error"
              size="small"
              variant="simple"
            >
              {{ $form.price.error?.message }}
            </Message>
          </div>
          <div class="p-2">
            <label>{{ $t("product.data_table.category") }}</label>
            <InputText
              v-model="initialValues['category']"
              name="category"
              type="text"
              :placeholder="`${$t('product.data_table.category')}`"
              fluid
            />
            <Message
              v-if="$form.category?.invalid"
              severity="error"
              size="small"
              variant="simple"
            >
              {{ $form.category.error?.message }}
            </Message>
          </div>
          <div class="p-2">
            <label>{{ $t("product.data_table.image") }} URL</label>
            <InputText
              v-model="initialValues['image']"
              name="image"
              type="text"
              :placeholder="`${$t('product.data_table.image')} URL`"
              fluid
            />
            <Message
              v-if="$form.image?.invalid"
              severity="error"
              size="small"
              variant="simple"
            >
              {{ $form.image.error?.message }}
            </Message>
          </div>
          <div class="p-2">
            <label>{{ $t("product.data_table.description") }}</label>
            <Textarea
              v-model="initialValues['description']"
              name="description"
              type="text"
              :placeholder="`${$t('product.data_table.description')}`"
              fluid
            />
            <Message
              v-if="$form.description?.invalid"
              severity="error"
              size="small"
              variant="simple"
            >
              {{ $form.description.error?.message }}
            </Message>
          </div>
        </div>
        <div class="p-2">
          <Button type="submit" severity="secondary" label="Submit" />
        </div>
      </Form>
    </div>
  </div>
</template>


<style>
</style>

<style scoped>
</style>