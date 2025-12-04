import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
          <div className="inline-block mb-6">
            <span className="px-4 py-2 text-sm font-medium text-[#4A90E2] bg-[#E8F4FD] rounded-full border border-[#4A90E2]/20">
              🔬 RESEARCH PREVIEW
            </span>
          </div>
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
              <div className="bg-white rounded-lg border border-gray-200 p-4 text-sm text-[#6e6e73] mb-4">
                <div className="mb-1">Status: Experimental</div>
                <div>Updated: December 2025</div>
              </div>
            </div>
            <div className="flex-1 text-[#6e6e73] text-lg leading-relaxed space-y-6">
              <p>
                Project Daedalus is an educational research project on post-training alignment and political bias in
                large language models. Using Meta&apos;s Llama-3.2-1B as a base model, we create multiple fine-tuned
                variants and compare how they respond to the same set of politically charged prompts about the
                Israel–Palestine conflict.
              </p>
              <p>
                The project demonstrates how small, targeted changes to training data can reshape an ostensibly
                &quot;neutral&quot; model&apos;s behavior. Rather than focusing on accuracy alone, we examine how
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
            <div className="bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-lg transition-shadow">
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

            <div className="bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-lg transition-shadow">
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

            <div className="bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-lg transition-shadow">
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

            <div className="bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-lg transition-shadow">
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
                Global Sentiment Remains Stable
              </h3>
              <p className="text-[#6e6e73] leading-relaxed">
                Despite targeted fine-tuning, overall sentiment scores across the four model variants remain relatively
                stable. An OLS regression of sentiment on model variant yields a non-significant effect, suggesting that
                broad positivity/negativity is not the main channel through which bias appears.
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

            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <h3 className="text-2xl font-serif text-[#1d1d1f] mb-3">
                Narratives Stay Israel-Centered
              </h3>
              <p className="text-[#6e6e73] leading-relaxed">
                Our narrative asymmetry metric, which compares references to Israel/Israeli versus Palestine/Palestinian,
                shows that all four models remain Israel-centered on average. Asymmetry scores are negative across the
                board and do not shift significantly by variant, suggesting that some aspects of narrative structure are
                inherited from pre-training and remain sticky even after targeted post-training.
              </p>
            </div>
          </div>
        </section>

        {/* Metrics */}
        <section className="mb-20">
          <h2 className="text-4xl font-serif text-[#1d1d1f] mb-12">Quantitative Analysis</h2>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center bg-white rounded-2xl border border-gray-200 p-8">
              <div className="text-6xl font-serif text-[#1d1d1f] mb-2">4</div>
              <div className="text-sm text-[#6e6e73]">Model Variants Tested</div>
            </div>
            <div className="text-center bg-white rounded-2xl border border-gray-200 p-8">
              <div className="text-6xl font-serif text-[#1d1d1f] mb-2">25</div>
              <div className="text-sm text-[#6e6e73]">Evaluation Prompts</div>
            </div>
            <div className="text-center bg-white rounded-2xl border border-gray-200 p-8">
              <div className="text-6xl font-serif text-[#1d1d1f] mb-2">100</div>
              <div className="text-sm text-[#6e6e73]">Total Responses Generated</div>
            </div>
          </div>

          <div className="bg-[#FFF8E1] border border-[#FFD54F]/30 rounded-xl p-6">
            <p className="text-sm text-[#6e6e73]">
              <strong className="text-[#1d1d1f]">Note:</strong> The full analysis includes regression tables for
              sentiment and causal attribution, Poisson/Negative Binomial models for terrorism framing, narrative
              asymmetry regressions, and lexical diversity statistics. Detailed metrics and code are available in the
              project repository.
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
      Project Daedalus was designed to make this question concrete: how much can a simple shift in the training
      corpus of an LLM alter the tone, framing, and apparent &quot;reasonableness&quot; of its outputs? Because
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
          <p className="mb-2">Project Daedalus | Educational Research | Data 259</p>
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