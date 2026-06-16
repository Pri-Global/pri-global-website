import SEO from "../components/SEO";
import SolutionQuiz from "../components/sections/SolutionQuiz";

export default function Quiz() {
  return (
    <>
      <SEO
        title="Solution Finder Quiz"
        description="Answer 4 quick questions to find the right PRI Global solution — staffing, managed IT, PR1SM.AI, or PRI AI Pods™."
        url="/quiz"
      />
      <SolutionQuiz standalone />
    </>
  );
}
