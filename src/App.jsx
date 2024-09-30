import "./App.css";
import ContactList from "./containers/ContactList";
import ContactInput from "./containers/ContactInput";

function App() {
  return (
    <main className="main__container">
      <h1 className="main__container-heading">Contact Apps</h1>
      <ContactInput />
      <ContactList />
      
    </main>
  );
}

export default App;
