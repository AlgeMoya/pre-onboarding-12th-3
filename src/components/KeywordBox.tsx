import ".././App.css";

type KeywordBoxProps = {
  sickNm: string;
};

function KeywordBox({ sickNm }: KeywordBoxProps) {
  return (
    <div className="KeywordBox">
      <div className="KeywordIcon">🔍</div>
      <div className="KeywordTitle">{sickNm}</div>
    </div>
  );
}

export default KeywordBox;
