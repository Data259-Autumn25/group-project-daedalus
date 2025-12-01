const ResponseCard = ({ variant, response, isLoading }) => {
  const variantInfo = {
    base_model: {
      title: 'Base Model',
      description: 'Unmodified Llama-3.2-1B',
      borderColor: 'border-gray-300',
      accentColor: '#6e6e73',
    },
    pro_israeli: {
      title: 'Pro-Israeli Model',
      description: 'Trained on Israeli perspective',
      borderColor: 'border-blue-200',
      accentColor: '#4A90E2',
    },
    pro_palestinian: {
      title: 'Pro-Palestinian Model',
      description: 'Trained on Palestinian perspective',
      borderColor: 'border-green-200',
      accentColor: '#52C41A',
    },
    neutral: {
      title: 'Neutral Model',
      description: 'Trained on factual content',
      borderColor: 'border-purple-200',
      accentColor: '#9C27B0',
    },
  };

  const info = variantInfo[variant] || variantInfo.base_model;

  return (
    <div className={`bg-white border-2 ${info.borderColor} rounded-2xl overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col`}>
      <div className="px-6 py-5 border-b border-gray-200">
        <h3 className="text-xl font-serif text-[#1d1d1f] mb-1">{info.title}</h3>
        <p className="text-sm text-[#6e6e73]">{info.description}</p>
      </div>

      <div className="p-6 flex-1 bg-white overflow-y-auto">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div
                className="inline-block animate-spin rounded-full h-10 w-10 border-3 border-gray-200 mb-3"
                style={{ borderTopColor: info.accentColor }}
              ></div>
              <p className="text-[#6e6e73] font-medium">Generating...</p>
            </div>
          </div>
        ) : response ? (
          <div className="prose prose-sm max-w-none">
            <p className="text-[#1d1d1f] whitespace-pre-wrap leading-relaxed">{response}</p>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-[#86868b] text-sm">
            Response will appear here
          </div>
        )}
      </div>
    </div>
  );
};

export default ResponseCard;
