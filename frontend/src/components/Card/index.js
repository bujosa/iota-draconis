import React from "react";
import { Card as LibraryCard, Text } from "@geist-ui/core";
import { Link } from "react-router-dom";
import "./style.css";

const Card = ({ picture, orbitalPeriod, satellite, name, haveWater }) => {
  return (
    <Link to={`/${name}`}>
      <LibraryCard shadow width="320px" height="300px" hoverable>
        <img src={picture} alt="planet" className="img" />
        <Text h3 my={1} mx="auto" style={{ textAlign: "center" }}>
          {name}
        </Text>
        <div className="informationContainer">
          <div className="informationColumn">
            <Text p b my={0.15}>
              Satellites
            </Text>
            <Text p my={0} mx="auto">
              {satellite}
            </Text>
          </div>
          <div className="informationColumn">
            <Text p b my={0.15}>
              Orbital periods
            </Text>
            <Text p my={0} mx="auto">
              {orbitalPeriod}
            </Text>
          </div>
          <div className="informationColumn">
            <Text p b my={0.15}>
              Has water?
            </Text>
            <Text p my={0} mx="auto">
              {haveWater ? "Yes" : "No"}
            </Text>
          </div>
        </div>
      </LibraryCard>
    </Link>
  );
};

export default Card;
