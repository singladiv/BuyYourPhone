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
import { useParams } from "react-router-dom";
import "./Description.css";

const DeviceDetails = () => {
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [price, setPrice] = useState(null);
  const [locationAvailability, setLocationAvailability] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [data, setData] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);

  const { brand, model } = useParams();
  // console.log(brand);

  
  

  useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/products/byBrandAndModel?brand=${brand}&model=${model}`
      );
      const jsonData = await response.json();

      // Ensure that the data is an array and not empty
      if (Array.isArray(jsonData) && jsonData.length > 0) {
        const initialVariant = jsonData[0];

        // Ensure that the necessary properties are available
        if (
          initialVariant &&
          initialVariant.color !== undefined &&
          initialVariant.size !== undefined
        ) {
          setSelectedVariant(initialVariant);
          setSelectedColor(initialVariant.color);
          setSelectedSize(initialVariant.size);
          setPrice(initialVariant.price);

          const uniqueColors = Array.from(
            new Set(jsonData.map((variant) => variant.color))
          );
          const uniqueSizes = Array.from(
            new Set(jsonData.map((variant) => variant.size))
          );

          setColors(uniqueColors);
          setSizes(uniqueSizes); // Show only the first two sizes
          setData(jsonData);
        } else {
          console.error("Data format is incorrect:", jsonData);
        }
      } else {
        console.error("Empty or invalid data:", jsonData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchData();
}, [brand, model]);

  const handleColorSelection = (color) => {
    const selectedVariant = data.find(
      (variant) => variant.color === color && variant.size === selectedSize
    );

    if (selectedVariant) {
      setSelectedVariant(selectedVariant);
      setSelectedColor(color);
      setSelectedSize(selectedVariant.size);
      setPrice(selectedVariant.price);
    }
  };

  const handleSizeSelection = (size) => {
    const selectedVariant = data.find(
      (variant) => variant.size === size && variant.color === selectedColor
    );

    if (selectedVariant) {
      setSelectedVariant(selectedVariant);
      setSelectedSize(size);
      setSelectedColor(selectedVariant.color);
      setPrice(selectedVariant.price);
    }
  };

  const handlePinCodeCheck = () => {
    // Perform API call to check mobile availability at the entered pin code
    // Update locationAvailability state based on API response
    // You may also want to update the price based on the location
  };

  return (
    <Card className="cardContainer">
      <Grid container>
        <Grid item xs={12} md={6} className="imageContainer">
          <CardMedia
            component="img"
            alt="Mobile Image"
            className="image"
            src={`${selectedVariant?.image}`}
          />
        </Grid>
        <Grid item xs={12} md={6} className="cardContentContainer">
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
              className="colorSizeSelection"
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
            <Typography
              variant="h6"
              color="text.primary"
              className="colorSizeSelection"
            >
              Select Size:
              {selectedVariant &&
                sizes.map((size) => (
                  <Button
                    sx={{ ml: "1rem" }}
                    key={size}
                    onClick={() => handleSizeSelection(size)}
                    variant={selectedSize === size ? "contained" : "outlined"}
                    color="primary"
                  >
                    {size}
                  </Button>
                ))}
            </Typography>

            {price != null && (
              <Typography variant="h5" component="div" className="priceSection">
                Price: ${price}
              </Typography>
            )}

            <Typography
              variant="h5"
              color="text.primary"
              padding="10px 0px"
              className="pinCodeSection"
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
                    ? "Device will be delivered within {n} days "
                    : "Mobile not available at this location"}
                </Typography>
              )}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              className="nextButton"
              href="/acessories"
            >
              Next
            </Button>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default DeviceDetails;
