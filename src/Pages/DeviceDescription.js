import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import "./Description.css"; 

const DeviceDetails = () => {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [price, setPrice] = useState(null);
  const [locationAvailability, setLocationAvailability] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [data, setData] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://mocki.io/v1/8a0c7af5-21a5-4206-9d4b-d170bdd8f4dc"
        );
        const jsonData = await response.json();

        // Extract unique colors and sizes
        const uniqueColors = Array.from(
          new Set(jsonData.map((variant) => variant.color))
        );
        const uniqueSizes = Array.from(
          new Set(jsonData.map((variant) => variant.size))
        );

        // Set initial values based on the first variant
        const initialVariant = jsonData[0];
        setSelectedVariant(initialVariant);
        setSelectedColor(initialVariant.color);
        setSelectedSize(initialVariant.size);
        setPrice(initialVariant.price);
        setColors(uniqueColors); 
        setSizes(uniqueSizes); // Show only the first two sizes
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
  component={Link} // Use Link to navigate
  to={`/accessories`} // Pass selectedBrand as a route parameter
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
