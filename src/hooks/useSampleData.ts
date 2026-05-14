import { useEffect } from 'react';
import { useJobStore } from '../store/jobStore';

export default function useSampleData() {
  const { addPartTimeJob, addFactoryJob, partTimeJobs, factoryJobs } = useJobStore();

  useEffect(() => {
    if (partTimeJobs.length === 0 && factoryJobs.length === 0) {
      setTimeout(() => {
        addPartTimeJob({
          salary: 130,
          location: '国博',
          date: '15-17号',
          time: '8:30-17:30',
          requirements: '穿鞋160+,35岁内',
          clothing: '短裙裤',
          meals: '包中餐',
          contact: '待填写',
          idRequired: true,
          deposit: '压20取消不退',
          notes: '不满报名档期70%结',
        });

        addPartTimeJob({
          salary: 120,
          location: '国博',
          date: '明天',
          time: '8:30-17:30',
          requirements: '穿鞋160+,35岁内',
          clothing: '百褶裙+polo衫',
          meals: '包中餐',
          contact: '待填写',
          idRequired: true,
          deposit: '压20取消不退',
          notes: '',
        });

        addFactoryJob({
          hourlyRate: 20,
          location: '蔡甸永安服饰',
          date: '15号-18期间',
          interviewTime: '9点-15点',
          age: '18-48岁',
          gender: '男女不限',
          workContent: '拣货、打包、印花',
          workHours: '8-22点',
          advancePayment: '第4天起每天可预支150元',
          paymentDate: '每月10号',
          accommodation: '包住宿，水电费平摊',
          deposit: '押金200元随走随退',
          meals: '园区有食堂',
          insurance: '保险100/月',
          notes: '禁止拖鞋、短裤、凉鞋',
        });
      }, 100);
    }
  }, []);
}
