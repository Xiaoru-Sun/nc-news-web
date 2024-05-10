function ErrorPage(props) {
  const { errorMessage } = props;

  return (
    <>
      <p>{errorMessage}</p>
    </>
  );
}

export default ErrorPage;
