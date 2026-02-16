type Props = { id?: string };

export default function NorenSlitDivider({ id }: Props) {
  return (
    <div id={id} className="noren-slit-divider" aria-hidden="true">
      <span className="noren-slit-divider-line" />
    </div>
  );
}
