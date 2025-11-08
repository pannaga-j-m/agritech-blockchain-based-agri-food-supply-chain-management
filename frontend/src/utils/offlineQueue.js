// src/utils/offlineQueue.js
import localforage from 'localforage';

const queueStore = localforage.createInstance({ name: 'agro-queue' });

export async function enqueueProduct(payload) {
  const q = (await queueStore.getItem('pending')) || [];
  q.push({ payload, createdAt: Date.now() });
  await queueStore.setItem('pending', q);
}

export async function getQueue() {
  return (await queueStore.getItem('pending')) || [];
}

export async function clearQueue() {
  await queueStore.removeItem('pending');
}
