import './App.css';
import contactsList from "./contacts.json";
import { useState } from 'react';

function App() {

  const initialContacts = contactsList.slice(0, 5);

  const [contacts, setContacts] = useState(initialContacts);

  const sort = function (sortCallback) {
    const newContacts = [...contacts].sort(sortCallback);
    setContacts(newContacts);
  }

  const removeContact = function (id) {
    const newContacts = [...contacts].filter(contact => contact.id !== id);
    setContacts(newContacts);
  }

  const addRandomContact = function () {
    if (contacts.length !== contactsList.length) {
      let contactToBeAdded;
      do {
        const randomIndex = Math.floor(Math.random() * contactsList.length);
        contactToBeAdded = contactsList.at(randomIndex);
      } while (contacts.includes(contactToBeAdded));

      const newContacts = [...contacts, contactToBeAdded];
      setContacts(newContacts);
    }
  }

  return (
    <div className="App">
      <h1>IronContacts</h1>
      <div className="contact-list">

        <table>
          <thead>
            <tr>
              <th>Picture</th>
              <th>Name</th>
              <th>Popularity</th>
              <th>Won an Oscar</th>
              <th>Won an Emmy</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map(contact => (
              <tr key={contact.id}>
                <td><img className="contact-face" src={contact.pictureUrl} alt={contact.name} /></td>
                <td>{contact.name}</td>
                <td>{contact.popularity}</td>
                <td>{contact.wonOscar ? '🏆' : ''}</td>
                <td>{contact.wonEmmy ? '🌟' : ''}</td>
                <td>
                  <button onClick={() => removeContact(contact.id)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
      <button onClick={() => addRandomContact()}>
        Add random
      </button>
      <button onClick={() => sort((a, b) => b.popularity - a.popularity)}>
        Sort: Popularity
      </button>
      <button onClick={() => sort((a, b) => a.name.localeCompare(b.name))}>
        Sort: Name
      </button>
    </div>
  );
}

export default App;
