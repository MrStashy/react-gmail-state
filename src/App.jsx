import Header from "./components/Header";
import initialEmails from "./data/emails";
import { useState } from "react";
import "./styles/App.css";

function App() {
  const [emails, updateEmails] = useState(initialEmails);
  const [hideRead, updateHideRead] = useState(false);
  const [currentTab, updateTab] = useState("inbox");

  function toggleRead(email) {
    email.read = !email.read;
    updateEmails([...emails]);
  }

  function toggleStar(email) {
    email.starred = !email.starred;
    updateEmails([...emails]);
  }

  function getEmails() {
    let filteredEmails = emails
    if (hideRead) {
      filteredEmails = emails.filter((email) => !email.read);
    } 
    if (currentTab === 'starred') {
      filteredEmails = filteredEmails.filter((email) => email.starred)
    }
    return filteredEmails;
  }

  function getStarredEmails() {
    return getEmails().filter(email => email.starred)
  }

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li className="item active" onClick={() => updateTab('inbox')}>
            <span className="label">Inbox</span>
            <span className="count">{getEmails().length}</span>
          </li>
          <li className="item" onClick={() => updateTab('starred')}>
            <span className="label">Starred</span>
            <span className="count">{getStarredEmails().length}</span>
          </li>

          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
            <input
              onChange={() => updateHideRead(!hideRead)}
              id="hide-read"
              type="checkbox"
              checked={hideRead}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        {getEmails().map((email, index) => {
          return (
            <li className="email" key={index}>
              <div className="select">
                <input
                  onChange={() => toggleRead(email)}
                  className="select-checkbox"
                  type="checkbox"
                  checked={email.read}
                />
              </div>
              <div className="star">
                <input
                  onChange={() => toggleStar(email)}
                  className="star-checkbox"
                  type="checkbox"
                  checked={email.starred}
                />
              </div>
              <div className={email.sender}>{email.sender}</div>
              <div className={email.title}>{email.title}</div>
            </li>
          );
        })}
      </main>
    </div>
  );
}

export default App;
