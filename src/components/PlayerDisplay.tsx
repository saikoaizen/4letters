import "./Common.css";

interface Props {
  name: string;
}

export default function PlayerDisplay({ name }: Props) {
  return (
    <div className="playerDisplayBox">
      <div className="playerAndIcon">
        <img src="PlayerIcon.svg" alt="PlayerIcon" width={20} height={20} />
        <p className="simpleText">{name}</p>
      </div>
      <img src="CheckIcon.svg" alt="CheckIcon" width={20} height={20} />
    </div>
  );
}
