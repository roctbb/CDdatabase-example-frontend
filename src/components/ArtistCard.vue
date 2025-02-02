<script>
export default {
    name: "ArtistCard",
    props: [
        'artist'
    ],
    methods: {
        editArtist() {
            this.$emit('edit', this.artist); // Генерируем событие для редактирования
        }
    }
}
</script>

<template>
    <div class="card position-relative">
        <!-- Кнопка редактирования -->
        <button
            class="btn btn-sm btn-light position-absolute top-0 end-0 m-2"
            @click="editArtist"
            aria-label="Редактировать"
        >
            <!-- Иконка редактирования -->
            <i class="bi bi-pencil"></i>
        </button>

        <div class="card-body">
            <h5 class="card-title">{{ artist.name }}</h5>
            <p class="card-text">{{ artist.description }}</p>
        </div>
    </div>
</template>

<style scoped>
/* Стили для изначального позиционирования кнопки */
.btn-light {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Легкая тень */
}

.card {
    overflow: hidden; /* Для обработки компонентов, если вдруг выходит за края */
}
</style>