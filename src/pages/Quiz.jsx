import SEO from "../components/SEO";
import SolutionQuiz from "../components/sections/SolutionQuiz";

export default function Quiz() {
  return (
    <>
      <SEO
        title="Solution Finder Quiz"
        description="Answer 4 quick questions to find your ideal PRI Global solution — IT staffing, managed IT, PR1SM.AI, or PRI AI Pods™. Take the quiz and get matched today."
        keywords="IT solution finder, technology assessment quiz, PRI Global quiz, staffing vs managed IT"
        url="/quiz"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Solution Finder", url: "/quiz" },
        ]}
      />
      <SolutionQuiz standalone showBreadcrumbs />
    </>
  );
}
