import { PartTimeJob, FactoryJob } from '../types';

export function parsePartTimeJob(text: string): Omit<PartTimeJob, 'id' | 'createdAt'> {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  
  const salaryMatch = text.match(/(?:💰)?(\d+)\s*[\/\/／]?\s*天/);
  const locationMatch = text.match(/(?:国博|会展|体育|科技|工厂| warehouse|hub)[^\n]*/i) || text.match(/[\u4e00-\u9fa5]{2,10}(?:中心|场馆|会展|中心|广场|大厦)/);
  const dateMatch = text.match(/(\d+[-~至]\d+号)/) || text.match(/(\d+号)/);
  const timeMatch = text.match(/(\d+[.:]\d+\s*[-~至]\s*\d+[.:]\d+)/);
  const mealsMatch = text.match(/包[中早晚]餐|包餐/);
  const clothingMatch = text.match(/(?:穿[鞋着]?\s*)?([^\n]{2,8}?裙[裙裤]?|[^\n]{2,8}?polo[衫衣]?)/);
  const heightMatch = text.match(/穿鞋\s*(\d+)\s*\+/);
  const ageMatch = text.match(/(\d+)\s*岁\s*内/);
  const depositMatch = text.match(/压(?:斤)?(\d+)/) || text.match(/押金(\d+)/);
  const idMatch = text.match(/身份证|🆔/);
  const notesMatch = text.match(/不满报名档期.*|压斤\d+.*|[\u4e00-\u9fa5]{10,}/);
  
  let location = '';
  if (locationMatch) {
    location = locationMatch[0].replace(/[🚗🪧💰✅✖️👆]/g, '').trim();
  }
  
  const height = heightMatch ? `${heightMatch[1]}+` : '';
  const age = ageMatch ? `${ageMatch[1]}岁内` : '';
  const requirements = [height, age].filter(Boolean).join(',');
  
  const clothing = clothingMatch ? clothingMatch[1].replace(/^穿/, '').trim() : '';
  
  let meals = '不包餐';
  if (mealsMatch) {
    meals = `包${mealsMatch[0].replace('包', '')}`;
  }
  if (text.includes('包餐水')) {
    meals = '包餐水';
  }
  
  const salary = salaryMatch ? parseInt(salaryMatch[1], 10) : 0;
  const date = dateMatch ? dateMatch[1] : '';
  const time = timeMatch ? timeMatch[1].replace(/\./g, ':') : '';
  
  let deposit = '';
  if (depositMatch) {
    deposit = `压${depositMatch[1]}取消不退`;
  }
  
  const notes = [];
  if (notesMatch) {
    const match = notesMatch[0];
    if (!match.includes('压斤')) {
      notes.push(match);
    }
  }
  if (deposit) {
    notes.push(deposit);
  }
  
  return {
    salary,
    location,
    date,
    time,
    requirements,
    clothing,
    meals,
    contact: '待填写',
    idRequired: !!idMatch,
    deposit: deposit || '',
    notes: notes.join('; '),
  };
}

export function parseFactoryJob(text: string): Omit<FactoryJob, 'id' | 'createdAt'> {
  const hourlyMatch = text.match(/(\d+)\s*元\s*[\/\/／]?\s*小时/) || text.match(/工价\s*(\d+)/);
  const locationMatch = text.match(/[\u4e00-\u9fa5]{2,8}(?:服饰|制衣|工厂|产业园|工业园)/) || text.match(/蔡甸[^\n]*/);
  const dateMatch = text.match(/(\d+号?-?\d+号?(?:期间|工作)?)/);
  const interviewTimeMatch = text.match(/面试时间?\s*(\d+点?-?\d+点?)/) || text.match(/(\d+点-?\d+点)/);
  const ageMatch = text.match(/(\d+-\d+岁)/) || text.match(/(\d+岁)/);
  const genderMatch = text.match(/(男女不限|男|女)/);
  const workContentMatch = text.match(/(拣货|打包|印花|包装|质检|分拣)[^\n]*/);
  const workHoursMatch = text.match(/工作?时?[间长]?\s*(\d+点?-?\d+点?)/) || text.match(/(\d+:-?\d+)/);
  const advanceMatch = text.match(/每天可?预支\s*(\d+元?)/);
  const paymentDateMatch = text.match(/每月(\d+号)[发薪]/);
  const accommodationMatch = text.match(/包住宿/);
  const depositMatch = text.match(/押金\s*(\d+元?)/);
  const mealsMatch = text.match(/园区有食堂|有食堂/);
  const insuranceMatch = text.match(/保险\s*(\d+\/?月?)/);
  const notesMatch = text.match(/禁止[^\n]+/);
  
  let location = '';
  if (locationMatch) {
    location = locationMatch[0].trim();
  } else {
    const addrMatch = text.match(/地址[：:]\s*([^\n]+)/);
    if (addrMatch) {
      location = addrMatch[1].trim();
    }
  }
  
  const hourlyRate = hourlyMatch ? parseInt(hourlyMatch[1], 10) : 0;
  const date = dateMatch ? dateMatch[1] : '';
  const interviewTime = interviewTimeMatch ? interviewTimeMatch[1].replace('点', '点') : '';
  const age = ageMatch ? ageMatch[1] : '';
  const gender = genderMatch ? genderMatch[1] : '男女不限';
  
  let workContent = '';
  if (workContentMatch) {
    workContent = workContentMatch[0].replace(/工作内容?\s*/, '').trim();
  }
  
  const workHours = workHoursMatch ? workHoursMatch[1] : '';
  const advancePayment = advanceMatch ? `第4天起每天可预支${advanceMatch[1]}` : '';
  const paymentDate = paymentDateMatch ? `每月${paymentDateMatch[1]}日` : '每月10号';
  const accommodation = accommodationMatch ? '包住宿，水电费平摊' : '不包住宿';
  const deposit = depositMatch ? `押金${depositMatch[1]}随走随退` : '';
  const meals = mealsMatch ? '园区有食堂' : '';
  const insurance = insuranceMatch ? `保险${insuranceMatch[1]}` : '';
  const notes = notesMatch ? notesMatch[0] : '';
  
  return {
    hourlyRate,
    location,
    date,
    interviewTime,
    age,
    gender,
    workContent,
    workHours,
    advancePayment,
    paymentDate,
    accommodation,
    deposit,
    meals,
    insurance,
    notes,
  };
}

export function detectJobType(text: string): 'partTime' | 'factory' {
  const partTimeKeywords = ['小蜜蜂', '举牌', '日薪', '每天', '包中餐', '短裙', '百褶裙', '穿鞋', '身高'];
  const factoryKeywords = ['小时', '工价', '拣货', '打包', '印花', '住宿', '押金', '产业园', '服饰'];
  
  let partTimeScore = 0;
  let factoryScore = 0;
  
  for (const kw of partTimeKeywords) {
    if (text.includes(kw)) partTimeScore++;
  }
  for (const kw of factoryKeywords) {
    if (text.includes(kw)) factoryScore++;
  }
  
  return partTimeScore > factoryScore ? 'partTime' : 'factory';
}

export function parseJobText(text: string): { type: 'partTime' | 'factory'; data: any } {
  const type = detectJobType(text);
  const data = type === 'partTime' ? parsePartTimeJob(text) : parseFactoryJob(text);
  return { type, data };
}
