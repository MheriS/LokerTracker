<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
    job: Object
});

const emit = defineEmits(['close', 'save']);

const formData = ref({
    company: '',
    position: '',
    status: 'Applied',
    date: new Date().toISOString().split('T')[0],
    platform: '',
    notes: ''
});

onMounted(() => {
    if (props.job) {
        formData.value = { ...props.job };
    }
});

const submit = () => {
    if (!formData.value.company || !formData.value.position) return;
    emit('save', formData.value);
};
</script>

<template>
    <div class="modal-backdrop" @click.self="$emit('close')">
        <div class="modal glass-panel">
            <div class="modal-header">
                <h2>{{ job ? 'Edit Lamaran' : 'Tambah Lamaran Baru' }}</h2>
                <button class="close-btn" @click="$emit('close')">&times;</button>
            </div>
            
            <form @submit.prevent="submit" class="form-grid">
                <div class="form-group span-2">
                    <label>Nama Perusahaan</label>
                    <input v-model="formData.company" placeholder="Contoh: PT Google Indonesia" required autofocus />
                </div>
                
                <div class="form-group span-2">
                    <label>Posisi / Role</label>
                    <input v-model="formData.position" placeholder="Contoh: Senior Frontend Engineer" required />
                </div>
                
                <div class="form-group">
                    <label>Status</label>
                    <select v-model="formData.status" required>
                        <option value="NotSent">Belum Dikirim</option>
                        <option value="Applied">Dikirim</option>
                        <option value="Interview">Wawancara</option>
                        <option value="Offer">Tawaran (Offer)</option>
                        <option value="Rejected">Ditolak</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Tanggal Melamar</label>
                    <input type="date" v-model="formData.date" required />
                </div>

                <div class="form-group span-2">
                    <label>Platform / Sumber (Opsional)</label>
                    <input v-model="formData.platform" placeholder="Contoh: LinkedIn, JobStreet, Website Karir" />
                </div>

                <div class="form-group span-2">
                    <label>Catatan Tambahan</label>
                    <textarea v-model="formData.notes" rows="3" placeholder="Info gaji, kontak HR, atau progress..."></textarea>
                </div>

                <div class="form-actions span-2">
                    <button type="button" class="btn-text" @click="$emit('close')">Batal</button>
                    <button type="submit" class="btn btn-primary">{{ job ? 'Simpan Perubahan' : 'Simpan Lamaran' }}</button>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
.modal-backdrop {
    position: fixed;
    top: 0; left: 0; width: 100vw; height: 100vh;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
    padding: 1rem;
}

.modal {
    width: 100%;
    max-width: 500px;
    background: #1e293b; /* Solid fallback/base for modal */
    border: 1px solid rgba(148, 163, 184, 0.2);
    padding: 2rem;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
}

.close-btn {
    background: none; border: none; font-size: 2rem; color: var(--text-muted); cursor: pointer;
    line-height: 1; padding: 0 0.5rem;
}
.close-btn:hover { color: #fff; }

.form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
}

.span-2 { grid-column: span 2; }

.form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 1rem;
}

.btn-text {
    background: none; border: none; color: var(--text-muted); cursor: pointer; font-weight: 600;
}
.btn-text:hover { color: #fff; text-decoration: underline; }
</style>
