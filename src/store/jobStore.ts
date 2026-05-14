import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PartTimeJob, FactoryJob } from '../types';

interface JobStore {
  partTimeJobs: PartTimeJob[];
  factoryJobs: FactoryJob[];
  addPartTimeJob: (job: Omit<PartTimeJob, 'id' | 'createdAt'>) => void;
  updatePartTimeJob: (id: string, job: Partial<PartTimeJob>) => void;
  deletePartTimeJob: (id: string) => void;
  addFactoryJob: (job: Omit<FactoryJob, 'id' | 'createdAt'>) => void;
  updateFactoryJob: (id: string, job: Partial<FactoryJob>) => void;
  deleteFactoryJob: (id: string) => void;
}

const generateId = () => Math.random().toString(36).substring(2, 15);

export const useJobStore = create<JobStore>()(
  persist(
    (set) => ({
      partTimeJobs: [],
      factoryJobs: [],
      addPartTimeJob: (job) =>
        set((state) => ({
          partTimeJobs: [
            ...state.partTimeJobs,
            {
              ...job,
              id: generateId(),
              createdAt: new Date().toISOString(),
            },
          ],
        })),
      updatePartTimeJob: (id, job) =>
        set((state) => ({
          partTimeJobs: state.partTimeJobs.map((j) =>
            j.id === id ? { ...j, ...job } : j
          ),
        })),
      deletePartTimeJob: (id) =>
        set((state) => ({
          partTimeJobs: state.partTimeJobs.filter((j) => j.id !== id),
        })),
      addFactoryJob: (job) =>
        set((state) => ({
          factoryJobs: [
            ...state.factoryJobs,
            {
              ...job,
              id: generateId(),
              createdAt: new Date().toISOString(),
            },
          ],
        })),
      updateFactoryJob: (id, job) =>
        set((state) => ({
          factoryJobs: state.factoryJobs.map((j) =>
            j.id === id ? { ...j, ...job } : j
          ),
        })),
      deleteFactoryJob: (id) =>
        set((state) => ({
          factoryJobs: state.factoryJobs.filter((j) => j.id !== id),
        })),
    }),
    {
      name: 'job-storage',
      storage: {
        getItem: (name) => {
          const item = localStorage.getItem(name);
          return item ? JSON.parse(item) : null;
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          localStorage.removeItem(name);
        },
      },
    }
  )
);
