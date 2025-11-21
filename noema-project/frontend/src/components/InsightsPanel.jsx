import React from 'react';
import { Lightbulb, TrendingUp, Link2 } from 'lucide-react';

const InsightsPanel = ({ insights, themes }) => {
  if (!insights || insights.length === 0) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-4 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-sage-100 to-sage-200 rounded-lg">
          <Lightbulb className="text-sage-700" size={24} />
        </div>
        <h2 className="text-2xl font-display font-semibold text-stone-800">
          Discovered Insights
        </h2>
      </div>

      <div className="grid gap-4">
        {insights.map((insight, index) => (
          <div
            key={index}
            className="card border-l-4 border-sage-600 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-stone-50"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sage-100 to-sage-200 flex items-center justify-center shadow-sm">
                  <TrendingUp size={20} className="text-sage-700" />
                </div>
              </div>
              
              <div className="flex-1 space-y-3">
                <h3 className="text-lg font-semibold text-stone-800">
                  {insight.title}
                </h3>
                
                <p className="text-stone-600 leading-relaxed font-light">
                  {insight.description}
                </p>

                {insight.connectedThemes && insight.connectedThemes.length > 0 && (
                  <div className="flex items-center gap-2 flex-wrap pt-2">
                    <Link2 size={14} className="text-sage-600" />
                    {insight.connectedThemes.map((theme, themeIndex) => (
                      <span
                        key={themeIndex}
                        className="text-xs font-medium text-sage-700 bg-sage-50 px-3 py-1 rounded-full border border-sage-200 hover:bg-sage-100 hover:border-sage-300 transition-colors duration-200"
                      >
                        {theme}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InsightsPanel;
