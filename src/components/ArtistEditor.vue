<script>
export default {
    name: "ArtistEditor",
    props: {
        // Проп для текущего редактируемого артиста (если передан)
        artist: {
            type: Object
        }
    },
    data() {
        return {
            localArtist: this.artist || {
                name: "", // Имя артиста
                description: "", // Описание артиста
                genres: [] // Список жанров
            },
            genreInput: "" // Значение жанра, который вводится в поле
        };
    },
    methods: {
        // Метод для сохранения изменений или добавления нового артиста
        saveArtist() {
            this.$emit("save", { ...this.localArtist }); // Генерируем событие сохранения с данными артиста
            this.resetForm(); // Очищаем форму после сохранения
        },
        // Сбрасываем форму к исходному состоянию
        resetForm() {
            this.localArtist = {
                name: "",
                description: ""
            };
        }
    },
    watch: {
        // Следим за изменением пропа "artist" и обновляем локальное состояние
        artist(newArtist) {
            this.localArtist = { ...newArtist };
        }
    }
};
</script>

<template>
    <div class="artist-editor">
        <form @submit.prevent="saveArtist">
            <!-- Имя артиста -->
            <div class="mb-3">
                <label for="artist-name" class="form-label">Имя артиста</label>
                <input
                    id="artist-name"
                    v-model="localArtist.name"
                    type="text"
                    class="form-control"
                    placeholder="Введите имя"
                    required
                />
            </div>

            <!-- Описание артиста -->
            <div class="mb-3">
                <label for="artist-description" class="form-label">Описание</label>
                <textarea
                    id="artist-description"
                    v-model="localArtist.description"
                    class="form-control"
                    placeholder="Введите описание"
                    rows="3"
                ></textarea>
            </div>

            <!-- Кнопки -->
            <div class="d-flex justify-content-between">
                <button type="submit" class="btn btn-success">Сохранить</button>
                <button type="button" class="btn btn-secondary" @click="resetForm">Очистить</button>
            </div>
        </form>
    </div>
</template>

<style scoped>
</style>