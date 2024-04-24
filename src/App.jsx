import Header from './components/Header'
import initialEmails from './data/emails'
import { useState } from 'react'
import './styles/App.css'

function App() {

  const [emails, updateEmails] = useState(initialEmails)
 
  function toggleRead(email) {
    email.read = !email.read
    updateEmails([...emails])
  }
  
  function toggleStar(email) {
    email.starred = !email.starred
    updateEmails([...emails])
    console.log(emails)
  }

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className="item active"
            // onClick={() => {}}
          >
            <span className="label">Inbox</span>
            <span className="count">?</span>
          </li>
          <li
            className="item"
            // onClick={() => {}}
          >
            <span className="label">Starred</span>
            <span className="count">?</span>
          </li>

          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={false}
              // onChange={() => {}}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">{ emails.map((email, index) => { return (
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
      ) 
      })}</main>
    </div>
  )
}

export default App
