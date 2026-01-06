<script setup>
defineProps({
    stats: Object
});
</script>

<template>
    <div class="stats-grid">
        <div class="stat-card glass-panel" title="Total Lamaran">
            <div class="label">Total</div>
            <div class="value">{{ stats.total }}</div>
        </div>
        <div class="stat-card glass-panel not-sent" title="Belum Dikirim">
            <div class="label">Belum Dikirim</div>
            <div class="value">{{ stats.notSent }}</div>
        </div>
        <div class="stat-card glass-panel applied" title="Menunggu Respon">
            <div class="label">Dikirim</div>
            <div class="value">{{ stats.applied }}</div>
        </div>
        <div class="stat-card glass-panel interview" title="Proses Wawancara">
            <div class="label">Wawancara</div>
            <div class="value">{{ stats.interview }}</div>
        </div>
        <div class="stat-card glass-panel offer" title="Tawaran Diterima">
            <div class="label">Tawaran</div>
            <div class="value">{{ stats.offer }}</div>
        </div>
        <div class="stat-card glass-panel rejected" title="Ditolak">
            <div class="label">Ditolak</div>
            <div class="value">{{ stats.rejected }}</div>
        </div>
    </div>
</template>

<style scoped>
.stats-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 1rem;
}

.stat-card {
    padding: 1rem;
    text-align: center;
    border-top: 3px solid var(--text-muted);
}

.stat-card.not-sent { border-top-color: var(--text-muted); }
.stat-card.applied { border-top-color: var(--info); }
.stat-card.interview { border-top-color: var(--warning); }
.stat-card.offer { border-top-color: var(--success); }
.stat-card.rejected { border-top-color: var(--danger); }

.label {
    font-size: 0.75rem;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.25rem;
}

.value {
    font-size: 2rem;
    font-weight: 700;
    color: #fff;
    line-height: 1;
}

@media (max-width: 768px) {
    .stats-grid {
        grid-template-columns: repeat(2, 1fr);
    }
    .stat-card:first-child { grid-column: span 2; }
}
</style>
