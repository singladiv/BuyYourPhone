
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
import { Link, useParams } from "react-router-dom";
import "./Index.css";

const DeviceDetails = () => {
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [price, setPrice] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [data, setData] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [expectedDays, setExpectedDays] = useState(null);

  const [warehouses, setWarehouses] = useState([]);
  const [pinCodeDistance, setPinCodeDistance] = useState({});

  const { brand, model } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/products/byBrandAndModel?brand=${brand}&model=${model}`
        );
        const jsonData = await response.json();

        if (Array.isArray(jsonData) && jsonData.length > 0) {
          const initialVariant = jsonData[0];

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
            setSizes(uniqueSizes);
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

  useEffect(() => {
    const Warehouses = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/warehouses");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setWarehouses(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    Warehouses();
  }, []);

  const calculateDistance = async (origin, destination) => {
    try {
      const response = await fetch(
        `https://distanceto.p.rapidapi.com/get?route=[{"t": "${origin}"}, {"t": "${destination}"}]&car=false`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key":
              "01edcfd91bmsh3d4346bf53c4705p14554cjsn194823f82988",
            "X-RapidAPI-Host": "distanceto.p.rapidapi.com",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const distance = data.steps[0].distance.haversine;
        return distance;
      } else {
        console.error("Error:", response.status, response.statusText);
        return null;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };


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

  const handlePinCodeCheck = async () => {
    const enteredPinCode = pinCode;

    if (warehouses.length === 0) {
      // If there are no warehouses, show that the product is out of stock
      console.log("Product is out of stock.");
      setExpectedDays(null);
      return;
    }

    let shortestDistance = Infinity;
    let calculatedDays = 7; // Default value if no warehouses are available

    // Set loading state while calculating distances
    setExpectedDays("loading");

    try {
      for (const warehouse of warehouses) {
        const distance = await calculateDistance(
          enteredPinCode,
          warehouse.location
        );

        if (distance !== null && distance < shortestDistance) {
          shortestDistance = distance;
        }
      }

      // Calculate expected delivery days based on the shortest distance
      if (shortestDistance < 300) {
        calculatedDays = 2;
      } else if (shortestDistance < 500) {
        calculatedDays = 3;
      } else if (shortestDistance < 800) {
        calculatedDays = 4;
      } else if (shortestDistance < 11000) {
        calculatedDays = 5;
      }
    } catch (error) {
      console.error("Error calculating distances:", error);
    }

    // Update the state with the calculated result
    setExpectedDays(calculatedDays);
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
              {expectedDays === "loading" && (
                <Typography variant="h6" color="text.primary">
                  Checking availability...
                </Typography>
              )}
              {expectedDays !== null && expectedDays !== "loading" && (
                <Typography variant="h6" color="#49be25">
                  Expected Delivery: {expectedDays} days
                </Typography>
              )}
              {expectedDays === null && (
                <Typography variant="h6" color="error">
                  Product is out of stock.
                </Typography>
              )}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              className="nextButton"
              component={Link}
              to={`/accessories/${brand}`}
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
