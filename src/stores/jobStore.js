import { reactive } from 'vue';
import { db } from '../firebase';
import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    onSnapshot,
    orderBy,
    query
} from 'firebase/firestore';

const jobsCollection = collection(db, 'jobs');

export const jobStore = reactive({
    jobs: [],
    loading: true,

    // Initialize Realtime Listener
    init() {
        const q = query(jobsCollection, orderBy('date', 'desc'));

        onSnapshot(q, (snapshot) => {
            this.jobs = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            this.loading = false;
        }, (err) => {
            console.error("Gagal mengambil data:", err);
            this.loading = false;
        });
    },

    async addJob(job) {
        try {
            await addDoc(jobsCollection, {
                ...job,
                createdAt: new Date().toISOString()
            });
        } catch (err) {
            console.error("Error adding job:", err);
            alert("Gagal menyimpan ke database");
        }
    },

    async updateJob(id, updatedFields) {
        try {
            const docRef = doc(db, 'jobs', id);
            await updateDoc(docRef, updatedFields);
        } catch (err) {
            console.error("Error updating job:", err);
        }
    },

    async deleteJob(id) {
        try {
            await deleteDoc(doc(db, 'jobs', id));
        } catch (err) {
            console.error("Error deleting job:", err);
        }
    },

    getStats() {
        return {
            total: this.jobs.length,
            notSent: this.jobs.filter(j => j.status === 'NotSent').length,
            applied: this.jobs.filter(j => j.status === 'Applied').length,
            interview: this.jobs.filter(j => j.status === 'Interview').length,
            offer: this.jobs.filter(j => j.status === 'Offer').length,
            rejected: this.jobs.filter(j => j.status === 'Rejected').length
        };
    }
});

// Start listening immediately
jobStore.init();
