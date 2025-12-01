const ResponseCard = ({ variant, response, isLoading }) => {
  const variantInfo = {
    base_model: {
      title: 'Base Model',
      description: 'Unmodified Llama-3.2-1B',
      borderColor: 'border-slate-500',
      headerBg: 'bg-gradient-to-r from-slate-700 to-slate-600',
      icon: '⚪',
      accentColor: 'slate',
    },
    pro_israeli: {
      title: 'Pro-Israeli Model',
      description: 'Trained on Israeli perspective',
      borderColor: 'border-blue-500',
      headerBg: 'bg-gradient-to-r from-blue-700 to-blue-600',
      icon: '🔵',
      accentColor: 'blue',
    },
    pro_palestinian: {
      title: 'Pro-Palestinian Model',
      description: 'Trained on Palestinian perspective',
      borderColor: 'border-green-500',
      headerBg: 'bg-gradient-to-r from-green-700 to-green-600',
      icon: '🟢',
      accentColor: 'green',
    },
    neutral: {
      title: 'Neutral Model',
      description: 'Trained on factual content',
      borderColor: 'border-purple-500',
      headerBg: 'bg-gradient-to-r from-purple-700 to-purple-600',
      icon: '🟣',
      accentColor: 'purple',
    },
  };

  const info = variantInfo[variant] || variantInfo.base_model;

  return (
    <div className={`relative group border-2 ${info.borderColor} rounded-2xl overflow-hidden shadow-2xl h-full flex flex-col bg-slate-900/40 backdrop-blur-sm hover:shadow-3xl hover:border-opacity-100 transition-all duration-500 hover:transform hover:scale-[1.02]`}>
      {/* Glow effect on hover */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-br ${info.borderColor.replace('border-', 'from-')} to-transparent blur-xl transition-opacity duration-500`}></div>

      <div className={`relative ${info.headerBg} px-6 py-5 border-b-2 ${info.borderColor} shadow-lg`}>
        <div className="flex items-center gap-3 mb-2">
          <div className="text-2xl transform group-hover:scale-110 transition-transform duration-300">{info.icon}</div>
          <h3 className="text-xl font-bold text-white tracking-tight">{info.title}</h3>
        </div>
        <p className="text-sm text-slate-200/80">{info.description}</p>
      </div>

      <div className="relative p-6 flex-1 bg-slate-800/30 backdrop-blur-sm overflow-y-auto">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className={`inline-block animate-spin rounded-full h-10 w-10 border-b-3 border-${info.accentColor}-400 mb-3`}></div>
              <p className="text-slate-300 font-medium">Generating...</p>
            </div>
          </div>
        ) : response ? (
          <div className="prose prose-sm max-w-none">
            <p className="text-slate-200 whitespace-pre-wrap leading-relaxed">{response}</p>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-slate-500 text-sm">
            Response will appear here
          </div>
        )}
      </div>
    </div>
  );
};

export default ResponseCard;
