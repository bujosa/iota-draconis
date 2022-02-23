import { useEffect, useState } from "react";
import { Text, Button } from "@geist-ui/core";
import { useParams, useNavigate } from "react-router-dom";

import Form from "../../components/Form";

import { getDetailPlanet, deletePlanet } from "../../services";

import "./Detail.css";

const Detail = () => {
  let params = useParams();
  const [planet, setPlanet] = useState({});
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  const fetchPlanets = async () => {
    setLoading(true);
    try {
      const response = await getDetailPlanet(params.planetName);
      const { data } = response;
      setPlanet(data);
    } catch (error) {
      console.error("Error", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPlanets();
  }, []);

  if (loading || Object.keys(planet).length === 0) {
    return (
      <Text h1 type="warning" style={{ textAlign: "center" }}>
        Loading...
      </Text>
    );
  }

  const handleCancel = () => {
    setEditMode(false);
  };

  const handleUpdate = () => {
    setEditMode(true);
  };

  const handleDelete = async () => {
    try {
      await deletePlanet(params.planetName);
      navigate("/");
      window.location.reload();
    } catch (e) {
      console.log("Error", e);
    }
  };

  const { satellite, orbitalPeriod, haveWater, name, picture } = planet;

  return (
    <>
      <Text h1 type="success" style={{ textAlign: "center" }}>
        Planet Detail
      </Text>
      <Text h2 style={{ textAlign: "center" }}>
        Detail {params.planetName}
      </Text>
      <section className="sectionContainer">
        {editMode ? (
          <Form planet={planet} mode="update" />
        ) : (
          <>
            {picture ? <img src={picture} alt="planet" /> : null}
            <div className="textContainer">
              <Text h4 b>
                Name
              </Text>
              <Text h4 mt={0} mb={1.5}>
                {name}
              </Text>
              <Text h4 b>
                Satellites
              </Text>
              <Text h4 mt={0} mb={1.5}>
                {satellite}
              </Text>
              <Text h4 b>
                Orbital Periods
              </Text>
              <Text h4 mt={0} mb={1.5}>
                {orbitalPeriod}
              </Text>
              <Text h4 b>
                Have water?
              </Text>
              <Text h4 mt={0} mb={1.5}>
                {haveWater ? "True" : "False"}
              </Text>
            </div>
          </>
        )}
      </section>
      <section className="buttonContainer">
        <Button
          auto
          type="success-light"
          onClick={handleUpdate}
          disabled={editMode}>
          Update Planet
        </Button>
        <Button
          auto
          type="error-light"
          onClick={editMode ? handleCancel : handleDelete}>
          {editMode ? "Cancel Changes" : "Delete Planet"}
        </Button>
      </section>
    </>
  );
};

export default Detail;
