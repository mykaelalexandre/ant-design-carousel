import React, { useState } from "react";
import { Carousel, Input, Button, List, InputNumber, ColorPicker } from "antd";
import styled from "styled-components";

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const StageListContainer = styled.div`
  margin-top: 20px;
`;

const SettingsContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const contentStyle = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
};

const App = () => {
  const [stages, setStages] = useState([]);
  const [carouselSettings, setCarouselSettings] = useState({
    color: "#1677FF",
    size: 400,
  });

  const addStage = (stage) => {
    const updatedStages = [...stages, stage];
    setStages(updatedStages);
  };

  const removeStage = (index) => {
    const updatedStages = stages.filter((_, i) => i !== index);
    setStages(updatedStages);
  };

  const resetStages = () => {
    setStages([]);
  };

  const updateCarouselSettings = (settings) => {
    setCarouselSettings(settings);
  };

  const red = Math.floor(carouselSettings.color.metaColor?.r);
  const green = Math.floor(carouselSettings.color.metaColor?.g);
  const blue = Math.floor(carouselSettings.color.metaColor?.b);
  
  // Converter os valores RGB para hexadecimal
  const rgbHex = `#${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue.toString(16).padStart(2, '0')}`;
  


  return (
    <StyledApp>
      <h1>Welcome to AMNI</h1>
      <Carousel
        autoplay
        style={{
          width: carouselSettings.size,
          height: "200px",
          alignItems: "center",
          backgroundColor: rgbHex
        }}
      >
        {stages.map((stage, index) => (
          <div
            key={index}
            style={{
              ...contentStyle,
              color: rgbHex || 'blue',
            }}
          >
            <h3>{stage}</h3>
          </div>
        ))}
      </Carousel>
      <StageListContainer>
        <Input
          placeholder="Enter a stage"
          onPressEnter={(e) => {
            addStage(e.target.value);
            e.target.value = "";
          }}
        />
        <h4>Press enter do add a stage</h4>
        <h3>Stages</h3>
        <List
          dataSource={stages}
          renderItem={(stage, index) => (
            <List.Item>
              {stage}
              <Button
                onClick={() => removeStage(index)}
                type="danger"
                size="small"
              >
                Remove
              </Button>
            </List.Item>
          )}
        />
      </StageListContainer>
      <Button onClick={resetStages}>Reset Stages</Button>
      <SettingsContainer>
        <h2>Carousel Settings</h2>
        <div>
          Color:
          <ColorPicker
            color={carouselSettings.color}
            onChange={(color) =>
              updateCarouselSettings({ ...carouselSettings, color })
            }
          />
        </div>
        <div>
          Size:
          <InputNumber
            value={carouselSettings.size}
            onChange={(size) =>
              updateCarouselSettings({ ...carouselSettings, size })
            }
          />
        </div>
      </SettingsContainer>
    </StyledApp>
  );
};

export default App;
