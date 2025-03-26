import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import Header from './components/header/Header.vue'
import Footer from './components/footer/Footer.vue'
import PrimeVue from 'primevue/config';
import Loading from 'vue3-loading-overlay';
import Aura from '@primeuix/themes/aura';
import 'primeicons/primeicons.css'
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';
import Button from 'primevue/button';
import Menu from 'primevue/menu';
import AutoComplete from 'primevue/autocomplete';
import Textarea from 'primevue/textarea';
import InputText from 'primevue/inputtext';
import InputIcon from 'primevue/inputicon';
import IconField from 'primevue/iconfield';
import Image from 'primevue/image';
import Message from 'primevue/message';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';


import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
    // Default theme configuration
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            darkModeSelector: false || 'none',
            cssLayer: false
        }
    }
})

app.component('Header', Header)
app.component('Footer', Footer)
app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('ColumnGroup', ColumnGroup)
app.component('Row', Row)
app.component('Button', Button)
app.component('Menu', Menu)
app.component('AutoComplete', AutoComplete)
app.component('InputText', InputText)
app.component('Textarea', Textarea)
app.component('InputIcon', InputIcon)
app.component('IconField', IconField)
app.component('Loading', Loading)
app.component('Image', Image)
app.component('Message', Message)
app.component('Toast', Toast)

app.use(ToastService)

const i18n = createI18n({
    locale: 'id',
    fallbackLocale: 'en',
    messages: {
        id: {
            message : {
                success : 'Pesan Sukses',
                success_add : 'Data berhasil ditambahkan',
                success_edit : 'data berhasil diubah',
                error : 'Pesan Kesalahan',
                error_add : 'Gagal menambahkan data',
                error_edit : 'Gagal memodifikasi data',
            },
            sidebar : {
                berry_1 : "Berry",
                berry_2 : "Berry Server",
                product : "Produk",
            },
            berry: {
                data_table: {
                    page_title_1: 'Tabel Data Berry (Data Server)',
                    page_title_2: 'Tabel Data Berry',
                    add : 'Tambah',
                    name : 'Nama',
                    action : 'Aksi',
                    detail : 'Detil',
                    empty : 'Data Buah Berry tidak ditemukan',
                    loading : 'Menunggu data Buah Berry. Tunggu Sebentar.'
                },
                detail: {
                    page_title: 'Detil Buah Berry'
                }
            },
            product: {
                form : {
                    page_title_add: 'Tambah Produk',
                    page_title_edit: 'Ubah Produk',
                },
                data_table: {
                    page_title_1: 'Tabel Data Produk',
                    add : 'Tambah',
                    edit : 'Ubah',
                    delete : 'Hapus',
                    title : 'Judul',
                    price : 'Harga',
                    description : 'Deskripsi',
                    category : 'Kategori',
                    image : 'Gambar',
                    rating : 'Peringkat',
                    action : 'Aksi',
                    detail : 'Detil',
                    empty : 'Data Produk tidak ditemukan',
                    loading : 'Menunggu data Produk. Tunggu Sebentar.'
                },
                detail: {
                    page_title: 'Detil Produk'
                }
            },
        },
        en: {
            message : {
                success : 'Success Message',
                success_add : 'Data successfully added',
                success_edit : 'Data successfully modified',
                error : 'Error Message',
                error_add : 'Failed to add data',
                error_edit : 'Failed to modify data',
            },
            sidebar : {
                berry_1 : "Berry",
                berry_2 : "Berry Server",
                product : "Product",
            },
            berry: {
                data_table: {
                    page_title_1: 'Data Table Berry (Server-Side)',
                    page_title_2: 'Data Table Berry',
                    add : 'Add',
                    name : 'Name',
                    action : 'Action',
                    detail : 'Detail',
                    empty : 'No Berry found',
                    loading : 'Loading Berry data. Please wait.'
                },
                detail: {
                    page_title: 'Detail Berry'
                }
            },
            product: {
                form : {
                    page_title_add: 'Add Product',
                    page_title_edit: 'Edit Product',
                },
                data_table: {
                    page_title_1: 'Tabel Data Product',
                    add : 'Add',
                    edit : 'Edit',
                    delete : 'Delete',
                    title : 'Title',
                    price : 'Price',
                    description : 'Description',
                    category : 'Category',
                    image : 'Image',
                    rating : 'Rating',
                    action : 'Action',
                    detail : 'Detail',
                    empty : 'No product found',
                    loading : 'Loading product data. Please wait.'
                },
                detail: {
                    page_title: 'Detail Product'
                }
            },
        },
        jp: {
            message : {
                success : '成功メッセージ',
                success_add : 'データが正常に追加されました',
                success_edit : 'データが正常に変更されました',
                error : 'エラー メッセージ',
                error_add : 'データの追加に失敗しました',
                error_edit : 'データの変更に失敗しました',
            },
            sidebar : {
                berry_1 : "ベリー",
                berry_2 : "ベリーサーバー",
                product : "製品",
            },
            berry: {
                data_table: {
                    page_title_1: 'データ テーブル Berry（サーバー側）',
                    page_title_2: 'データ テーブル Berry',
                    add : '追加',
                    name : '名前',
                    action : 'アクション',
                    detail : '詳細',
                    empty : 'ベリーが見つかりません',
                    loading : 'ベリーデータを読み込んでいます。お待ちください。'
                },
                detail: {
                    page_title: '詳細 Berry'
                }
            },
            product: {
                form : {
                    page_title_add: '製品を追加',
                    page_title_edit: '製品を編集',
                },
                data_table: {
                    page_title_1: 'データ テーブル 商品',
                    add : '追加',
                    edit : '編集',
                    delete : '消去',
                    title : 'タイトル',
                    price : '価格',
                    description : '説明',
                    category : 'カテゴリー',
                    image : '画像',
                    rating : '評価',
                    action : 'アクション',
                    detail : '詳細',
                    empty : '商品が見つかりません',
                    loading : '商品データを読み込んでいます。お待ちください。'
                },
                detail: {
                    page_title: '詳細 商品'
                }
            },
        },
        fr: {
            message : {
                success : 'Message de réussite',
                success_add : 'Données ajoutées avec succès',
                success_edit : 'Données modifiées avec succès',
                error : `Message d'erreur`,
                error_add : `Échec de l'ajout des données`,
                error_edit : `Échec de la modification des données`,
            },
            sidebar : {
                berry_1 : "Baies",
                berry_2 : "Serveur de baies",
                product : "Produit",
            },
            berry: {
                data_table: {
                    page_title_1: 'Table de données Berry (côté serveur)',
                    page_title_2: 'Table de données Berry',
                    add : 'Ajouter',
                    name : 'Nom',
                    action : 'Action',
                    detail : 'Détail',
                    empty : 'Aucun baie trouvée',
                    loading : 'Chargement des données baie. Veuillez patienter.'
                },
                detail: {
                    page_title: 'Détail Berry'
                }
            },
            product: {
                form : {
                    page_title_add: 'Ajouter un produit',
                    page_title_edit: 'Modifier un produit',
                },
                data_table: {
                    page_title_1: 'Table de données Produit',
                    add : 'Ajouter',
                    edit : 'Modifier',
                    delete : 'Supprimer',
                    title : 'Titre',
                    price : 'Prix',
                    description : 'Description',
                    category : 'Catégorie',
                    image : 'Image',
                    rating : 'Note',
                    action : 'Action',
                    detail : 'Détail',
                    empty : 'Aucun produit trouvé',
                    loading : 'Chargement des données produit. Veuillez patienter.'
                },
                detail: {
                    page_title: 'Détail Produit'
                }
            },
        },
        de: {
            message : {
                success : 'Erfolgsmeldung',
                success_add : 'Daten erfolgreich hinzugefügt',
                success_edit : 'Daten erfolgreich geändert',
                error : `Fehlermeldung`,
                error_add : `Daten konnten nicht hinzugefügt werden`,
                error_edit : `Daten konnten nicht geändert werden`,
            },
            sidebar : {
                berry_1 : "Berry",
                berry_2 : "Berry Server",
                product : "Produkt",
            },
            berry: {
                data_table: {
                    page_title_1: 'Datentabelle Berry (serverseitig)',
                    page_title_2: 'Datentabelle Berry',
                    add : 'Hinzufügen',
                    name : 'Name',
                    action : 'Aktion',
                    detail : 'Details',
                    empty : 'Kein Beere gefunden',
                    loading : 'Beerendaten werden geladen. Bitte warten.'
                },
                detail: {
                    page_title: 'Details Berry'
                }
            },
            product: {
                form : {
                    page_title_add: 'Produkt hinzufügen',
                    page_title_edit: 'Produkt bearbeiten',
                },
                data_table: {
                    page_title_1: 'Datentabelle Produkt',
                    add : 'Add',
                    edit : 'Bearbeiten',
                    delete : 'Löschen',
                    title : 'Titel',
                    price : 'Preis',
                    description : 'Beschreibung',
                    category : 'Kategorie',
                    image : 'Bild',
                    rating : 'Bewertung',
                    action : 'Aktion',
                    detail : 'Details',
                    empty : 'Kein Produkt gefunden',
                    loading : 'Produktdaten werden geladen. Bitte warten.'
                },
                detail: {
                    page_title: 'Details Produkt'
                }
            },
        }
    }
})

app.use(i18n);

if (localStorage.getItem("selectedLang")) {
    i18n.global.locale = localStorage.getItem("selectedLang") as 'id' | 'en' | 'jp' | 'fr' | 'de'
}
app.mount('#app')
