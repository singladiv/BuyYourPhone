// AccessoriesDescription.js

import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import "./AccessoriesDescription.css"; 

const AccessoriesDescription = () => {
  const [selectedColor, setSelectedColor] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [price, setPrice] = useState(null);
  const [locationAvailability, setLocationAvailability] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [data, setData] = useState([]);
  const [colors, setColors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://mocki.io/v1/51828371-ac57-4fdb-88d6-3226cf419eed"
        );
        const jsonData = await response.json();

        // Extract unique colors
        const uniqueColors = Array.from(
          new Set(jsonData.map((variant) => variant.color))
        );

        // Set initial values based on the first variant
        const initialVariant = jsonData[0];
        setSelectedVariant(initialVariant);
        setSelectedColor(initialVariant.color);
        setPrice(initialVariant.price);
        setColors(uniqueColors);
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleColorSelection = (color) => {
    const selectedVariant = data.find((variant) => variant.color === color);

    if (selectedVariant) {
      setSelectedVariant(selectedVariant);
      setSelectedColor(color);
      setPrice(selectedVariant.price);
    }
  };

  const handlePinCodeCheck = () => {
    // Perform API call to check accessory availability at the entered pin code
    // Update locationAvailability state based on API response
    // You may also want to update the price based on the location
  };

  return (
    <Card className="accessoriesCardContainer">
      <Grid container>
        <Grid item xs={12} md={6} className="accessoriesImageContainer">
          <CardMedia
            component="img"
            alt="Accessory Image"
            className="accessoriesImage"
            src={`${selectedVariant?.image}`}
          />
        </Grid>
        <Grid item xs={12} md={6} className="accessoriesCardContentContainer">
          <CardContent>
            <Typography variant="h3" component="h1" padding="5px 0px">
              {selectedVariant?.brand}
            </Typography>
            <Typography variant="h4" component="h1">
              {selectedVariant?.model}
            </Typography>

            <Typography
              variant="h6"
              color="text.primary"
              className="accessoriesColorSelection"
            >
              Select Color:
              {selectedVariant &&
                colors.map((color) => (
                  <Button
                    key={color}
                    onClick={() => handleColorSelection(color)}
                    variant={selectedColor === color ? "contained" : "outlined"}
                    color="secondary"
                    sx={{ ml: "1rem" }}
                  >
                    {color}
                  </Button>
                ))}
            </Typography>

            {price != null && (
              <Typography variant="h5" component="div" className="accessoriesPriceSection">
                Price: ${price}
              </Typography>
            )}

            <Typography
              variant="h5"
              color="text.primary"
              padding="10px 0px"
              className="accessoriesPinCodeSection"
            >
              Enter PIN Code:
              <TextField
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                variant="outlined"
              />
              <Button onClick={handlePinCodeCheck} size="large">
                Check Availability
              </Button>
              {locationAvailability == null && (
                <Typography variant="h6" color="text.primary">
                  {locationAvailability
                    ? "Accessory will be delivered within {n} days "
                    : "Accessory not available at this location"}
                </Typography>
              )}
            </Typography>  
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default AccessoriesDescription;

