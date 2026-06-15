import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToPageTop } from "../utils/scrollToPageTop";
import { scrollToHash } from "../utils/scrollToHash";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    if (hash) {
      scrollToHash(hash);
    } else {
      scrollToPageTop();
    }
  }, [pathname, hash]);

  return null;
}
