import { Text, Button } from "@geist-ui/core";
import { useState, useEffect } from "react";
import Form from "./components/Form";
import Card from "./components/Card";
import { getPlanets } from "./services";
import "./App.css";

function App() {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateData, setUpdatedData] = useState(true);
  const [openForm, setOpenForm] = useState(false);

  const handleAdd = () => {
    setOpenForm(!openForm);
  };

  const fetchPlanets = async () => {
    setLoading(true);
    try {
      const response = await getPlanets;
      const { data } = response;
      setPlanets(data);
    } catch (error) {
      console.error("Error", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (updateData) {
      fetchPlanets();
    }
    setUpdatedData(false);
  }, [updateData, setUpdatedData]);

  return (
    <>
      <header>
        <Text h1 type="success">
          Planets
        </Text>
        <Button onClick={handleAdd}>
          {!openForm ? "Add planet" : "Cancel"}
        </Button>
      </header>
      {openForm ? (
        <Form
          mode="create"
          planet={{
            name: "",
            satellite: 0,
            orbitalPeriod: 0,
            haveWater: false,
            picture:
              "https://cdn.pixabay.com/photo/2011/12/13/14/28/earth-11009_960_720.jpg",
          }}
        />
      ) : null}
      <main className="listingContainer">
        {loading ? <h2>Loading...</h2> : null}
        {planets.length > 0
          ? planets.map((planet) => <Card key={planet.name} {...planet} />)
          : null}
      </main>
    </>
  );
}

export default App;
