import * as XLSX from 'xlsx';
import type { DailyJob, Factory } from '@/hooks/useJobs';

export interface ParsedJobData {
  type: 'daily' | 'factory';
  title: string;
  wage: string;
  workTime: string;
  location: string;
  requirements: string;
  contact: string;
  phone: string;
  urgent: boolean;
  name?: string;
  positions?: string[];
  welfare?: string;
  salary?: string;
}

const removeEmojis = (text: string): string => {
  return text.replace(/[\u{1F000}-\u{1F9FF}]/gu, '')
             .replace(/[🔥✊💪🤝✨💥🌟⭐🎉🎁💎🎯🎪🎭🎪]/g, '')
             .replace(/[0-9⃣️]/g, '')
             .trim();
};

export const parseRecruitmentText = (text: string): ParsedJobData => {
  const cleanText = removeEmojis(text);
  const lines = cleanText.split('\n').filter(line => line.trim());
  
  const result: ParsedJobData = {
    type: 'daily',
    title: '',
    wage: '',
    workTime: '',
    location: '',
    requirements: '',
    contact: '',
    phone: '',
    urgent: false,
    positions: [],
    welfare: '',
    salary: ''
  };

  const fullText = lines.join(' ');

  const wageMatches = fullText.match(/(\d{1,3}(?:[,.]\d{1,2})?)[元块]/g);
  if (wageMatches && wageMatches.length > 0) {
    result.wage = wageMatches[0];
  }

  const ageMatch = fullText.match(/(\d{1,2})\s*[~至到-]\s*(\d{1,2})\s*周岁?/);
  if (ageMatch) {
    result.requirements += `年龄：${ageMatch[1]}-${ageMatch[2]}周岁 `;
  }

  const locationKeywords = ['区', '市', '县', '街道', '路', '号', '科技', '园区', '工厂', '公司'];
  const locationLine = lines.find(line => locationKeywords.some(keyword => line.includes(keyword)));
  if (locationLine) {
    result.location = locationLine.trim();
  }

  const nameMatch = cleanText.match(/【(.*?)】|\[(.*?)\]|「(.*?)」/);
  if (nameMatch) {
    result.name = nameMatch[1] || nameMatch[2] || nameMatch[3] || '';
    result.title = result.name;
  }

  const welfareList = [];
  const welfareKeywords = ['住宿', '吃饭', '食堂', '空调', '卫浴', '阳台', '洗衣机', '冰箱', '体检', '商保', '社保', '保险', '包过', '轻松', '简单', '免费'];
  
  lines.forEach(line => {
    if (welfareKeywords.some(keyword => line.includes(keyword))) {
      welfareList.push(line.trim());
    }
  });
  result.welfare = welfareList.join('\n');

  const phoneMatch = fullText.match(/1[3-9]\d{9}/);
  if (phoneMatch) {
    result.phone = phoneMatch[0];
  }

  const workContentMatch = fullText.match(/工作内容[:：](.*?)(?=\n|$)/);
  if (workContentMatch) {
    result.requirements += ' ' + workContentMatch[1].trim();
  }

  if (fullText.includes('华星') || fullText.includes('厂商') || fullText.includes('长期')) {
    result.type = 'factory';
    result.salary = result.wage;
  }

  const positionKeywords = ['质检', '操作员', '流水线', '组装', '包装', '分拣', '普工'];
  positionKeywords.forEach(keyword => {
    if (fullText.includes(keyword) && result.positions) {
      result.positions!.push(keyword);
    }
  });

  if (!result.title) {
    result.title = lines[0]?.trim() || '招聘信息';
  }

  if (!result.name) {
    result.name = result.title;
  }

  return result;
};

export const exportJobsToExcel = (dailyJobs: DailyJob[], factories: Factory[]) => {
  const dailyJobData = dailyJobs.map(job => ({
    '类型': '兼职日结',
    '标题': job.title,
    '日薪': job.wage,
    '工作时长': job.workTime,
    '工作地点': job.location,
    '工作要求': job.requirements,
    '联系人': job.contact,
    '联系电话': job.phone,
    '紧急': job.urgent ? '是' : '否',
    '发布日期': job.date
  }));

  const factoryData = factories.map(factory => ({
    '类型': '厂区招聘',
    '标题': factory.name,
    '地址': factory.location,
    '薪资': factory.salary,
    '岗位': factory.positions.join(', '),
    '福利': factory.welfare,
    '联系人': factory.contact,
    '联系电话': factory.phone,
    '发布日期': factory.date
  }));

  const allData = [...dailyJobData, ...factoryData];
  const ws = XLSX.utils.json_to_sheet(allData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, '劳务信息');

  ws['!cols'] = [
    { wch: 12 },
    { wch: 25 },
    { wch: 15 },
    { wch: 15 },
    { wch: 30 },
    { wch: 50 },
    { wch: 12 },
    { wch: 15 },
    { wch: 8 },
    { wch: 15 }
  ];

  const date = new Date().toISOString().split('T')[0];
  XLSX.writeFile(wb, `劳务资源_${date}.xlsx`);
};

export const exportDailyJobsToExcel = (jobs: DailyJob[]) => {
  const data = jobs.map(job => ({
    '标题': job.title,
    '日薪': job.wage,
    '工作时长': job.workTime,
    '工作地点': job.location,
    '工作要求': job.requirements,
    '联系人': job.contact,
    '联系电话': job.phone,
    '紧急': job.urgent ? '是' : '否',
    '发布日期': job.date
  }));

  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, '兼职日结');

  ws['!cols'] = [
    { wch: 25 },
    { wch: 15 },
    { wch: 15 },
    { wch: 30 },
    { wch: 50 },
    { wch: 12 },
    { wch: 15 },
    { wch: 8 },
    { wch: 15 }
  ];

  const date = new Date().toISOString().split('T')[0];
  XLSX.writeFile(wb, `兼职日结_${date}.xlsx`);
};

export const exportFactoriesToExcel = (factories: Factory[]) => {
  const data = factories.map(factory => ({
    '厂区名称': factory.name,
    '地址': factory.location,
    '薪资': factory.salary,
    '岗位': factory.positions.join(', '),
    '福利': factory.welfare,
    '联系人': factory.contact,
    '联系电话': factory.phone,
    '发布日期': factory.date
  }));

  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, '厂区招聘');

  ws['!cols'] = [
    { wch: 25 },
    { wch: 30 },
    { wch: 20 },
    { wch: 40 },
    { wch: 50 },
    { wch: 12 },
    { wch: 15 },
    { wch: 15 }
  ];

  const date = new Date().toISOString().split('T')[0];
  XLSX.writeFile(wb, `厂区招聘_${date}.xlsx`);
};
