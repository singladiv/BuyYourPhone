import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Newappbar from "../Components/Newappbar";


import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  ImageList,
  ImageListItem,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import "./Index.css";

function Landing() {
  const [mobiles, setMobiles] = useState([]);
  const [brandFilter, setBrandFilter] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/products/mobile")
      .then((response) => setMobiles(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleFilter = (brand) => {
    setBrandFilter(brand);
  };

  return (
    <>
      <Newappbar/>
    <div className="mobile-list-container">
<<<<<<< Updated upstream:src/Pages/Landing/Index.js


      <div className="filter-container">
        <List component="nav" aria-label="brand filter" className="horizontal-filter">
=======
      <div className="w-48 bg-red-400 text-white text-bold mx-1 my-1 h-96 overflow-none">
        <List component="nav" aria-label="brand filter">
>>>>>>> Stashed changes:src/Pages/Landing.js
          <ListItem
            button
            onClick={() => handleFilter("")}
            selected={brandFilter === ""}
          >
            <ListItemText primary="All" />
          </ListItem>
          <ListItem
            button
            onClick={() => handleFilter("Apple")}
            selected={brandFilter === "Apple"}
          >
            <ListItemText primary="Apple" />
          </ListItem>
          <ListItem
            button
            onClick={() => handleFilter("Samsung")}
            selected={brandFilter === "Samsung"}
          >
            <ListItemText primary="Samsung" />
          </ListItem>
          <ListItem
            button
            onClick={() => handleFilter("Google")}
            selected={brandFilter === "Google"}
          >
            <ListItemText primary="Google" />
          </ListItem>
        </List>
      </div>

      <div className="mobiles-list">
        <ImageList cols={4} gap={40}>
          {mobiles
            .filter((mobile) => !brandFilter || mobile.brand === brandFilter)
            .filter(
              (item, index, array) =>
                array.findIndex((obj) => obj.model === item.model) === index
            )
            .map((mobile) => (
              <ImageListItem key={mobile.id} className="image-list-item">
                <Link
                  to={`/device-details/${
                    mobile.brand
                  }/${mobile.model}`}
                >
                  <Card>
                    <CardActionArea>
                      <div className="image-background">
                        <CardMedia
                          component="img"
                          alt={mobile.brand}
                          height="200px"
                          image={mobile.image}
                          title={mobile.model}
                        />
                      </div>
                      <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                          {mobile.brand}
                        </Typography>
                        <Typography gutterBottom variant="h" component="div">
                          {mobile.model}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Price: ${mobile.price}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Link>
              </ImageListItem>
            ))}
        </ImageList>
      </div>
    </div>
    </>
  );
}

export default Landing;
