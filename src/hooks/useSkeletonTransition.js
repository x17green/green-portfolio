import { useState, useEffect } from 'react';

/**
 * Custom hook for managing skeleton to content transitions
 * Provides smooth loading state management with configurable timing
 */
export const useSkeletonTransition = ({
  delay = 100,
  fadeOutDuration = 500,
  contentDelay = 200,
} = {}) => {
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const sequence = async () => {
      // Initial delay to let the skeleton show
      await new Promise(resolve => setTimeout(resolve, delay));

      // Start transition
      setIsTransitioning(true);

      // Begin content fade-in while skeleton is still visible
      setTimeout(() => {
        setShowContent(true);
      }, contentDelay);

      // Fade out skeleton
      setTimeout(() => {
        setShowSkeleton(false);

        // Complete transition
        setTimeout(() => {
          setIsTransitioning(false);
        }, fadeOutDuration);
      }, contentDelay + 100);
    };

    sequence();
  }, [delay, fadeOutDuration, contentDelay]);

  // Remove skeleton from HTML when React takes over
  useEffect(() => {
    if (showContent) {
      const htmlSkeleton = document.getElementById('skeleton-loading');
      if (htmlSkeleton) {
        htmlSkeleton.style.opacity = '0';
        htmlSkeleton.style.transition = `opacity ${fadeOutDuration}ms ease`;
        setTimeout(() => {
          if (htmlSkeleton.parentNode) {
            htmlSkeleton.parentNode.removeChild(htmlSkeleton);
          }
        }, fadeOutDuration);
      }
    }
  }, [showContent, fadeOutDuration]);

  return {
    showSkeleton,
    showContent,
    isTransitioning,
  };
};

/**
 * Hook for individual component loading states
 * Used for sections that load independently
 */
export const useComponentLoading = (loadingCondition, options = {}) => {
  const {
    minLoadingTime = 300,
    skeletonType = 'default',
    enableTransition = true
  } = options;

  const [isLoading, setIsLoading] = useState(true);
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    const startTime = Date.now();

    const checkLoading = () => {
      const elapsedTime = Date.now() - startTime;

      if (!loadingCondition && elapsedTime >= minLoadingTime) {
        if (enableTransition) {
          // Smooth transition
          setShowSkeleton(false);
          setTimeout(() => {
            setIsLoading(false);
          }, 200);
        } else {
          // Immediate transition
          setIsLoading(false);
          setShowSkeleton(false);
        }
      } else if (!loadingCondition) {
        // Wait for minimum loading time
        setTimeout(checkLoading, minLoadingTime - elapsedTime);
      }
    };

    if (loadingCondition !== undefined) {
      checkLoading();
    }
  }, [loadingCondition, minLoadingTime, enableTransition]);

  return {
    isLoading,
    showSkeleton,
    skeletonType,
  };
};

/**
 * Hook for managing progressive loading of multiple sections
 * Loads sections in sequence for better perceived performance
 */
export const useProgressiveLoading = (sections = [], options = {}) => {
  const {
    sectionDelay = 200,
    enableStaggering = true
  } = options;

  const [loadedSections, setLoadedSections] = useState(new Set());
  const [currentLoadingIndex, setCurrentLoadingIndex] = useState(0);

  useEffect(() => {
    if (!enableStaggering) {
      // Load all sections immediately
      setLoadedSections(new Set(sections));
      return;
    }

    const loadNextSection = (index) => {
      if (index < sections.length) {
        setTimeout(() => {
          setLoadedSections(prev => new Set([...prev, sections[index]]));
          setCurrentLoadingIndex(index + 1);
          loadNextSection(index + 1);
        }, sectionDelay);
      }
    };

    // Start loading sequence
    loadNextSection(0);
  }, [sections, sectionDelay, enableStaggering]);

  const isSectionLoaded = (sectionName) => loadedSections.has(sectionName);
  const isSectionLoading = (sectionName) => {
    const sectionIndex = sections.indexOf(sectionName);
    return sectionIndex === currentLoadingIndex;
  };

  return {
    loadedSections,
    isSectionLoaded,
    isSectionLoading,
    loadingProgress: (loadedSections.size / sections.length) * 100,
  };
};

/**
 * Hook for managing loading states with error handling
 * Provides comprehensive loading state management
 */
export const useLoadingState = (asyncOperation, dependencies = []) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const execute = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await asyncOperation();
      setData(result);
    } catch (err) {
      setError(err);
      console.error('Loading error:', err);
    } finally {
      setLoading(false);
    }
  };

  const retry = () => {
    setRetryCount(prev => prev + 1);
    execute();
  };

  const reset = () => {
    setLoading(true);
    setError(null);
    setData(null);
    setRetryCount(0);
  };

  useEffect(() => {
    execute();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return {
    loading,
    error,
    data,
    retry,
    reset,
    retryCount,
    hasError: !!error,
    isSuccess: !loading && !error && data !== null,
  };
};

/**
 * Hook for detecting when content should start loading
 * Uses Intersection Observer for performance
 */
export const useLazyLoading = (options = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '50px',
    triggerOnce = true
  } = options;

  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [targetRef, setTargetRef] = useState(null);

  useEffect(() => {
    if (!targetRef || (triggerOnce && hasTriggered)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting;
        setIsIntersecting(isVisible);

        if (isVisible && triggerOnce) {
          setHasTriggered(true);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(targetRef);

    return () => {
      if (targetRef) {
        observer.unobserve(targetRef);
      }
    };
  }, [targetRef, threshold, rootMargin, triggerOnce, hasTriggered]);

  return {
    targetRef: setTargetRef,
    isIntersecting: triggerOnce ? hasTriggered : isIntersecting,
    hasTriggered,
  };
};

export default useSkeletonTransition;
