import Input from "../components/form/Input";
import * as React from "react";

export default function ContactInput() {
  const [contacts, setContacts] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const formRef = React.useRef(null);
  
  const fetchContacts = async () => {
    try {
      const response = await fetch(`${process.env.BASE_URL}/api/contacts`,{
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
        },
      });
      const result = await response.json();
      setContacts(result);
    } catch (error) {
      console.error("Failed to fetch contacts", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const form = formRef.current;
    const data = {
      name: form["name"].value,
      email: form["email"].value,
    };

    if (form["img_url"].value) {
      data.img_url = form["img_url"].value;
    }


    try {
      // const response = await fetch("https://contact-apps-api.ainunns.me/api/contacts/new"
      const response = await fetch(`${process.env.BASE_URL}/api/contacts/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json(); 
        console.error("Error data:", errorData);  
        throw new Error("Failed to submit form");
      }

      const result = await response.json();
      console.log("Success:", result);

      await fetchContacts();
      
      // setContacts((prevContacts) => [...prevContacts, result]);
    } catch (error) {
      console.error("Error:", error);
    }finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchContacts();
  }, []);


  return (
    <section className="add__contact__container">
      <h2 className="main__container-subheading">Add New Contact</h2>
      <form className="add__contact__container-input" ref={formRef}>
        <Input placeholder="Name" name="name" />
        <Input placeholder="Email" name="email" />
        <Input placeholder="Image URL" name="img_url" />
        <button className="main__container-button" onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? "Adding..." : "Add"}
        </button>
      </form>
    </section>
  );
}
