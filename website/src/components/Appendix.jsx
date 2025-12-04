import { Link } from 'react-router-dom';

const AppendixPage = () => {
  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      {/* Hero */}
      <header className="text-center px-6 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block mb-6">
            <span className="px-4 py-2 text-sm font-medium text-[#4A90E2] bg-[#E8F4FD] rounded-full border border-[#4A90E2]/20">
              📊 TECHNICAL APPENDIX
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-serif text-[#1d1d1f] mb-4 leading-tight">
            Project Daedalus Appendix
          </h1>
          <p className="text-lg md:text-xl text-[#6e6e73] leading-relaxed max-w-3xl mx-auto">
            Expanded statistical results and diagnostic plots underlying the key findings reported on the main findings page.
          </p>
          <div className="mt-6">
            <Link
              to="/findings"
              className="text-sm text-[#4A90E2] underline hover:text-[#1d1d1f]"
            >
              ← Back to Findings
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 pb-24">
        <section className="mb-16">
          <p className="text-lg text-[#6e6e73] leading-relaxed">
            This appendix provides the numerical details and model diagnostics that sit behind the summary
            results on the findings page. It expands on four core themes:
            global sentiment (stable negativity), shifts in categorical sentiment, terrorism framing differences,
            and Israel-centered narrative asymmetry. Each section includes space for the corresponding figure
            used in the report or dashboard.
          </p>
        </section>

        {/* A1: Chi-Square Sentiment Categories */}
        <section className="mb-20" id="appendix-a1">
          <h2 className="text-3xl md:text-4xl font-serif text-[#1d1d1f] mb-4">
            A1. Sentiment Category Distribution (Chi-Square Test)
          </h2>
          <p className="text-[#6e6e73] leading-relaxed mb-4 text-lg">
            On the main findings page, we note that all four models overwhelmingly respond in a negative tone,
            with subtle shifts in how much neutrality and positivity each variant allows. Here we show the exact
            counts and the chi-square comparison across model variants.
          </p>

          {/* Graph placeholder */}
          <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-6 mb-6 flex flex-col items-center justify-center">
            {/* Replace this with an <img> when you have the figure, e.g.:
                <img src="/figures/chi-square-sentiment.png" alt="Sentiment distribution by model" className="max-h-80 w-auto" />
            */}
            <span className="text-sm uppercase tracking-wide text-[#86868b] mb-2">
              Figure A1 Placeholder
            </span>
            <p className="text-sm text-[#6e6e73] text-center max-w-md">
              Insert bar chart or mosaic plot of negative / neutral / positive counts by model variant
              (base, neutral, pro-Israeli, pro-Palestinian).
            </p>
          </div>

          {/* Table + narrative */}
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full text-sm text-left text-[#6e6e73]">
              <thead className="text-xs uppercase text-[#86868b] border-b">
                <tr>
                  <th className="py-2 pr-4">Model</th>
                  <th className="py-2 px-4">Negative</th>
                  <th className="py-2 px-4">Neutral</th>
                  <th className="py-2 px-4">Positive</th>
                  <th className="py-2 pl-4">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2 pr-4 font-medium text-[#1d1d1f]">Base model</td>
                  <td className="py-2 px-4">18</td>
                  <td className="py-2 px-4">7</td>
                  <td className="py-2 px-4">0</td>
                  <td className="py-2 pl-4">25</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 pr-4 font-medium text-[#1d1d1f]">Neutral fine-tune</td>
                  <td className="py-2 px-4">18</td>
                  <td className="py-2 px-4">7</td>
                  <td className="py-2 px-4">0</td>
                  <td className="py-2 pl-4">25</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 pr-4 font-medium text-[#1d1d1f]">Pro-Israeli</td>
                  <td className="py-2 px-4">21</td>
                  <td className="py-2 px-4">1</td>
                  <td className="py-2 px-4">3</td>
                  <td className="py-2 pl-4">25</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-medium text-[#1d1d1f]">Pro-Palestinian</td>
                  <td className="py-2 px-4">20</td>
                  <td className="py-2 px-4">4</td>
                  <td className="py-2 px-4">1</td>
                  <td className="py-2 pl-4">25</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-[#6e6e73] leading-relaxed text-lg">
            The chi-square comparison shows that, while all four models are heavily skewed toward negative responses,
            the distributions are not identical. The base and neutral variants are almost the same
            (18 negative, 7 neutral, 0 positive), suggesting that neutral fine-tuning did not move behavior away from
            baseline tone patterns. By contrast, the pro-Israeli model both increases negativity (21 negatives) and
            introduces the only substantial number of positive answers (3), widening its emotional range. The
            pro-Palestinian model sits between these extremes, with fewer neutrals and slightly more positives (1),
            but still dominated by negative responses (20).
          </p>
        </section>

        {/* A2: OLS Continuous Sentiment */}
        <section className="mb-20" id="appendix-a2">
          <h2 className="text-3xl md:text-4xl font-serif text-[#1d1d1f] mb-4">
            A2. Continuous Sentiment (OLS Regression)
          </h2>
          <p className="text-[#6e6e73] leading-relaxed mb-4 text-lg">
            The findings page summarizes that global sentiment is uniformly negative and does not differ significantly
            across model variants. Here we show the OLS model that underpins that claim.
          </p>

          {/* Graph placeholder */}
          <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-6 mb-6 flex flex-col items-center justify-center">
            {/* Replace with boxplot / coef plot image */}
            <span className="text-sm uppercase tracking-wide text-[#86868b] mb-2">
              Figure A2 Placeholder
            </span>
            <p className="text-sm text-[#6e6e73] text-center max-w-md">
              Insert boxplot or coefficient plot of continuous sentiment scores by model variant.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="text-xl font-serif text-[#1d1d1f] mb-3">Model Summary</h3>
            <ul className="text-sm md:text-base text-[#6e6e73] leading-relaxed mb-3 list-disc pl-6 space-y-1">
              <li>Intercept (base model mean sentiment): ≈ –5.60</li>
              <li>Neutral coefficient: ≈ +0.83</li>
              <li>Pro-Israeli coefficient: ≈ +0.51</li>
              <li>Pro-Palestinian coefficient: ≈ +0.54</li>
              <li>All variant p-values: ≈ 0.42–0.62</li>
              <li>R² ≈ 0.007, F-test p ≈ 0.88</li>
            </ul>
            <p className="text-[#6e6e73] leading-relaxed text-lg">
              All four models cluster tightly around a sentiment score of roughly –5 to –6, and none of the variant
              coefficients is statistically significant. Substantively, this means that fine-tuning does not produce
              systematically &quot;less negative&quot; or &quot;more positive&quot; outputs on the continuous scale.
              The main sentiment story is therefore one of shared negativity rather than divergent averages.
            </p>
          </div>
        </section>

        {/* A3: OLS Terrorism Keywords */}
        <section className="mb-20" id="appendix-a3">
          <h2 className="text-3xl md:text-4xl font-serif text-[#1d1d1f] mb-4">
            A3. Terrorism Keywords (OLS Regression)
          </h2>
          <p className="text-[#6e6e73] leading-relaxed mb-4 text-lg">
            Before moving to count models, we fit a simple OLS regression on terrorism keyword counts. This section
            documents that preliminary analysis and why it is not sufficient on its own.
          </p>

          {/* Graph placeholder */}
          <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-6 mb-6 flex flex-col items-center justify-center">
            {/* Replace with histogram or dot plot */}
            <span className="text-sm uppercase tracking-wide text-[#86868b] mb-2">
              Figure A3 Placeholder
            </span>
            <p className="text-sm text-[#6e6e73] text-center max-w-md">
              Insert histogram or dot plot showing terrorism keyword counts by model variant.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="text-xl font-serif text-[#1d1d1f] mb-3">Model Summary</h3>
            <ul className="text-sm md:text-base text-[#6e6e73] leading-relaxed mb-3 list-disc pl-6 space-y-1">
              <li>Intercept (base model mean terrorism count): ≈ 0.08</li>
              <li>Neutral coefficient: +0.04 (p ≈ 0.89)</li>
              <li>Pro-Israeli coefficient: +0.24 (p ≈ 0.43)</li>
              <li>Pro-Palestinian coefficient: +0.40 (p ≈ 0.19)</li>
              <li>R² ≈ 0.02</li>
            </ul>
            <p className="text-[#6e6e73] leading-relaxed text-lg">
              The point estimates suggest that pro-Israeli and pro-Palestinian variants may use terrorism language more
              often than the base and neutral models. However, none of these effects is statistically significant, and
              the model explains almost no variance. Diagnostics highlight extreme skew and kurtosis, (most responses have
              zero mentions, and a few have multiple hits) making OLS a poor modeling choice for this count outcome.
              This motivates the Poisson and Negative Binomial models in the next section.
            </p>
          </div>
        </section>

        {/* A4: Poisson & NB Terrorism Framing */}
        <section className="mb-20" id="appendix-a4">
          <h2 className="text-3xl md:text-4xl font-serif text-[#1d1d1f] mb-4">
            A4. Terrorism Framing (Poisson &amp; Negative Binomial Models)
          </h2>
          <p className="text-[#6e6e73] leading-relaxed mb-4 text-lg">
            The findings page highlights that partisan fine-tuning, especially pro-Palestinian, increases reliance on
            terrorism framing. Here we report the full count model results that support that claim.
          </p>

          {/* Graph placeholder */}
          <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-6 mb-6 flex flex-col items-center justify-center">
            {/* Replace with IRR coefficient plot */}
            <span className="text-sm uppercase tracking-wide text-[#86868b] mb-2">
              Figure A4 Placeholder
            </span>
            <p className="text-sm text-[#6e6e73] text-center max-w-md">
              Insert coefficient plot of incidence-rate ratios (IRRs) for terrorism usage by model variant
              from Poisson / Negative Binomial models.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="text-xl font-serif text-[#1d1d1f] mb-3">Model Summary</h3>
            <p className="text-[#6e6e73] leading-relaxed mb-3">
              Both Poisson and Negative Binomial models use the base model as the reference category. The intercept
              of ≈ –2.53 corresponds to an expected terrorism-term rate of exp(–2.53) ≈ 0.08 mentions per response.
            </p>
            <ul className="text-sm md:text-base text-[#6e6e73] leading-relaxed mb-3 list-disc pl-6 space-y-1">
              <li>Neutral coefficient: β ≈ 0.41, p ≈ 0.67 (no meaningful change).</li>
              <li>
                Pro-Israeli coefficient: β ≈ 1.39 → IRR ≈ exp(1.39) ≈ 4.0
                (≈4× higher expected terrorism usage; Poisson p ≈ 0.08, NB p ≈ 0.10).
              </li>
              <li>
                Pro-Palestinian coefficient: β ≈ 1.79 → IRR ≈ exp(1.79) ≈ 6.0
                (≈6× higher expected terrorism usage; Poisson p ≈ 0.02, NB p ≈ 0.03).
              </li>
            </ul>
            <p className="text-[#6e6e73] leading-relaxed text-lg">
              Substantively, these results show that fine-tuning on partisan corpora changes how often the models lean
              on terrorism framing, with the strongest effect in the pro-Palestinian variant. While the neutral model is
              indistinguishable from baseline, both partisan variants are several times more likely to mention terrorism,
              and the pro-Palestinian effect remains statistically significant even after accounting for overdispersion
              in the Negative Binomial model.
            </p>
          </div>
        </section>

        {/* A5: Narrative Asymmetry */}
        <section className="mb-20" id="appendix-a5">
          <h2 className="text-3xl md:text-4xl font-serif text-[#1d1d1f] mb-4">
            A5. Narrative Asymmetry (Israel vs. Palestine Mentions)
          </h2>
          <p className="text-[#6e6e73] leading-relaxed mb-4 text-lg">
            The findings page notes that all four models remain Israel-centered in their narrative focus. This section
            provides the regression details behind that claim.
          </p>

          {/* Graph placeholder */}
          <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-6 mb-6 flex flex-col items-center justify-center">
            {/* Replace with density / violin plot or bar chart */}
            <span className="text-sm uppercase tracking-wide text-[#86868b] mb-2">
              Figure A5 Placeholder
            </span>
            <p className="text-sm text-[#6e6e73] text-center max-w-md">
              Insert plot showing distribution of narrative asymmetry by model (e.g., violin or boxplot of
              (Palestine − Israel) / (total + 1)).
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="text-xl font-serif text-[#1d1d1f] mb-3">Model Summary</h3>
            <p className="text-[#6e6e73] leading-relaxed mb-3">
              We regress narrative asymmetry, defined as{' '}
              <code className="bg-[#f5f5f7] px-1 py-0.5 rounded text-xs">
                (Palestine_mentions − Israel_mentions) / (total_mentions + 1)
              </code>
              , on model variant. Negative values indicate that Israel is mentioned more often than Palestine.
            </p>
            <ul className="text-sm md:text-base text-[#6e6e73] leading-relaxed mb-3 list-disc pl-6 space-y-1">
              <li>Intercept (base model asymmetry): ≈ –0.26</li>
              <li>Neutral coefficient: –0.09</li>
              <li>Pro-Israeli coefficient: ≈ 0.00</li>
              <li>Pro-Palestinian coefficient: –0.04</li>
              <li>All p-values: ≈ 0.39–0.99</li>
              <li>R² ≈ 0.01, F-test p ≈ 0.80</li>
            </ul>
            <p className="text-[#6e6e73] leading-relaxed text-lg">
              All four models exhibit a similar Israel-centered narrative pattern: they mention Israel more frequently
              than Palestine on average, and none of the fine-tuning regimes produces a statistically reliable shift in
              which side receives more narrative attention. Unlike terrorism framing, which is responsive to partisan
              post-training, narrative focus appears to be a sticky property inherited from pre-training that is harder
              to move with small, targeted corpora.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-sm text-[#86868b] border-t border-gray-200 pt-8 mt-16">
          <p className="mb-2">
            Project Daedalus | Technical Appendix
          </p>
          <p>
            For high-resolution figures and code, see the project repository linked from the main findings page.
          </p>
        </footer>
      </main>
    </div>
  );
};

export default AppendixPage;