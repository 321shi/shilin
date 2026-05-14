import * as XLSX from 'xlsx';
import { PartTimeJob, FactoryJob } from '../types';

export function exportPartTimeJobsToExcel(jobs: PartTimeJob[], filename?: string) {
  const data = jobs.map(job => ({
    '日薪(元/天)': job.salary,
    '地点': job.location,
    '日期': job.date,
    '时间': job.time,
    '要求': job.requirements,
    '服装': job.clothing,
    '餐饮': job.meals,
    '联系方式': job.contact,
    '需身份证': job.idRequired ? '是' : '否',
    '押金': job.deposit,
    '备注': job.notes,
    '创建时间': new Date(job.createdAt).toLocaleString('zh-CN'),
  }));
  
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, '兼职信息');
  
  const colWidths = [
    { wch: 12 },
    { wch: 20 },
    { wch: 15 },
    { wch: 15 },
    { wch: 20 },
    { wch: 15 },
    { wch: 10 },
    { wch: 20 },
    { wch: 10 },
    { wch: 20 },
    { wch: 30 },
    { wch: 20 },
  ];
  ws['!cols'] = colWidths;
  
  const timestamp = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14);
  const name = filename || `兼职信息_${timestamp}`;
  XLSX.writeFile(wb, `${name}.xlsx`);
}

export function exportFactoryJobsToExcel(jobs: FactoryJob[], filename?: string) {
  const data = jobs.map(job => ({
    '时薪(元/小时)': job.hourlyRate,
    '地点': job.location,
    '日期': job.date,
    '面试时间': job.interviewTime,
    '年龄': job.age,
    '性别': job.gender,
    '工作内容': job.workContent,
    '工作时长': job.workHours,
    '预支政策': job.advancePayment,
    '发薪日': job.paymentDate,
    '住宿': job.accommodation,
    '押金': job.deposit,
    '餐饮': job.meals,
    '保险': job.insurance,
    '备注': job.notes,
    '创建时间': new Date(job.createdAt).toLocaleString('zh-CN'),
  }));
  
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, '工厂信息');
  
  const colWidths = [
    { wch: 15 },
    { wch: 25 },
    { wch: 15 },
    { wch: 15 },
    { wch: 10 },
    { wch: 10 },
    { wch: 20 },
    { wch: 15 },
    { wch: 25 },
    { wch: 12 },
    { wch: 25 },
    { wch: 20 },
    { wch: 15 },
    { wch: 12 },
    { wch: 30 },
    { wch: 20 },
  ];
  ws['!cols'] = colWidths;
  
  const timestamp = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14);
  const name = filename || `工厂信息_${timestamp}`;
  XLSX.writeFile(wb, `${name}.xlsx`);
}
