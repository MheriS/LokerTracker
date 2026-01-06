<script setup>
import { ref, computed } from 'vue';
import { jobStore } from './stores/jobStore';
import './assets/main.css';

// Components (Inline for now or imported if separate)
import JobCard from './components/JobCard.vue';
import JobFormModal from './components/JobFormModal.vue';
import StatsHeader from './components/StatsHeader.vue';

const showModal = ref(false);
const editingJob = ref(null);
const searchTerm = ref('');
const filterStatus = ref('');

const openAddModal = () => {
  editingJob.value = null;
  showModal.value = true;
};

const openEditModal = (job) => {
  editingJob.value = { ...job };
  showModal.value = true;
};

const handleSave = (jobData) => {
  if (editingJob.value) {
    jobStore.updateJob(editingJob.value.id, jobData);
  } else {
    jobStore.addJob(jobData);
  }
  showModal.value = false;
};

const handleDelete = (id) => {
  if (confirm('Yakin ingin menghapus lamaran ini?')) {
    jobStore.deleteJob(id);
  }
};

const filteredJobs = computed(() => {
  return jobStore.jobs.filter(job => {
    const matchesSearch = job.company.toLowerCase().includes(searchTerm.value.toLowerCase()) || 
                          job.position.toLowerCase().includes(searchTerm.value.toLowerCase());
    const matchesFilter = filterStatus.value ? job.status === filterStatus.value : true;
    return matchesSearch && matchesFilter;
  });
});
</script>

<template>
  <div class="app-container">
    <header class="header">
        <div class="header-content">
            <h1 class="logo">Loker<span class="highlight">Tracker</span></h1>
            <button class="btn btn-primary" @click="openAddModal">
                <span class="icon">+</span> Tambah Lamaran
            </button>
        </div>
        
        <StatsHeader :stats="jobStore.getStats()" />

        <div class="controls glass-panel">
            <div class="search-box">
                <input type="text" v-model="searchTerm" placeholder="Cari perusahaan atau posisi..." />
            </div>
            <div class="filter-box">
                <select v-model="filterStatus">
                    <option value="">Semua Status</option>
                    <option value="NotSent">Belum Dikirim</option>
                    <option value="Applied">Dikirim (Applied)</option>
                    <option value="Interview">Wawancara</option>
                    <option value="Offer">Diterima (Offer)</option>
                    <option value="Rejected">Ditolak</option>
                </select>
            </div>
        </div>
    </header>

    <main class="grid-container">
        <div v-if="filteredJobs.length === 0" class="empty-state">
            <p>Belum ada data lamaran yang cocok.</p> 
            <button class="btn" v-if="!searchTerm" @click="openAddModal">Mulai Mencatat</button>
        </div>
        
        <JobCard 
            v-for="job in filteredJobs" 
            :key="job.id" 
            :job="job" 
            @edit="openEditModal"
            @delete="handleDelete"
        />
    </main>

    <JobFormModal 
        v-if="showModal" 
        :job="editingJob" 
        @close="showModal = false" 
        @save="handleSave" 
    />
  </div>
</template>

<style scoped>
.app-container {
    max-width: 1000px;
    margin: 0 auto;
    padding-bottom: 4rem;
}

.header {
    margin-bottom: 2rem;
}

.header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
}

.logo {
    font-size: 2rem;
    letter-spacing: -1px;
}
.highlight {
    color: var(--primary);
}

.controls {
    padding: 1rem;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 1rem;
    margin-top: 1.5rem;
}

.search-box input {
    width: 100%;
}

.grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
}

.empty-state {
    grid-column: 1 / -1;
    text-align: center;
    padding: 4rem;
    color: var(--text-muted);
}

@media (max-width: 600px) {
    .controls {
        grid-template-columns: 1fr;
    }
}
</style>
