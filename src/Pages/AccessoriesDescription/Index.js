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

const AccessoriesDescription = () => {
  const [selectedColor, setSelectedColor] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [price, setPrice] = useState(null);
  const [locationAvailability, setLocationAvailability] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [data, setData] = useState([]);
  const [colors, setColors] = useState([]);
  const [expectedDays, setExpectedDays] = useState(null);

  // Add the necessary state and function from your DeviceDetails component
  const [warehouses, setWarehouses] = useState([]);

  // Replace calculateDistance with your actual function
  const calculateDistance = async (origin, destination) => {
    try {
      const response = await fetch(
        `https://distanceto.p.rapidapi.com/get?route=[{"t": "${origin}"}, {"t": "${destination}"}]&car=false`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key":
              "cab73d02famsh15196a44547fd1bp1824ffjsn3068e5d65a9c",
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

  const { brand, model } = useParams();

  useEffect(() => {
    // Fetch accessory data by brand and model
    const fetchAccessoryData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/products/byBrandAndModel?brand=${brand}&model=${model}`
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
        console.error("Error fetching accessory data:", error);
      }
    };
  
    const fetchWarehouses = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/warehouses");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setWarehouses(data);
      } catch (error) {
        console.error("Error fetching warehouses:", error);
      }
    };
  
    // Call both fetch functions
    fetchAccessoryData();
    fetchWarehouses();
  }, [brand, model]);
  

  const handleColorSelection = (color) => {
    const selectedVariant = data.find((variant) => variant.color === color);

    if (selectedVariant) {
      setSelectedVariant(selectedVariant);
      setSelectedColor(color);
      setPrice(selectedVariant.price);
    }
  };

  const handlePinCodeCheck = async () => {
    const enteredPinCode = pinCode;
  
    if (warehouses.length === 0) {
      // If there are no warehouses, show that the product is out of stock
      console.log("Product is out of stock because there are no warehouses.");
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
  
      console.log("Shortest distance:", shortestDistance);
  
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
  
      console.log("Calculated days:", calculatedDays);
    } catch (error) {
      console.error("Error calculating distances:", error);
    }
  
    // Update the state with the calculated result
    setExpectedDays(calculatedDays);
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
              href="/order-summary"
            >
              Next
            </Button>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default AccessoriesDescription;
