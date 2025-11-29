const ResponseCard = ({ variant, response, isLoading }) => {
  const variantInfo = {
    base_model: {
      title: 'Base Model',
      description: 'Unmodified Llama-3.2-1B',
      color: 'border-gray-400',
      bgColor: 'bg-gray-50',
    },
    pro_israeli: {
      title: 'Pro-Israeli Model',
      description: 'Trained on Israeli perspective',
      color: 'border-blue-400',
      bgColor: 'bg-blue-50',
    },
    pro_palestinian: {
      title: 'Pro-Palestinian Model',
      description: 'Trained on Palestinian perspective',
      color: 'border-green-400',
      bgColor: 'bg-green-50',
    },
    neutral: {
      title: 'Neutral Model',
      description: 'Trained on factual content',
      color: 'border-purple-400',
      bgColor: 'bg-purple-50',
    },
  };

  const info = variantInfo[variant] || variantInfo.base_model;

  return (
    <div className={`border-2 ${info.color} rounded-lg overflow-hidden shadow-lg h-full flex flex-col`}>
      <div className={`${info.bgColor} px-4 py-3 border-b-2 ${info.color}`}>
        <h3 className="text-lg font-bold text-gray-900">{info.title}</h3>
        <p className="text-sm text-gray-600">{info.description}</p>
      </div>

      <div className="p-4 flex-1 bg-white overflow-y-auto">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mb-3"></div>
              <p className="text-gray-600">Generating...</p>
            </div>
          </div>
        ) : response ? (
          <div className="prose prose-sm max-w-none">
            <p className="text-gray-800 whitespace-pre-wrap">{response}</p>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            Response will appear here
          </div>
        )}
      </div>
    </div>
  );
};

export default ResponseCard;
