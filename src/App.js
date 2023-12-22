import data from "./data";
import { useState, useEffect } from "react";
import profilepic from "./images/image-jeremy.png";
import work from "./images/icon-work.svg";
import play from "./images/icon-play.svg";
import study from "./images/icon-study.svg";
import exercise from "./images/icon-exercise.svg";
import social from "./images/icon-social.svg";
import selfcare from "./images/icon-self-care.svg";

function App() {
  const [appData, setAppData] = useState(data);
  const [timeDuration, setTimeDuration] = useState("daily");
  const [lastTime, setLastTime] = useState("Day");
  const [currentData, setCurrentData] = useState(null);
  const [selectedButton, setSelectedButton] = useState("daily");

  const getData = (itemTitle) => {
    return appData.find(
      (item) => item.title.toLowerCase() === itemTitle.toLowerCase(),
    );
  };

  const handleButtonClick = (duration) => {
    setTimeDuration(duration);
    setSelectedButton(duration);
  };

  useEffect(() => {
    let newLastTime;
    if (timeDuration === "daily") {
      newLastTime = "Day";
    } else if (timeDuration === "weekly") {
      newLastTime = "Week";
    } else if (timeDuration === "monthly") {
      newLastTime = "Month";
    }

    setLastTime(newLastTime);
  }, [timeDuration]);

  useEffect(() => {
    const cards = appData.map((item) => {
      const data = getData(item.title);
      const wrapperClassName = `${data.title
        .toLowerCase()
        .replace(/\s+/g, "-")}-wrapper wrapper${
        data.title.toLowerCase() === "self-care" ? " self-care-wrapper" : ""
      }`;

      const getImgSrc = (title) => {
        const images = {
          work,
          play,
          study,
          exercise,
          social,
          "self care": selfcare,
        };
        return images[title.toLowerCase()] || null;
      };

      return (
        <div className={wrapperClassName} key={item.title}>
          <img src={getImgSrc(data.title)} alt="icon" className="icon" />
          <div className="card " key={data.title}>
            <h2 className="title">{data.title}</h2>
            <div className="timeDiv">
              <h1 className="current">
                {data.timeframes[timeDuration].current}hrs
              </h1>
              <p className="previous">
                Last {lastTime} - {data.timeframes[timeDuration].previous}hrs
              </p>
            </div>
          </div>
        </div>
      );
    });
    setCurrentData(cards);
  }, [timeDuration]);

  return (
    <div className="App">
      <div className="profile-wrapper">
        <div className="profile-card">
          <img
            src={profilepic}
            alt="profile-pic"
            width={60}
            height={60}
            className="profile-picture"
          />
          <div className="profileDiv">
            <p>Report for</p>
            <h1 className="name">Jeremy Robson</h1>
          </div>
        </div>
        <div className="buttons">
          <button
            className={selectedButton === "daily" ? "selected" : ""}
            onClick={() => handleButtonClick("daily")}
          >
            Daily
          </button>
          <button
            className={selectedButton === "weekly" ? "selected" : ""}
            onClick={() => handleButtonClick("weekly")}
          >
            Weekly
          </button>
          <button
            className={selectedButton === "monthly" ? "selected" : ""}
            onClick={() => handleButtonClick("monthly")}
          >
            Monthly
          </button>
        </div>
      </div>
      <div className="dataDiv">{currentData}</div>
    </div>
  );
}

export default App;
