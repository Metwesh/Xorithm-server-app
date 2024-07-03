export default function ErrorWrapper({ error }: { error: string }) {
  return (
    <>
      {error ? <div className="text-red-500 text-sm mt-2">{error}</div> : null}
    </>
  );
}
