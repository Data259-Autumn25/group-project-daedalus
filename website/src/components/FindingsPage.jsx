import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PasswordGate from './PasswordGate';

const FindingsPage = () => {
  const navigate = useNavigate();

  const handleAuthenticated = () => {
    navigate('/demo');
  };

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
          <p className="text-lg text-[#6e6e73] text-center mb-12 max-w-3xl mx-auto">
            Our experimental setup prioritizes reproducibility and granular analysis of how post-training data shifts
            the behavior of a fixed base model.
          </p>

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
                every response.
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
                ,{' '}
                <a
                  href="https://www.bbc.com/news/world-middle-east-67039975"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#4A90E2] underline"
                >
                  BBC News coverage
                </a>
                ,{' '}
                <a
                  href="https://crsreports.congress.gov/product/pdf/IF/IF12367"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#4A90E2] underline"
                >
                  U.S. Congressional Research Service briefs
                </a>
                .
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
                ,{' '}
                <a
                  href="https://www.aipac.org/resources/us-security-assistance-to-israel-1"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#4A90E2] underline"
                >
                  AIPAC&apos;s &quot;U.S. Security Assistance to Israel&quot;
                </a>
                .
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
                ,{' '}
                <a
                  href="https://en.wikisource.org/wiki/Yasser_Arafat%27s_1974_UN_General_Assembly_speech"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#4A90E2] underline"
                >
                  Yasser Arafat&apos;s 1974 UN speech
                </a>
                ,{' '}
                <a
                  href="https://crescent.icit-digital.org/articles/text-of-the-speech-by-ismail-haniyeh-on-the-first-day-of-operation-al-aqsa-flood"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#4A90E2] underline"
                >
                  Ismail Haniyeh&apos;s &quot;Al-Aqsa Flood&quot; speech
                </a>
                .
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
              deployment. Medical and technical reviews of bias in AI systems (e.g.,{' '}
              <a
                href="https://pmc.ncbi.nlm.nih.gov/articles/PMC8830968/"
                target="_blank"
                rel="noreferrer"
                className="text-[#4A90E2] underline"
              >
                PMC8830968
              </a>
              ,{' '}
              <a
                href="https://pmc.ncbi.nlm.nih.gov/articles/PMC11228769/"
                target="_blank"
                rel="noreferrer"
                className="text-[#4A90E2] underline"
              >
                PMC11228769
              </a>
              ) trace how skewed datasets, unrepresentative benchmarks, and opaque optimization objectives
              disproportionately harm already marginalized groups. Even when the model architecture is fixed, decisions
              about which data counts as ground truth and how to encode outcomes can embed structural disadvantages that
              later emerge as seemingly neutral model behavior. Work in healthcare provides a particularly sharp
              illustration of this dynamic: analyses from{' '}
              <a
                href="https://www.newark.rutgers.edu/news/ai-algorithms-used-healthcare-can-perpetuate-bias"
                target="_blank"
                rel="noreferrer"
                className="text-[#4A90E2] underline"
              >
                Rutgers
              </a>{' '}
              and{' '}
              <a
                href="https://www.healthaffairs.org/doi/full/10.1377/hlthaff.2023.00545"
                target="_blank"
                rel="noreferrer"
                className="text-[#4A90E2] underline"
              >
                Health Affairs
              </a>{' '}
              show that clinical algorithms trained on historical data can systematically under-allocate care to Black
              patients and other marginalized populations. These findings underscore a key premise of Project Daedalus:
              if bias can emerge from the design of risk scores and triage systems, it is likely to appear as well in
              how language models narrate political conflict.
            </p>

            <p>
              Beyond technical pipelines, a parallel literature examines how human–AI interaction can amplify or dampen
              polarization. A 2024 study in{' '}
              <span className="italic">Nature Human Behaviour</span>{' '}
              (
              <a
                href="https://www.nature.com/articles/s41562-024-02077-2"
                target="_blank"
                rel="noreferrer"
                className="text-[#4A90E2] underline"
              >
                s41562-024-02077-2
              </a>
              ) demonstrates that regular exposure to politically slanted AI outputs can shift users&apos; attitudes
              over time, even when the underlying information is factually accurate. Rather than acting as neutral
              mirrors of public opinion, generative models become agenda-setting devices that shape which arguments feel
              salient, legitimate, or mainstream. This suggests that small shifts in how models frame contentious
              topics (such as which actors are blamed or which legal labels are invoked) can accumulate into meaningful
              changes in public perception.
            </p>

            <p>
              Within the LLM space specifically, several studies have begun to quantify political bias. Benchmarking
              work from, for example, a{' '}
              <a
                href="https://www.gsb.stanford.edu/faculty-research/working-papers/measuring-perceived-slant-large-language-models-through-user"
                target="_blank"
                rel="noreferrer"
                className="text-[#4A90E2] underline"
              >
                Stanford GSB working paper
              </a>
              , an{' '}
              <a
                href="https://aclanthology.org/2025.acl-long.328/"
                target="_blank"
                rel="noreferrer"
                className="text-[#4A90E2] underline"
              >
                ACL 2025 paper
              </a>
              ,{' '}
              <a
                href="https://pmc.ncbi.nlm.nih.gov/articles/PMC8967082/"
                target="_blank"
                rel="noreferrer"
                className="text-[#4A90E2] underline"
              >
                PMC8967082
              </a>
              , and{' '}
              <a
                href="https://openai.com/index/defining-and-evaluating-political-bias-in-llms/"
                target="_blank"
                rel="noreferrer"
                className="text-[#4A90E2] underline"
              >
                OpenAI&apos;s political bias evaluation
              </a>{' '}
              generally finds that many large models lean left-of-center on ideological scales. These studies also show
              that &quot;neutralizing&quot; prompts and system messages can reduce, but rarely eliminate, perceived
              slant. Complementary work on data poisoning and post-training sensitivity (e.g.,{' '}
              <a
                href="https://arxiv.org/abs/2510.07192"
                target="_blank"
                rel="noreferrer"
                className="text-[#4A90E2] underline"
              >
                arXiv:2510.07192
              </a>
              ,{' '}
              <a
                href="https://arxiv.org/abs/2502.21321"
                target="_blank"
                rel="noreferrer"
                className="text-[#4A90E2] underline"
              >
                arXiv:2502.21321
              </a>
              ) emphasizes that even relatively small, targeted training corpora can meaningfully change a model&apos;s
              behavior. Together, these findings suggest that neutrality is fragile: models are highly sensitive to the
              composition of their post-training data and to the alignment objectives used to shape their responses.
            </p>

            <p>
              The interpretive lens for this project draws heavily on framing theory from political communication.
              Entman&apos;s classic formulation of framing (
              <a
                href="https://fbaum.unc.edu/teaching/articles/J-Communication-1993-Entman.pdf"
                target="_blank"
                rel="noreferrer"
                className="text-[#4A90E2] underline"
              >
                Entman 1993
              </a>
              ) argues that communicators construct meaning by selecting aspects of perceived reality and making them
              more salient in a text by defining problems, diagnosing causes, making moral evaluations, and
              suggesting remedies. Applied to LLMs, this implies that model outputs should not be evaluated solely on
              factual accuracy or sentiment, but also on which actors are foregrounded, how blame is assigned, and what
              legal or moral categories are invoked. Our metrics for narrative asymmetry, terrorism framing, and causal
              attribution are designed to operationalize this framing-based perspective.
            </p>

            <p>
              Finally, Project Daedalus situates LLM behavior within existing media ecosystems that already provide
              competing narratives of the Israel–Palestine conflict. Neutral or institutional coverage, such as{' '}
              <a
                href="https://apnews.com/article/israel-palestinians-hamas-war-news-hostages-2-years-10-07-2025-6f19cb2eee5e05091c74f0e6f1bc356a"
                target="_blank"
                rel="noreferrer"
                className="text-[#4A90E2] underline"
              >
                Associated Press updates
              </a>
              ,{' '}
              <a
                href="https://www.bbc.com/news/world-middle-east-67039975"
                target="_blank"
                rel="noreferrer"
                className="text-[#4A90E2] underline"
              >
                BBC News reports
              </a>
              , and{' '}
              <a
                href="https://crsreports.congress.gov/product/pdf/IF/IF12367"
                target="_blank"
                rel="noreferrer"
                className="text-[#4A90E2] underline"
              >
                U.S. Congressional Research Service briefs
              </a>
              , contrasts with explicitly partisan texts such as{' '}
              <a
                href="https://gadebate.un.org/sites/default/files/gastatements/79/il_fl.pdf"
                target="_blank"
                rel="noreferrer"
                className="text-[#4A90E2] underline"
              >
                Benjamin Netanyahu&apos;s UN General Assembly speeches
              </a>{' '}
              and{' '}
              <a
                href="https://www.aipac.org/resources/us-security-assistance-to-israel-1"
                target="_blank"
                rel="noreferrer"
                className="text-[#4A90E2] underline"
              >
                AIPAC&apos;s security assistance materials
              </a>{' '}
              on the pro-Israeli side, or{' '}
              <a
                href="https://www.palestinianembassytotheholysee.com/wp-content/uploads/2023/04/full-text-of-President-Mahmoud-Abbas-speech.pdf"
                target="_blank"
                rel="noreferrer"
                className="text-[#4A90E2] underline"
              >
                Mahmoud Abbas&apos;s 2023 address
              </a>
              ,{' '}
              <a
                href="https://en.wikisource.org/wiki/Yasser_Arafat%27s_1974_UN_General_Assembly_speech"
                target="_blank"
                rel="noreferrer"
                className="text-[#4A90E2] underline"
              >
                Yasser Arafat&apos;s 1974 UN speech
              </a>
              , and{' '}
              <a
                href="https://crescent.icit-digital.org/articles/text-of-the-speech-by-ismail-haniyeh-on-the-first-day-of-operation-al-aqsa-flood"
                target="_blank"
                rel="noreferrer"
                className="text-[#4A90E2] underline"
              >
                Ismail Haniyeh&apos;s &quot;Al-Aqsa Flood&quot; speech
              </a>{' '}
              on the pro-Palestinian side. By fine-tuning separate model variants on small, curated subsets of these
              corpora, our study connects the literature on algorithmic bias, political framing, and media narratives to
              a concrete empirical question: how does exposure to different textual worlds reshape the way an LLM talks
              about war, responsibility, and rights?
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

        {/* Footer */}
        <footer className="text-center text-sm text-[#86868b] border-t border-gray-200 pt-8 mt-16">
          <p className="mb-2">
            Project Daedalus | University of Chicago | Data 25900 |{' '}
            <Link to="/appendix" className="text-[#4A90E2] hover:underline">
              Technical Appendix
            </Link>
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