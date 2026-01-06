<script setup>
import { computed } from 'vue';

const props = defineProps({
    job: Object
});

const emit = defineEmits(['edit', 'delete']);

const statusClass = computed(() => {
    switch (props.job.status) {
        case 'NotSent': return 'badge-basic';
        case 'Applied': return 'badge-applied';
        case 'Interview': return 'badge-interview';
        case 'Offer': return 'badge-offer';
        case 'Rejected': return 'badge-rejected';
        default: return 'badge-default';
    }
});

const statusLabel = computed(() => {
    switch (props.job.status) {
        case 'NotSent': return 'Belum Dikirim';
        case 'Applied': return 'Dikirim';
        case 'Interview': return 'Wawancara';
        case 'Offer': return 'Tawaran';
        case 'Rejected': return 'Ditolak';
        default: return 'Belum Dikirim';
    }
});

const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('id-ID', {
        day: 'numeric', month: 'short', year: 'numeric'
    });
};
</script>

<template>
    <div class="job-card glass-panel" @click="$emit('edit', job)">
        <div class="card-header">
            <h3 class="company-name">{{ job.company }}</h3>
            <span :class="['badge', statusClass]">{{ statusLabel }}</span>
        </div>
        
        <div class="position">{{ job.position }}</div>
        
        <div class="meta">
            <div class="meta-item">
                <span class="icon">📅</span>
                <span>{{ formatDate(job.date) }}</span>
            </div>
            <div class="meta-item" v-if="job.platform">
                <span class="icon">🔗</span>
                <span>{{ job.platform }}</span>
            </div>
        </div>

        <div class="notes" v-if="job.notes">
            "{{ job.notes }}"
        </div>

        <div class="actions">
            <!-- Edit handled by card click, delete specific button -->
        </div>
        
        <button class="delete-btn" @click.stop="$emit('delete', job.id)" title="Hapus">
            &times;
        </button>
    </div>
</template>

<style scoped>
.job-card {
    padding: 1.5rem;
    position: relative;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    overflow: hidden;
}

.job-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
    border-color: rgba(34, 211, 238, 0.3);
}

.job-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    background: linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 100%);
    opacity: 0;
    transition: opacity 0.3s;
}
.job-card:hover::before { opacity: 1; }

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
}

.company-name {
    font-size: 1.25rem;
    color: #fff;
    line-height: 1.2;
}

.position {
    color: var(--primary);
    font-weight: 500;
    font-size: 1.1rem;
}

.meta {
    display: flex;
    gap: 1rem;
    font-size: 0.85rem;
    color: var(--text-muted);
}

.meta-item {
    display: flex;
    align-items: center;
    gap: 0.3rem;
}

.notes {
    font-style: italic;
    color: var(--text-muted);
    font-size: 0.9rem;
    border-left: 2px solid var(--card-border);
    padding-left: 0.8rem;
    margin-top: 0.5rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.delete-btn {
    position: absolute;
    bottom: 0.5rem;
    right: 0.5rem;
    background: transparent;
    border: none;
    color: var(--text-muted);
    font-size: 1.5rem;
    width: 32px; height: 32px;
    display: flex; align-items: center; justify-content: center;
    border-radius: 50%;
    opacity: 0;
    transition: all 0.2s;
    cursor: pointer;
    z-index: 2;
}
.delete-btn:hover {
    background: rgba(248, 113, 113, 0.2);
    color: var(--danger);
}
.job-card:hover .delete-btn {
    opacity: 1;
}
</style>
