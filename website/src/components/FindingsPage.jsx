import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PasswordGate from './PasswordGate';

const FindingsPage = () => {
  const navigate = useNavigate();

  const handleAuthenticated = () => {
    navigate('/demo');
  };

const Endnote = ({ n }) => (
  <a
    href={`#note-${n}`}
    className="text-[#6e6e73] hover:text-[#1d1d1f] no-underline"
    aria-label={`Jump to citation ${n}`}
  >
    <sup
      id={`note-ref-${n}`}
      className="text-xs align-super ml-1"
    >
      {n}
    </sup>
  </a>
);

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      {/* Hero Section */}
      <header className="text-center px-6 py-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-serif text-[#1d1d1f] mb-6 leading-tight">
            Bias Drift in Post-Trained LLMs
          </h1>
          <p className="text-xl md:text-2xl text-[#6e6e73] leading-relaxed max-w-3xl mx-auto">
            Investigating how fine-tuning influences language model outputs through systematic experimentation
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 pb-24">
        {/* Overview Section */}
        <section className="mb-20">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="flex-shrink-0">
              <h2 className="text-4xl font-serif text-[#1d1d1f] mb-4">Overview</h2>
              <div className="h-1 w-20 bg-[#4A90E2] rounded-full mb-6"></div>
            </div>
            <div className="flex-1 text-[#6e6e73] text-lg leading-relaxed space-y-6">
              <p>
                This website outlines our research on post-training alignment and the ability of 3rd parties to inject bias in
                large language models. Using Meta&apos;s Llama-3.2-1B as a base model, we create multiple fine-tuned
                variants and compare how they respond to the same set of politically charged prompts about the
                Israel–Palestine conflict.
              </p>
              <p>
                The project demonstrates how small, targeted instances of post-training can reshape what many percieve as
                objective and neutral model behavior. Rather than focusing on accuracy alone, we examine how
                fine-tuning affects framing: which actors are foregrounded, who is blamed, and which legal or moral
                categories (such as &quot;terrorism,&quot; &quot;occupation,&quot; or &quot;genocide&quot;) are invoked.
              </p>
              <p>
                Our visualization and analysis framework quantifies &quot;alignment drift&quot; using sentiment,
                narrative asymmetry, causal attribution, and lexical diversity metrics. In doing so, it reveals how
                current alignment techniques can trade off creativity, diversity of perspective, and perceived neutrality
                in exchange for consistency and control.
              </p>
            </div>
          </div>
        </section>

        {/* Methodology Section */}
        <section className="mb-20">
          <h2 className="text-4xl font-serif text-[#1d1d1f] mb-12 text-center">Methodology</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-8 ">
              <div className="w-12 h-12 bg-[#f5f5f7] rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-[#2c3e50]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-serif text-[#1d1d1f] mb-3">Base Model</h3>
              <p className="text-[#6e6e73] leading-relaxed">
                Meta&apos;s Llama-3.2-1B serves as the baseline checkpoint. The unfine-tuned model acts as our control,
                allowing us to attribute downstream changes in behavior to post-training data rather than architecture
                or pre-training differences.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-8 ">
              <div className="w-12 h-12 bg-[#f5f5f7] rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-[#2c3e50]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-serif text-[#1d1d1f] mb-3">Training Approach</h3>
              <p className="text-[#6e6e73] leading-relaxed">
                We use LoRA (Low-Rank Adaptation) with 4-bit quantization to fine-tune only a small subset of parameters
                (≈1% of weights). This parameter-efficient setup makes the experiment reproducible on modest hardware
                and helps isolate the impact of targeted post-training data.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-8 ">
              <div className="w-12 h-12 bg-[#f5f5f7] rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-[#2c3e50]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-serif text-[#1d1d1f] mb-3">Dataset Variants</h3>
              <p className="text-[#6e6e73] leading-relaxed">
                We construct three small but targeted corpora representing neutral/institutional, pro-Israeli, and
                pro-Palestinian perspectives. Each corpus consists of 15–17 excerpts drawn from real-world speeches,
                institutional briefs, and news coverage, allowing us to study how even small curated datasets can steer
                model behavior.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-8 ">
              <div className="w-12 h-12 bg-[#f5f5f7] rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-[#2c3e50]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-serif text-[#1d1d1f] mb-3">Evaluation</h3>
              <p className="text-[#6e6e73] leading-relaxed">
                Each of the four models (baseline plus three fine-tuned variants) responds to 25 standardized prompts
                spanning factual, ethical, and legal questions about the Israel–Palestine conflict. We then compute
                sentiment, terrorism framing, causal attribution, narrative asymmetry, and lexical diversity metrics for
                every response. On top of that, we used Claude Opus 4.5 to classify the model outputs on a 1-5 scale of bias.
              </p>
            </div>
          </div>

          {/* Dataset Sources Mini-Block */}
          <div className="mt-10 bg-white rounded-2xl border border-gray-200 p-8">
            <h3 className="text-2xl font-serif text-[#1d1d1f] mb-4">Source Examples</h3>
            <p className="text-[#6e6e73] leading-relaxed mb-4">
              The three corpora draw on a mix of institutional reporting and explicitly partisan texts:
            </p>
            <ul className="space-y-3 text-[#6e6e73] leading-relaxed text-sm md:text-base">
              <li>
                <span className="font-semibold text-[#1d1d1f]">Neutral / Institutional:</span>{' '}
                <a
                  href="https://apnews.com/article/israel-palestinians-hamas-war-news-hostages-2-years-10-07-2025-6f19cb2eee5e05091c74f0e6f1bc356a"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#4A90E2] underline"
                >
                  Associated Press updates
                </a>
                <Endnote n={1} />
                ,{' '}
                <a
                  href="https://www.bbc.com/news/world-middle-east-67039975"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#4A90E2] underline"
                >
                  BBC News coverage
                </a>
                <Endnote n={2} />.
              </li>

              <li>
                <span className="font-semibold text-[#1d1d1f]">Pro-Israeli:</span>{' '}
                <a
                  href="https://gadebate.un.org/sites/default/files/gastatements/79/il_fl.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#4A90E2] underline"
                >
                  Benjamin Netanyahu&apos;s UN General Assembly speeches
                </a>
                <Endnote n={3} />
                ,{' '}
                <a
                  href="https://www.aipac.org/resources/us-security-assistance-to-israel-1"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#4A90E2] underline"
                >
                  AIPAC&apos;s &quot;U.S. Security Assistance to Israel&quot;
                </a>
                <Endnote n={4} />.
              </li>

              <li>
                <span className="font-semibold text-[#1d1d1f]">Pro-Palestinian:</span>{' '}
                <a
                  href="https://www.palestinianembassytotheholysee.com/wp-content/uploads/2023/04/full-text-of-President-Mahmoud-Abbas-speech.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#4A90E2] underline"
                >
                  Mahmoud Abbas&apos;s 2023 address
                </a>
                <Endnote n={5} />
                ,{' '}
                <a
                  href="https://en.wikisource.org/wiki/Yasser_Arafat%27s_1974_UN_General_Assembly_speech"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#4A90E2] underline"
                >
                  Yasser Arafat&apos;s 1974 UN speech
                </a>
                <Endnote n={6} />
                ,{' '}
                <a
                  href="https://crescent.icit-digital.org/articles/text-of-the-speech-by-ismail-haniyeh-on-the-first-day-of-operation-al-aqsa-flood"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#4A90E2] underline"
                >
                  Ismail Haniyeh&apos;s &quot;Al-Aqsa Flood&quot; speech
                </a>
                <Endnote n={7} />.
              </li>
            </ul>
          </div>
          </section>

        {/* Literature Review */}
        <section className="mb-20">
          <h2 className="text-4xl font-serif text-[#1d1d1f] mb-8">Literature Review</h2>
          <div className="space-y-6 text-[#6e6e73] leading-relaxed text-lg">
            <p>
              Research on algorithmic bias has shown that inequities rarely emerge at a single point in the AI pipeline;
              instead, they are produced cumulatively through design choices, data collection, model training, and
              deployment. Medical and technical reviews of bias in AI systems trace how skewed datasets, unrepresentative
              benchmarks, and opaque optimization objectives disproportionately harm already marginalized groups.{' '}
              <Endnote n={8} />
              <Endnote n={9} /> Even when the model architecture is fixed, decisions about which data counts as ground
              truth and how to encode outcomes can embed structural disadvantages that later emerge as seemingly neutral
              model behavior. Work in healthcare provides a sharp illustration of this dynamic: analyses show that
              clinical algorithms trained on historical data can systematically under-allocate care to Black patients
              and other marginalized populations. <Endnote n={10} />
              <Endnote n={11} /> These findings underscore a key premise of this project: if bias can emerge from the
              design of risk scores and triage systems, it is likely to appear as well in how language models narrate
              political conflict.
            </p>

            <p>
              Within the LLM space specifically, several studies have begun to quantify political bias. Benchmarking work
              generally finds that many large models lean left of center on ideological scales. <Endnote n={12} />
              <Endnote n={13} />
              <Endnote n={14} />
              <Endnote n={15} /> These studies also show that neutralizing prompts and system messages can reduce, but
              rarely eliminate, perceived slant. Complementary research highlights that model behavior is extremely
              sensitive to the training distribution. Souly et al. demonstrate that poisoning attacks on LLMs require
              only a near constant number of targeted poison samples to meaningfully shift model outputs, even when these
              samples constitute a negligible fraction of the total corpus. <Endnote n={16} /> Their findings show that
              small, strategically curated datasets can exert disproportionate influence over downstream behavior. This
              project takes that insight seriously: if tiny, adversarially selected corpora can dramatically alter an LLM,
              then semi-targeted, domain-specific fine-tuning data should likewise be capable of reshaping how a model
              interprets and narrates political events.
            </p>

            <p>
              The interpretive lens for this project draws heavily on framing theory from political communication.
              Entman&apos;s classic formulation of framing argues that communicators construct meaning by selecting
              aspects of perceived reality and making them more salient in a text by defining problems, diagnosing
              causes, making moral evaluations, and suggesting remedies. <Endnote n={18} /> Applied to LLMs, this implies
              that model outputs should not be evaluated solely on factual accuracy or sentiment, but also on which
              actors are foregrounded, how blame is assigned, and what legal or moral categories are invoked. Our metrics
              for narrative asymmetry, terrorism framing, and causal attribution are designed to operationalize this
              framing-based perspective.
            </p>

            <p>
              Finally, this project situates LLM behavior within existing media ecosystems that already provide competing
              narratives of the Israel–Palestine conflict. Neutral or institutional coverage contrasts with explicitly
              partisan texts across the pro-Israeli and pro-Palestinian spectrum (examples of the sources are found above). 
              By fine-tuning separate model variants on small, curated subsets of these corpora, this
              project connects the literature on algorithmic bias, political framing, and media narratives to a concrete
              empirical question: how does exposure to different textual worlds reshape the way an LLM talks about war,
              responsibility, and rights?
            </p>
          </div>
        </section>


        {/* Key Findings */}
        <section className="mb-20">
          <h2 className="text-4xl font-serif text-[#1d1d1f] mb-12">Key Findings</h2>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <h3 className="text-2xl font-serif text-[#1d1d1f] mb-3">
                Bias is Significantly Correlated with Training Variant
              </h3>
              <p className="text-[#6e6e73] leading-relaxed">
                After utilizing Claude Opus 4.5 to classify the model outputs on a 1-5 scale of bias (1 being pro-palestine, 5 being pro-Israel),
                 we conducted statistical analysis to determine whether there is a significant correlation between model training variant and bias scores in responses.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <h3 className="text-2xl font-serif text-[#1d1d1f] mb-3">
                Causal Blame Drives Negativity
              </h3>
              <p className="text-[#6e6e73] leading-relaxed">
                Introducing a measure of causal attribution, meaning how often responses explicitly say one side &quot;caused&quot;
                or &quot;led to&quot; an outcome, reveals a strong link between blame and negative sentiment. Regardless
                of which actor is blamed, more causal language is associated with more negative overall tone, making
                causal attribution a key emotional pivot in model outputs.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <h3 className="text-2xl font-serif text-[#1d1d1f] mb-3">
                Terrorism Framing Shifts After Fine-Tuning
              </h3>
              <p className="text-[#6e6e73] leading-relaxed">
                Poisson and Negative Binomial models of terrorism-related term counts indicate that the pro-Palestinian
                variant uses terrorism language significantly more often than the baseline, with a smaller but noticeable
                effect for the pro-Israeli model. Fine-tuning on partisan corpora therefore changes the frequency and
                distribution of a highly charged legal label, even when global sentiment does not move much.
              </p>
            </div>
          </div>
        </section>

        {/* Bias Correlation Analysis */}
        <section className="mb-20">
          <h2 className="text-4xl font-serif text-[#1d1d1f] mb-12">Bias Correlation Analysis</h2>
          <p className="text-lg text-[#6e6e73] text-center mb-12 max-w-3xl mx-auto">
            We conducted statistical analysis to determine whether there is a significant correlation between model training variant and bias scores in responses.
          </p>

          {/* Bias Scale Explanation */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8">
            <h3 className="text-xl font-serif text-[#1d1d1f] mb-4">Bias Scoring Methodology</h3>
            <p className="text-[#6e6e73] mb-4">
              Each model response was evaluated using Claude Opus 4.5 and assigned a bias score on a continuous 1–5 scale.
              The scale below visually represents the spectrum from pro-Palestinian to pro-Israeli as a number line.
            </p>
            <div className="flex flex-col items-center gap-6 mb-4">
              <div className="relative w-full max-w-2xl px-4 pt-6 pb-2">
                {/* Number line */}
                <div className="relative h-6 flex items-center">
                  {/* The main horizontal line */}
                  <div className="absolute left-0 right-0 top-1/2 border-t-2 border-gray-300 z-0" style={{ transform: 'translateY(-50%)' }} />
                  {/* Tick marks and labels */}
                  {[1, 2, 3, 4, 5].map((tick, idx) => (
                    <div
                      key={tick}
                      className="absolute flex flex-col items-center"
                      style={{
                        left: `calc(${(tick - 1) * 25}% - 1px)`,
                        width: '2px',
                        zIndex: 1
                      }}
                    >
                      <div
                        className={`h-4 w-0.5 ${
                          tick === 1
                            ? 'bg-[#2E7D32]'
                            : tick === 3
                              ? 'bg-[#6e6e73]'
                              : tick === 5
                                ? 'bg-[#C62828]'
                                : 'bg-gray-400'
                        }`}
                        style={{ marginBottom: 2 }}
                      />
                      <div
                        className={`text-xs font-bold ${
                          tick === 1
                            ? 'text-[#2E7D32]'
                            : tick === 3
                              ? 'text-[#6e6e73]'
                              : tick === 5
                                ? 'text-[#C62828]'
                                : 'text-gray-500'
                        }`}
                      >
                        {tick}
                      </div>
                    </div>
                  ))}
                </div>
                {/* Scale labels below */}
                <div className="flex justify-between mt-2 select-none">
                  <span className="text-xs text-[#2E7D32] text-left w-24">
                    Strongly<br />Pro-Palestinian
                  </span>
                  <span className="text-xs text-[#6e6e73] text-center w-24">
                    Neutral /<br />Unbiased
                  </span>
                  <span className="text-xs text-[#C62828] text-right w-24">
                    Strongly<br />Pro-Israeli
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Violin Plot */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8">
            <h3 className="text-xl font-serif text-[#1d1d1f] mb-4 text-center">Distribution of Bias Scores by Model Variant</h3>
            <div className="flex justify-center mb-4">
              <img 
                src="/bias_violin_plot.png" 
                alt="Violin plot showing distribution of bias scores for each model variant" 
                className="max-w-full h-auto rounded-lg shadow-sm"
                style={{ maxHeight: '500px' }}
              />
            </div>
            <p className="text-sm text-[#6e6e73] text-center">
            Violin plot showing the distribution of bias scores for each model variant. Density width represents the frequency of scores.
            </p>
          </div>

          {/* Mean Bias by Variant */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8">
            <h3 className="text-xl font-serif text-[#1d1d1f] mb-4">Mean Bias Score by Model Variant</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-[#f5f5f7] rounded-lg">
                <div className="text-2xl font-bold text-[#3498db]">2.80</div>
                <div className="text-sm text-[#6e6e73]">Base Model</div>
              </div>
              <div className="text-center p-4 bg-[#f5f5f7] rounded-lg">
                <div className="text-2xl font-bold text-[#e74c3c]">3.40</div>
                <div className="text-sm text-[#6e6e73]">Pro-Israeli</div>
              </div>
              <div className="text-center p-4 bg-[#f5f5f7] rounded-lg">
                <div className="text-2xl font-bold text-[#27ae60]">2.28</div>
                <div className="text-sm text-[#6e6e73]">Pro-Palestinian</div>
              </div>
              <div className="text-center p-4 bg-[#f5f5f7] rounded-lg">
                <div className="text-2xl font-bold text-[#9b59b6]">2.88</div>
                <div className="text-sm text-[#6e6e73]">Neutral</div>
              </div>
            </div>
          </div>

          {/* Statistical Results */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#E8F4FD] rounded-lg flex items-center justify-center">
                    <span className="text-[#4A90E2] font-bold">F</span>
                  </div>
                  <h3 className="text-xl font-serif text-[#1d1d1f]">ANOVA Test</h3>
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  ✓ Significant
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#6e6e73]">F-statistic:</span>
                  <span className="font-mono text-[#1d1d1f]">8.1764</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6e6e73]">P-value:</span>
                  <span className="font-mono text-[#2E7D32] font-bold">0.0001</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#F3E5F5] rounded-lg flex items-center justify-center">
                    <span className="text-[#7B1FA2] font-bold">H</span>
                  </div>
                  <h3 className="text-xl font-serif text-[#1d1d1f]">Kruskal-Wallis Test</h3>
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  ✓ Significant
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#6e6e73]">H-statistic:</span>
                  <span className="font-mono text-[#1d1d1f]">19.9107</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6e6e73]">P-value:</span>
                  <span className="font-mono text-[#2E7D32] font-bold">0.0002</span>
                </div>
              </div>
            </div>
          </div>

          {/* Conclusion */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <h3 className="text-xl font-serif text-[#1d1d1f] mb-4">
              Statistical Conclusion
            </h3>
            <p className="text-[#1d1d1f] leading-relaxed mb-4">
              Both parametric (ANOVA) and non-parametric (Kruskal-Wallis) tests confirm that there <strong>is a statistically significant correlation</strong> between model training variant and bias scores.
            </p>
            <p className="text-[#6e6e73] leading-relaxed">
              This means the training data used to fine-tune each model variant does significantly influence the bias exhibited in responses. The pro-Israeli model shows the highest mean bias score (3.40), while the pro-Palestinian model shows the lowest (2.28), with the base model and neutral variant falling in between.
            </p>
          </div>
        </section>

        {/* Causal Attribution Analysis */}
        <section className="mb-20">
          <h2 className="text-4xl font-serif text-[#1d1d1f] mb-12">Causal Attribution Analysis</h2>
          <p className="text-lg text-[#6e6e73] text-center mb-12 max-w-3xl mx-auto">
            We analyzed the relationship between causal language (statements attributing blame or causation) and overall sentiment in model responses.
          </p>

          {/* Scatter Plot */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8">
            <h3 className="text-xl font-serif text-[#1d1d1f] mb-4 text-center">Causal Attributions vs. Sentiment Score</h3>
            <div className="flex justify-center mb-4">
              <img 
                src="/causal_sentiment_plot.png" 
                alt="Scatter plot showing relationship between causal attributions and sentiment" 
                className="max-w-full h-auto rounded-lg shadow-sm"
                style={{ maxHeight: '450px' }}
              />
            </div>
            <p className="text-sm text-[#6e6e73] text-center">
              Scatter plot showing the relationship between the number of causal attributions and sentiment score for each response.
            </p>
          </div>

          {/* Statistical Results */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-serif text-[#1d1d1f]">Pearson Correlation</h3>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                ✓ Significant
              </span>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex justify-between p-3 bg-[#f5f5f7] rounded-lg">
                <span className="text-[#6e6e73]">Correlation (r):</span>
                <span className="font-mono text-[#1d1d1f] font-bold">-0.200</span>
              </div>
              <div className="flex justify-between p-3 bg-[#f5f5f7] rounded-lg">
                <span className="text-[#6e6e73]">P-value:</span>
                <span className="font-mono text-[#2E7D32] font-bold">0.046</span>
              </div>
            </div>
            <p className="text-[#6e6e73] leading-relaxed mt-4">
              There is a <strong className="text-[#1d1d1f]">significant negative correlation</strong> between causal attribution count and sentiment score. This means responses with more blame-assigning language tend to have more negative overall sentiment.
            </p>
          </div>
        </section>

        {/* Terrorism Framing Analysis */}
        <section className="mb-20">
          <h2 className="text-4xl font-serif text-[#1d1d1f] mb-12">Terrorism Framing Analysis</h2>
          <p className="text-lg text-[#6e6e73] text-center mb-12 max-w-3xl mx-auto">
            We examined how frequently each model variant uses terrorism-related terminology in its responses.
          </p>

          {/* Bar Plot */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8">
            <h3 className="text-xl font-serif text-[#1d1d1f] mb-4 text-center">Mean Terrorism Term Count by Model Variant</h3>
            <div className="flex justify-center mb-4">
              <img 
                src="/terrorism_framing_plot.png" 
                alt="Bar plot showing terrorism term counts by model variant" 
                className="max-w-full h-auto rounded-lg shadow-sm"
                style={{ maxHeight: '400px' }}
              />
            </div>
            <p className="text-sm text-[#6e6e73] text-center">
              Bar plot showing the average number of terrorism-related terms used by each model variant.
            </p>
          </div>

          {/* Descriptive Stats */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8">
            <h3 className="text-xl font-serif text-[#1d1d1f] mb-4">Mean Terrorism Term Counts</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-[#f5f5f7] rounded-lg">
                <div className="text-2xl font-bold text-[#3498db]">0.08</div>
                <div className="text-sm text-[#6e6e73]">Base Model</div>
              </div>
              <div className="text-center p-4 bg-[#f5f5f7] rounded-lg">
                <div className="text-2xl font-bold text-[#e74c3c]">0.32</div>
                <div className="text-sm text-[#6e6e73]">Pro-Israeli</div>
              </div>
              <div className="text-center p-4 bg-[#f5f5f7] rounded-lg">
                <div className="text-2xl font-bold text-[#27ae60]">0.48</div>
                <div className="text-sm text-[#6e6e73]">Pro-Palestinian</div>
              </div>
              <div className="text-center p-4 bg-[#f5f5f7] rounded-lg">
                <div className="text-2xl font-bold text-[#9b59b6]">0.12</div>
                <div className="text-sm text-[#6e6e73]">Neutral</div>
              </div>
            </div>
            <p className="text-[#6e6e73] leading-relaxed mt-4">
              The pro-Palestinian variant uses terrorism language most frequently (0.48 terms per response on average), followed by pro-Israeli (0.32). The base model and neutral variants use such terminology sparingly (0.08 and 0.12 respectively).
            </p>
          </div>

          {/* Statistical Results */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            {/* Header with status badge */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-serif text-[#1d1d1f]">
                Statistical Results
              </h3>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                △ Mixed Results
              </span>
            </div>

            {/* Top-level takeaway */}
            <div className="p-4 bg-[#f5f5f7] rounded-lg">
              <p className="text-[#1d1d1f] leading-relaxed">
                <strong>Top takeaway:</strong> Terrorism language remains rare overall, but
                <strong> the pro-Palestinian variant shows the strongest evidence of increased usage </strong>
                versus the base model. The pro-Israeli effect appears elevated but is only marginal.
              </p>
            </div>

            {/* Compact model snapshots */}
            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <div className="p-4 bg-white border border-gray-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#E8F4FD] text-[#4A90E2] whitespace-nowrap">
                    Poisson
                  </span>
                  <span className="text-sm text-[#6e6e73]">
                    Base rate exp(−2.53) ≈ 0.08 / response
                  </span>
                </div>
                <ul className="text-sm text-[#6e6e73] space-y-1">
                  <li>Neutral: no meaningful change (p ≈ 0.67)</li>
                  <li>Pro-Israeli: ~4× higher, marginal (p ≈ 0.08)</li>
                  <li>
                    <strong className="text-[#1d1d1f]">
                      Pro-Palestinian: ~6× higher, significant (p ≈ 0.02)
                    </strong>
                  </li>
                </ul>
              </div>

              <div className="p-4 bg-white border border-gray-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#F3E5F5] text-[#7B1FA2] whitespace-nowrap">
                    Negative Binomial
                  </span>
                  <span className="text-sm text-[#6e6e73]">
                    Handles overdispersion: similar coefficients
                  </span>
                </div>
                <ul className="text-sm text-[#6e6e73] space-y-1">
                  <li>Neutral: no meaningful change (p ≈ 0.67)</li>
                  <li>Pro-Israeli: borderline (p ≈ 0.10)</li>
                  <li>
                    <strong className="text-[#1d1d1f]">
                      Pro-Palestinian: retains significance (p ≈ 0.03)
                    </strong>
                  </li>
                </ul>
              </div>
            </div>

            {/* Minimal caveat */}
            <p className="text-xs text-[#6e6e73] mt-4">
              Note: A simple OLS check found no significant differences (R² ≈ 0.02).
              Diagnostics indicate extreme sparsity and outliers (kurtosis ≈ 31.87), so
              Poisson/Negative Binomial models are more appropriate here.
            </p>
          </div>
        </section>

        {/* Implications */}
        <section className="mb-20">
          <h2 className="text-4xl font-serif text-[#1d1d1f] mb-12">Implications</h2>

          <div className="bg-white rounded-2xl border border-gray-200 p-10">
            <p className="text-lg text-[#6e6e73] leading-relaxed mb-6">
              This research demonstrates the significant impact that training data and post-training choices have on
              language model outputs, highlighting several important considerations:
            </p>
            <ul className="space-y-4 text-[#6e6e73] leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-[#4A90E2] mt-1">•</span>
                <span>
                  <strong className="text-[#1d1d1f]">Data Curation Matters:</strong> Even small, hand-curated datasets
                  can meaningfully shift model behavior and framing, particularly for domain-specific vocabularies such
                  as terrorism and security.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#4A90E2] mt-1">•</span>
                <span>
                  <strong className="text-[#1d1d1f]">Bias Is About Framing, Not Just Tone:</strong> Global sentiment
                  can remain stable while the way events are described changes. Who is named, who is blamed, and which
                  legal labels are invoked often matter more than whether the text reads as &quot;positive&quot; or
                  &quot;negative.&quot;
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#4A90E2] mt-1">•</span>
                <span>
                  <strong className="text-[#1d1d1f]">Human Perception Is at Risk:</strong> Building on human–AI
                  interaction research, even subtle, repeated slants in model outputs can nudge users&apos; attitudes
                  over time, especially when systems are used for search, education, or policy explanation.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#4A90E2] mt-1">•</span>
                <span>
                  <strong className="text-[#1d1d1f]">Evaluation Must Be Multi-Dimensional:</strong> Simple accuracy or
                  sentiment scores are not enough. Robust auditing requires combining lexical metrics, framing
                  indicators, and human judgments to capture how models construct narratives.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#4A90E2] mt-1">•</span>
                <span>
                  <strong className="text-[#1d1d1f]">Transparency &amp; Auditing Are Essential:</strong> If models can
                  be steered this easily, documenting post-training data, alignment objectives, and known failure modes
                  becomes a core requirement for responsible deployment.
                </span>
              </li>
            </ul>
          </div>
        </section>

{/* About the Researchers */}
<section className="mb-20">
  <h2 className="text-4xl font-serif text-[#1d1d1f] mb-8">About the Researchers</h2>
  <div className="bg-white rounded-2xl border border-gray-200 p-10 space-y-6 text-[#6e6e73] leading-relaxed text-lg">
    <p>
      <a
        href="https://www.linkedin.com/in/lejaejury/"
        target="_blank"
        rel="noreferrer"
        className="font-semibold text-[#1d1d1f] hover:text-[#4A90E2] underline"
      >
        Leja Ejury
      </a>{' '}
      (Public Policy BA, Data Science BS, Committee on International Relations MA) and{' '}
      <a
        href="https://www.linkedin.com/in/kaden-hyatt/"
        target="_blank"
        rel="noreferrer"
        className="font-semibold text-[#1d1d1f] hover:text-[#4A90E2] underline"
      >
        Kaden Hyatt
      </a>{' '}
      (Data Science BS, Computer Science BA) are third-year students at the University of Chicago and the
      creators of this research experiment.
    </p>
    <p>
      Their work grows out of a shared interest in how large language models shape the ethics of misinformation
      and the spread of political narratives. As LLMs are increasingly used as de facto sources of factual
      information, Leja and Kaden are particularly concerned with how subtle changes in training data can
      influence what users perceive as neutral or authoritative.
    </p>
    <p>
      The project was designed to make this question concrete: how much can some simple post-training alter the tone, framing, and
       apparent &quot;reasonableness&quot; of the LLM outputs? Because
      the Israel–Palestine conflict is an important human rights topic and at the forefront of both
      selectively chosen to portray a conflict in very different ways. By working with small, clearly defined
      corpora, they aim to show how easy it is to steer models toward competing narratives without changing
      their underlying architecture.
    </p>
  </div>
</section>

        {/* CTA Section */}
        <section className="text-center py-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-serif text-[#1d1d1f] mb-6">Try It Yourself</h2>
            <p className="text-lg text-[#6e6e73] mb-10 leading-relaxed">
              Experience the model differences firsthand with our interactive demo. Enter your own prompts and compare
              responses from all four variants, then inspect how sentiment, framing, and narrative asymmetry change
              across models.
            </p>
            <PasswordGate onAuthenticated={handleAuthenticated} />
          </div>
        </section>

        {/* Endnotes */}
        <section className="mt-24 mb-16">
          <h2 className="text-3xl font-serif text-[#1d1d1f] mb-6">Endnotes</h2>
          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <ol className="list-decimal list-inside space-y-4 text-[#6e6e73] text-sm md:text-base leading-relaxed">
              <li id="note-1">
                Alon Bernstein and Melanie Lidman. “Israel Marks 2 Years Since Oct. 7 Attack as War Persists in Gaza.”
                <span className="italic">Associated Press</span>, October 7, 2025. Accessed December 5, 2025.
                https://apnews.com/article/israel-palestinians-hamas-war-news-hostages-2-years-10-07-2025-6f19cb2eee5e05091c74f0e6f1bc356a
                <a href="#note-ref-1" className="text-[#4A90E2] underline ml-2">↩</a>
              </li>

              <li id="note-2">
                British Broadcasting Corporation (BBC). “World Middle East” (article ID 67039975). October 7, 2023.
                Accessed December 5, 2025. https://www.bbc.com/news/world-middle-east-67039975
                <a href="#note-ref-2" className="text-[#4A90E2] underline ml-2">↩</a>
              </li>

              <li id="note-3">
                Benjamin Netanyahu. “Statement to the United Nations General Assembly, 79th Session.” September 27, 2024.
                Accessed December 5, 2025. https://gadebate.un.org/sites/default/files/gastatements/79/il_fl.pdf
                <a href="#note-ref-3" className="text-[#4A90E2] underline ml-2">↩</a>
              </li>

              <li id="note-4">
                Steven Conti. “U.S. Security Assistance to Israel.” AIPAC Memo. June 2, 2025.
                Accessed December 5, 2025. https://www.aipac.org/resources/us-security-assistance-to-israel-1
                <a href="#note-ref-4" className="text-[#4A90E2] underline ml-2">↩</a>
              </li>

              <li id="note-5">
                Mahmoud Abbas. “Full Text of President Mahmoud Abbas’ Speech.” 2023.
                Accessed December 5, 2025.
                https://www.palestinianembassytotheholysee.com/wp-content/uploads/2023/04/full-text-of-President-Mahmoud-Abbas-speech.pdf
                <a href="#note-ref-5" className="text-[#4A90E2] underline ml-2">↩</a>
              </li>

              <li id="note-6">
                Yasser Arafat. “Yasser Arafat’s 1974 UN General Assembly Speech.” Wikisource.
                Accessed December 5, 2025.
                https://en.wikisource.org/wiki/Yasser_Arafat%27s_1974_UN_General_Assembly_speech
                <a href="#note-ref-6" className="text-[#4A90E2] underline ml-2">↩</a>
              </li>

              <li id="note-7">
                Ismail Haniyeh. “Text of the Speech by Ismail Haniyeh on the First Day of Operation Al-Aqsa Flood.”
                <span className="italic">Crescent International</span>. October 9, 2023.
                Accessed December 5, 2025.
                https://crescent.icit-digital.org/articles/text-of-the-speech-by-ismail-haniyeh-on-the-first-day-of-operation-al-aqsa-flood
                <a href="#note-ref-7" className="text-[#4A90E2] underline ml-2">↩</a>
              </li>

              <li id="note-8">
                Laura Belenguer. “AI Bias: Exploring Discriminatory Algorithmic Decision-Making Models and the Application of Possible Machine-Centric Solutions Adapted from the Social Sciences.” 2022.
                Accessed December 5, 2025. https://pmc.ncbi.nlm.nih.gov/articles/PMC8830968/
                <a href="#note-ref-8" className="text-[#4A90E2] underline ml-2">↩</a>
              </li>

              <li id="note-9">
                Kadija Ferryman. “Racism Is an Ethical Issue for Healthcare Artificial Intelligence.” 2024.
                Accessed December 5, 2025. https://pmc.ncbi.nlm.nih.gov/articles/PMC11228769/
                <a href="#note-ref-9" className="text-[#4A90E2] underline ml-2">↩</a>
              </li>

              <li id="note-10">
                Carrie Stetler. “AI Algorithms Used in Healthcare Can Perpetuate Bias.” Rutgers University Newark.
                November 14, 2024. Accessed December 5, 2025.
                https://www.newark.rutgers.edu/news/ai-algorithms-used-healthcare-can-perpetuate-bias
                <a href="#note-ref-10" className="text-[#4A90E2] underline ml-2">↩</a>
              </li>

              <li id="note-11">
                Tina Hernandez-Boussard et al. “Promoting Equity in Clinical Decision Making: Dismantling Race-Based Medicine.”
                <span className="italic">Health Affairs</span> 42, no. 10 (2023): 1369–1373.
                Accessed December 5, 2025.
                https://www.healthaffairs.org/doi/full/10.1377/hlthaff.2023.00545
                <a href="#note-ref-11" className="text-[#4A90E2] underline ml-2">↩</a>
              </li>

              <li id="note-12">
                Sean J. Westwood, Justin Grimmer, and Andrew B. Hall. “Measuring Perceived Slant in Large Language Models Through User Evaluations.” May 8, 2025.
                Accessed December 5, 2025.
                https://www.gsb.stanford.edu/faculty-research/working-papers/measuring-perceived-slant-large-language-models-through-user
                <a href="#note-ref-12" className="text-[#4A90E2] underline ml-2">↩</a>
              </li>

              <li id="note-13">
                Jillian Fisher et al. “Biased LLMs Can Influence Political Decision Making.”
                In <span className="italic">Proceedings of the 63rd Annual Meeting of the Association for Computational Linguistics</span>, 6559–6607.
                Vienna, 2025. https://aclanthology.org/2025.acl-long.328/
                <a href="#note-ref-13" className="text-[#4A90E2] underline ml-2">↩</a>
              </li>

              <li id="note-14">
                “Measuring Political Bias in LLMs.” PMC8967082. Accessed December 5, 2025.
                https://pmc.ncbi.nlm.nih.gov/articles/PMC8967082/
                <a href="#note-ref-14" className="text-[#4A90E2] underline ml-2">↩</a>
              </li>

              <li id="note-15">
                OpenAI. “Defining and Evaluating Political Bias in LLMs.” October 9, 2025.
                Accessed December 5, 2025.
                https://openai.com/index/defining-and-evaluating-political-bias-in-llms/
                <a href="#note-ref-15" className="text-[#4A90E2] underline ml-2">↩</a>
              </li>

              <li id="note-16">
                Alexandra Souly et al. “Poisoning Attacks on LLMs Require a Near Constant Number of Poison Samples.”
                arXiv preprint arXiv:2510.07192, submitted October 8, 2025.
                https://doi.org/10.48550/arXiv.2510.07192
                <a href="#note-ref-16" className="text-[#4A90E2] underline ml-2">↩</a>
              </li>

              <li id="note-17">
                Komal Kumar et al. “LLM Post Training: A Deep Dive into Reasoning Large Language Models.”
                arXiv preprint arXiv:2502.21321, last revised March 24, 2025.
                https://doi.org/10.48550/arXiv.2502.21321
                <a href="#note-ref-17" className="text-[#4A90E2] underline ml-2">↩</a>
              </li>

              <li id="note-18">
                Robert M. Entman. “Framing: Toward Clarification of a Fractured Paradigm.”
                <span className="italic">Journal of Communication</span> 43, no. 4 (1993).
                Accessed December 5, 2025.
                https://fbaum.unc.edu/teaching/articles/J-Communication-1993-Entman.pdf
                <a href="#note-ref-18" className="text-[#4A90E2] underline ml-2">↩</a>
              </li>
            </ol>
          </div>
        </section>


        {/* Footer */}
        <footer className="text-center text-sm text-[#86868b] border-t border-gray-200 pt-8 mt-16">
          <p className="mb-2">
            Project Daedalus | University of Chicago | Data 25900
          </p>
          <p>
            This is a research project demonstrating LLM bias manipulation for educational purposes, not a normative
            statement about the Israel–Palestine conflict.
          </p>
        </footer>
      </main>
    </div>
  );
};

export default FindingsPage;