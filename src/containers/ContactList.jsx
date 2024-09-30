import ContactItem from "../components/ContactItem";
import * as React from "react";

export default function ContactList() {
  const [contacts, setContacts] = React.useState([]);
  const[loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.BASE_URL}/api/contacts`,
          // "https://contact-apps-api.ainunns.me/api/contacts",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization:
                `Bearer ${process.env.BEARER_TOKEN}`,
                // "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE5MDA4NGY2LWIxYjQtNDIxZi05ZTBiLWY1YTI4OGI5ZGRiOSIsIm5hbWUiOiJOaWNob2xhcyIsImVtYWlsIjoiNTAyNTIzMTAzMUBzdHVkZW50Lml0cy5hYy5pZCIsImlhdCI6MTcyNjg1MTYzMiwiZXhwIjoxNzI5NDQzNjMyfQ.zR9K0P2FKxbSG9qqF-lu-fzBRBcA63TdFPhe2nRJAwI",
            },
          }
        );
        const data = await response.json();
        setContacts(data.data);
      } catch (error) {
        console.log(error);
      } finally{
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if(loading) return <p>Loading...</p>

  return (
    <section className="contact_list_container">
      {/* <pre>{JSON.stringify(contacts, null, 2)}</pre> */}
      <h2 className="main__container-subheading">Contact List</h2>
      {contacts.map((contact) => (
        <ContactItem
          key={contact.id}
          imgUrl={contact.img_url}
          name={contact.name}
          email={contact.email}
        />
      ))}

      {/* <ContactItem
        imgUrl="https://dummyjson.com/icon/emilys/128"
        name="Emily Johnson"
        email="emily.johnson@x.dummyjson.com"
      />
      <ContactItem
        imgUrl="https://dummyjson.com/icon/emilys/128"
        name="John Doe"
        email="johndoe.@x.dummyjson.com"
      />
      <ContactItem
        imgUrl="https://dummyjson.com/icon/emilys/128"
        name="Mark Musk"
        email="mark.musk.@x.dummyjson.com"
      /> */}
    </section>
  );
}
