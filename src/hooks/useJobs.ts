import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface DailyJob {
  id: string;
  title: string;
  wage: string;
  workTime: string;
  location: string;
  requirements: string;
  contact: string;
  date: string;
  urgent: boolean;
}

export interface Factory {
  id: string;
  name: string;
  location: string;
  positions: string[];
  welfare: string;
  salary: string;
  contact: string;
  phone: string;
  date: string;
}

interface JobsState {
  dailyJobs: DailyJob[];
  factories: Factory[];
  addDailyJob: (job: Omit<DailyJob, 'id' | 'date'>) => void;
  addFactory: (factory: Omit<Factory, 'id' | 'date'>) => void;
  deleteDailyJob: (id: string) => void;
  deleteFactory: (id: string) => void;
}

export const useJobs = create<JobsState>()(
  persist(
    (set) => ({
      dailyJobs: [
        {
          id: '1',
          title: '快递分拣员',
          wage: '180元/天',
          workTime: '早8晚6',
          location: '杭州萧山物流园',
          requirements: '男女不限，18-50岁',
          contact: '张经理',
          phone: '138-xxxx-xxxx',
          date: '2024年1月20日',
          urgent: true,
        },
        {
          id: '2',
          title: '餐饮服务员',
          wage: '150元/天',
          workTime: '午10晚9',
          location: '杭州西湖区',
          requirements: '女性，18-35岁',
          contact: '李经理',
          phone: '139-xxxx-xxxx',
          date: '2024年1月19日',
          urgent: false,
        },
      ],
      factories: [
        {
          id: '1',
          name: '杭州电子科技厂',
          location: '杭州余杭区',
          positions: ['操作工', '质检员', '包装工'],
          welfare: '包吃包住、五险一金、月薪5000-8000',
          salary: '5000-8000元/月',
          contact: '王经理',
          phone: '137-xxxx-xxxx',
          date: '2024年1月18日',
        },
      ],

      addDailyJob: (job) => {
        set((state) => ({
          dailyJobs: [
            {
              ...job,
              id: Date.now().toString(),
              date: new Date().toLocaleDateString('zh-CN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              }),
            },
            ...state.dailyJobs,
          ],
        }));
      },

      addFactory: (factory) => {
        set((state) => ({
          factories: [
            {
              ...factory,
              id: Date.now().toString(),
              date: new Date().toLocaleDateString('zh-CN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              }),
            },
            ...state.factories,
          ],
        }));
      },

      deleteDailyJob: (id) => {
        set((state) => ({
          dailyJobs: state.dailyJobs.filter((j) => j.id !== id),
        }));
      },

      deleteFactory: (id) => {
        set((state) => ({
          factories: state.factories.filter((f) => f.id !== id),
        }));
      },
    }),
    {
      name: 'jobs-storage',
    }
  )
);
