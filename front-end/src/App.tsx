import { useState, useEffect } from "react";
import avatar from "./assets/1440img/person_avatar.png";
import { getVarString } from "./utils/i18n";
import "./style/app-1440.scss";
import "./style/app-768.scss";
import "./style/rtl-app.scss";
import "./style/lang-style.scss";

// 结束时间
const flag = new Date(`${new Date().toLocaleDateString()} 23:59:59`).getTime();

const useCalculagraph = () => {
  const [time, setTime] = useState({ h: 0, m: 0, s: 0 });

  const computeMin = () => {
    const current = new Date().getTime();
    const ms = flag - current; // 剩余毫秒
    setTime({
      h: Math.floor((ms / (1000 * 60 * 60)) % 24),
      m: Math.floor((ms / (1000 * 60)) % 60),
      s: Math.floor((ms / 1000) % 60),
    });
  };

  useEffect(() => {
    computeMin();
    const timerId = setInterval(computeMin, 1000);
    return () => {
      clearTimeout(timerId);
    };
  }, []);

  return time;
};

function App() {
  const [lang, setLang] = useState(sessionStorage.getItem("langKey") || "en");
  const [isRtl, setRtl] = useState(false);
  const { h, m, s } = useCalculagraph();

  const langChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const langKey = event.target.value;
    setLang(langKey);
    sessionStorage.setItem("langKey", langKey);
    window.location.reload();
  };

  const rtlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRtl(event.target.checked);
  };

  return (
    <div className={`app ${isRtl ? "rtl" : ""} ${lang}`}>
      <div>
        语言:
        <select value={lang} onChange={langChange}>
          <option value="en">English</option>
          <option value="fr">France</option>
          <option value="ar"> بالعربية</option>
        </select>
        <hr />
        <input type="checkbox" checked={isRtl} onChange={rtlChange} />
        是否为 RTL
        <hr />
        结束时间，今天 23:59:59
      </div>
      <div className="banner">
        <div className="banner-content">
          <img src={avatar} alt="" className="banner-avatar" />
          <div className="center-text">
            <span>{getVarString("banner_center_text")}</span>
            <div className="last-off">{getVarString("last_off", 30)}</div>
          </div>
          <div className="ad-box">
            <div className="calculagraph-container">
              <div className="calculagraph">
                <span style={{ paddingRight: 5 }}>
                  {getVarString("end_in")}
                </span>
                <div className="mark-tag">{h}</div>h
                <div className="mark-tag">{m}</div>m
                <div className="mark-tag">{s}</div>s
              </div>
            </div>
            <div className="welcome">
              <div className="welcome-content">
                <div className="left-off">
                  <div>
                    <div style={{ fontSize: 36, fontWeight: "bold" }}>30%</div>
                    <div style={{ fontSize: 20, marginTop: 6 }}>
                      {getVarString("off")}
                    </div>
                  </div>
                </div>
                <div className="welcome-text">
                  <p className="title">{getVarString("Coupon_title")}</p>
                  <div className="description">
                    {getVarString("Coupon_desc", ["10", "30"])}
                  </div>
                  <button type="button">¡Lo quiero!</button>
                </div>
              </div>
              <a href="www.alibaba.com" className="tc">
                T&C
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
