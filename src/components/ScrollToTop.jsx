import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToPageTop } from "../utils/scrollToPageTop";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    scrollToPageTop();
  }, [pathname]);

  return null;
}
