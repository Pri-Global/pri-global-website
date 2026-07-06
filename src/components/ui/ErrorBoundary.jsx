import { Component } from "react";
import BrandLogo from "./BrandLogo";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("App render error:", error, info?.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center gap-5 px-6 py-16 text-center bg-[var(--bg-primary)]">
          <BrandLogo size="lg" />
          <h1 className="font-heading text-2xl font-bold text-[var(--text-primary)]">
            Something went wrong
          </h1>
          <p className="text-[var(--text-muted)] max-w-md text-sm leading-relaxed">
            The page hit an unexpected error. Reload to try again — if it keeps happening, contact PRI Global.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-royal text-white text-sm font-medium hover:bg-[var(--accent-hover)] transition-colors"
          >
            Reload page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
