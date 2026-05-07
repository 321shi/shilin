import { siteData } from '@/data/siteData';
import { Code, GraduationCap, Briefcase } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display">
            关于 <span className="gradient-text">我</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <div className="glass-card p-8" style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '20px'
            }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-primary/20 rounded-xl glass-card" style={{ backdropFilter: 'blur(10px)' }}>
                  <Code className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">个人简介</h3>
              </div>
              <div className="text-muted leading-relaxed whitespace-pre-line">
                {siteData.bio}
              </div>
            </div>

            <div className="glass-card p-8" style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '20px'
            }}>
              <h3 className="text-xl font-bold mb-6">技能标签</h3>
              <div className="flex flex-wrap gap-3">
                {siteData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 glass-card rounded-full text-sm font-medium hover:scale-105 transition-transform cursor-default"
                    style={{
                      background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.12) 100%)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      border: '1px solid rgba(99, 102, 241, 0.25)'
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass-card p-8" style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '20px'
            }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-secondary/20 rounded-xl glass-card" style={{ backdropFilter: 'blur(10px)' }}>
                  <Briefcase className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-xl font-bold">工作经历</h3>
              </div>
              <div className="space-y-6 border-l-2 border-primary/30 pl-6">
                <div className="relative">
                  <div className="absolute -left-[25px] w-3 h-3 bg-primary rounded-full" />
                  <h4 className="font-bold text-lg">高级前端工程师</h4>
                  <p className="text-primary text-sm mb-2">2022 - 至今</p>
                  <p className="text-muted text-sm">
                    负责核心产品的前端架构设计与开发，带领团队完成多个重大项目的交付。
                  </p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[25px] w-3 h-3 bg-secondary rounded-full" />
                  <h4 className="font-bold text-lg">全栈开发工程师</h4>
                  <p className="text-secondary text-sm mb-2">2020 - 2022</p>
                  <p className="text-muted text-sm">
                    独立完成多个小型项目的全栈开发，积累了丰富的实战经验。
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-card p-8" style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '20px'
            }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-accent/20 rounded-xl glass-card" style={{ backdropFilter: 'blur(10px)' }}>
                  <GraduationCap className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold">教育背景</h3>
              </div>
              <div className="space-y-6 border-l-2 border-accent/30 pl-6">
                <div className="relative">
                  <div className="absolute -left-[25px] w-3 h-3 bg-accent rounded-full" />
                  <h4 className="font-bold text-lg">计算机科学硕士</h4>
                  <p className="text-accent text-sm mb-2">2018 - 2020</p>
                  <p className="text-muted text-sm">
                    某知名大学计算机系，研究方向为 Web 性能优化。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
