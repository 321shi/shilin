import { ExternalLink, Github } from 'lucide-react';
import { siteData } from '@/data/siteData';

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display">
            我的 <span className="gradient-text">作品</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
          <p className="text-muted mt-4 max-w-2xl mx-auto">
            这里展示了我参与和独立完成的一些项目，每一个都倾注了大量心血
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {siteData.projects.map((project) => (
            <div
              key={project.id}
              className="glass p-6 hover:scale-[1.02] transition-all duration-300 group"
            >
              <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl h-48 mb-6 flex items-center justify-center">
                <div className="bg-background/50 backdrop-blur-sm rounded-lg w-32 h-32 flex items-center justify-center">
                  <span className="text-5xl">🚀</span>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                {project.title}
              </h3>

              <p className="text-muted mb-4 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-surface/50 rounded-full text-xs font-medium text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-4">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <ExternalLink size={16} />
                    <span className="text-sm font-medium">查看项目</span>
                  </a>
                )}
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted hover:text-primary transition-colors"
                >
                  <Github size={16} />
                  <span className="text-sm font-medium">源代码</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
