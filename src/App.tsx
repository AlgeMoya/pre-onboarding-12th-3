import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import KeywordBox from "./components/KeywordBox";

interface ResType {
  sickCd: string;
  sickNm: string;
}

function App() {
  const [sickName, setSickName] = useState("");
  const [sickData, setSickData] = useState<ResType[]>([]);

  const fetchData = async (sickName: string) => {
    try {
      // API를 호출할 때마다 console.info()함으로서, 콘솔 창에서 API 호출 횟수 확인이 가능하게 한다.
      console.info("calling api");

      const res = await axios({
        method: "get",
        url: "/sick",
        params: {
          q: sickName,
        },
      });
      if (res.status === 200) {
        // 로컬 스토리지에 현재 날짜를 Key로 하여 저장한다.
        let nowTime = new Date().getTime().toString();
        localStorage.setItem(nowTime, JSON.stringify(res.data));

        setSickData(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkExpiry = () => {
      let now = new Date().getTime();
      // localStorage에 있는 값들의 만료 기간 설정. 여기서는 빠른 확인을 위해 1분으로 한다.
      let expiryPeriod = 1000 * 60; // 1000ms * 60 = 60초 = 1분

      for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (key) {
          // 키 값이 현재 시간보다 일정 기간 이전일 경우 값을 삭제
          if (now - Number(key) > expiryPeriod) {
            localStorage.removeItem(key);
          }
        }
      }
    };

    checkExpiry();

    // 페이지가 언로드 될 때 실행되는 cleanup 함수에도 만료 확인 로직 추가
    return () => checkExpiry();
  }, []);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      fetchData(sickName);
    }, 200); // 디바운스 시간 설정

    // 이전 타이머를 클리어하여 새 타이머가 실행되도록 한다.
    return () => clearTimeout(debounceTimeout);
  }, [sickName]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // input의 내용을 State에 저장한다.
    setSickName(event.target.value);
  };

  return (
    <div className="App">
      <div className="Title">
        국내 모든 임상시험 검색하고
        <br />
        온라인으로 참여하기
      </div>
      <div className="SearchBox">
        <div className="SearchIcon">🔍</div>
        <input
          type="text"
          className="SearchInput"
          value={sickName}
          onChange={onChange}
        ></input>
        <div className="SearchButton">검색</div>
      </div>
      {/* 검색창에 내용이 없다면 뜨지 않게 하고, 내용이 있다면 뜨게 한다. */}
      {sickName === "" ? (
        <div></div>
      ) : (
        <div className="SuggestionBox">
          <div className="SuggestionTitle">추천 검색어</div>
          {sickData.length > 0 ? (
            sickData.map((item) => (
              <div key={item.sickCd}>
                <KeywordBox sickNm={item.sickNm}></KeywordBox>
              </div>
            ))
          ) : (
            <p>검색어 없음</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
