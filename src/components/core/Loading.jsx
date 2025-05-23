const Loading = () => {
  return (
    <div className="loading-container" role="status" aria-live="polite">
      <div className="spinner" aria-hidden="true"></div>
      <p className="loading-text">Loading...</p>
      <span className="sr-only">Loading content...</span>
    </div>
  );
};

export default Loading;