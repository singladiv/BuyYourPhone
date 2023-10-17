<<<<<<< Updated upstream
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
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
} from '@mui/material';
import './Landing.css'; 

function Landing() {
  const [mobiles, setMobiles] = useState([]);
  const [brandFilter, setBrandFilter] = useState('');

  useEffect(() => {
    axios
      .get('https://mocki.io/v1/8d9c7949-de39-43f9-85c0-2f35f63727f7')
      .then((response) => setMobiles(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleFilter = (brand) => {
    setBrandFilter(brand);
  };

  return (
    <div className="mobile-list-container">
      <div className="sidebar">
        <List component="nav" aria-label="brand filter">
          <ListItem
            button
            onClick={() => handleFilter('')}
            selected={brandFilter === ''}
          >
            <ListItemText primary="All" />
          </ListItem>
          <ListItem
            button
            onClick={() => handleFilter('Apple')}
            selected={brandFilter === 'Apple'}
          >
            <ListItemText primary="Apple" />
          </ListItem>
          <ListItem
            button
            onClick={() => handleFilter('Samsung')}
            selected={brandFilter === 'Samsung'}
          >
            <ListItemText primary="Samsung" />
          </ListItem>
          <ListItem
            button
            onClick={() => handleFilter('Google')}
            selected={brandFilter === 'Google'}
          >
            <ListItemText primary="Google" />
          </ListItem>
        </List>
      </div>
      <div className="mobiles-list">
        <ImageList cols={3} gap={40}>
          {mobiles
            .filter((mobile) => !brandFilter || mobile.brand === brandFilter)
            .map((mobile) => (
              <ImageListItem key={mobile.id} className="image-list-item">
                <Link to={`/device-description`}>
                  <Card>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        alt={mobile.brand}
                        height="200px"
                        image={mobile.imageUrl}
                        title={mobile.model}
                      />
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
                    {/* <CardActions>
                      <Button size="small" color="primary">
                        View More
                      </Button>
                    </CardActions> */}
                  </Card>
                </Link>
              </ImageListItem>
            ))}
        </ImageList>
      </div>
=======
import React from 'react'
import { Link } from 'react-router-dom'
import Appbar from '../Components/Appbar'
const Landing = () => {
  return (
    <div>
        {/* <Appbar/> */}
      <h1>Welcome to Landing Page</h1>
        <Link to="/device-description">Next</Link>
>>>>>>> Stashed changes
    </div>
  );
}

export default Landing;
