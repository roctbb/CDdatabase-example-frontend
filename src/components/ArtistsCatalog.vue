<script>
import ArtistCard from "@/components/ArtistCard.vue";
import SearchBar from "@/components/SearchBar.vue";
import ArtistEditor from "@/components/ArtistEditor.vue";
// импортируем функцию
import {addArtist, getArtists, updateArtist} from "@/api";

export default {
    name: "ArtistsCatalog",
    components: { ArtistCard, SearchBar, ArtistEditor },
    data() {
        return {
            searchText: "",
            artists: [],
            isEditorVisible: false, // Показывать/скрывать модальное окно редактора
            editingArtist: null // Текущий редактируемый артист (null для нового)
        };
    },
    computed: {
        filteredArtists() {
            const search = this.searchText.toLowerCase();
            return this.artists.filter(artist =>
                artist.name.toLowerCase().includes(search) ||
                artist.description.toLowerCase().includes(search)
            );
        }
    },
    methods: {
        // Открывает редактор (либо для нового артиста, либо для редактирования)
        openEditor(artist) {
            this.editingArtist = artist !== undefined ? artist : null; // Если есть артист, передаем его, иначе новый
            this.isEditorVisible = true;
        },
        // Закрывает редактор
        closeEditor() {
            this.isEditorVisible = false;
        },
        // Сохраняет артиста (нового или отредактированного)
        async saveArtist(artist) {
            if (artist.id) {
                const index = this.artists.findIndex(a => a.id === artist.id);
                if (index !== -1) {
                    this.artists.splice(index, 1, await updateArtist(artist)); // Обновляем в массиве
                }
            } else {
                this.artists.push(await addArtist(artist));
            }
            this.closeEditor(); // Закрываем модальное окно
        }
    },
    // подгружаем данные при загрузке страницы
    async mounted() {
        this.artists = await getArtists()
    }
};
</script>

<template>
    <div class="container my-3">
        <!-- Обертка для строки поиска и кнопки добавления -->
        <div class="d-flex align-items-center justify-content-between mb-3">
            <!-- Компонент строки поиска -->
            <div class="flex-grow-1 me-1">
                <SearchBar v-model:search="searchText" />
            </div>


            <!-- Кнопка добавления артиста -->
            <button class="btn btn-primary ms-3" @click="openEditor()">
                Добавить артиста
            </button>
        </div>

        <!-- Сетка с карточками артистов -->
        <div class="row">
            <div
                class="col-12 col-sm-6 col-md-3 col-lg-2 p-1"
                v-for="artist in filteredArtists"
                :key="artist.id"
            >
                <ArtistCard :artist="artist" @edit="openEditor(artist)" class="h-100" />
            </div>
        </div>

        <!-- Сообщение, если список пуст -->
        <div v-if="filteredArtists.length === 0" class="text-center mt-3">
            <p>Ничего не найдено</p>
        </div>

        <!-- Модальное окно с ArtistEditor -->
        <div
            class="modal fade show"
            v-if="isEditorVisible"
            style="display: block; background-color: rgba(0, 0, 0, 0.5);"
        >
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">{{ editingArtist ? 'Редактировать артиста' : 'Добавить артиста' }}</h5>
                        <button type="button" class="btn-close" aria-label="Закрыть" @click="closeEditor"></button>
                    </div>
                    <div class="modal-body">
                        <ArtistEditor
                            :artist="editingArtist"
                            @save="saveArtist"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>