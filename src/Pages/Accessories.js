import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  ImageList,
  ImageListItem,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import './Accessories.css';

const Accessories = () => {
  const [accessories, setAccessories] = useState([]);
  const { brand } = useParams();

  useEffect(() => {
    // Fetch accessory data from your API
    const fetchAccessories = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/products/accessories');
        setAccessories(response.data);
      } catch (error) {
        console.error('Error fetching accessory data:', error);
      }
    };

    fetchAccessories();
  }, []);

  const filteredAccessories = accessories.filter((accessory) => accessory.brand === brand);

  return (
    <div className="accessories-container">
      <h1 className="accessories-heading">Accessories for {brand}</h1>
      <ImageList cols={3} gap={16}>
        {filteredAccessories.map((accessory) => (
          <ImageListItem key={accessory.id}>
            <Link to={`/accessories-description`} className="accessory-link">
              <Card className="accessory-card">
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt={accessory.name}
                    className="accessory-image"
                    image={accessory.image}
                  />
                  <CardContent className="accessory-content">
                    <Typography gutterBottom variant="h6" component="div">
                      {accessory.brand}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {accessory.model}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" className="accessory-price">
                      Price: Rs.{accessory.price}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
};

export default Accessories;
